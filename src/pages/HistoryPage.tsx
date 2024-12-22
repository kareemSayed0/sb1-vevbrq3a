import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSalaryHistory } from '../hooks/useSalaryHistory';
import { SalaryHistory } from '../components/salary/SalaryHistory';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export function HistoryPage() {
  const navigate = useNavigate();
  const { isLoading } = useSalaryHistory();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            aria-label="العودة للصفحة الرئيسية"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-indigo-900">سجل الحسابات السابقة</h1>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="max-w-3xl mx-auto">
            <SalaryHistory />
          </div>
        )}
      </div>
    </div>
  );
}