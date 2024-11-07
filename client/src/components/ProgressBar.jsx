import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const steps = ['General Info', 'Catalog Info', 'Pricing', 'Shipping', 'Payment'];

const ProgressBar = ({ currentStep }) => {
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                index <= currentStep
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300'
              }`}
              aria-current={index === currentStep ? 'step' : undefined}
            >
              {index < currentStep ? (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className={`text-sm ${index <= currentStep && 'text-white'}`}>{index + 1}</span>
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

const FormWrapper = () => {
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
  const { id } = useParams();

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

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter Product Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
        );
      case 1:
        return (
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter Product Description"
            className="w-full p-2 border border-gray-300 rounded"
          />
        );
      case 2:
        return (
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter Product Price"
            className="w-full p-2 border border-gray-300 rounded"
          />
        );
      case 3:
        return (
          <input
            type="text"
            name="shipping"
            value={formData.shipping}
            onChange={handleInputChange}
            placeholder="Enter Shipping Info"
            className="w-full p-2 border border-gray-300 rounded"
          />
        );
      case 4:
        return (
          <input
            type="text"
            name="payment"
            value={formData.payment}
            onChange={handleInputChange}
            placeholder="Enter Payment Info"
            className="w-full p-2 border border-gray-300 rounded"
          />
        );
      default:
        return null;
    }
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <ProgressBar currentStep={currentStep} />
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderForm()}
        <p className="text-center font-semibold">Current Step: {steps[currentStep]}</p>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 text-white rounded ${
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

export default function Component() {
  return <FormWrapper />;
}