import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Copy, Loader2, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface BuyPromoCodePageProps {
  onBack: () => void;
  user: { name: string; email: string };
}

const BuyPromoCodePage: React.FC<BuyPromoCodePageProps> = ({ onBack, user }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPendingMessage, setShowPendingMessage] = useState(false);

  const promoOptions = [
    { amount: 50000, label: '₦50,000 Promo Code', price: 8000 },
    { amount: 100000, label: '₦100,000 Promo Code', price: 16500 }
  ];

  const bankDetails = {
    bankName: "Carbon MFB", 
    accountNumber: "3876103149",
    accountName: "CHIDERA COLLINS  OKORIE"
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
      duration: 2000,
    });
  };

  const handleSelectPromo = (amount: number) => {
    setSelectedAmount(amount);
    setIsLoading(true);
    
    // Show loading for 4 seconds
    setTimeout(() => {
      setIsLoading(false);
      setShowPaymentDetails(true);
    }, 4000);
  };

  const handlePaymentMade = () => {
    setIsLoading(true);
    
    // Show loading for 5 seconds
    setTimeout(() => {
      setIsLoading(false);
      setShowPendingMessage(true);
    }, 5000);
  };

  const handleCloseAll = () => {
    setShowPaymentDetails(false);
    setShowPendingMessage(false);
    setSelectedAmount(null);
  };

  const selectedOption = promoOptions.find(opt => opt.amount === selectedAmount);

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
          <h1 className="text-xl font-semibold text-gray-900">Buy Promo Code</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Promo Code Info */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-green-600">Get Premium Promo Codes</h2>
              <p className="text-gray-600">
                Purchase promo codes to unlock instant rewards and bonuses
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-700 font-medium">
                  🎁 Instant Access to Premium Features
                </p>
                <p className="text-sm text-green-600">
                  Use promo codes for exclusive rewards
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promo Options */}
        <div className="space-y-4">
          {promoOptions.map((option) => (
            <Card key={option.amount} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{option.label}</h3>
                    <p className="text-sm text-gray-500">Price: ₦{option.price.toLocaleString()}</p>
                  </div>
                  <Button
                    onClick={() => handleSelectPromo(option.amount)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading && selectedAmount === option.amount ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Buy Now'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Details Dialog */}
      <Dialog open={showPaymentDetails && !showPendingMessage} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm mx-auto">
          <div className="py-4 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 text-center">Payment Details</h2>
            
            {/* Bank Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Bank Name:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{bankDetails.bankName}</span>
                  <button
                    onClick={() => copyToClipboard(bankDetails.bankName, 'Bank name')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Number:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{bankDetails.accountNumber}</span>
                  <button
                    onClick={() => copyToClipboard(bankDetails.accountNumber, 'Account number')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Name:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{bankDetails.accountName}</span>
                  <button
                    onClick={() => copyToClipboard(bankDetails.accountName, 'Account name')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold text-green-600 text-lg">
                  ₦{selectedOption?.price.toLocaleString()}.00
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                </div>
              ) : (
                <>
                  <Button
                    onClick={handlePaymentMade}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    I have paid
                  </Button>
                  <Button
                    onClick={handleCloseAll}
                    variant="outline"
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pending Message Dialog */}
      <Dialog open={showPendingMessage} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm mx-auto">
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Payment Pending</h2>
            <p className="text-gray-600">
              Your request is pending. Please contact support and send your receipt to get your promo code.
            </p>
            <Button
              onClick={handleCloseAll}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuyPromoCodePage;
