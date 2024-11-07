import React from 'react';

export const FormStep = ({ currentStep, formData, handleInputChange }) => {
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
            className="w-full p-2 border border-gray-300 rounded transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        );
      case 1:
        return (
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter Product Description"
            className="w-full p-2 border border-gray-300 rounded transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring focus:ring-blue-200"
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
            className="w-full p-2 border border-gray-300 rounded transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring focus:ring-blue-200"
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
            className="w-full p-2 border border-gray-300 rounded transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring focus:ring-blue-200"
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
            className="w-full p-2 border border-gray-300 rounded transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="animate-fadeIn">
      {renderForm()}
    </div>
  );
};