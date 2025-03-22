'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PaystubGenerator() {
  const [formData, setFormData] = useState({
    // Employee Information
    employeeName: '',
    employeeAddress: '',
    employeeSSN: '',
    
    // Employer Information
    employerName: '',
    employerAddress: '',
    employerEIN: '',
    
    // Pay Period Information
    payPeriod: '',
    payDate: '',
    
    // Earnings Information
    regularHours: '',
    regularRate: '',
    overtimeHours: '',
    overtimeRate: '',
    
    // Tax Information
    federalWithholding: '',
    socialSecurityRate: '6.2',
    medicareRate: '1.45',
    stateWithholdingRate: '',
    stateCode: '',
    localWithholdingRate: '',
    localityName: '',
    
    // Additional Information
    ytdGrossEarnings: '',
    ytdFederalWithholding: '',
    ytdSocialSecurity: '',
    ytdMedicare: '',
    ytdStateWithholding: '',
    ytdLocalWithholding: '',
  });

  const [paystubGenerated, setPaystubGenerated] = useState(false);
  const [paystubData, setPaystubData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculatePaystub = () => {
    // Calculate regular earnings
    const regularEarnings = parseFloat(formData.regularHours) * parseFloat(formData.regularRate);
    
    // Calculate overtime earnings (1.5x regular rate)
    const overtimeEarnings = parseFloat(formData.overtimeHours || 0) * parseFloat(formData.overtimeRate || 0);
    
    // Calculate gross earnings
    const grossEarnings = regularEarnings + overtimeEarnings;
    
    // Calculate tax withholdings
    const federalWithholding = (parseFloat(formData.federalWithholding) / 100) * grossEarnings;
    const socialSecurityWithholding = (parseFloat(formData.socialSecurityRate) / 100) * grossEarnings;
    const medicareWithholding = (parseFloat(formData.medicareRate) / 100) * grossEarnings;
    const stateWithholding = (parseFloat(formData.stateWithholdingRate || 0) / 100) * grossEarnings;
    const localWithholding = (parseFloat(formData.localWithholdingRate || 0) / 100) * grossEarnings;
    
    // Calculate total deductions
    const totalDeductions = federalWithholding + socialSecurityWithholding + medicareWithholding + stateWithholding + localWithholding;
    
    // Calculate net pay
    const netPay = grossEarnings - totalDeductions;
    
    // Update YTD values
    const ytdGrossEarnings = parseFloat(formData.ytdGrossEarnings || 0) + grossEarnings;
    const ytdFederalWithholding = parseFloat(formData.ytdFederalWithholding || 0) + federalWithholding;
    const ytdSocialSecurity = parseFloat(formData.ytdSocialSecurity || 0) + socialSecurityWithholding;
    const ytdMedicare = parseFloat(formData.ytdMedicare || 0) + medicareWithholding;
    const ytdStateWithholding = parseFloat(formData.ytdStateWithholding || 0) + stateWithholding;
    const ytdLocalWithholding = parseFloat(formData.ytdLocalWithholding || 0) + localWithholding;
    
    // Create paystub data object
    const paystubData = {
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
      payPeriodInfo: {
        period: formData.payPeriod,
        date: formData.payDate
      },
      earnings: {
        regularHours: parseFloat(formData.regularHours),
        regularRate: parseFloat(formData.regularRate),
        regularEarnings: regularEarnings,
        overtimeHours: parseFloat(formData.overtimeHours || 0),
        overtimeRate: parseFloat(formData.overtimeRate || 0),
        overtimeEarnings: overtimeEarnings,
        grossEarnings: grossEarnings
      },
      deductions: {
        federalWithholding: federalWithholding,
        socialSecurityWithholding: socialSecurityWithholding,
        medicareWithholding: medicareWithholding,
        stateWithholding: stateWithholding,
        stateCode: formData.stateCode,
        localWithholding: localWithholding,
        localityName: formData.localityName,
        totalDeductions: totalDeductions
      },
      totals: {
        netPay: netPay,
        ytdGrossEarnings: ytdGrossEarnings,
        ytdFederalWithholding: ytdFederalWithholding,
        ytdSocialSecurity: ytdSocialSecurity,
        ytdMedicare: ytdMedicare,
        ytdStateWithholding: ytdStateWithholding,
        ytdLocalWithholding: ytdLocalWithholding
      }
    };
    
    setPaystubData(paystubData);
    setPaystubGenerated(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculatePaystub();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Paystub Generator
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Create professional paystubs with accurate tax calculations
          </p>
          <div className="mt-4">
            <Link href="/" className="text-indigo-600 hover:text-indigo-500">
              ← Back to Home
            </Link>
          </div>
        </div>

        {!paystubGenerated ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
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

                {/* Pay Period Information */}
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Pay Period Information</h3>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="payPeriod" className="block text-sm font-medium text-gray-700">
                        Pay Period
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="payPeriod"
                          id="payPeriod"
                          value={formData.payPeriod}
                          onChange={handleChange}
                          placeholder="e.g., Jan 1-15, 2025"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="payDate" className="block text-sm font-medium text-gray-700">
                        Pay Date
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          name="payDate"
                          id="payDate"
                          value={formData.payDate}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Earnings Information */}
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Earnings Information</h3>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="regularHours" className="block text-sm font-medium text-gray-700">
                        Regular Hours
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="regularHours"
                          id="regularHours"
                          value={formData.regularHours}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="regularRate" className="block text-sm font-medium text-gray-700">
                        Regular Rate ($/hour)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="regularRate"
                          id="regularRate"
                          value={formData.regularRate}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="overtimeHours" className="block text-sm font-medium text-gray-700">
                        Overtime Hours
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="overtimeHours"
                          id="overtimeHours"
                          value={formData.overtimeHours}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="overtimeRate" className="block text-sm font-medium text-gray-700">
                        Overtime Rate ($/hour)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="overtimeRate"
                          id="overtimeRate"
                          value={formData.overtimeRate}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tax Information */}
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Tax Information</h3>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                      <label htmlFor="federalWithholding" className="block text-sm font-medium text-gray-700">
                        Federal Withholding (%)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="federalWithholding"
                          id="federalWithholding"
                          value={formData.federalWithholding}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          step="0.1"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="socialSecurityRate" className="block text-sm font-medium text-gray-700">
                        Social Security Rate (%)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="socialSecurityRate"
                          id="socialSecurityRate"
                          value={formData.socialSecurityRate}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          step="0.1"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="medicareRate" className="block text-sm font-medium text-gray-700">
                        Medicare Rate (%)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="medicareRate"
                          id="medicareRate"
                          value={formData.medicareRate}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          step="0.1"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="stateCode" className="block text-sm font-medium text-gray-700">
                        State Code
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="stateCode"
                          id="stateCode"
                          value={formData.stateCode}
                          onChange={handleChange}
                          placeholder="e.g., CA, NY"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="stateWithholdingRate" className="block text-sm font-medium text-gray-700">
                        State Withholding Rate (%)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="stateWithholdingRate"
                          id="stateWithholdingRate"
                          value={formData.stateWithholdingRate}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          step="0.1"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
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

                    <div className="sm:col-span-3">
                      <label htmlFor="localWithholdingRate" className="block text-sm font-medium text-gray-700">
                        Local Withholding Rate (%)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="localWithholdingRate"
                          id="localWithholdingRate"
                          value={formData.localWithholdingRate}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          step="0.1"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* YTD Information */}
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Year-to-Date Information (Optional)</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter previous YTD amounts (before this pay period)
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                      <label htmlFor="ytdGrossEarnings" className="block text-sm font-medium text-gray-700">
                        YTD Gross Earnings
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="ytdGrossEarnings"
                          id="ytdGrossEarnings"
                          value={formData.ytdGrossEarnings}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="ytdFederalWithholding" className="block text-sm font-medium text-gray-700">
                        YTD Federal Withholding
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="ytdFederalWithholding"
                          id="ytdFederalWithholding"
                          value={formData.ytdFederalWithholding}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="ytdSocialSecurity" className="block text-sm font-medium text-gray-700">
                        YTD Social Security
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="ytdSocialSecurity"
                          id="ytdSocialSecurity"
                          value={formData.ytdSocialSecurity}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="ytdMedicare" className="block text-sm font-medium text-gray-700">
                        YTD Medicare
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="ytdMedicare"
                          id="ytdMedicare"
                          value={formData.ytdMedicare}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="ytdStateWithholding" className="block text-sm font-medium text-gray-700">
                        YTD State Withholding
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="ytdStateWithholding"
                          id="ytdStateWithholding"
                          value={formData.ytdStateWithholding}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="ytdLocalWithholding" className="block text-sm font-medium text-gray-700">
                        YTD Local Withholding
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="ytdLocalWithholding"
                          id="ytdLocalWithholding"
                          value={formData.ytdLocalWithholding}
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
                      Generate Paystub
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
                Paystub for {paystubData.employeeInfo.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Pay Period: {paystubData.payPeriodInfo.period} | Pay Date: {paystubData.payPeriodInfo.date}
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Employee</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {paystubData.employeeInfo.name}<br />
                    {paystubData.employeeInfo.address}<br />
                    SSN: {paystubData.employeeInfo.ssn}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Employer</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {paystubData.employerInfo.name}<br />
                    {paystubData.employerInfo.address}<br />
                    EIN: {paystubData.employerInfo.ein}
                  </dd>
                </div>
                
                <div className="bg-gray-50 px-4 py-5 sm:px-6">
                  <h4 className="text-sm font-medium text-gray-500">Earnings</h4>
                  <div className="mt-2 border-t border-gray-200">
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 py-3">
                      <div className="text-sm font-medium text-gray-500">Description</div>
                      <div className="text-sm font-medium text-gray-500">Hours</div>
                      <div className="text-sm font-medium text-gray-500">Rate</div>
                      <div className="text-sm font-medium text-gray-500">Amount</div>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                      <div className="text-sm text-gray-900">Regular Pay</div>
                      <div className="text-sm text-gray-900">{paystubData.earnings.regularHours.toFixed(2)}</div>
                      <div className="text-sm text-gray-900">${paystubData.earnings.regularRate.toFixed(2)}</div>
                      <div className="text-sm text-gray-900">${paystubData.earnings.regularEarnings.toFixed(2)}</div>
                    </div>
                    {paystubData.earnings.overtimeHours > 0 && (
                      <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                        <div className="text-sm text-gray-900">Overtime Pay</div>
                        <div className="text-sm text-gray-900">{paystubData.earnings.overtimeHours.toFixed(2)}</div>
                        <div className="text-sm text-gray-900">${paystubData.earnings.overtimeRate.toFixed(2)}</div>
                        <div className="text-sm text-gray-900">${paystubData.earnings.overtimeEarnings.toFixed(2)}</div>
                      </div>
                    )}
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 py-3 border-t border-gray-200 font-bold">
                      <div className="text-sm text-gray-900">Gross Pay</div>
                      <div className="text-sm text-gray-900"></div>
                      <div className="text-sm text-gray-900"></div>
                      <div className="text-sm text-gray-900">${paystubData.earnings.grossEarnings.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white px-4 py-5 sm:px-6">
                  <h4 className="text-sm font-medium text-gray-500">Deductions</h4>
                  <div className="mt-2 border-t border-gray-200">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3">
                      <div className="text-sm font-medium text-gray-500">Description</div>
                      <div className="text-sm font-medium text-gray-500">Current</div>
                      <div className="text-sm font-medium text-gray-500">YTD</div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                      <div className="text-sm text-gray-900">Federal Income Tax</div>
                      <div className="text-sm text-gray-900">${paystubData.deductions.federalWithholding.toFixed(2)}</div>
                      <div className="text-sm text-gray-900">${paystubData.totals.ytdFederalWithholding.toFixed(2)}</div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                      <div className="text-sm text-gray-900">Social Security Tax</div>
                      <div className="text-sm text-gray-900">${paystubData.deductions.socialSecurityWithholding.toFixed(2)}</div>
                      <div className="text-sm text-gray-900">${paystubData.totals.ytdSocialSecurity.toFixed(2)}</div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                      <div className="text-sm text-gray-900">Medicare Tax</div>
                      <div className="text-sm text-gray-900">${paystubData.deductions.medicareWithholding.toFixed(2)}</div>
                      <div className="text-sm text-gray-900">${paystubData.totals.ytdMedicare.toFixed(2)}</div>
                    </div>
                    {paystubData.deductions.stateWithholding > 0 && (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                        <div className="text-sm text-gray-900">{paystubData.deductions.stateCode} State Income Tax</div>
                        <div className="text-sm text-gray-900">${paystubData.deductions.stateWithholding.toFixed(2)}</div>
                        <div className="text-sm text-gray-900">${paystubData.totals.ytdStateWithholding.toFixed(2)}</div>
                      </div>
                    )}
                    {paystubData.deductions.localWithholding > 0 && (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200">
                        <div className="text-sm text-gray-900">{paystubData.deductions.localityName} Local Tax</div>
                        <div className="text-sm text-gray-900">${paystubData.deductions.localWithholding.toFixed(2)}</div>
                        <div className="text-sm text-gray-900">${paystubData.totals.ytdLocalWithholding.toFixed(2)}</div>
                      </div>
                    )}
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 py-3 border-t border-gray-200 font-bold">
                      <div className="text-sm text-gray-900">Total Deductions</div>
                      <div className="text-sm text-gray-900">${paystubData.deductions.totalDeductions.toFixed(2)}</div>
                      <div className="text-sm text-gray-900"></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Net Pay</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-bold text-xl">
                    ${paystubData.totals.netPay.toFixed(2)}
                  </dd>
                </div>
                
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">YTD Gross Earnings</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    ${paystubData.totals.ytdGrossEarnings.toFixed(2)}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="px-4 py-5 sm:px-6 flex justify-between">
              <button
                type="button"
                onClick={() => setPaystubGenerated(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Paystub
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Print Paystub
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
