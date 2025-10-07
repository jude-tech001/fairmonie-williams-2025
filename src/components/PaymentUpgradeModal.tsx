import React from 'react';
import { Button } from '@/components/ui/button';

interface PaymentUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const PaymentUpgradeModal: React.FC<PaymentUpgradeModalProps> = ({ isOpen, onClose, userName }) => {
  const handlePrimaryAction = () => {
    onClose();
    // Add any payment initialization logic here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onClick={onClose}
      />
      {/* Modal - Compact height */}
      <div className="relative mx-4 w-full max-w-sm rounded-2xl bg-white shadow-2xl max-h-[450px]">
        {/* Header - Using design system gradient */}
        <div className="flex items-center justify-between rounded-t-2xl gradient-green px-5 py-2.5 text-white">
          <div className="flex items-center gap-2 font-semibold">
            {/* Lightning icon circle */}
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
            </div>
            <span>Payment Now Fast!</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body - Compact padding and spacing */}
        <div className="px-4 pb-3 pt-3">
          {/* Success check - Smaller */}
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <h3 className="mb-1.5 text-center text-base font-semibold">
            Lightning Fast Payments! <span role="img" aria-label="zap">⚡</span>
          </h3>
          <p className="mx-auto mb-2.5 max-w-md text-center text-xs text-muted-foreground">
            Great news{userName ? `, ${userName}` : ""}! Our payment system has been
            upgraded. Your payments will now be processed and verified much
            faster than before.
          </p>

          {/* What's New box - Using design system colors */}
          <div className="mb-3 rounded-lg bg-primary/5 p-2.5">
            <div className="mb-1.5 flex items-center gap-2 font-medium text-primary text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span>What&apos;s New:</span>
            </div>
            <ul className="ml-5 list-disc text-xs text-primary/80 space-y-0.5">
              <li>Instant payment verification</li>
              <li>Faster processing times</li>
              <li>Real-time payment updates</li>
              <li>Improved payment reliability</li>
            </ul>
          </div>

          <Button
            onClick={handlePrimaryAction}
            className="mb-1.5 w-full rounded-full bg-primary py-2 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Start Making Payments!
          </Button>
          <p className="text-center text-[10px] text-muted-foreground">
            Make your payments now and experience the speed! <span>🚀</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentUpgradeModal;