import { useState } from 'react';
import { calculateFederalTax, calculateSocialSecurityTax, calculateMedicareTax, calculateStateTax } from './usePaystubCalculator';

// W-2 form box calculations
export const calculateW2Boxes = (paystubs: any[]) => {
  // Combine all paystubs data for the year
  const totalGrossPay = paystubs.reduce((sum, paystub) => sum + (parseFloat(paystub.grossPay) || 0), 0);
  const totalFederalTax = paystubs.reduce((sum, paystub) => sum + (parseFloat(paystub.federalTax) || 0), 0);
  const totalSocialSecurityTax = paystubs.reduce((sum, paystub) => sum + (parseFloat(paystub.socialSecurityTax) || 0), 0);
  const totalMedicareTax = paystubs.reduce((sum, paystub) => sum + (parseFloat(paystub.medicareTax) || 0), 0);
  const totalStateTax = paystubs.reduce((sum, paystub) => sum + (parseFloat(paystub.stateTax) || 0), 0);
  const totalLocalTax = paystubs.reduce((sum, paystub) => sum + (parseFloat(paystub.localTax) || 0), 0);
  
  // Calculate values for each W-2 box
  return {
    // Box 1: Wages, tips, other compensation
    box1: parseFloat(totalGrossPay.toFixed(2)),
    
    // Box 2: Federal income tax withheld
    box2: parseFloat(totalFederalTax.toFixed(2)),
    
    // Box 3: Social security wages (subject to SS tax)
    box3: parseFloat(totalGrossPay.toFixed(2)),
    
    // Box 4: Social security tax withheld
    box4: parseFloat(totalSocialSecurityTax.toFixed(2)),
    
    // Box 5: Medicare wages and tips
    box5: parseFloat(totalGrossPay.toFixed(2)),
    
    // Box 6: Medicare tax withheld
    box6: parseFloat(totalMedicareTax.toFixed(2)),
    
    // Box 16: State wages, tips, etc.
    box16: parseFloat(totalGrossPay.toFixed(2)),
    
    // Box 17: State income tax
    box17: parseFloat(totalStateTax.toFixed(2)),
    
    // Box 18: Local wages, tips, etc.
    box18: parseFloat(totalGrossPay.toFixed(2)),
    
    // Box 19: Local income tax
    box19: parseFloat(totalLocalTax.toFixed(2)),
  };
};

// Validate W-2 form input
export const validateW2Input = (formData: any) => {
  const errors: { [key: string]: string } = {};
  
  if (!formData.employeeName) errors.employeeName = "Employee name is required";
  if (!formData.employeeSSN) errors.employeeSSN = "Employee SSN is required";
  if (!formData.employeeAddress) errors.employeeAddress = "Employee address is required";
  if (!formData.employerName) errors.employerName = "Employer name is required";
  if (!formData.employerEIN) errors.employerEIN = "Employer EIN is required";
  if (!formData.employerAddress) errors.employerAddress = "Employer address is required";
  if (!formData.taxYear) errors.taxYear = "Tax year is required";
  
  return errors;
};

// Format SSN for display
export const formatSSN = (ssn: string) => {
  // Remove any non-numeric characters
  const cleanSSN = ssn.replace(/\D/g, '');
  
  // Format as XXX-XX-XXXX
  if (cleanSSN.length === 9) {
    return `${cleanSSN.substring(0, 3)}-${cleanSSN.substring(3, 5)}-${cleanSSN.substring(5, 9)}`;
  }
  
  return ssn;
};

// Format EIN for display
export const formatEIN = (ein: string) => {
  // Remove any non-numeric characters
  const cleanEIN = ein.replace(/\D/g, '');
  
  // Format as XX-XXXXXXX
  if (cleanEIN.length === 9) {
    return `${cleanEIN.substring(0, 2)}-${cleanEIN.substring(2, 9)}`;
  }
  
  return ein;
};

