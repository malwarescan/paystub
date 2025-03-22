import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: any;
  onChange: (name: string, value: any) => void;
  onBlur?: (name: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  options,
  min,
  max,
  step
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const newValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    onChange(name, newValue);
  };
  
  const handleBlur = () => {
    if (onBlur) {
      onBlur(name);
    }
  };
  
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={error ? 'error' : ''}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={error ? 'error' : ''}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          checked={type === 'checkbox' ? value : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={error ? 'error' : ''}
          min={min}
          max={max}
          step={step}
        />
      )}
      
      {error && <div className="error-message">{error}</div>}
      
      <style jsx>{`
        .form-group {
          margin-bottom: 16px;
        }
        
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        .required {
          color: #dc3545;
          margin-left: 4px;
        }
        
        input, select, textarea {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 16px;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        
        input:focus, select:focus, textarea:focus {
          border-color: #80bdff;
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
        
        input[type="checkbox"] {
          width: auto;
          margin-right: 8px;
        }
        
        .error {
          border-color: #dc3545;
        }
        
        .error:focus {
          border-color: #dc3545;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }
        
        .error-message {
          color: #dc3545;
          font-size: 14px;
          margin-top: 4px;
        }
        
        textarea {
          min-height: 100px;
          resize: vertical;
        }
      `}</style>
    </div>
  );
};

export default FormInput;
