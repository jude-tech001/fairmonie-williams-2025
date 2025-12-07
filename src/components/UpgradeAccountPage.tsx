import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Shield, Award, Zap, Gem, Star, Crown, CircleDot, Copy, CheckCircle, Loader2, Target } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UpgradeAccountPageProps {
  onBack: () => void;
  user: { name: string; email: string };
}

type UpgradeLevel = {
  id: string;
  name: string;
  price: number;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  benefits: string[];
};

const upgradeLevels: UpgradeLevel[] = [
  {
    id: 'silver',
    name: 'Silver',
    price: 5500,
    icon: Shield,
    iconColor: 'text-gray-600',
    bgColor: 'bg-gray-100',
    benefits: [
      'Earn ₦500 per referral',
      'Weekly rewards of ₦5,000',
      'Basic customer support',
      'Access to standard features'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 7500,
    icon: Award,
    iconColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
    benefits: [
      'Earn ₦1,000 per referral',
      'Weekly rewards of ₦10,000',
      'Priority customer support',
      'Reduced fees on transactions',
      'Twice weekly withdrawal option'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 10000,
    icon: Zap,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    benefits: [
      'Earn ₦2,000 per referral',
      'Weekly rewards of ₦20,000',
      'VIP customer support',
      'No fees on transactions',
      'Exclusive promotions',
      'Daily withdrawal option'
    ]
  },
  {
    id: 'emerald',
    name: 'Emerald',
    price: 15000,
    icon: Gem,
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    benefits: [
      'Earn ₦3,000 per referral',
      'Weekly rewards of ₦30,000',
      'Premium customer support',
      'No fees on transactions',
      'Exclusive promotions',
      '10% bonus on all earnings'
    ]
  },
  {
    id: 'ruby',
    name: 'Ruby',
    price: 20000,
    icon: Star,
    iconColor: 'text-rose-600',
    bgColor: 'bg-rose-50',
    benefits: [
      'Earn ₦4,000 per referral',
      'Weekly rewards of ₦40,000',
      'Premium customer support',
      'No fees on transactions',
      '15% bonus on all earnings',
      'Exclusive investment opportunities'
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 25000,
    icon: Crown,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    benefits: [
      'Earn ₦5,000 per referral',
      'Weekly rewards of ₦50,000',
      '24/7 dedicated support',
      'No fees on transactions',
      'Higher withdrawal limits',
      'Early access to new features'
    ]
  },
  {
    id: 'black',
    name: 'Black Elite',
    price: 50000,
    icon: CircleDot,
    iconColor: 'text-gray-900',
    bgColor: 'bg-gray-900',
    benefits: [
      'Earn ₦10,000 per referral',
      'Weekly rewards of ₦100,000',
      'Personal account manager',
      'No fees on transactions',
      'Unlimited withdrawal limits',
      '25% bonus on all earnings',
      'Exclusive offline events access'
    ]
  }
];

const UpgradeAccountPage: React.FC<UpgradeAccountPageProps> = ({ onBack, user }) => {
  const [view, setView] = useState<'levels' | 'benefits' | 'preparing' | 'payment' | 'verifying' | 'pending'>('levels');
  const [selectedLevel, setSelectedLevel] = useState<UpgradeLevel | null>(null);

  const bankDetails = {
    bankName: "Sparkle MFB",
    accountNumber: "1002999917",
    accountName: "CHIDERA OKORIE"
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
      duration: 2000,
    });
  };

  const handleLevelSelect = (level: UpgradeLevel) => {
    setSelectedLevel(level);
  };

  const handleViewBenefits = () => {
    if (selectedLevel) {
      setView('benefits');
    } else {
      toast({
        title: "Select a level",
        description: "Please select a level to view benefits",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleProceedToPayment = () => {
    setView('preparing');
    setTimeout(() => {
      setView('payment');
    }, 6000);
  };

  const handlePaymentMade = () => {
    setView('verifying');
    setTimeout(() => {
      setView('pending');
    }, 8000);
  };

  // Level Selection View
  if (view === 'levels') {
    return (
      <div className="min-h-screen bg-background overflow-y-auto">
        <div className="bg-primary px-4 py-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-primary/80 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-primary-foreground" />
            </button>
            <h1 className="text-xl font-semibold text-primary-foreground">Upgrade Account</h1>
          </div>
        </div>

        <div className="px-4 py-4 space-y-3 max-h-[calc(100vh-60px)] overflow-y-auto">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-foreground">Choose Your Level</h2>
            <p className="text-sm text-muted-foreground">Select a level to view benefits and upgrade</p>
          </div>

          {/* Current Level */}
          <Card className="bg-muted/50">
            <CardContent className="p-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Level</p>
                  <p className="text-base font-bold text-foreground">Basic</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-base font-semibold text-foreground">Select Level to Upgrade</h3>

          {/* Upgrade Levels Grid */}
          <div className="grid grid-cols-3 gap-2">
            {upgradeLevels.map((level) => {
              const Icon = level.icon;
              const isSelected = selectedLevel?.id === level.id;
              const isBlack = level.id === 'black';
              
              return (
                <button
                  key={level.id}
                  onClick={() => handleLevelSelect(level)}
                  className={`relative p-3 rounded-lg border-2 transition-all ${
                    isSelected 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <div className={`w-10 h-10 ${isBlack ? 'bg-gray-900' : level.bgColor} rounded-full flex items-center justify-center mx-auto mb-1`}>
                    <Icon className={`w-5 h-5 ${isBlack ? 'text-white' : level.iconColor}`} />
                  </div>
                  <p className="font-bold text-foreground text-xs">{level.name}</p>
                  <p className="text-[10px] font-semibold text-primary">₦{level.price.toLocaleString()}</p>
                </button>
              );
            })}
          </div>

          {/* View Benefits Button */}
          <Button
            onClick={handleViewBenefits}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-5 rounded-lg text-base font-semibold"
          >
            View Benefits
          </Button>

          <p className="text-center text-xs text-muted-foreground pb-2">
            Select a level to view detailed benefits before payment
          </p>
        </div>
      </div>
    );
  }

  // Benefits View
  if (view === 'benefits' && selectedLevel) {
    const Icon = selectedLevel.icon;
    const isBlack = selectedLevel.id === 'black';
    
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary px-4 py-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setView('levels')}
              className="p-2 hover:bg-primary/80 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-primary-foreground" />
            </button>
            <h1 className="text-xl font-semibold text-primary-foreground">Level Benefits</h1>
          </div>
        </div>

        <div className="px-4 py-6 space-y-4">
          {/* Level Header */}
          <Card className={`${isBlack ? 'bg-gray-900' : selectedLevel.bgColor} border-none`}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 ${isBlack ? 'bg-white' : 'bg-white'} rounded-full flex items-center justify-center`}>
                  <Icon className={`w-8 h-8 ${isBlack ? 'text-gray-900' : selectedLevel.iconColor}`} />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${isBlack ? 'text-white' : 'text-foreground'}`}>
                    {selectedLevel.name} Level
                  </h2>
                  <p className={`text-xl font-bold ${isBlack ? 'text-white' : 'text-foreground'}`}>
                    ₦{selectedLevel.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits List */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Benefits & Features</h3>
              <div className="space-y-3">
                {selectedLevel.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${selectedLevel.iconColor}`} />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Proceed Button */}
          <Button
            onClick={handleProceedToPayment}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-lg text-base font-semibold"
          >
            Proceed to Payment
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Your upgrade will be activated immediately after payment is confirmed
          </p>
        </div>
      </div>
    );
  }

  // Preparing Payment View
  if (view === 'preparing') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 mx-auto mb-6">
            <Loader2 className="w-20 h-20 text-primary animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Preparing Payment</h2>
          <p className="text-muted-foreground">Please wait while we set up your payment...</p>
        </div>
      </div>
    );
  }

  // Payment View
  if (view === 'payment' && selectedLevel) {
    const Icon = selectedLevel.icon;
    
    return (
      <div className="min-h-screen bg-background overflow-y-auto">
        <div className="bg-card px-4 py-3 shadow-sm border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setView('benefits')}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-foreground" />
              </button>
              <h1 className="text-xl font-semibold text-foreground">Bank Transfer</h1>
            </div>
            <button
              onClick={() => setView('levels')}
              className="text-destructive font-medium"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="px-4 py-4 space-y-3 max-h-[calc(100vh-60px)] overflow-y-auto">
          {/* Amount Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 ${selectedLevel.bgColor} rounded-full flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${selectedLevel.iconColor}`} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-foreground">NGN {selectedLevel.price.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{selectedLevel.name} Level Upgrade</p>
            </div>
          </div>

          <p className="text-sm text-foreground text-center py-1">Complete this bank transfer to proceed</p>

          {/* Payment Details Card */}
          <Card>
            <CardContent className="p-4 space-y-3">
              {/* Amount */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Amount</label>
                <div className="flex items-center justify-between bg-muted p-2.5 rounded-lg">
                  <span className="text-base font-bold text-foreground">NGN {selectedLevel.price.toLocaleString()}</span>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(selectedLevel.price.toString(), 'Amount')}
                    className="bg-green-500 hover:bg-green-600 text-white h-7 px-3 text-xs"
                  >
                    Copy
                  </Button>
                </div>
              </div>

              {/* Account Number */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block flex items-center">
                  <span className="mr-1">🔢</span> Account Number
                </label>
                <div className="flex items-center justify-between bg-muted p-2.5 rounded-lg">
                  <span className="text-base font-bold text-foreground">{bankDetails.accountNumber}</span>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(bankDetails.accountNumber, 'Account number')}
                    className="bg-green-500 hover:bg-green-600 text-white h-7 px-3 text-xs"
                  >
                    Copy
                  </Button>
                </div>
              </div>

              {/* Bank Name */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block flex items-center">
                  <span className="mr-1">🏦</span> Bank Name
                </label>
                <div className="bg-muted p-2.5 rounded-lg">
                  <span className="text-base font-bold text-foreground">{bankDetails.bankName}</span>
                </div>
              </div>

              {/* Account Name */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block flex items-center">
                  <span className="mr-1">👤</span> Account Name
                </label>
                <div className="bg-muted p-2.5 rounded-lg">
                  <span className="text-base font-bold text-foreground">{bankDetails.accountName}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <p className="text-xs text-muted-foreground text-center px-2">
            Make Payment to the Account Above to upgrade your account level
          </p>

          {/* Payment Confirmation Button */}
          <Button
            onClick={handlePaymentMade}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-lg text-base font-semibold mb-4"
          >
            I have made this bank Transfer
          </Button>
        </div>
      </div>
    );
  }

  // Verifying Payment View
  if (view === 'verifying') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 mx-auto mb-6">
            <Loader2 className="w-20 h-20 text-primary animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Verifying Payment</h2>
          <p className="text-muted-foreground">Please wait while we confirm your payment...</p>
        </div>
      </div>
    );
  }

  // Upgrade Pending View
  if (view === 'pending') {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary px-4 py-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-primary/80 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-primary-foreground" />
            </button>
            <h1 className="text-xl font-semibold text-primary-foreground">Upgrade Status</h1>
          </div>
        </div>

        <div className="px-4 py-8 flex items-center justify-center min-h-[80vh]">
          <Card className="w-full">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                <Loader2 className="w-10 h-10 text-amber-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground">Upgrade Pending</h2>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-amber-900 font-medium mb-2">Contact Support</p>
                <p className="text-sm text-amber-700">
                  Send screenshot to approve your upgrade
                </p>
              </div>

              <p className="text-muted-foreground text-sm">
                Our team will review your payment and activate your upgrade shortly
              </p>

              <Button
                onClick={onBack}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default UpgradeAccountPage;
