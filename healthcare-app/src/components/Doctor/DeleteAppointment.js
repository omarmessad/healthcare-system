import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/DeleteAppointment.css';

const DeleteAppointment = () => {
  const [doctorName, setDoctorName] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

    if (new Date(visitDate) < oneWeekFromNow) {
      setError('You can only cancel appointments at least one week in advance.');
      return;
    }

    try {
      await axios.delete('/doctor/appointments', {
        data: { doctorName, visitDate },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });

      setMessage('Appointment canceled successfully.');
      setDoctorName('');
      setVisitDate('');
    } catch (error) {
      setError('Failed to cancel the appointment.');
    }
  };

  return (
    <div className="delete-appointment-container">
      <h2>Cancel Appointment</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="doctorName">Doctor Name</label>
          <input
            type="text"
            id="doctorName"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Enter Doctor's Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="visitDate">Visit Date</label>
          <input
            type="date"
            id="visitDate"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleDelete}>Cancel Appointment</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DeleteAppointment;
