import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleRetrievePassword = async () => {
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate a brief loading for better UX
    setTimeout(() => {
      try {
        // Check if email exists in localStorage
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const userExists = users.find((user: any) => user.email === email.toLowerCase());

        if (userExists) {
          setEmailSent(true);
          
          // Show immediate password notification popup with enhanced visibility
          toast({
            title: "🔑 Password Retrieved Successfully!",
            description: (
              <div className="space-y-2">
                <p className="font-medium">Your password is:</p>
                <div className="p-2 bg-white rounded border-2 border-green-300 text-lg font-bold text-green-800 text-center tracking-wider">
                  {userExists.password}
                </div>
                <p className="text-sm text-green-700">You can now use this password to log in.</p>
              </div>
            ),
            duration: 20000, // 20 seconds for better visibility
            className: "border-green-500 bg-green-50 text-green-900 max-w-md",
          });

          // Also try to open email client as backup
          const subject = encodeURIComponent('Fairmonie Pay - Password Reset');
          const body = encodeURIComponent(`Hello,

Your Fairmonie Pay login password is: ${userExists.password}

You can now use this password to log into your account.

Best regards,
Fairmonie Pay Team`);

          const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
          
          try {
            const link = document.createElement('a');
            link.href = mailtoLink;
            link.click();
          } catch (error) {
            // Email client fallback handled by toast above
          }
        } else {
          toast({
            title: "Email Not Found",
            description: "No account found with this email address.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error retrieving password:', error);
        toast({
          title: "Error",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000); // 1 second delay for better UX
  };

  const handleClose = () => {
    setEmail('');
    setEmailSent(false);
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Forgot Password
          </DialogTitle>
        </DialogHeader>

        {!emailSent ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter your email address and we'll send you your password.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleRetrievePassword}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Password
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600">Password Retrieved Successfully!</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Your password for <strong>{email}</strong> has been found and displayed in the notification above! 
                You can now use it to log into your account.
              </p>
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 font-medium">
                  💡 The password is shown in the green notification popup above. 
                  Make sure to copy it before it disappears.
                </p>
              </div>
            </div>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};