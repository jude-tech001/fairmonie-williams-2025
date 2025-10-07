
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, User, Mail, Calendar, Shield, CheckCircle, XCircle } from 'lucide-react';

interface ProfileInfoPageProps {
  onBack: () => void;
  user: { name: string; email: string };
}

// Mock data - in real app this would come from backend/props
const hasPurchasedFairCode = false;
const accountLevel = 'Basic';

const ProfileInfoPage: React.FC<ProfileInfoPageProps> = ({ onBack, user }) => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Profile Information</h1>
        </div>
      </div>

      <div className="px-4 py-4 max-h-[calc(100vh-60px)] overflow-y-auto">
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-green-600">Your Profile</h2>
            </div>

            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">Full Name</p>
                    <p className="text-green-700 font-semibold">{user.name}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">Email Address</p>
                    <p className="text-green-700 font-semibold">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">Registration Date</p>
                    <p className="text-green-700 font-semibold">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">Account Status</p>
                    <p className="text-green-700 font-semibold">Active</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">Account Level</p>
                    <p className="text-green-700 font-semibold">{accountLevel}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  {hasPurchasedFairCode ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <div>
                    <p className="text-sm text-green-600 font-medium">Fair Code Status</p>
                    <p className={`font-semibold ${hasPurchasedFairCode ? 'text-green-700' : 'text-red-700'}`}>
                      {hasPurchasedFairCode ? 'Purchased' : 'Not Purchased'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileInfoPage;

