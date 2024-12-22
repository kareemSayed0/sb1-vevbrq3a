import { useState, useCallback, useEffect, useRef } from 'react';
import { calculateGrossToNet, calculateNetToGross } from '../utils/calculations';
import { SalaryBreakdown } from '../utils/types';
import { debounce } from '../utils/helpers';

export function useSalaryCalculator(
  initialGross: number,
  onSalaryChange: (gross: number, net: number) => void
) {
  const [mode, setMode] = useState<'grossToNet' | 'netToGross'>('grossToNet');
  const [inputValue, setInputValue] = useState(initialGross.toString());
  const [calculation, setCalculation] = useState<SalaryBreakdown>(() => 
    calculateGrossToNet(initialGross)
  );

  const lastCalculationRef = useRef({ gross: initialGross, net: calculation.netSalary });
  
  const debouncedSalaryChange = useCallback(
    debounce((gross: number, net: number) => {
      onSalaryChange(gross, net);
    }, 500),
    [onSalaryChange]
  );

  useEffect(() => {
    const numericValue = Number(inputValue.replace(/[^\d]/g, '')) || 0;
    
    if (numericValue === 0) return;

    const result = mode === 'grossToNet'
      ? calculateGrossToNet(numericValue)
      : calculateNetToGross(numericValue);
    
    setCalculation(result);

    if (result.grossSalary !== lastCalculationRef.current.gross || 
        result.netSalary !== lastCalculationRef.current.net) {
      lastCalculationRef.current = {
        gross: result.grossSalary,
        net: result.netSalary
      };
      debouncedSalaryChange(result.grossSalary, result.netSalary);
    }
  }, [inputValue, mode, debouncedSalaryChange]);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(prevMode => {
      const newMode = prevMode === 'grossToNet' ? 'netToGross' : 'grossToNet';
      setInputValue('');
      return newMode;
    });
  }, []);

  return {
    mode,
    inputValue,
    calculation,
    handleInputChange,
    toggleMode
  };
}