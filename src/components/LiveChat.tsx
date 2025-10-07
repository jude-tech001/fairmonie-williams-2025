
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Send, Bot } from 'lucide-react';

interface LiveChatProps {
  onBack: () => void;
  user: { name: string; email: string };
  balance?: number;
  transactions?: any[];
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const LiveChat: React.FC<LiveChatProps> = ({ onBack, user, balance = 0, transactions = [] }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to fairmonie support how can I assist you?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const generateBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Balance related queries
    if (lowerInput.includes('balance') || lowerInput.includes('money') || lowerInput.includes('account')) {
      return `💰 **Your Balance: ₦${balance.toLocaleString()}.00**

**What you can do:**
• 📈 Add money by claiming bonuses
• 📊 Check transaction history (${transactions.length} transactions)
• 🏦 Withdraw funds to your bank account
• 💸 Use balance for airtime, data, TV, betting, and loans

**Quick Actions Available:**
• Tap "Add Money" for bonuses
• Use "Withdraw" for bank transfers
• All services deduct from your balance automatically`;
    }
    
    // Airtime queries
    if (lowerInput.includes('airtime') || lowerInput.includes('recharge phone')) {
      return `📱 **HOW TO BUY AIRTIME:**

**Step-by-Step Guide:**
1️⃣ From dashboard, tap "Airtime" card
2️⃣ Select your network:
   • MTN • Airtel • Glo • 9mobile
3️⃣ Enter the phone number to recharge
4️⃣ Choose amount (₦50 - ₦10,000)
5️⃣ Confirm payment from your balance
6️⃣ Airtime credited instantly! ⚡

**Benefits:**
• Instant delivery
• All networks supported
• Bonus on bulk purchases
• Transaction history tracking`;
    }
    
    // Data queries
    if (lowerInput.includes('data') || lowerInput.includes('internet') || lowerInput.includes('bundle')) {
      return `📶 **HOW TO BUY DATA BUNDLES:**

**Step-by-Step Process:**
1️⃣ Navigate to "Data" section from dashboard
2️⃣ Choose your network provider
3️⃣ Select from available plans:

**📅 Daily Plans:** 100MB - 1GB
**📅 Weekly Plans:** 1GB - 6GB  
**📅 Monthly Plans:** 1.5GB - 40GB

4️⃣ Enter phone number
5️⃣ Review plan details & price
6️⃣ Pay from your balance
7️⃣ Data activates immediately! 🚀

**All major networks supported with competitive prices!**`;
    }
    
    // TV subscription queries
    if (lowerInput.includes('tv') || lowerInput.includes('dstv') || lowerInput.includes('gotv') || lowerInput.includes('cable')) {
      return `📺 **TV SUBSCRIPTION GUIDE:**

**Available Providers:**
• DSTV (Premium, Compact, Access)
• GOTV (Max, Jolli, Jinja) 
• StarTimes (Classic, Basic, Nova)

**Popular Packages & Prices:**
• DSTV Compact: ₦9,000/month
• GOTV Max: ₦4,850/month
• StarTimes Classic: ₦2,600/month

**How to Subscribe:**
1️⃣ Go to "TV" section
2️⃣ Select your provider
3️⃣ Enter smartcard/decoder number
4️⃣ Choose subscription package
5️⃣ Pay from your balance
6️⃣ Subscription activates within minutes! ⚡`;
    }
    
    // Loan queries
    if (lowerInput.includes('loan') || lowerInput.includes('borrow') || lowerInput.includes('credit')) {
      return `💰 **QUICK LOAN SERVICE:**

**Loan Details:**
• Amount: ₦5,000 - ₦500,000
• Duration: 7 days - 12 months
• Interest: Competitive rates

**Requirements:**
✅ Valid bank account details
✅ Phone number verification
✅ Complete application form
✅ Valid Faircode for approval

**How to Apply:**
1️⃣ Go to "Loan" section
2️⃣ Fill application form
3️⃣ Enter bank details
4️⃣ Input your Faircode
5️⃣ Submit application
6️⃣ Get approval within 24 hours! 🎉

**Funds are disbursed directly to your bank account.**`;
    }
    
    // Betting queries
    if (lowerInput.includes('bet') || lowerInput.includes('sport') || lowerInput.includes('game')) {
      return `🎰 **BETTING SERVICES:**

**Available Options:**
🏈 **Sports Betting:**
   • Football, Basketball, Tennis
   • Live matches & pre-match
   • Competitive odds

🎮 **Virtual Games:**
   • Virtual football
   • Casino games
   • Instant results

**How to Fund Betting Account:**
1️⃣ Go to "Betting" section
2️⃣ Select your preferred bookmaker
3️⃣ Choose funding amount
4️⃣ Pay from your FairMonie balance
5️⃣ Start betting immediately! 🚀

**Integrated with popular bookmakers for seamless experience.**`;
    }
    
    // Withdrawal queries
    if (lowerInput.includes('withdraw') || lowerInput.includes('transfer') || lowerInput.includes('send money')) {
      return `🏦 **WITHDRAWAL PROCESS:**

**Step-by-Step Guide:**
1️⃣ Tap "Withdraw" in quick actions
2️⃣ Enter bank details:
   • Account number
   • Bank name
   • Account name
3️⃣ Specify withdrawal amount
4️⃣ Review transaction details
5️⃣ Confirm withdrawal

**Important Info:**
• Minimum: ₦100
• Processing: 24-48 hours
• Fee: ₦50 (for amounts above ₦1,000)
• All major Nigerian banks supported

**Your money will be credited to your bank account safely! 💯**`;
    }
    
    // Referral queries  
    if (lowerInput.includes('refer') || lowerInput.includes('invite') || lowerInput.includes('friend') || lowerInput.includes('earn')) {
      return `🎉 **INVITATION & EARNING PROGRAM:**

**💰 Earn ₦6,500 per successful referral!**

**How it Works:**
1️⃣ Go to "Invitation" section in More menu
2️⃣ Copy your unique referral link
3️⃣ Share with friends via:
   • WhatsApp • Facebook • Twitter
   • SMS • Email • Any platform
4️⃣ Friend signs up using your link
5️⃣ You both earn rewards! 💸

**Earning Breakdown:**
• ₦6,500 per verified referral
• Instant credit to your balance
• Unlimited referrals allowed
• Track your earnings in real-time

**Start inviting and earning today! 🚀**`;
    }
    
    // Buy Fair Code queries
    if (lowerInput.includes('fair code') || lowerInput.includes('faircode') || lowerInput.includes('f-code') || lowerInput.includes('buy code')) {
      return `💳 **HOW TO BUY FAIR CODE:**

**Step-by-Step Guide:**
1️⃣ Go to "More" menu on dashboard
2️⃣ Select "Buy Fair Code"
3️⃣ Fill in your details:
   • Full name
   • Phone number
   • Email address
4️⃣ Choose payment method
5️⃣ Complete payment
6️⃣ Your Fair Code will be activated instantly! ⚡

**🎯 Uses of Fair Code:**
• Required for premium services
• Loan applications approval
• Account verification
• Priority customer support

**Your Fair Code enables access to all premium features!**`;
    }

    // Upgrade Account queries
    if (lowerInput.includes('upgrade') || lowerInput.includes('account upgrade') || lowerInput.includes('premium')) {
      return `⭐ **HOW TO UPGRADE YOUR ACCOUNT:**

**Step-by-Step Process:**
1️⃣ Go to "More" menu
2️⃣ Select "Upgrade Account"
3️⃣ Choose upgrade plan:
   • Basic to Premium
   • Premium to VIP
4️⃣ Review benefits & pricing
5️⃣ Complete payment:
   • Bank transfer
   • FairMonie balance
6️⃣ Account upgraded instantly! 🚀

**Premium Benefits:**
• Higher transaction limits
• Priority support
• Exclusive bonuses
• Advanced features access
• Lower fees on transactions`;
    }

    // Download App queries
    if (lowerInput.includes('download') || lowerInput.includes('app') || lowerInput.includes('mobile app')) {
      return `📱 **DOWNLOAD FAIRMONIE PAY APP:**

**Available Platforms:**
• 🤖 Android (Google Play Store)
• 🍎 iOS (App Store)
• 💻 Web App (Browser)

**How to Download:**
1️⃣ Go to "More" menu
2️⃣ Select "Download App"
3️⃣ Choose your platform
4️⃣ Follow download instructions
5️⃣ Install and login with your account

**App Benefits:**
• Faster transactions
• Push notifications
• Offline access to some features
• Better user experience
• Biometric login support

**Download now for the best FairMonie experience! 📲**`;
    }

    // Payment issues - Fair code not received
    if (lowerInput.includes('payment') || lowerInput.includes('transfer') || lowerInput.includes('paid') || lowerInput.includes('purchase') || lowerInput.includes('buy')) {
      if (lowerInput.includes('not receive') || lowerInput.includes('didn\'t receive') || lowerInput.includes('haven\'t received') || lowerInput.includes('no code') || lowerInput.includes('missing') || lowerInput.includes('problem') || lowerInput.includes('issue') || lowerInput.includes('failed') || lowerInput.includes('error') || lowerInput.includes('didn\'t get')) {
        return `🚨 **PAYMENT ISSUE DETECTED**

Oops! It looks like there was a network glitch from the confirmation server.
We sincerely apologize for the inconvenience. 

**Quick Solution:**
✅ Try again - everything should work fine now
✅ Check your internet connection
✅ Clear browser cache if using web

**If Problem Persists:**
📧 Contact Support: fairmoniepays@gmail.com
📱 Telegram: @fairmonie_earning_support
💬 Live Chat: Right here with me!

**Please provide:**
• Transaction reference
• Amount paid
• Payment method used
• Screenshot of payment proof

Thank you for your patience! 🙏`;
      }
      return `💳 **PAYMENT ASSISTANCE:**

**Before Making Payment:**
✅ Ensure sufficient balance
✅ Check internet connection
✅ Verify account details
✅ Follow payment instructions carefully

**Payment Methods Accepted:**
• Bank transfer
• Card payment
• FairMonie balance
• Mobile money

**Need help with specific payment? Just tell me what you're trying to buy!**`;
    }

    // Login/Registration help queries
    if (lowerInput.includes('login') || lowerInput.includes('register') || lowerInput.includes('sign up') || lowerInput.includes('sign in') || lowerInput.includes('account') && (lowerInput.includes('how') || lowerInput.includes('create') || lowerInput.includes('make'))) {
      return `📱 How to Register on FairMonie Pay:

1️⃣ **Visit our platform**
   • Open FairMonie Pay website or app

2️⃣ **Click "Sign Up"**
   • Choose "Create new account"

3️⃣ **Fill your details**
   • Full name
   • Email address
   • Strong password
   • Phone number

4️⃣ **Verify your account**
   • Check your email for verification link
   • Click the verification link

5️⃣ **Complete your profile**
   • Add additional details if required

🔐 **To Login:**
   • Click "Sign In"
   • Enter your email and password
   • Click "Login"

Need help with a specific step? Just ask me!`;
    }

    // F-Code queries
    if (lowerInput.includes('f-code') || lowerInput.includes('fcode') || lowerInput.includes('f-code10883770q')) {
      return `🎫 **F-CODE INFORMATION:**

**Sample F-Code:** F-CODE10883770Q

**🎯 Uses of F-Code:**
• Required for premium services
• Loan application approval
• Account verification process
• Priority customer support access
• Exclusive feature unlocking

**📋 How to Get Your F-Code:**
1️⃣ Go to "More" → "Buy FairCode"
2️⃣ Fill in your personal details
3️⃣ Complete payment process
4️⃣ Your F-Code activates instantly!

**💡 Your F-Code will be ready for immediate use across all premium services!**`;
    }
    
    // Transaction history
    if (lowerInput.includes('transaction') || lowerInput.includes('history') || lowerInput.includes('statement')) {
      return `Transaction History:
📊 Total transactions: ${transactions.length}
🔔 Access via bell icon on dashboard
📝 Shows: Credits, debits, airtime, data, withdrawals
📅 Real-time updates

Recent activity and detailed records available!`;
    }
    
    // Support queries
    if (lowerInput.includes('support') || lowerInput.includes('help') || lowerInput.includes('contact') || lowerInput.includes('problem')) {
      return `24/7 Support Channels:
💬 Live Chat: Here with me!
📧 Email: fairmoniepays@gmail.com
📱 Telegram: @fairmonie_earning_support
⚡ Response time: Instant to 24 hours

I'm here to help with any issues!`;
    }
    
    // Security queries
    if (lowerInput.includes('security') || lowerInput.includes('safe') || lowerInput.includes('secure') || lowerInput.includes('password')) {
      return `Security Features:
🔐 Password protection
🛡️ Encrypted transactions
💾 Secure data storage
🔒 Never share login details

Your account and funds are protected with bank-level security!`;
    }
    
    // Account/Profile queries
    if (lowerInput.includes('profile') || lowerInput.includes('account info') || lowerInput.includes('update details')) {
      return `Account Management:
👤 View profile info in More section
✏️ Update personal details
📧 Email: ${user.email}
👋 Name: ${user.name}

Access via Profile Menu for full account settings!`;
    }
    
    // General greetings
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return `Hello! 😊 Great to see you here! 
I'm ready to help with any questions about FairMonie Pay. What would you like to know about today?`;
    }
    
    // Thank you responses
    if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
      return `You're very welcome! 😊 
Happy to help anytime. Is there anything else you'd like to know about FairMonie Pay?`;
    }
    
    // Default comprehensive response
    return `I can help you with all FairMonie Pay features:

💰 **Financial Services:**
• Balance management & transactions
• Withdrawals to bank accounts

📱 **Mobile Services:**
• Airtime for all networks
• Data bundles & plans

📺 **Entertainment:**
• DSTV, GOTV, StarTimes subscriptions

💳 **Additional Services:**
• Quick loans (₦5,000-₦500,000)
• Betting wallet funding
• F-Code services (F-CODE10883770Q)

👥 **Earning Opportunities:**
• Referral program (₦6,500/referral)

🔧 **Support:**
• 24/7 assistance available

What specific service can I help you with today?`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const chatContainer = document.getElementById('chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">FairMonie Assistant</h1>
              <p className="text-xs text-green-600">Online • Ready to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div id="chat-messages" className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <Card className={`max-w-xs ${message.sender === 'user' ? 'bg-green-600 text-white' : 'bg-white'}`}>
              <CardContent className="p-3">
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white px-4 py-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about FairMonie Pay..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
