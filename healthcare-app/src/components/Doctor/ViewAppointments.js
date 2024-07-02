import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/ViewAppointments.css';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');  

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/doctor/appointments', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
      } catch (err) {
        setError('Failed to fetch appointments.');
      }
    };

    fetchAppointments();
  }, [token]);

  return (
    <div className="view-appointments-container">
      <h2>View Appointments</h2>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            <p>Doctor: {appointment.doctorName}</p>
            <p>Date: {appointment.visitDate}</p>
            <p>Treatments: {appointment.treatments.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAppointments;
