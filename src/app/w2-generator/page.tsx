'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function W2Generator() {
  const [formData, setFormData] = useState({
    // Tax Year
    taxYear: '2025',
    
    // Employee Information
    employeeName: '',
    employeeAddress: '',
    employeeSSN: '',
    
    // Employer Information
    employerName: '',
    employerAddress: '',
    employerEIN: '',
    
    // Wage and Tax Information
    wagesAndCompensation: '',
    federalIncomeTaxWithheld: '',
    socialSecurityWages: '',
    socialSecurityTaxWithheld: '',
    medicareWages: '',
    medicareTaxWithheld: '',
    socialSecurityTips: '',
    allocatedTips: '',
    dependentCareBenefits: '',
    nonqualifiedPlans: '',
    
    // Box 12 Codes and Amounts
    box12a_code: '',
    box12a_amount: '',
    box12b_code: '',
    box12b_amount: '',
    box12c_code: '',
    box12c_amount: '',
    box12d_code: '',
    box12d_amount: '',
    
    // Box 13 Checkboxes
    statutoryEmployee: false,
    retirementPlan: false,
    thirdPartySickPay: false,
    
    // State and Local Information
    state1: '',
    stateIdNumber1: '',
    stateWages1: '',
    stateIncomeTax1: '',
    state2: '',
    stateIdNumber2: '',
    stateWages2: '',
    stateIncomeTax2: '',
    localityName: '',
    localWages: '',
    localIncomeTax: '',
  });

  const [w2Generated, setW2Generated] = useState(false);
  const [w2Data, setW2Data] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const generateW2 = () => {
    // Create W-2 data object based on form inputs
    const w2Data = {
      taxYear: formData.taxYear,
      employeeInfo: {
        name: formData.employeeName,
        address: formData.employeeAddress,
        ssn: formData.employeeSSN
      },
      employerInfo: {
        name: formData.employerName,
        address: formData.employerAddress,
        ein: formData.employerEIN
      },
      wageInfo: {
        wagesAndCompensation: parseFloat(formData.wagesAndCompensation || 0),
        federalIncomeTaxWithheld: parseFloat(formData.federalIncomeTaxWithheld || 0),
        socialSecurityWages: parseFloat(formData.socialSecurityWages || 0),
        socialSecurityTaxWithheld: parseFloat(formData.socialSecurityTaxWithheld || 0),
        medicareWages: parseFloat(formData.medicareWages || 0),
        medicareTaxWithheld: parseFloat(formData.medicareTaxWithheld || 0),
        socialSecurityTips: parseFloat(formData.socialSecurityTips || 0),
        allocatedTips: parseFloat(formData.allocatedTips || 0),
        dependentCareBenefits: parseFloat(formData.dependentCareBenefits || 0),
        nonqualifiedPlans: parseFloat(formData.nonqualifiedPlans || 0)
      },
      box12: [
        formData.box12a_code && formData.box12a_amount ? { code: formData.box12a_code, amount: parseFloat(formData.box12a_amount) } : null,
        formData.box12b_code && formData.box12b_amount ? { code: formData.box12b_code, amount: parseFloat(formData.box12b_amount) } : null,
        formData.box12c_code && formData.box12c_amount ? { code: formData.box12c_code, amount: parseFloat(formData.box12c_amount) } : null,
        formData.box12d_code && formData.box12d_amount ? { code: formData.box12d_code, amount: parseFloat(formData.box12d_amount) } : null
      ].filter(item => item !== null),
      box13: {
        statutoryEmployee: formData.statutoryEmployee,
        retirementPlan: formData.retirementPlan,
        thirdPartySickPay: formData.thirdPartySickPay
      },
      stateAndLocal: {
        state1: {
          state: formData.state1,
          stateIdNumber: formData.stateIdNumber1,
          stateWages: parseFloat(formData.stateWages1 || 0),
          stateIncomeTax: parseFloat(formData.stateIncomeTax1 || 0)
        },
        state2: formData.state2 ? {
          state: formData.state2,
          stateIdNumber: formData.stateIdNumber2,
          stateWages: parseFloat(formData.stateWages2 || 0),
          stateIncomeTax: parseFloat(formData.stateIncomeTax2 || 0)
        } : null,
        local: {
          localityName: formData.localityName,
          localWages: parseFloat(formData.localWages || 0),
          localIncomeTax: parseFloat(formData.localIncomeTax || 0)
        }
      }
    };
    
    setW2Data(w2Data);
    setW2Generated(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateW2();
  };

  // Box 12 code options
  const box12Codes = [
    { value: 'A', label: 'A - Uncollected social security tax on tips' },
    { value: 'B', label: 'B - Uncollected Medicare tax on tips' },
    { value: 'C', label: 'C - Taxable cost of group-term life insurance over $50,000' },
    { value: 'D', label: 'D - Elective deferrals to a section 401(k) cash or deferred arrangement' },
    { value: 'E', label: 'E - Elective deferrals to a section 403(b) salary reduction agreement' },
    { value: 'F', label: 'F - Elective deferrals to a section 408(k)(6) salary reduction SEP' },
    { value: 'G', label: 'G - Elective deferrals and employer contributions to a section 457(b) plan' },
    { value: 'H', label: 'H - Elective deferrals to a section 501(c)(18)(D) tax-exempt organization plan' },
    { value: 'J', label: 'J - Nontaxable sick pay' },
    { value: 'K', label: 'K - 20% excise tax on excess golden parachute payments' },
    { value: 'L', label: 'L - Substantiated employee business expense reimbursements' },
    { value: 'M', label: 'M - Uncollected social security tax on taxable cost of group-term life insurance' },
    { value: 'N', label: 'N - Uncollected Medicare tax on taxable cost of group-term life insurance' },
    { value: 'P', label: 'P - Excludable moving expense reimbursements paid to a member of the Armed Forces' },
    { value: 'Q', label: 'Q - Nontaxable combat pay' },
    { value: 'R', label: 'R - Employer contributions to an Archer MSA' },
    { value: 'S', label: 'S - Employee salary reduction contributions to a 408(p) SIMPLE plan' },
    { value: 'T', label: 'T - Adoption benefits' },
    { value: 'V', label: 'V - Income from exercise of nonstatutory stock option(s)' },
    { value: 'W', label: 'W - Employer contributions to a Health Savings Account' },
    { value: 'Y', label: 'Y - Deferrals under a section 409A nonqualified deferred compensation plan' },
    { value: 'Z', label: 'Z - Income under a nonqualified deferred compensation plan that fails 409A' },
    { value: 'AA', label: 'AA - Designated Roth contributions under a section 401(k) plan' },
    { value: 'BB', label: 'BB - Designated Roth contributions under a section 403(b) plan' },
    { value: 'DD', label: 'DD - Cost of employer-sponsored health coverage' },
    { value: 'EE', label: 'EE - Designated Roth contributions under a governmental section 457(b) plan' },
    { value: 'FF', label: 'FF - Permitted benefits under a qualified small employer health reimbursement arrangement' },
    { value: 'GG', label: 'GG - Income from qualified equity grants under section 83(i)' },
    { value: 'HH', label: 'HH - Aggregate deferrals under section 83(i) elections as of the close of the calendar year' }
  ];

  // State code options
  const stateCodes = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District of Columbia' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            W-2 Form Generator
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Create IRS-compliant W-2 forms with accurate tax information
          </p>
          <div className="mt-4">
            <Link href="/" className="text-indigo-600 hover:text-indigo-500">
              ← Back to Home
            </Link>
          </div>
        </div>

        {!w2Generated ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Tax Year */}
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Tax Year</h3>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                      <label htmlFor="taxYear" className="block text-sm font-medium text-gray-700">
                        Tax Year
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="taxYear"
                          id="taxYear"
                          value={formData.taxYear}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Employee Information Section */}
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Employee Information</h3>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="employeeName"
                          id="employeeName"
                          value={formData.employeeName}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="employeeSSN" className="block text-sm font-medium text-gray-700">
                        Social Security Number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="employeeSSN"
                          id="employeeSSN"
                          value={formData.employeeSSN}
                          onChange={handleChange}
                          placeholder="XXX-XX-XXXX"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="employeeAddress" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="employeeAddress"
                          id="employeeAddress"
                          value={formData.employeeAddress}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Employer Information Section */}
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Employer Information</h3>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="employerName" className="block text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="employerName"
                          id="employerName"
                          value={formData.employerName}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="employerEIN" className="block text-sm font-medium text-gray-700">
                        Employer Identification Number (EIN)
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="employerEIN"
                          id="employerEIN"
                          value={formData.employerEIN}
                          onChange={handleChange}
                          placeholder="XX-XXXXXXX"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="employerAddress" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="employerAddress"
                          id="employerAddress"
                          value={formData.employerAddress}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wage and Tax Information */}
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Wage and Tax Information</h3>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="wagesAndCompensation" className="block text-sm font-medium text-gray-700">
                        Box 1: Wages, tips, other compensation
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="wagesAndCompensation"
                          id="wagesAndCompensation"
                          value={formData.wagesAndCompensation}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="federalIncomeTaxWithheld" className="block text-sm font-medium text-gray-700">
                        Box 2: Federal income tax withheld
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="federalIncomeTaxWithheld"
                          id="federalIncomeTaxWithheld"
                          value={formData.federalIncomeTaxWithheld}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="socialSecurityWages" className="block text-sm font-medium text-gray-700">
                        Box 3: Social security wages
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="socialSecurityWages"
                          id="socialSecurityWages"
                          value={formData.socialSecurityWages}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="socialSecurityTaxWithheld" className="block text-sm font-medium text-gray-700">
                        Box 4: Social security tax withheld
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="socialSecurityTaxWithheld"
                          id="socialSecurityTaxWithheld"
                          value={formData.socialSecurityTaxWithheld}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="medicareWages" className="block text-sm font-medium text-gray-700">
                        Box 5: Medicare wages and tips
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="medicareWages"
                          id="medicareWages"
                          value={formData.medicareWages}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="medicareTaxWithheld" className="block text-sm font-medium text-gray-700">
                        Box 6: Medicare tax withheld
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="medicareTaxWithheld"
                          id="medicareTaxWithheld"
                          value={formData.medicareTaxWithheld}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="socialSecurityTips" className="block text-sm font-medium text-gray-700">
                        Box 7: Social security tips
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="socialSecurityTips"
                          id="socialSecurityTips"
                          value={formData.socialSecurityTips}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="allocatedTips" className="block text-sm font-medium text-gray-700">
                        Box 8: Allocated tips
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="allocatedTips"
                          id="allocatedTips"
                          value={formData.allocatedTips}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="dependentCareBenefits" className="block text-sm font-medium text-gray-700">
                        Box 10: Dependent care benefits
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="dependentCareBenefits"
                          id="dependentCareBenefits"
                          value={formData.dependentCareBenefits}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="nonqualifiedPlans" className="block text-sm font-medium text-gray-700">
                        Box 11: Nonqualified plans
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="nonqualifiedPlans"
                          id="nonqualifiedPlans"
                          value={formData.nonqualifiedPlans}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Box 12 Codes */}
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Box 12 Codes (Optional)</h3>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="box12a_code" className="block text-sm font-medium text-gray-700">
                        Box 12a Code
                      </label>
                      <div className="mt-1">
                        <select
                          name="box12a_code"
                          id="box12a_code"
                          value={formData.box12a_code}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select a code</option>
                          {box12Codes.map(code => (
                            <option key={code.value} value={code.value}>{code.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="box12a_amount" className="block text-sm font-medium text-gray-700">
                        Box 12a Amount
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="box12a_amount"
                          id="box12a_amount"
                          value={formData.box12a_amount}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="box12b_code" className="block text-sm font-medium text-gray-700">
                        Box 12b Code
                      </label>
                      <div className="mt-1">
                        <select
                          name="box12b_code"
                          id="box12b_code"
                          value={formData.box12b_code}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select a code</option>
                          {box12Codes.map(code => (
                            <option key={code.value} value={code.value}>{code.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="box12b_amount" className="block text-sm font-medium text-gray-700">
                        Box 12b Amount
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="box12b_amount"
                          id="box12b_amount"
                          value={formData.box12b_amount}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="box12c_code" className="block text-sm font-medium text-gray-700">
                        Box 12c Code
                      </label>
                      <div className="mt-1">
                        <select
                          name="box12c_code"
                          id="box12c_code"
                          value={formData.box12c_code}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select a code</option>
                          {box12Codes.map(code => (
                            <option key={code.value} value={code.value}>{code.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="box12c_amount" className="block text-sm font-medium text-gray-700">
                        Box 12c Amount
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="box12c_amount"
                          id="box12c_amount"
                          value={formData.box12c_amount}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="box12d_code" className="block text-sm font-medium text-gray-700">
                        Box 12d Code
                      </label>
                      <div className="mt-1">
                        <select
                          name="box12d_code"
                          id="box12d_code"
                          value={formData.box12d_code}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select a code</option>
                          {box12Codes.map(code => (
                            <option key={code.value} value={code.value}>{code.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="box12d_amount" className="block text-sm font-medium text-gray-700">
                        Box 12d Amount
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="box12d_amount"
                          id="box12d_amount"
                          value={formData.box12d_amount}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Box 13 Checkboxes */}
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Box 13</h3>
                  <div className="mt-6 space-y-4">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="statutoryEmployee"
                          name="statutoryEmployee"
                          type="checkbox"
                          checked={formData.statutoryEmployee}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="statutoryEmployee" className="font-medium text-gray-700">
                          Statutory employee
                        </label>
                      </div>
                    </div>

                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="retirementPlan"
                          name="retirementPlan"
                          type="checkbox"
                          checked={formData.retirementPlan}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="retirementPlan" className="font-medium text-gray-700">
                          Retirement plan
                        </label>
                      </div>
                    </div>

                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="thirdPartySickPay"
                          name="thirdPartySickPay"
                          type="checkbox"
                          checked={formData.thirdPartySickPay}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="thirdPartySickPay" className="font-medium text-gray-700">
                          Third-party sick pay
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* State and Local Information */}
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">State and Local Information</h3>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                      <label htmlFor="state1" className="block text-sm font-medium text-gray-700">
                        State 1
                      </label>
                      <div className="mt-1">
                        <select
                          name="state1"
                          id="state1"
                          value={formData.state1}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select a state</option>
                          {stateCodes.map(state => (
                            <option key={state.value} value={state.value}>{state.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="stateIdNumber1" className="block text-sm font-medium text-gray-700">
                        State ID Number 1
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="stateIdNumber1"
                          id="stateIdNumber1"
                          value={formData.stateIdNumber1}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="stateWages1" className="block text-sm font-medium text-gray-700">
                        State Wages 1
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="stateWages1"
                          id="stateWages1"
                          value={formData.stateWages1}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="stateIncomeTax1" className="block text-sm font-medium text-gray-700">
                        State Tax 1
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="stateIncomeTax1"
                          id="stateIncomeTax1"
                          value={formData.stateIncomeTax1}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="state2" className="block text-sm font-medium text-gray-700">
                        State 2 (Optional)
                      </label>
                      <div className="mt-1">
                        <select
                          name="state2"
                          id="state2"
                          value={formData.state2}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select a state</option>
                          {stateCodes.map(state => (
                            <option key={state.value} value={state.value}>{state.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="stateIdNumber2" className="block text-sm font-medium text-gray-700">
                        State ID Number 2
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="stateIdNumber2"
                          id="stateIdNumber2"
                          value={formData.stateIdNumber2}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="stateWages2" className="block text-sm font-medium text-gray-700">
                        State Wages 2
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="stateWages2"
                          id="stateWages2"
                          value={formData.stateWages2}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="stateIncomeTax2" className="block text-sm font-medium text-gray-700">
                        State Tax 2
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="stateIncomeTax2"
                          id="stateIncomeTax2"
                          value={formData.stateIncomeTax2}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="localityName" className="block text-sm font-medium text-gray-700">
                        Locality Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="localityName"
                          id="localityName"
                          value={formData.localityName}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="localWages" className="block text-sm font-medium text-gray-700">
                        Local Wages
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="localWages"
                          id="localWages"
                          value={formData.localWages}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="localIncomeTax" className="block text-sm font-medium text-gray-700">
                        Local Income Tax
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="localIncomeTax"
                          id="localIncomeTax"
                          value={formData.localIncomeTax}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => window.location.href = '/'}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Generate W-2 Form
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                W-2 Wage and Tax Statement - {w2Data.taxYear}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                For {w2Data.employeeInfo.name}
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">a. Employee's social security number</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {w2Data.employeeInfo.ssn}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">b. Employer identification number (EIN)</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {w2Data.employerInfo.ein}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">c. Employer's name, address, and ZIP code</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {w2Data.employerInfo.name}<br />
                    {w2Data.employerInfo.address}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">e. Employee's name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {w2Data.employeeInfo.name}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">f. Employee's address and ZIP code</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {w2Data.employeeInfo.address}
                  </dd>
                </div>
                
                <div className="bg-white px-4 py-5 sm:px-6">
                  <h4 className="text-lg font-medium text-gray-900">Wage and Tax Information</h4>
                  <div className="mt-6 border-t border-gray-200">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                      <div className="text-sm font-medium text-gray-500">1. Wages, tips, other compensation</div>
                      <div className="text-sm text-gray-900">${w2Data.wageInfo.wagesAndCompensation.toFixed(2)}</div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                      <div className="text-sm font-medium text-gray-500">2. Federal income tax withheld</div>
                      <div className="text-sm text-gray-900">${w2Data.wageInfo.federalIncomeTaxWithheld.toFixed(2)}</div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                      <div className="text-sm font-medium text-gray-500">3. Social security wages</div>
                      <div className="text-sm text-gray-900">${w2Data.wageInfo.socialSecurityWages.toFixed(2)}</div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                      <div className="text-sm font-medium text-gray-500">4. Social security tax withheld</div>
                      <div className="text-sm text-gray-900">${w2Data.wageInfo.socialSecurityTaxWithheld.toFixed(2)}</div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                      <div className="text-sm font-medium text-gray-500">5. Medicare wages and tips</div>
                      <div className="text-sm text-gray-900">${w2Data.wageInfo.medicareWages.toFixed(2)}</div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                      <div className="text-sm font-medium text-gray-500">6. Medicare tax withheld</div>
                      <div className="text-sm text-gray-900">${w2Data.wageInfo.medicareTaxWithheld.toFixed(2)}</div>
                    </div>
                    {w2Data.wageInfo.socialSecurityTips > 0 && (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                        <div className="text-sm font-medium text-gray-500">7. Social security tips</div>
                        <div className="text-sm text-gray-900">${w2Data.wageInfo.socialSecurityTips.toFixed(2)}</div>
                      </div>
                    )}
                    {w2Data.wageInfo.allocatedTips > 0 && (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                        <div className="text-sm font-medium text-gray-500">8. Allocated tips</div>
                        <div className="text-sm text-gray-900">${w2Data.wageInfo.allocatedTips.toFixed(2)}</div>
                      </div>
                    )}
                    {w2Data.wageInfo.dependentCareBenefits > 0 && (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                        <div className="text-sm font-medium text-gray-500">10. Dependent care benefits</div>
                        <div className="text-sm text-gray-900">${w2Data.wageInfo.dependentCareBenefits.toFixed(2)}</div>
                      </div>
                    )}
                    {w2Data.wageInfo.nonqualifiedPlans > 0 && (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                        <div className="text-sm font-medium text-gray-500">11. Nonqualified plans</div>
                        <div className="text-sm text-gray-900">${w2Data.wageInfo.nonqualifiedPlans.toFixed(2)}</div>
                      </div>
                    )}
                  </div>
                </div>
                
                {w2Data.box12.length > 0 && (
                  <div className="bg-gray-50 px-4 py-5 sm:px-6">
                    <h4 className="text-lg font-medium text-gray-900">Box 12 Codes</h4>
                    <div className="mt-6 border-t border-gray-200">
                      {w2Data.box12.map((item, index) => (
                        <div key={index} className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                          <div className="text-sm font-medium text-gray-500">12{String.fromCharCode(97 + index)}. Code {item.code}</div>
                          <div className="text-sm text-gray-900">${item.amount.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="bg-white px-4 py-5 sm:px-6">
                  <h4 className="text-lg font-medium text-gray-900">Box 13</h4>
                  <div className="mt-6 border-t border-gray-200">
                    {w2Data.box13.statutoryEmployee && (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                        <div className="text-sm font-medium text-gray-500">Statutory employee</div>
                        <div className="text-sm text-gray-900">☑ Yes</div>
                      </div>
                    )}
                    {w2Data.box13.retirementPlan && (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                        <div className="text-sm font-medium text-gray-500">Retirement plan</div>
                        <div className="text-sm text-gray-900">☑ Yes</div>
                      </div>
                    )}
                    {w2Data.box13.thirdPartySickPay && (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                        <div className="text-sm font-medium text-gray-500">Third-party sick pay</div>
                        <div className="text-sm text-gray-900">☑ Yes</div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-5 sm:px-6">
                  <h4 className="text-lg font-medium text-gray-900">State and Local Information</h4>
                  <div className="mt-6 border-t border-gray-200">
                    {w2Data.stateAndLocal.state1.state && (
                      <>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                          <div className="text-sm font-medium text-gray-500">15. State</div>
                          <div className="text-sm text-gray-900">{w2Data.stateAndLocal.state1.state}</div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                          <div className="text-sm font-medium text-gray-500">15. Employer's state ID number</div>
                          <div className="text-sm text-gray-900">{w2Data.stateAndLocal.state1.stateIdNumber}</div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                          <div className="text-sm font-medium text-gray-500">16. State wages, tips, etc.</div>
                          <div className="text-sm text-gray-900">${w2Data.stateAndLocal.state1.stateWages.toFixed(2)}</div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                          <div className="text-sm font-medium text-gray-500">17. State income tax</div>
                          <div className="text-sm text-gray-900">${w2Data.stateAndLocal.state1.stateIncomeTax.toFixed(2)}</div>
                        </div>
                      </>
                    )}
                    
                    {w2Data.stateAndLocal.state2 && w2Data.stateAndLocal.state2.state && (
                      <>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                          <div className="text-sm font-medium text-gray-500">15. State (2)</div>
                          <div className="text-sm text-gray-900">{w2Data.stateAndLocal.state2.state}</div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                          <div className="text-sm font-medium text-gray-500">15. Employer's state ID number (2)</div>
                          <div className="text-sm text-gray-900">{w2Data.stateAndLocal.state2.stateIdNumber}</div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                          <div className="text-sm font-medium text-gray-500">16. State wages, tips, etc. (2)</div>
                          <div className="text-sm text-gray-900">${w2Data.stateAndLocal.state2.stateWages.toFixed(2)}</div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                          <div className="text-sm font-medium text-gray-500">17. State income tax (2)</div>
                          <div className="text-sm text-gray-900">${w2Data.stateAndLocal.state2.stateIncomeTax.toFixed(2)}</div>
                        </div>
                      </>
                    )}
                    
                    {w2Data.stateAndLocal.local.localityName && (
                      <>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                          <div className="text-sm font-medium text-gray-500">18. Local wages, tips, etc.</div>
                          <div className="text-sm text-gray-900">${w2Data.stateAndLocal.local.localWages.toFixed(2)}</div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                          <div className="text-sm font-medium text-gray-500">19. Local income tax</div>
                          <div className="text-sm text-gray-900">${w2Data.stateAndLocal.local.localIncomeTax.toFixed(2)}</div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                          <div className="text-sm font-medium text-gray-500">20. Locality name</div>
                          <div className="text-sm text-gray-900">{w2Data.stateAndLocal.local.localityName}</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </dl>
            </div>
            <div className="px-4 py-5 sm:px-6 flex justify-between">
              <button
                type="button"
                onClick={() => setW2Generated(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit W-2 Form
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Print W-2 Form
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
