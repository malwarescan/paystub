import { useState } from 'react';

// Form validation utilities
export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateSSN = (ssn: string) => {
  // Remove any non-numeric characters
  const cleanSSN = ssn.replace(/\D/g, '');
  
  // Check if it's 9 digits
  return cleanSSN.length === 9;
};

export const validateEIN = (ein: string) => {
  // Remove any non-numeric characters
  const cleanEIN = ein.replace(/\D/g, '');
  
  // Check if it's 9 digits
  return cleanEIN.length === 9;
};

export const validateZipCode = (zipCode: string) => {
  // Check for 5-digit or 9-digit (ZIP+4) format
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};

export const validatePhoneNumber = (phoneNumber: string) => {
  // Remove any non-numeric characters
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // Check if it's 10 digits
  return cleanPhone.length === 10;
};

export const validateDate = (dateString: string) => {
  // Check if it's a valid date
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const validateNumber = (value: any, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
};

export const validateRequiredField = (value: any) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Error message formatting
export const getErrorMessage = (fieldName: string, validationType: string) => {
  const errorMessages: { [key: string]: { [key: string]: string } } = {
    required: {
      default: 'This field is required',
      employeeName: 'Employee name is required',
      employeeSSN: 'Employee SSN is required',
      employerName: 'Employer name is required',
      employerEIN: 'Employer EIN is required',
      payPeriodStart: 'Pay period start date is required',
      payPeriodEnd: 'Pay period end date is required',
      payDate: 'Pay date is required',
      regularHours: 'Regular hours are required',
      hourlyRate: 'Hourly rate is required'
    },
    format: {
      email: 'Please enter a valid email address',
      ssn: 'Please enter a valid 9-digit SSN',
      ein: 'Please enter a valid 9-digit EIN',
      zipCode: 'Please enter a valid ZIP code',
      phoneNumber: 'Please enter a valid 10-digit phone number',
      date: 'Please enter a valid date',
      number: 'Please enter a valid number'
    },
    range: {
      default: 'Value is out of range',
      regularHours: 'Hours must be greater than 0',
      overtimeHours: 'Hours must be greater than or equal to 0',
      hourlyRate: 'Rate must be greater than 0'
    }
  };
  
  return errorMessages[validationType]?.[fieldName] || errorMessages[validationType]?.default || 'Invalid input';
};

// Form validation hook
export function useFormValidation(initialValues: any, validationRules: any) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  
  const handleChange = (field: string, value: any) => {
    setValues({
      ...values,
      [field]: value
    });
    
    // Validate field on change if it's been touched
    if (touched[field]) {
      validateField(field, value);
    }
  };
  
  const handleBlur = (field: string) => {
    setTouched({
      ...touched,
      [field]: true
    });
    
    // Validate field on blur
    validateField(field, values[field]);
  };
  
  const validateField = (field: string, value: any) => {
    const fieldRules = validationRules[field];
    if (!fieldRules) return;
    
    let error = '';
    
    // Check required rule
    if (fieldRules.required && !validateRequiredField(value)) {
      error = getErrorMessage(field, 'required');
    }
    // Check format rules
    else if (fieldRules.email && !validateEmail(value)) {
      error = getErrorMessage(field, 'format');
    }
    else if (fieldRules.ssn && !validateSSN(value)) {
      error = getErrorMessage('ssn', 'format');
    }
    else if (fieldRules.ein && !validateEIN(value)) {
      error = getErrorMessage('ein', 'format');
    }
    else if (fieldRules.zipCode && !validateZipCode(value)) {
      error = getErrorMessage('zipCode', 'format');
    }
    else if (fieldRules.phoneNumber && !validatePhoneNumber(value)) {
      error = getErrorMessage('phoneNumber', 'format');
    }
    else if (fieldRules.date && !validateDate(value)) {
      error = getErrorMessage('date', 'format');
    }
    // Check number and range rules
    else if (fieldRules.number) {
      const min = fieldRules.min !== undefined ? fieldRules.min : 0;
      const max = fieldRules.max !== undefined ? fieldRules.max : Number.MAX_SAFE_INTEGER;
      
      if (!validateNumber(value, min, max)) {
        error = getErrorMessage(field, 'range');
      }
    }
    // Check custom validation rule
    else if (fieldRules.custom && typeof fieldRules.custom === 'function') {
      const customError = fieldRules.custom(value, values);
      if (customError) {
        error = customError;
      }
    }
    
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: error
    }));
    
    return error === '';
  };
  
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;
    
    // Validate all fields
    Object.keys(validationRules).forEach(field => {
      const isFieldValid = validateField(field, values[field]);
      if (!isFieldValid) {
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm
  };
}

// Toast notification system
export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: string; duration: number }>>([]);
  
  const showToast = (message: string, type = 'info', duration = 3000) => {
    const id = Date.now();
    
    setToasts(prevToasts => [
      ...prevToasts,
      { id, message, type, duration }
    ]);
    
    // Auto-remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
    
    return id;
  };
  
  const removeToast = (id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };
  
  return {
    toasts,
    showToast,
    removeToast
  };
}

// Error boundary component
export class ErrorBoundary extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  
  componentDidCatch(error: any, errorInfo: any) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    
    return this.props.children;
  }
}

// Import React for the ErrorBoundary class
import React from 'react';

// Export all validation utilities
export {
  validateEmail,
  validateSSN,
  validateEIN,
  validateZipCode,
  validatePhoneNumber,
  validateDate,
  validateNumber,
  validateRequiredField,
  getErrorMessage
};
