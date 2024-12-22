import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useLanguageStore } from '../store/languageStore';
import { translations } from '../utils/i18n/translations';
import { Logo } from './Logo';
import { FormInput } from './form/FormInput';
import { SubmitButton } from './form/SubmitButton';
import { validateForm, FormErrors, FormData } from '../utils/validation';
import { userService } from '../services/userService';

export function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    jobTitle: '',
    phone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  
  const { language } = useLanguageStore();
  const t = translations[language];
  const createUser = useUserStore((state) => state.createUser);
  const setUser = useUserStore((state) => state.setUser);
  const error = useUserStore((state) => state.error);

  useEffect(() => {
    const checkExistingUser = async () => {
      const savedPhone = localStorage.getItem('lastLoginPhone');
      if (savedPhone) {
        try {
          const existingUser = await userService.getUserByPhone(savedPhone);
          if (existingUser) {
            setUser(existingUser);
          }
        } catch (error) {
          console.error('Error checking existing user:', error);
        }
      }
      setIsChecking(false);
    };

    checkExistingUser();
  }, [setUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData, language);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      await createUser(formData.name, formData.jobTitle, formData.phone);
      localStorage.setItem('lastLoginPhone', formData.phone);
    } catch (error) {
      if (error instanceof Error && error.message === 'Phone number already registered') {
        setErrors(prev => ({ ...prev, phone: t.signup.errors.phoneExists }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
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
            {t.signup.title}
          </h2>
          <p className="text-gray-600 mt-2">{t.signup.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            label={t.signup.name}
            error={errors.name}
          />

          <FormInput
            id="jobTitle"
            name="jobTitle"
            type="text"
            value={formData.jobTitle}
            onChange={handleChange}
            label={t.signup.jobTitle}
            error={errors.jobTitle}
          />

          <FormInput
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            label={t.signup.phone}
            error={errors.phone}
            dir="ltr"
          />

          <SubmitButton
            isSubmitting={isSubmitting}
            text={t.signup.submit}
          />
        </form>
      </div>
    </div>
  );
}