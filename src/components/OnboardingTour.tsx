import React from 'react';
import Joyride, { Step } from 'react-joyride';
import { useOnboardingStore } from '../store/onboardingStore';

export function OnboardingTour() {
  const { hasCompletedTour, completeTour } = useOnboardingStore();

  const steps: Step[] = [
    {
      target: '.calculator-section',
      content: 'Welcome to SalarySense! Start by entering your salary information here.',
      placement: 'right',
    },
    {
      target: '.mode-toggle',
      content: 'Switch between calculating from Gross or Net salary using this toggle.',
      placement: 'bottom',
    },
    {
      target: '.country-selector',
      content: 'Select your country and year to get accurate tax and insurance calculations.',
      placement: 'bottom',
    },
    {
      target: '.comparison-section',
      content: 'Compare different salary scenarios and see detailed breakdowns here.',
      placement: 'top',
    },
    {
      target: '.chatbot-section',
      content: 'Get personalized financial advice and insights from our AI assistant.',
      placement: 'left',
    },
  ];

  const handleTourEnd = () => {
    completeTour();
  };

  if (hasCompletedTour) {
    return null;
  }

  return (
    <Joyride
      steps={steps}
      continuous
      showProgress
      showSkipButton
      styles={{
        options: {
          primaryColor: '#10b981',
          textColor: '#374151',
        },
      }}
      callback={({ status }) => {
        if (['finished', 'skipped'].includes(status)) {
          handleTourEnd();
        }
      }}
    />
  );
}