import React, { useState, useEffect } from 'react';
import { reserveVisit, searchDoctors } from '../../api/patientApi';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/ReserveVisit.css';


const ReserveVisit = () => {
  const { token } = useAuth();
  const [doctorName, setDoctorName] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [confirmation, setConfirmation] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      if (doctorName.length > 2) {
        try {
          const results = await searchDoctors(doctorName);
          setDoctors(results);
        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      }
    };

    fetchDoctors();
  }, [doctorName, token]);

  const handleReserve = async () => {
    if (!selectedDoctor || !visitDate) {
      setConfirmation('Please select a doctor and a date.');
      return;
    }

    try {
      await reserveVisit(selectedDoctor, visitDate);
      setConfirmation('Visit reserved successfully!');
    } catch (error) {
      console.error('Error reserving visit:', error);
      setConfirmation('Failed to reserve visit.');
    }
  };

  return (
    <div>
      <h2>Reserve a Visit</h2>
      <label htmlFor="doctorName">Doctor Name:</label>
      <input
        type="text"
        id="doctorName"
        value={doctorName}
        onChange={(e) => setDoctorName(e.target.value)}
      />
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id} onClick={() => setSelectedDoctor(doctor._id)}>
            {doctor.name} ({doctor.specialty})
          </li>
        ))}
      </ul>
      <label htmlFor="visitDate">Visit Date:</label>
      <input
        type="datetime-local"
        id="visitDate"
        value={visitDate}
        onChange={(e) => setVisitDate(e.target.value)}
      />
      <button onClick={handleReserve}>Reserve Visit</button>
      {confirmation && <p>{confirmation}</p>}
    </div>
  );
};

export default ReserveVisit;
