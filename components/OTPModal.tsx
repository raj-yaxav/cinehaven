'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Mail, Shield, Timer, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  isVerifying: boolean;
  error: string | null;
  success: boolean;
}

export default function OTPModal({
  isOpen,
  onClose,
  email,
  onVerify,
  onResend,
  isVerifying,
  error,
  success,
}: OTPModalProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(600);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setTimer(600);
      setCanResend(false);
      inputRefs.current[0]?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits filled
    if (index === 5 && value) {
      const completeOtp = [...newOtp];
      completeOtp[5] = value.slice(-1);
      const otpString = completeOtp.join('');
      if (otpString.length === 6) {
        setTimeout(() => onVerify(otpString), 300);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    pasted.split('').forEach((digit, i) => {
      if (i < 6) newOtp[i] = digit;
    });
    setOtp(newOtp);
    if (pasted.length === 6) {
      onVerify(pasted);
    } else {
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleResend = () => {
    onResend();
    setTimer(600);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const maskEmail = (email: string) => {
    const [local, domain] = email.split('@');
    const masked = local.slice(0, 2) + '***' + local.slice(-1);
    return `${masked}@${domain}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/18 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md rounded-2xl border border-black/6 bg-midnight/95 p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-dusty hover:text-ivory transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {success ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-sage/20 mb-6">
                <CheckCircle2 className="h-10 w-10 text-sage" />
              </div>
              <h3 className="text-2xl font-display font-bold text-ivory mb-2">
                Verified!
              </h3>
              <p className="text-mist">
                Your booking is being confirmed...
              </p>
            </motion.div>
          ) : (
            <>
              {/* Icon */}
              <div className="text-center mb-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber/10 border border-amber/20 mb-4">
                  <Mail className="h-8 w-8 text-amber" />
                </div>
                <h3 className="text-2xl font-display font-bold text-ivory mb-2">
                  Verify Your Email
                </h3>
                <p className="text-sm text-mist">
                  We sent a 6-digit code to{' '}
                  <span className="text-amber font-medium">{maskEmail(email)}</span>
                </p>
              </div>

              {/* OTP Inputs */}
              <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="h-14 w-12 rounded-xl border border-black/6 bg-black/3 text-center text-2xl font-bold text-ivory focus:border-amber focus:ring-2 focus:ring-amber/30 transition-all outline-none"
                    disabled={isVerifying}
                  />
                ))}
              </div>

              {/* Timer & Resend */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Timer className="h-4 w-4 text-dusty" />
                {canResend ? (
                  <button
                    onClick={handleResend}
                    className="flex items-center gap-2 text-sm text-amber hover:text-amber-light transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Resend OTP
                  </button>
                ) : (
                  <span className="text-sm text-dusty">
                    Resend in <span className="text-amber font-mono">{formatTime(timer)}</span>
                  </span>
                )}
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-coral bg-coral/10 border border-coral/20 rounded-lg p-3 mb-4"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Verify Button */}
              <button
                onClick={() => onVerify(otp.join(''))}
                disabled={otp.join('').length !== 6 || isVerifying}
                className="w-full btn-primary disabled:opacity-40 disabled:cursor-not-allowed justify-center"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    Verify & Confirm
                  </>
                )}
              </button>

              {/* Security note */}
              <p className="mt-4 text-center text-xs text-dusty flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" />
                Never share your OTP with anyone
              </p>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}