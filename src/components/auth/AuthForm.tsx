import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { FormInput } from '../form/FormInput';
import { SubmitButton } from '../form/SubmitButton';
import { Logo } from '../Logo';
import { getErrorMessage } from '../../utils/errorMessages';

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationSent, setConfirmationSent] = useState(false);
  const { signIn, signUp, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      if (isSignUp) {
        await signUp(email, password);
        setConfirmationSent(true);
      } else {
        await signIn(email, password);
      }
    } catch (error: any) {
      if (error.message.includes('email_not_confirmed')) {
        setConfirmationSent(true);
      }
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    clearError();
    setEmail('');
    setPassword('');
    setConfirmationSent(false);
  };

  if (confirmationSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Logo />
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              تأكيد البريد الإلكتروني
            </h2>
            <p className="text-gray-600 text-center">
              تم إرسال رابط التأكيد إلى بريدك الإلكتروني. يرجى فتح الرابط لتفعيل حسابك.
            </p>
            <button
              onClick={toggleMode}
              className="text-emerald-600 hover:text-emerald-700 text-sm"
            >
              العودة لتسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {isSignUp ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isSignUp 
              ? 'أدخل بريدك الإلكتروني وكلمة المرور لإنشاء حساب'
              : 'أدخل بريدك الإلكتروني وكلمة المرور للدخول'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="البريد الإلكتروني"
            dir="ltr"
            error={error ? getErrorMessage(error) : undefined}
          />

          <FormInput
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="كلمة المرور"
            dir="ltr"
            error={error ? getErrorMessage(error) : undefined}
          />

          <SubmitButton
            isSubmitting={isLoading}
            text={isSignUp ? 'إنشاء حساب' : 'تسجيل الدخول'}
          />
        </form>

        <div className="text-center mt-6">
          <button
            onClick={toggleMode}
            className="text-emerald-600 hover:text-emerald-700 text-sm"
          >
            {isSignUp 
              ? 'لديك حساب بالفعل؟ سجل دخولك'
              : 'ليس لديك حساب؟ سجل الآن'}
          </button>
        </div>
      </div>
    </div>
  );
}