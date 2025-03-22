import React from 'react';

export const PaystubTemplate = ({ paystub }: { paystub: any }) => {
  return (
    <div className="paystub-template">
      <style jsx>{`
        .paystub-template {
          font-family: 'Arial', sans-serif;
          width: 8.5in;
          height: 11in;
          padding: 0.5in;
          border: 1px solid #ccc;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          background-color: white;
          color: #333;
          position: relative;
        }
        .paystub-header {
          display: flex;
          justify-content: space-between;
          border-bottom: 2px solid #333;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .company-info {
          flex: 1;
        }
        .paystub-title {
          flex: 1;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
        }
        .paystub-number {
          flex: 1;
          text-align: right;
        }
        .employee-info {
          display: flex;
          margin-bottom: 20px;
        }
        .employee-details {
          flex: 1;
        }
        .pay-period {
          flex: 1;
          text-align: right;
        }
        .earnings-section {
          margin-bottom: 20px;
        }
        .section-title {
          font-weight: bold;
          border-bottom: 1px solid #333;
          margin-bottom: 10px;
          padding-bottom: 5px;
        }
        .earnings-table, .deductions-table, .summary-table {
          width: 100%;
          border-collapse: collapse;
        }
        .earnings-table th, .deductions-table th, .summary-table th {
          text-align: left;
          padding: 5px;
          background-color: #f5f5f5;
        }
        .earnings-table td, .deductions-table td, .summary-table td {
          padding: 5px;
        }
        .deductions-section {
          margin-bottom: 20px;
        }
        .summary-section {
          margin-bottom: 20px;
        }
        .ytd-section {
          margin-bottom: 20px;
        }
        .footer {
          position: absolute;
          bottom: 0.5in;
          width: calc(100% - 1in);
          text-align: center;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #ccc;
          padding-top: 10px;
        }
      `}</style>
      
      <div className="paystub-header">
        <div className="company-info">
          <h3>{paystub.employerName}</h3>
          <p>{paystub.employerAddress}</p>
          <p>EIN: {paystub.employerEIN}</p>
        </div>
        <div className="paystub-title">
          EARNINGS STATEMENT
        </div>
        <div className="paystub-number">
          <p>Check #: {paystub.checkNumber}</p>
          <p>Pay Date: {paystub.payDate}</p>
        </div>
      </div>
      
      <div className="employee-info">
        <div className="employee-details">
          <h4>Employee Information</h4>
          <p><strong>Name:</strong> {paystub.employeeName}</p>
          <p><strong>Address:</strong> {paystub.employeeAddress}</p>
          <p><strong>SSN:</strong> XXX-XX-{paystub.employeeSSN.slice(-4)}</p>
          {paystub.employeeId && <p><strong>Employee ID:</strong> {paystub.employeeId}</p>}
        </div>
        <div className="pay-period">
          <h4>Pay Period</h4>
          <p><strong>Start:</strong> {paystub.payPeriodStart}</p>
          <p><strong>End:</strong> {paystub.payPeriodEnd}</p>
        </div>
      </div>
      
      <div className="earnings-section">
        <div className="section-title">Earnings</div>
        <table className="earnings-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Hours</th>
              <th>Rate</th>
              <th>Current</th>
              <th>YTD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Regular</td>
              <td>{paystub.regularHours}</td>
              <td>${paystub.hourlyRate.toFixed(2)}</td>
              <td>${paystub.regularPay.toFixed(2)}</td>
              <td>${paystub.ytdGrossPay.toFixed(2)}</td>
            </tr>
            {paystub.overtimeHours > 0 && (
              <tr>
                <td>Overtime</td>
                <td>{paystub.overtimeHours}</td>
                <td>${paystub.overtimeRate.toFixed(2)}</td>
                <td>${paystub.overtimePay.toFixed(2)}</td>
                <td>-</td>
              </tr>
            )}
            <tr>
              <td colSpan={3}><strong>Gross Pay</strong></td>
              <td><strong>${paystub.grossPay.toFixed(2)}</strong></td>
              <td><strong>${paystub.ytdGrossPay.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="deductions-section">
        <div className="section-title">Taxes and Deductions</div>
        <table className="deductions-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Current</th>
              <th>YTD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Federal Income Tax</td>
              <td>${paystub.federalTax.toFixed(2)}</td>
              <td>${paystub.ytdFederalTax.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Social Security Tax</td>
              <td>${paystub.socialSecurityTax.toFixed(2)}</td>
              <td>${paystub.ytdSocialSecurityTax.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Medicare Tax</td>
              <td>${paystub.medicareTax.toFixed(2)}</td>
              <td>${paystub.ytdMedicareTax.toFixed(2)}</td>
            </tr>
            <tr>
              <td>State Income Tax ({paystub.stateCode})</td>
              <td>${paystub.stateTax.toFixed(2)}</td>
              <td>${paystub.ytdStateTax.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Local Tax</td>
              <td>${paystub.localTax.toFixed(2)}</td>
              <td>${paystub.ytdLocalTax.toFixed(2)}</td>
            </tr>
            {paystub.healthInsurance > 0 && (
              <tr>
                <td>Health Insurance</td>
                <td>${paystub.healthInsurance.toFixed(2)}</td>
                <td>${paystub.ytdHealthInsurance.toFixed(2)}</td>
              </tr>
            )}
            {paystub.retirement401k > 0 && (
              <tr>
                <td>401(k) Retirement</td>
                <td>${paystub.retirement401k.toFixed(2)}</td>
                <td>${paystub.ytdRetirement401k.toFixed(2)}</td>
              </tr>
            )}
            {paystub.otherDeductions > 0 && (
              <tr>
                <td>Other Deductions</td>
                <td>${paystub.otherDeductions.toFixed(2)}</td>
                <td>${paystub.ytdOtherDeductions.toFixed(2)}</td>
              </tr>
            )}
            <tr>
              <td><strong>Total Deductions</strong></td>
              <td><strong>${paystub.totalDeductions.toFixed(2)}</strong></td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="summary-section">
        <div className="section-title">Summary</div>
        <table className="summary-table">
          <tbody>
            <tr>
              <td><strong>Gross Pay</strong></td>
              <td><strong>${paystub.grossPay.toFixed(2)}</strong></td>
            </tr>
            <tr>
              <td><strong>Total Deductions</strong></td>
              <td><strong>${paystub.totalDeductions.toFixed(2)}</strong></td>
            </tr>
            <tr>
              <td><strong>Net Pay</strong></td>
              <td><strong>${paystub.netPay.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="footer">
        <p>This is an official payroll document. Please retain for your records.</p>
        <p>Generated on {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PaystubTemplate;
