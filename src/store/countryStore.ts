import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { countries } from '../data/countries';
import { Country } from '../types/country';

interface CountryState {
  selectedCountry: Country;
  setCountry: (countryId: string) => void;
}

export const useCountryStore = create<CountryState>()(
  persist(
    (set) => ({
      selectedCountry: countries[0],
      setCountry: (countryId) => {
        const country = countries.find((c) => c.id === countryId);
        if (country) {
          set({ selectedCountry: country });
        }
      },
    }),
    {
      name: 'country-settings',
    }
  )
);