import React from 'react';

export const W2Template = ({ w2 }: { w2: any }) => {
  return (
    <div className="w2-template">
      <style jsx>{`
        .w2-template {
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
        .w2-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .w2-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .w2-subtitle {
          font-size: 16px;
          margin-bottom: 10px;
        }
        .w2-year {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .w2-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }
        .w2-box {
          border: 1px solid #333;
          padding: 5px;
          position: relative;
        }
        .w2-box-label {
          font-size: 10px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .w2-box-value {
          font-size: 14px;
        }
        .w2-box-full {
          grid-column: span 4;
        }
        .w2-box-half {
          grid-column: span 2;
        }
        .w2-employer-info, .w2-employee-info {
          margin-bottom: 20px;
        }
        .w2-info-title {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .w2-info-content {
          margin-bottom: 10px;
        }
        .w2-footer {
          position: absolute;
          bottom: 0.5in;
          width: calc(100% - 1in);
          text-align: center;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #ccc;
          padding-top: 10px;
        }
        .w2-box-13-checkboxes {
          display: flex;
          gap: 10px;
        }
        .w2-checkbox {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .w2-checkbox-box {
          width: 12px;
          height: 12px;
          border: 1px solid #333;
          display: inline-block;
        }
        .w2-checkbox-checked {
          background-color: #333;
        }
      `}</style>
      
      <div className="w2-header">
        <div className="w2-title">W-2 Wage and Tax Statement</div>
        <div className="w2-subtitle">Internal Revenue Service</div>
        <div className="w2-year">{w2.taxYear}</div>
      </div>
      
      <div className="w2-employer-info">
        <div className="w2-info-title">Employer Information</div>
        <div className="w2-info-content">
          <p><strong>Name:</strong> {w2.employerName}</p>
          <p><strong>Address:</strong> {w2.employerAddress}</p>
          <p><strong>EIN:</strong> {w2.employerEIN}</p>
        </div>
      </div>
      
      <div className="w2-employee-info">
        <div className="w2-info-title">Employee Information</div>
        <div className="w2-info-content">
          <p><strong>Name:</strong> {w2.employeeName}</p>
          <p><strong>Address:</strong> {w2.employeeAddress}</p>
          <p><strong>SSN:</strong> {w2.employeeSSN}</p>
        </div>
      </div>
      
      <div className="w2-grid">
        <div className="w2-box">
          <div className="w2-box-label">1. Wages, tips, other compensation</div>
          <div className="w2-box-value">${w2.box1.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">2. Federal income tax withheld</div>
          <div className="w2-box-value">${w2.box2.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">3. Social security wages</div>
          <div className="w2-box-value">${w2.box3.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">4. Social security tax withheld</div>
          <div className="w2-box-value">${w2.box4.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">5. Medicare wages and tips</div>
          <div className="w2-box-value">${w2.box5.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">6. Medicare tax withheld</div>
          <div className="w2-box-value">${w2.box6.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">7. Social security tips</div>
          <div className="w2-box-value">${w2.box7.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">8. Allocated tips</div>
          <div className="w2-box-value">${w2.box8.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">9. Verification code</div>
          <div className="w2-box-value">{w2.box9}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">10. Dependent care benefits</div>
          <div className="w2-box-value">${w2.box10.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">11. Nonqualified plans</div>
          <div className="w2-box-value">${w2.box11.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">12a. Code</div>
          <div className="w2-box-value">{w2.box12a.code} ${w2.box12a.amount.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">12b. Code</div>
          <div className="w2-box-value">{w2.box12b.code} ${w2.box12b.amount.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">12c. Code</div>
          <div className="w2-box-value">{w2.box12c.code} ${w2.box12c.amount.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">12d. Code</div>
          <div className="w2-box-value">{w2.box12d.code} ${w2.box12d.amount.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">13. Statutory employee, retirement plan, third-party sick pay</div>
          <div className="w2-box-value">
            <div className="w2-box-13-checkboxes">
              <div className="w2-checkbox">
                <div className={`w2-checkbox-box ${w2.box13.statutoryEmployee ? 'w2-checkbox-checked' : ''}`}></div>
                <span>Statutory employee</span>
              </div>
              <div className="w2-checkbox">
                <div className={`w2-checkbox-box ${w2.box13.retirementPlan ? 'w2-checkbox-checked' : ''}`}></div>
                <span>Retirement plan</span>
              </div>
              <div className="w2-checkbox">
                <div className={`w2-checkbox-box ${w2.box13.thirdPartySickPay ? 'w2-checkbox-checked' : ''}`}></div>
                <span>Third-party sick pay</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">14. Other</div>
          <div className="w2-box-value">
            {w2.box14.map((item: any, index: number) => (
              item.description && (
                <div key={index}>
                  {item.description}: ${item.amount.toFixed(2)}
                </div>
              )
            ))}
          </div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">15. State, Employer's state ID no.</div>
          <div className="w2-box-value">
            {w2.box15.stateCode}, {w2.box15.employerStateIdNumber}
          </div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">16. State wages, tips, etc.</div>
          <div className="w2-box-value">${w2.box16.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">17. State income tax</div>
          <div className="w2-box-value">${w2.box17.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">18. Local wages, tips, etc.</div>
          <div className="w2-box-value">${w2.box18.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">19. Local income tax</div>
          <div className="w2-box-value">${w2.box19.toFixed(2)}</div>
        </div>
        
        <div className="w2-box">
          <div className="w2-box-label">20. Locality name</div>
          <div className="w2-box-value">{w2.box20}</div>
        </div>
      </div>
      
      <div className="w2-footer">
        <p>This is a generated W-2 form for demonstration purposes only.</p>
        <p>Generated on {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default W2Template;
