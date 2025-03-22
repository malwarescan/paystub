import { useState } from 'react';

// Tax calculation utilities
export const calculateFederalTax = (grossPay: number) => {
  // Federal tax rate of 12%
  return parseFloat((grossPay * 0.12).toFixed(2));
};

export const calculateSocialSecurityTax = (grossPay: number) => {
  // Social Security tax rate of 6.2%
  return parseFloat((grossPay * 0.062).toFixed(2));
};

export const calculateMedicareTax = (grossPay: number) => {
  // Medicare tax rate of 1.45%
  return parseFloat((grossPay * 0.0145).toFixed(2));
};

export const calculateStateTax = (grossPay: number, state: string) => {
  // Different tax rates based on state
  const stateTaxRates: { [key: string]: number } = {
    'AL': 0.02, 'AK': 0.00, 'AZ': 0.025, 'AR': 0.035, 'CA': 0.06,
    'CO': 0.0455, 'CT': 0.0499, 'DE': 0.039, 'FL': 0.00, 'GA': 0.0575,
    'HI': 0.055, 'ID': 0.058, 'IL': 0.0495, 'IN': 0.04, 'IA': 0.0425,
    'KS': 0.057, 'KY': 0.05, 'LA': 0.0425, 'ME': 0.058, 'MD': 0.0575,
    'MA': 0.05, 'MI': 0.0425, 'MN': 0.0685, 'MS': 0.05, 'MO': 0.0495,
    'MT': 0.0675, 'NE': 0.0684, 'NV': 0.00, 'NH': 0.00, 'NJ': 0.0637,
    'NM': 0.049, 'NY': 0.0685, 'NC': 0.0499, 'ND': 0.0290, 'OH': 0.0399,
    'OK': 0.0475, 'OR': 0.0875, 'PA': 0.0307, 'RI': 0.0599, 'SC': 0.07,
    'SD': 0.00, 'TN': 0.00, 'TX': 0.00, 'UT': 0.0495, 'VT': 0.066,
    'VA': 0.0575, 'WA': 0.00, 'WV': 0.065, 'WI': 0.0765, 'WY': 0.00,
    'DC': 0.0895
  };

  const rate = stateTaxRates[state] || 0.04; // Default to 4% if state not found
  return parseFloat((grossPay * rate).toFixed(2));
};

export const calculateLocalTax = (grossPay: number) => {
  // Local tax rate of 1%
  return parseFloat((grossPay * 0.01).toFixed(2));
};

export const calculateNetPay = (grossPay: number, federalTax: number, socialSecurityTax: number, medicareTax: number, stateTax: number, localTax: number, otherDeductions: number) => {
  return parseFloat((grossPay - federalTax - socialSecurityTax - medicareTax - stateTax - localTax - otherDeductions).toFixed(2));
};

// Format currency
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

// Format date
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
};

// Generate check number
export const generateCheckNumber = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

// Calculate year-to-date values based on previous paystubs
export const calculateYTD = (currentAmount: number, previousPaystubs: any[]) => {
  const previousTotal = previousPaystubs.reduce((sum, paystub) => sum + (paystub.amount || 0), 0);
  return parseFloat((currentAmount + previousTotal).toFixed(2));
};

// Validate input fields
export const validatePaystubInput = (formData: any) => {
  const errors: { [key: string]: string } = {};
  
  if (!formData.employeeName) errors.employeeName = "Employee name is required";
  if (!formData.employeeAddress) errors.employeeAddress = "Employee address is required";
  if (!formData.employeeSSN) errors.employeeSSN = "Employee SSN is required";
  if (!formData.employerName) errors.employerName = "Employer name is required";
  if (!formData.employerAddress) errors.employerAddress = "Employer address is required";
  if (!formData.employerEIN) errors.employerEIN = "Employer EIN is required";
  if (!formData.payPeriodStart) errors.payPeriodStart = "Pay period start date is required";
  if (!formData.payPeriodEnd) errors.payPeriodEnd = "Pay period end date is required";
  if (!formData.payDate) errors.payDate = "Pay date is required";
  if (!formData.regularHours || formData.regularHours <= 0) errors.regularHours = "Regular hours must be greater than 0";
  if (!formData.hourlyRate || formData.hourlyRate <= 0) errors.hourlyRate = "Hourly rate must be greater than 0";
  
  return errors;
};

