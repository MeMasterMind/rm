import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormWrapper } from './form-wrapper';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <FormWrapper id={id} />
      <button
        onClick={() => navigate('/')}
        className="mt-4 text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out"
      >
        ← Back to Home
      </button>
    </div>
  );
}