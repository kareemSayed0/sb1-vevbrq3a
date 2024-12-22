import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { FormInput } from '../form/FormInput';
import { SubmitButton } from '../form/SubmitButton';
import { Logo } from '../Logo';

export function PhoneAuth() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const { signUp, verifyOTP, isLoading, error } = useAuthStore();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(phone);
      setShowOtpInput(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyOTP(phone, otp);
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {showOtpInput ? 'أدخل رمز التحقق' : 'تسجيل الدخول'}
          </h2>
          <p className="text-gray-600 mt-2">
            {showOtpInput 
              ? 'تم إرسال رمز التحقق إلى رقم هاتفك'
              : 'سيتم إرسال رمز التحقق إلى رقم هاتفك'}
          </p>
        </div>

        {!showOtpInput ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <FormInput
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label="رقم الهاتف"
              placeholder="01xxxxxxxxx"
              dir="ltr"
              error={error}
            />
            <SubmitButton
              isSubmitting={isLoading}
              text="إرسال رمز التحقق"
            />
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <FormInput
              id="otp"
              name="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              label="رمز التحقق"
              placeholder="xxxxxx"
              dir="ltr"
              error={error}
            />
            <SubmitButton
              isSubmitting={isLoading}
              text="تحقق"
            />
          </form>
        )}
      </div>
    </div>
  );
}