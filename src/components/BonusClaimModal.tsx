import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gift, CreditCard, Phone, Wallet, Zap, X } from 'lucide-react';

interface BonusClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const BonusClaimModal: React.FC<BonusClaimModalProps> = ({ isOpen, onClose, userName }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Gift className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">Welcome to fairmoniepay💸</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Welcome to the ultimate bonus claim trusted platform click on "claim bonus" to start earning which can be withdrawn after purchasing a fair code.
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">Get Your Fair Code</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                To withdraw funds, you'll need to purchase a Fair Code for <span className="font-semibold text-green-600">₦6,500</span>. This is a one-time purchase that unlocks all features of the app.
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">Airtime & Data</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                You can purchase airtime and data for all major networks directly from the app. Simply select the service, enter the phone number, choose your plan, and complete your purchase.
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <Wallet className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">Withdrawal Process</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                To withdraw your funds, tap the "Withdraw" button on your dashboard, enter your bank details and Fair Code, and submit your request. Withdrawals are processed within 24 hours.
              </p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">Earn More</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Explore our app to discover ways to earn more! invite friends to earn ₦3,500 per referral, join our communities, and take advantage of special promotions.
              </p>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="text-center">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Gift className="w-5 h-5 text-pink-600" />
                  </div>
                  <p className="text-xs text-muted-foreground">Communities</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-xs text-muted-foreground">Support</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm mx-auto rounded-2xl border-0 p-0 overflow-hidden bg-background max-h-[70vh]">
        {/* Header with progress */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 text-white relative">
          <button 
            onClick={onClose}
            className="absolute right-3 top-3 text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold">Welcome to FairMonie Pay, {userName}!</h1>
            <p className="text-xs text-white/90 mt-1">Step {currentStep} of {totalSteps}</p>
            
            {/* Progress bar */}
            <div className="flex space-x-1 mt-3">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full ${
                    i < currentStep ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {renderStep()}
        </div>

        {/* Navigation buttons */}
        <div className="p-4 pt-0">
          <Button
            onClick={handleNext}
            className="w-full h-11 bg-green-600 hover:bg-green-700 text-white rounded-full"
          >
            {currentStep === totalSteps ? 'Get Started' : 'Next'} →
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BonusClaimModal;
