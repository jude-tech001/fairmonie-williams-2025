-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  balance DECIMAL(12,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('credit', 'debit', 'withdrawal', 'deposit', 'referral_bonus', 'airtime', 'data', 'tv', 'betting', 'loan')),
  amount DECIMAL(12,2) NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  reference TEXT UNIQUE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create withdrawals table
CREATE TABLE public.withdrawals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_name TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  transaction_id UUID REFERENCES public.transactions(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Create referrals table
CREATE TABLE public.referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  referee_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
  bonus_amount DECIMAL(12,2) DEFAULT 6500.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create user passwords table for password retrieval
CREATE TABLE public.user_passwords (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  encrypted_password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_passwords ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for transactions
CREATE POLICY "Users can view own transactions" ON public.transactions
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON public.transactions
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for withdrawals
CREATE POLICY "Users can view own withdrawals" ON public.withdrawals
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own withdrawals" ON public.withdrawals
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for referrals
CREATE POLICY "Users can view own referrals" ON public.referrals
FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referee_id);

CREATE POLICY "Users can insert referrals" ON public.referrals
FOR INSERT WITH CHECK (auth.uid() = referrer_id);

-- Create RLS policies for user_passwords
CREATE POLICY "Users can view own password" ON public.user_passwords
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own password" ON public.user_passwords
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own password" ON public.user_passwords
FOR UPDATE USING (auth.uid() = user_id);

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Create storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar" ON storage.objects
FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar" ON storage.objects
FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_passwords_updated_at
  BEFORE UPDATE ON public.user_passwords
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to generate referral code
CREATE OR REPLACE FUNCTION public.generate_referral_code(user_name TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN UPPER(CONCAT(
    SUBSTRING(REPLACE(user_name, ' ', ''), 1, 3),
    FLOOR(RANDOM() * 9000 + 1000)::TEXT
  ));
END;
$$ LANGUAGE plpgsql;

-- Create function to process referral bonus
CREATE OR REPLACE FUNCTION public.process_referral_bonus(referral_code TEXT, new_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  referrer_user_id UUID;
  bonus_amount DECIMAL(12,2) := 6500.00;
BEGIN
  -- Find the referrer
  SELECT user_id INTO referrer_user_id 
  FROM public.referrals 
  WHERE referral_code = process_referral_bonus.referral_code 
  AND status = 'pending'
  LIMIT 1;
  
  IF referrer_user_id IS NOT NULL THEN
    -- Update referral status
    UPDATE public.referrals 
    SET referee_id = new_user_id, status = 'completed', completed_at = NOW()
    WHERE referral_code = process_referral_bonus.referral_code AND referrer_id = referrer_user_id;
    
    -- Add bonus to referrer's balance
    UPDATE public.profiles 
    SET balance = balance + bonus_amount 
    WHERE user_id = referrer_user_id;
    
    -- Create transaction record for referrer
    INSERT INTO public.transactions (user_id, type, amount, description, reference)
    VALUES (
      referrer_user_id,
      'referral_bonus',
      bonus_amount,
      'Referral bonus for inviting new user',
      'REF_' || EXTRACT(EPOCH FROM NOW())::TEXT
    );
    
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at DESC);
CREATE INDEX idx_withdrawals_user_id ON public.withdrawals(user_id);
CREATE INDEX idx_referrals_referrer_id ON public.referrals(referrer_id);
CREATE INDEX idx_referrals_code ON public.referrals(referral_code);