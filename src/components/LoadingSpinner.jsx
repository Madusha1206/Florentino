import React from 'react';

const LoadingSpinner = ({ label = 'Loading' }) => (
  <div className="deployment-spinner" role="status" aria-label={label}>
    {Array.from({ length: 10 }, (_, index) => (
      <div key={index} />
    ))}
  </div>
);

export default LoadingSpinner;
