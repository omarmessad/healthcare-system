import React, { useState, useEffect } from 'react';
import { getMyVisits, cancelVisit } from '../../api/patientApi';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/CancelVisit.css';


const CancelVisit = () => {
  const { token } = useAuth();
  const [visits, setVisits] = useState([]);
  const [selectedVisitId, setSelectedVisitId] = useState('');
  const [message, setMessage] = useState('');

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

  const handleCancel = async () => {
    if (!selectedVisitId) {
      setMessage('Please select a visit to cancel.');
      return;
    }

    try {
      const visitToCancel = visits.find(visit => visit._id === selectedVisitId);
      if (!visitToCancel) {
        setMessage('Invalid visit.');
        return;
      }

      const visitDate = new Date(visitToCancel.visitDate);
      const now = new Date();
      const oneWeekBefore = new Date();
      oneWeekBefore.setDate(now.getDate() + 7);

      if (visitDate < oneWeekBefore) {
        setMessage('You can only cancel a visit up to a week in advance.');
        return;
      }

      await cancelVisit(selectedVisitId);
      setMessage('Visit cancelled successfully!');
      setVisits(visits.filter(visit => visit._id !== selectedVisitId));
      setSelectedVisitId('');
    } catch (error) {
      console.error('Error cancelling visit:', error);
      setMessage('Failed to cancel visit.');
    }
  };

  return (
    <div>
      <h2>Cancel a Visit</h2>
      <label htmlFor="visitId">Select Visit to Cancel:</label>
      <select
        id="visitId"
        value={selectedVisitId}
        onChange={(e) => setSelectedVisitId(e.target.value)}
      >
        <option value="">-- Select a Visit --</option>
        {visits.map((visit) => (
          <option key={visit._id} value={visit._id}>
            {visit.doctorName} - {new Date(visit.visitDate).toLocaleString()}
          </option>
        ))}
      </select>
      <button onClick={handleCancel}>Cancel Visit</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CancelVisit;
