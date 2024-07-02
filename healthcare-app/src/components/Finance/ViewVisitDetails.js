import React, { useState, useEffect } from 'react';
import { getVisitDetails } from '../../api/financeApi';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/ViewVisitDetails.css';


const ViewVisitDetails = () => {
  const { token } = useAuth();
  const [visitId, setVisitId] = useState('');
  const [visitDetails, setVisitDetails] = useState(null);
  const [error, setError] = useState('');

  const handleFetchDetails = async () => {
    if (!visitId) {
      setError('Please enter a visit ID.');
      return;
    }

    try {
      const details = await getVisitDetails(visitId);
      setVisitDetails(details);
      setError('');
    } catch (error) {
      setError('Failed to fetch visit details.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>View Visit Details</h2>
      <label htmlFor="visitId">Visit ID:</label>
      <input
        type="text"
        id="visitId"
        value={visitId}
        onChange={(e) => setVisitId(e.target.value)}
      />
      <button onClick={handleFetchDetails}>Get Details</button>
      {error && <p>{error}</p>}
      {visitDetails && (
        <div>
          <h3>Visit Details</h3>
          <p><strong>Doctor:</strong> {visitDetails.doctor.name}</p>
          <p><strong>Patient:</strong> {visitDetails.patient.name}</p>
          <p><strong>Date:</strong> {new Date(visitDetails.visitDate).toLocaleString()}</p>
          <p><strong>Treatments:</strong></p>
          <ul>
            {visitDetails.treatments.map((treatment, index) => (
              <li key={index}>{treatment.name}: ${treatment.cost}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewVisitDetails;
