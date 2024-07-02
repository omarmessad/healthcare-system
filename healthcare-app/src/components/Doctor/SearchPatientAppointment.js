import React, { useState } from 'react';
import { getAppointmentByPatientName } from '../../api/doctorApi';
import { useAuth } from '../../hooks/useAuth';

const SearchPatientAppointment = () => {
  const { token } = useAuth();
  const [patientName, setPatientName] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await getAppointmentByPatientName(patientName, token);
      setAppointments(response);
      setError(null);
    } catch (err) {
      setError('No appointment found for this patient or an error occurred.');
      setAppointments([]);
    }
  };

  return (
    <div>
      <h2>Search Patient Appointment</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Enter patient name"
          required
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {appointments.length > 0 && (
        <div>
          <h3>Appointment Details</h3>
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment._id}>
                <p><strong>Doctor:</strong> {appointment.doctor.name}</p>
                <p><strong>Patient:</strong> {appointment.patient.name}</p>
                <p><strong>Date:</strong> {new Date(appointment.visitDate).toLocaleString()}</p>
                <p><strong>Treatments:</strong></p>
                <ul>
                  {appointment.treatments.map((treatment, index) => (
                    <li key={index}>
                      {treatment.name}: ${treatment.cost}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPatientAppointment;
