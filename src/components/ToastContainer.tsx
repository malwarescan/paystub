import React from 'react';
import { useToast } from '../lib/formValidation';

interface ToastProps {
  id: number;
  message: string;
  type: string;
  onClose: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [id, onClose]);
  
  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span>{message}</span>
        <button className="toast-close" onClick={() => onClose(id)}>×</button>
      </div>
      <style jsx>{`
        .toast {
          position: relative;
          padding: 12px 16px;
          border-radius: 4px;
          margin-bottom: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s ease-out forwards;
          max-width: 350px;
          width: 100%;
        }
        
        .toast-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .toast-close {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          margin-left: 8px;
          opacity: 0.7;
        }
        
        .toast-close:hover {
          opacity: 1;
        }
        
        .toast-success {
          background-color: #d4edda;
          color: #155724;
          border-left: 4px solid #28a745;
        }
        
        .toast-error {
          background-color: #f8d7da;
          color: #721c24;
          border-left: 4px solid #dc3545;
        }
        
        .toast-info {
          background-color: #d1ecf1;
          color: #0c5460;
          border-left: 4px solid #17a2b8;
        }
        
        .toast-warning {
          background-color: #fff3cd;
          color: #856404;
          border-left: 4px solid #ffc107;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();
  
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={removeToast}
        />
      ))}
      <style jsx>{`
        .toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
      `}</style>
    </div>
  );
};

export default ToastContainer;
