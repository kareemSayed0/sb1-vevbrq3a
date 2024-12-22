import { translations } from './i18n/translations';

export interface FormErrors {
  name?: string;
  jobTitle?: string;
  phone?: string;
}

export interface FormData {
  name: string;
  jobTitle: string;
  phone: string;
}

export function validateForm(formData: FormData, language: 'ar' | 'en'): FormErrors {
  const t = translations[language];
  const errors: FormErrors = {};
  
  // Name validation
  if (!formData.name.trim()) {
    errors.name = t.signup.errors.required;
  } else if (formData.name.trim().length < 3) {
    errors.name = t.signup.errors.minLength;
  }

  // Job title validation
  if (!formData.jobTitle.trim()) {
    errors.jobTitle = t.signup.errors.required;
  }

  // Phone validation - Egyptian phone number format
  if (!formData.phone) {
    errors.phone = t.signup.errors.required;
  } else if (!/^01[0125][0-9]{8}$/.test(formData.phone)) {
    errors.phone = t.signup.errors.phoneInvalid;
  }

  return errors;
}