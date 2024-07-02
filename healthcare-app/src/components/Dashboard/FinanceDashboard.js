import React from 'react';
import ViewVisitDetails from './ViewVisitDetails';
import CalculateTotalAmount from './CalculateTotalAmount';

const FinanceDashboard = () => {
  return (
    <div>
      <h2>Finance Dashboard</h2>
      <ViewVisitDetails />
      <CalculateTotalAmount />
    </div>
  );
};

export default FinanceDashboard;
