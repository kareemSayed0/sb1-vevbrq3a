import React from 'react';
import { useComparisonStore } from '../../store/comparisonStore';
import { ComparisonCard } from './ComparisonCard';

export function ComparisonList() {
  const { comparisons, removeComparison } = useComparisonStore();

  if (comparisons.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {comparisons.map((comparison) => (
        <ComparisonCard
          key={comparison.id}
          comparison={comparison}
          onRemove={removeComparison}
        />
      ))}
    </div>
  );
}