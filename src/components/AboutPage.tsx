
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const { speak, enableSpeech } = useTextToSpeech();

  // Auto-read about content when page loads
  useEffect(() => {
    // Initialize speech system first
    enableSpeech();
    
    // Start reading after a short delay to ensure proper initialization
    setTimeout(() => {
      const aboutText = `Welcome to FairMonie Pay, your ultimate financial solution! We are a leading fintech platform offering comprehensive financial services including money transfers, bill payments, airtime and data purchases, television subscriptions, sports betting funding, and quick loans. At FairMonie Pay, we prioritize security, convenience, and customer satisfaction. Our platform uses advanced encryption to protect your transactions and personal information. We offer 24/7 customer support to assist you with any queries or issues. Join thousands of satisfied customers who trust FairMonie Pay for their daily financial needs. Experience seamless, secure, and fast financial services with FairMonie Pay today!`;
      speak(aboutText);
    }, 1000);
  }, [enableSpeech, speak]);
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
          <h1 className="text-xl font-semibold text-gray-900">About FairMonie</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">FairMonie Pay</h2>
            </div>

            <div className="space-y-6 text-gray-700">
              <p className="text-green-600 font-semibold text-lg">
                FairMonie is an automated online moneylender that provides single payment loans and bonus claims, installment loans and payroll loans for borrowers. The amount borrowed is then deducted from your account.
              </p>

              <div>
                <h3 className="text-lg font-bold text-green-600 mb-3">What we offer:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                    <span className="text-green-600 font-medium">Data purchase</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                    <span className="text-green-600 font-medium">Airtime purchase</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                    <span className="text-green-600 font-medium">All TV subscriptions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                    <span className="text-green-600 font-medium">Betting subscription</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                    <span className="text-green-600 font-medium">Withdrawals</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-700 font-semibold text-center">
                  FairMonie Pay is licensed by CBN. All payments are sure and secured with FairPay.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
