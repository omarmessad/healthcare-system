import React from 'react';
import ReserveVisit from './ReserveVisit';
import ViewVisit from './ViewVisit';
import CancelVisit from './CancelVisit';

const PatientDashboard = () => {
  return (
    <div>
      <h2>Patient Dashboard</h2>
      <ReserveVisit />
      <ViewVisit />
      <CancelVisit />
    </div>
  );
};

export default PatientDashboard;
