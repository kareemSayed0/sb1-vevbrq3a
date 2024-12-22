import React from 'react';
import { Globe } from 'lucide-react';
import { useCountryStore } from '../store/countryStore';
import { countries } from '../data/countries';

export function CountrySelector() {
  const { selectedCountry, setCountry } = useCountryStore();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      <select
        value={selectedCountry.id}
        onChange={(e) => setCountry(e.target.value)}
        className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        dir="rtl"
      >
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name} - الحد الأقصى للتأمينات: {country.insuranceRules.maxAmount.toLocaleString()} {country.currency}
          </option>
        ))}
      </select>
    </div>
  );
}