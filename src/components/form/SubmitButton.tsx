import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  text: string;
}

export function SubmitButton({ isSubmitting, text }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
        isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-emerald-600 hover:to-cyan-600'
      }`}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        text
      )}
    </button>
  );
}