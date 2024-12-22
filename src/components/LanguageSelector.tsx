import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore();

  const handleLanguageChange = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <button
      onClick={handleLanguageChange}
      className="fixed top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      aria-label={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
    >
      <Languages className="w-5 h-5 text-gray-600 dark:text-gray-300" />
    </button>
  );
}