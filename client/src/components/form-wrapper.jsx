import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from './progress-bar';
import { FormStep } from './form-step';

const steps = ['General Info', 'Catalog Info', 'Pricing', 'Shipping', 'Payment'];

export const FormWrapper = ({ id }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    shipping: '',
    payment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:3001/api/products/${id}`);
          if (response.ok) {
            const productData = await response.json();
            setFormData(productData);
          } else {
            console.error('Failed to fetch product data');
          }
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep !== steps.length - 1) {
      handleNextStep();
      return;
    }

    setIsSubmitting(true);
    
    try {
      const url = id
        ? `http://localhost:3001/api/editProduct/${id}`
        : 'http://localhost:3001/api/createProduct';

      const response = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(`Product ${id ? 'updated' : 'created'} successfully`);
        navigate('/');
      } else {
        console.error('Product operation failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <ProgressBar currentStep={currentStep} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormStep
          currentStep={currentStep}
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <p className="text-center font-semibold">Current Step: {steps[currentStep]}</p>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-300 ease-in-out"
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 text-white rounded transition-colors duration-300 ease-in-out ${
              currentStep === steps.length - 1
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } disabled:bg-opacity-50 disabled:cursor-not-allowed`}
          >
            {currentStep === steps.length - 1
              ? isSubmitting
                ? 'Submitting...'
                : 'Submit'
              : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};