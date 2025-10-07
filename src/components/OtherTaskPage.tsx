import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Calendar, Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface OtherTaskPageProps {
  onBack: () => void;
  user: { name: string; email: string };
  onCreditBalance: (amount: number, description: string) => void;
  onRedeemCode: (code: string) => void;
  redeemCode: string;
  setRedeemCode: (code: string) => void;
}

const OtherTaskPage: React.FC<OtherTaskPageProps> = ({ onBack, user, onCreditBalance, onRedeemCode, redeemCode, setRedeemCode }) => {
  // Check-in state - track daily check-ins (7 days total, ₦2,500 total reward)
  const [checkIns, setCheckIns] = useState<string[]>([]);
  const [hasJoinedTelegram, setHasJoinedTelegram] = useState(false);
  const [hasJoinedWhatsApp, setHasJoinedWhatsApp] = useState(false);

  useEffect(() => {
    // Load saved state from localStorage
    const savedCheckIns = localStorage.getItem(`checkIns_${user.email}`);
    const savedTelegram = localStorage.getItem(`joinedTelegram_${user.email}`);
    const savedWhatsApp = localStorage.getItem(`joinedWhatsApp_${user.email}`);

    if (savedCheckIns) {
      setCheckIns(JSON.parse(savedCheckIns));
    }
    if (savedTelegram === 'true') {
      setHasJoinedTelegram(true);
    }
    if (savedWhatsApp === 'true') {
      setHasJoinedWhatsApp(true);
    }
  }, [user.email]);

  const handleCheckIn = () => {
    const today = new Date().toDateString();
    
    if (checkIns.includes(today)) {
      toast({
        title: "Already Checked In Today",
        description: "You've already checked in today. Come back tomorrow!",
        duration: 3000,
      });
      return;
    }

    if (checkIns.length >= 7) {
      toast({
        title: "7 Days Completed!",
        description: "You've completed all 7 days of check-ins!",
        duration: 3000,
      });
      return;
    }

    const newCheckIns = [...checkIns, today];
    setCheckIns(newCheckIns);
    localStorage.setItem(`checkIns_${user.email}`, JSON.stringify(newCheckIns));

    // Credit ₦2,500 / 7 = ₦357.14 per day (rounded to ₦357)
    const dailyReward = Math.floor(2500 / 7);
    onCreditBalance(dailyReward, `Day ${newCheckIns.length} Check-in`);

    toast({
      title: "Check-in Successful! ✅",
      description: `₦${dailyReward.toLocaleString()} credited! Day ${newCheckIns.length}/7 completed.`,
      duration: 4000,
    });
  };

  const handleJoinTelegram = () => {
    window.open('https://t.me/fairmoney_earn_telegram_channel', '_blank');
    
    // Wait a bit for user to join, then mark as completed
    setTimeout(() => {
      if (!hasJoinedTelegram) {
        setHasJoinedTelegram(true);
        localStorage.setItem(`joinedTelegram_${user.email}`, 'true');
        onCreditBalance(1500, 'Join Telegram Community');
        
        toast({
          title: "Community Joined! 🎉",
          description: "₦1,500 credited to your balance!",
          duration: 4000,
        });
      }
    }, 3000);
  };

  const handleJoinWhatsApp = () => {
    window.open('https://t.me/realtechrt', '_blank');
    
    // Wait a bit for user to join, then mark as completed
    setTimeout(() => {
      if (!hasJoinedWhatsApp) {
        setHasJoinedWhatsApp(true);
        localStorage.setItem(`joinedWhatsApp_${user.email}`, 'true');
        onCreditBalance(1000, 'Join WhatsApp Group');
        
        toast({
          title: "WhatsApp Group Joined! 🎉",
          description: "₦1,000 credited to your balance!",
          duration: 4000,
        });
      }
    }, 3000);
  };

  const checkInProgress = checkIns.length;
  const totalCheckInEarned = Math.floor(2500 / 7) * checkInProgress;
  const totalEarned = totalCheckInEarned + (hasJoinedTelegram ? 1500 : 0) + (hasJoinedWhatsApp ? 1000 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Other Tasks</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Total Earned */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 border-none">
          <CardContent className="p-6">
            <div className="text-center text-white">
              <p className="text-sm opacity-90 mb-1">Total Earned from Tasks</p>
              <p className="text-3xl font-bold">₦{totalEarned.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Available Tasks</h2>
          
          {/* 7-Day Check-in Task */}
          <Card className={`border-2 ${checkInProgress >= 7 ? 'bg-green-50 border-green-200' : 'border-gray-200'}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${checkInProgress >= 7 ? 'bg-green-100' : 'bg-gray-100'} rounded-full flex items-center justify-center`}>
                    <Calendar className={`w-6 h-6 ${checkInProgress >= 7 ? 'text-green-600' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">7 Days Check-in</h3>
                    <p className="text-sm text-gray-600">Check in daily for 7 days</p>
                    <p className="text-sm font-bold text-green-600 mt-1">₦2,500 total</p>
                    <p className="text-xs text-gray-500 mt-1">Progress: {checkInProgress}/7 days</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {checkInProgress >= 7 ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <Button
                      onClick={handleCheckIn}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Check In
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Join Telegram Community */}
          <Card className={`border-2 ${hasJoinedTelegram ? 'bg-green-50 border-green-200' : 'border-gray-200'}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${hasJoinedTelegram ? 'bg-green-100' : 'bg-gray-100'} rounded-full flex items-center justify-center`}>
                    <Users className={`w-6 h-6 ${hasJoinedTelegram ? 'text-green-600' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Join Community</h3>
                    <p className="text-sm text-gray-600">Join our Telegram channel</p>
                    <p className="text-sm font-bold text-green-600 mt-1">₦1,500 one-time</p>
                  </div>
                </div>
                <div>
                  {hasJoinedTelegram ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <Button
                      onClick={handleJoinTelegram}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Join
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Join WhatsApp Group */}
          <Card className={`border-2 ${hasJoinedWhatsApp ? 'bg-green-50 border-green-200' : 'border-gray-200'}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${hasJoinedWhatsApp ? 'bg-green-100' : 'bg-gray-100'} rounded-full flex items-center justify-center`}>
                    <MessageCircle className={`w-6 h-6 ${hasJoinedWhatsApp ? 'text-green-600' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Join WhatsApp Group</h3>
                    <p className="text-sm text-gray-600">Join our WhatsApp channel</p>
                    <p className="text-sm font-bold text-green-600 mt-1">₦1,000 one-time</p>
                  </div>
                </div>
                <div>
                  {hasJoinedWhatsApp ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <Button
                      onClick={handleJoinWhatsApp}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Join
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Redeem Code Section */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Redeem Promo Code</h3>
            <p className="text-sm text-gray-600 mb-4">Have a promo code? Enter it below to claim your reward!</p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm"
              />
              <Button onClick={() => onRedeemCode(redeemCode)} className="bg-green-600 hover:bg-green-700">
                Redeem
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm text-blue-800">
              ℹ️ Complete tasks to earn rewards. Check in daily, join our community channels, and watch your earnings grow!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OtherTaskPage;
