import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      aria-label={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
    >
      <Languages className="w-5 h-5 text-gray-600" />
    </button>
  );
}