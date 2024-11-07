import React from 'react';

const steps = ['General Info', 'Catalog Info', 'Pricing', 'Shipping', 'Payment'];

export const ProgressBar = ({ currentStep }) => {
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ease-in-out ${
                index <= currentStep
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300'
              }`}
              aria-current={index === currentStep ? 'step' : undefined}
            >
              {index < currentStep ? (
                <svg className="w-4 h-4 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className={`text-sm ${index <= currentStep ? 'text-white' : ''}`}>{index + 1}</span>
              )}
            </div>
            <span className="text-xs mt-1">{step}</span>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          role="progressbar"
          aria-valuenow={(currentStep / (steps.length - 1)) * 100}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};