export default function usePaystubCalculator() {
  const [paystubData, setPaystubData] = useState({
    // Employee Information
    employeeName: '',
    employeeAddress: '',
    employeeSSN: '',
    employeeId: '',
    
    // Employer Information
    employerName: '',
    employerAddress: '',
    employerEIN: '',
    
    // Pay Period Information
    payPeriodStart: '',
    payPeriodEnd: '',
    payDate: '',
    checkNumber: generateCheckNumber(),
    
    // Earnings
    regularHours: 0,
    overtimeHours: 0,
    hourlyRate: 0,
    overtimeRate: 0,
    regularPay: 0,
    overtimePay: 0,
    grossPay: 0,
    
    // Taxes and Deductions
    federalTax: 0,
    socialSecurityTax: 0,
    medicareTax: 0,
    stateTax: 0,
    stateCode: 'CA',
    localTax: 0,
    healthInsurance: 0,
    retirement401k: 0,
    otherDeductions: 0,
    totalDeductions: 0,
    netPay: 0,
    
    // Year-to-Date
    ytdGrossPay: 0,
    ytdFederalTax: 0,
    ytdSocialSecurityTax: 0,
    ytdMedicareTax: 0,
    ytdStateTax: 0,
    ytdLocalTax: 0,
    ytdHealthInsurance: 0,
    ytdRetirement401k: 0,
    ytdOtherDeductions: 0,
    ytdNetPay: 0,
    
    // Previous Paystubs for YTD calculations
    previousPaystubs: []
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const updatePaystubField = (field: string, value: any) => {
    setPaystubData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Recalculate dependent fields
      if (['regularHours', 'overtimeHours', 'hourlyRate'].includes(field)) {
        const regularHours = parseFloat(newData.regularHours.toString()) || 0;
        const overtimeHours = parseFloat(newData.overtimeHours.toString()) || 0;
        const hourlyRate = parseFloat(newData.hourlyRate.toString()) || 0;
        
        // Calculate overtime rate (1.5x regular rate)
        const overtimeRate = hourlyRate * 1.5;
        
        // Calculate pay
        const regularPay = parseFloat((regularHours * hourlyRate).toFixed(2));
        const overtimePay = parseFloat((overtimeHours * overtimeRate).toFixed(2));
        const grossPay = parseFloat((regularPay + overtimePay).toFixed(2));
        
        // Calculate taxes
        const federalTax = calculateFederalTax(grossPay);
        const socialSecurityTax = calculateSocialSecurityTax(grossPay);
        const medicareTax = calculateMedicareTax(grossPay);
        const stateTax = calculateStateTax(grossPay, newData.stateCode);
        const localTax = calculateLocalTax(grossPay);
        
        // Calculate deductions
        const healthInsurance = parseFloat(newData.healthInsurance.toString()) || 0;
        const retirement401k = parseFloat(newData.retirement401k.toString()) || 0;
        const otherDeductions = parseFloat(newData.otherDeductions.toString()) || 0;
        const totalDeductions = parseFloat((federalTax + socialSecurityTax + medicareTax + stateTax + localTax + healthInsurance + retirement401k + otherDeductions).toFixed(2));
        
        // Calculate net pay
        const netPay = parseFloat((grossPay - totalDeductions).toFixed(2));
        
        // Update YTD values
        const previousPaystubs = newData.previousPaystubs || [];
        const ytdGrossPay = calculateYTD(grossPay, previousPaystubs.map(p => ({ amount: p.grossPay })));
        const ytdFederalTax = calculateYTD(federalTax, previousPaystubs.map(p => ({ amount: p.federalTax })));
        const ytdSocialSecurityTax = calculateYTD(socialSecurityTax, previousPaystubs.map(p => ({ amount: p.socialSecurityTax })));
        const ytdMedicareTax = calculateYTD(medicareTax, previousPaystubs.map(p => ({ amount: p.medicareTax })));
        const ytdStateTax = calculateYTD(stateTax, previousPaystubs.map(p => ({ amount: p.stateTax })));
        const ytdLocalTax = calculateYTD(localTax, previousPaystubs.map(p => ({ amount: p.localTax })));
        const ytdHealthInsurance = calculateYTD(healthInsurance, previousPaystubs.map(p => ({ amount: p.healthInsurance })));
        const ytdRetirement401k = calculateYTD(retirement401k, previousPaystubs.map(p => ({ amount: p.retirement401k })));
        const ytdOtherDeductions = calculateYTD(otherDeductions, previousPaystubs.map(p => ({ amount: p.otherDeductions })));
        const ytdNetPay = calculateYTD(netPay, previousPaystubs.map(p => ({ amount: p.netPay })));
        
        return {
          ...newData,
          overtimeRate,
          regularPay,
          overtimePay,
          grossPay,
          federalTax,
          socialSecurityTax,
          medicareTax,
          stateTax,
          localTax,
          totalDeductions,
          netPay,
          ytdGrossPay,
          ytdFederalTax,
          ytdSocialSecurityTax,
          ytdMedicareTax,
          ytdStateTax,
          ytdLocalTax,
          ytdHealthInsurance,
          ytdRetirement401k,
          ytdOtherDeductions,
          ytdNetPay
        };
      }
      
      // Recalculate state tax when state changes
      if (field === 'stateCode') {
        const grossPay = parseFloat(newData.grossPay.toString()) || 0;
        const stateTax = calculateStateTax(grossPay, value);
        
        // Recalculate total deductions and net pay
        const federalTax = parseFloat(newData.federalTax.toString()) || 0;
        const socialSecurityTax = parseFloat(newData.socialSecurityTax.toString()) || 0;
        const medicareTax = parseFloat(newData.medicareTax.toString()) || 0;
        const localTax = parseFloat(newData.localTax.toString()) || 0;
        const healthInsurance = parseFloat(newData.healthInsurance.toString()) || 0;
        const retirement401k = parseFloat(newData.retirement401k.toString()) || 0;
        const otherDeductions = parseFloat(newData.otherDeductions.toString()) || 0;
        
        const totalDeductions = parseFloat((federalTax + socialSecurityTax + medicareTax + stateTax + localTax + healthInsurance + retirement401k + otherDeductions).toFixed(2));
        const netPay = parseFloat((grossPay - totalDeductions).toFixed(2));
        
        // Update YTD values
        const previousPaystubs = newData.previousPaystubs || [];
        const ytdStateTax = calculateYTD(stateTax, previousPaystubs.map(p => ({ amount: p.stateTax })));
        const ytdNetPay = calculateYTD(netPay, previousPaystubs.map(p => ({ amount: p.netPay })));
        
        return {
          ...newData,
          stateTax,
          totalDeductions,
          netPay,
          ytdStateTax,
          ytdNetPay
        };
      }
      
      // Recalculate deductions when they change
      if (['healthInsurance', 'retirement401k', 'otherDeductions'].includes(field)) {
        const grossPay = parseFloat(newData.grossPay.toString()) || 0;
        const federalTax = parseFloat(newData.federalTax.toString()) || 0;
        const socialSecurityTax = parseFloat(newData.socialSecurityTax.toString()) || 0;
        const medicareTax = parseFloat(newData.medicareTax.toString()) || 0;
        const stateTax = parseFloat(newData.stateTax.toString()) || 0;
        const localTax = parseFloat(newData.localTax.toString()) || 0;
        const healthInsurance = parseFloat(newData.healthInsurance.toString()) || 0;
        const retirement401k = parseFloat(newData.retirement401k.toString()) || 0;
        const otherDeductions = parseFloat(newData.otherDeductions.toString()) || 0;
        
        const totalDeductions = parseFloat((federalTax + socialSecurityTax + medicareTax + stateTax + localTax + healthInsurance + retirement401k + otherDeductions).toFixed(2));
        const netPay = parseFloat((grossPay - totalDeductions).toFixed(2));
        
        // Update YTD values
        const previousPaystubs = newData.previousPaystubs || [];
        const ytdHealthInsurance = calculateYTD(healthInsurance, previousPaystubs.map(p => ({ amount: p.healthInsurance })));
        const ytdRetirement401k = calculateYTD(retirement401k, previousPaystubs.map(p => ({ amount: p.retirement401k })));
        const ytdOtherDeductions = calculateYTD(otherDeductions, previousPaystubs.map(p => ({ amount: p.otherDeductions })));
        const ytdNetPay = calculateYTD(netPay, previousPaystubs.map(p => ({ amount: p.netPay })));
        
        return {
          ...newData,
          totalDeductions,
          netPay,
          ytdHealthInsurance,
          ytdRetirement401k,
          ytdOtherDeductions,
          ytdNetPay
        };
      }
      
      return newData;
    });
  };
  
  const validateForm = () => {
    const validationErrors = validatePaystubInput(paystubData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  
  const generatePaystub = () => {
    if (!validateForm()) {
      return null;
    }
    
    return {
      ...paystubData,
      checkNumber: paystubData.checkNumber || generateCheckNumber()
    };
  };
  
  const addToPaystubHistory = (paystub: any) => {
    setPaystubData(prev => ({
      ...prev,
      previousPaystubs: [...(prev.previousPaystubs || []), paystub]
    }));
  };
  
  const resetForm = () => {
    setPaystubData({
      // Employee Information
      employeeName: '',
      employeeAddress: '',
      employeeSSN: '',
      employeeId: '',
      
      // Employer Information
      employerName: '',
      employerAddress: '',
      employerEIN: '',
      
      // Pay Period Information
      payPeriodStart: '',
      payPeriodEnd: '',
      payDate: '',
      checkNumber: generateCheckNumber(),
      
      // Earnings
      regularHours: 0,
      overtimeHours: 0,
      hourlyRate: 0,
      overtimeRate: 0,
      regularPay: 0,
      overtimePay: 0,
      grossPay: 0,
      
      // Taxes and Deductions
      federalTax: 0,
      socialSecurityTax: 0,
      medicareTax: 0,
      stateTax: 0,
      stateCode: 'CA',
      localTax: 0,
      healthInsurance: 0,
      retirement401k: 0,
      otherDeductions: 0,
      totalDeductions: 0,
      netPay: 0,
      
      // Year-to-Date
      ytdGrossPay: 0,
      ytdFederalTax: 0,
      ytdSocialSecurityTax: 0,
      ytdMedicareTax: 0,
      ytdStateTax: 0,
      ytdLocalTax: 0,
      ytdHealthInsurance: 0,
      ytdRetirement401k: 0,
      ytdOtherDeductions: 0,
      ytdNetPay: 0,
      
      // Previous Paystubs for YTD calculations
      previousPaystubs: []
    });
    setErrors({});
  };
  
  return {
    paystubData,
    errors,
    updatePaystubField,
    generatePaystub,
    addToPaystubHistory,
    resetForm
  };
}
