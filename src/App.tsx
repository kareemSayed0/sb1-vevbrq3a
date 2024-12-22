import React from 'react';
import { HomePage } from './pages/HomePage';
import { ThemeProvider } from './components/ThemeProvider';
import { Notifications } from './components/Notifications';

export default function App() {
  return (
    <ThemeProvider>
      <HomePage />
      <Notifications />
    </ThemeProvider>
  );
}