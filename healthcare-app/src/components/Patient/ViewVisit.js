import React, { useState, useEffect } from 'react';
import { getMyVisits } from '../../api/patientApi';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/ViewVisit.css';

const ViewVisit = () => {
  const { token } = useAuth();
  const [visits, setVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const visitsData = await getMyVisits();
        setVisits(visitsData);
      } catch (error) {
        console.error('Error fetching visits:', error);
      }
    };

    fetchVisits();
  }, [token]);

  return (
    <div className="view-visit-container">
      <h2>View My Visits</h2>
      {visits.length === 0 ? (
        <p>No upcoming visits.</p>
      ) : (
        <ul>
          {visits.map((visit) => (
            <li key={visit._id}>
              <button onClick={() => setSelectedVisit(visit)}>
                {visit.doctorName} - {new Date(visit.visitDate).toLocaleString()}
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedVisit && (
        <div className="visit-details">
          <h3>Visit Details</h3>
          <p><strong>Doctor:</strong> {selectedVisit.doctorName}</p>
          <p><strong>Date:</strong> {new Date(selectedVisit.visitDate).toLocaleString()}</p>
          <p><strong>Treatments:</strong></p>
          <ul>
            {selectedVisit.treatments.map((treatment, index) => (
              <li key={index}>
                {treatment.name}: ${treatment.cost}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewVisit;