export default function useW2Calculator() {
  const [w2Data, setW2Data] = useState({
    // Employee Information
    employeeName: '',
    employeeSSN: '',
    employeeAddress: '',
    
    // Employer Information
    employerName: '',
    employerEIN: '',
    employerAddress: '',
    
    // Tax Year
    taxYear: new Date().getFullYear().toString(),
    
    // State Information
    stateCode: 'CA',
    stateIdNumber: '',
    
    // Local Information
    localityName: '',
    localIdNumber: '',
    
    // W-2 Box Values
    box1: 0, // Wages, tips, other compensation
    box2: 0, // Federal income tax withheld
    box3: 0, // Social security wages
    box4: 0, // Social security tax withheld
    box5: 0, // Medicare wages and tips
    box6: 0, // Medicare tax withheld
    box7: 0, // Social security tips
    box8: 0, // Allocated tips
    box9: '', // Verification code
    box10: 0, // Dependent care benefits
    box11: 0, // Nonqualified plans
    box12a: { code: '', amount: 0 },
    box12b: { code: '', amount: 0 },
    box12c: { code: '', amount: 0 },
    box12d: { code: '', amount: 0 },
    box13: {
      statutoryEmployee: false,
      retirementPlan: false,
      thirdPartySickPay: false
    },
    box14: [
      { description: '', amount: 0 },
      { description: '', amount: 0 }
    ],
    
    // State and Local Income Tax Information
    box15: {
      stateCode: 'CA',
      employerStateIdNumber: ''
    },
    box16: 0, // State wages, tips, etc.
    box17: 0, // State income tax
    box18: 0, // Local wages, tips, etc.
    box19: 0, // Local income tax
    box20: '', // Locality name
    
    // Source paystubs
    sourcePaystubs: []
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const updateW2Field = (field: string, value: any) => {
    setW2Data(prev => {
      const newData = { ...prev, [field]: value };
      
      // If state code changes, update box 15
      if (field === 'stateCode') {
        newData.box15 = {
          ...newData.box15,
          stateCode: value
        };
      }
      
      // If locality name changes, update box 20
      if (field === 'localityName') {
        newData.box20 = value;
      }
      
      return newData;
    });
  };
  
  const calculateFromPaystubs = (paystubs: any[]) => {
    if (!paystubs || paystubs.length === 0) {
      return;
    }
    
    // Get employee and employer information from the first paystub
    const firstPaystub = paystubs[0];
    
    // Calculate W-2 box values
    const boxValues = calculateW2Boxes(paystubs);
    
    setW2Data(prev => ({
      ...prev,
      employeeName: firstPaystub.employeeName || prev.employeeName,
      employeeSSN: firstPaystub.employeeSSN || prev.employeeSSN,
      employeeAddress: firstPaystub.employeeAddress || prev.employeeAddress,
      employerName: firstPaystub.employerName || prev.employerName,
      employerEIN: firstPaystub.employerEIN || prev.employerEIN,
      employerAddress: firstPaystub.employerAddress || prev.employerAddress,
      stateCode: firstPaystub.stateCode || prev.stateCode,
      box15: {
        stateCode: firstPaystub.stateCode || prev.stateCode,
        employerStateIdNumber: prev.box15.employerStateIdNumber
      },
      box1: boxValues.box1,
      box2: boxValues.box2,
      box3: boxValues.box3,
      box4: boxValues.box4,
      box5: boxValues.box5,
      box6: boxValues.box6,
      box16: boxValues.box16,
      box17: boxValues.box17,
      box18: boxValues.box18,
      box19: boxValues.box19,
      sourcePaystubs: paystubs
    }));
  };
  
  const validateForm = () => {
    const validationErrors = validateW2Input(w2Data);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  
  const generateW2 = () => {
    if (!validateForm()) {
      return null;
    }
    
    return {
      ...w2Data,
      employeeSSN: formatSSN(w2Data.employeeSSN),
      employerEIN: formatEIN(w2Data.employerEIN)
    };
  };
  
  const resetForm = () => {
    setW2Data({
      // Employee Information
      employeeName: '',
      employeeSSN: '',
      employeeAddress: '',
      
      // Employer Information
      employerName: '',
      employerEIN: '',
      employerAddress: '',
      
      // Tax Year
      taxYear: new Date().getFullYear().toString(),
      
      // State Information
      stateCode: 'CA',
      stateIdNumber: '',
      
      // Local Information
      localityName: '',
      localIdNumber: '',
      
      // W-2 Box Values
      box1: 0,
      box2: 0,
      box3: 0,
      box4: 0,
      box5: 0,
      box6: 0,
      box7: 0,
      box8: 0,
      box9: '',
      box10: 0,
      box11: 0,
      box12a: { code: '', amount: 0 },
      box12b: { code: '', amount: 0 },
      box12c: { code: '', amount: 0 },
      box12d: { code: '', amount: 0 },
      box13: {
        statutoryEmployee: false,
        retirementPlan: false,
        thirdPartySickPay: false
      },
      box14: [
        { description: '', amount: 0 },
        { description: '', amount: 0 }
      ],
      
      // State and Local Income Tax Information
      box15: {
        stateCode: 'CA',
        employerStateIdNumber: ''
      },
      box16: 0,
      box17: 0,
      box18: 0,
      box19: 0,
      box20: '',
      
      // Source paystubs
      sourcePaystubs: []
    });
    setErrors({});
  };
  
  return {
    w2Data,
    errors,
    updateW2Field,
    calculateFromPaystubs,
    generateW2,
    resetForm
  };
}
