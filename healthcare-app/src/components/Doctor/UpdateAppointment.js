import React, { useState, useEffect } from 'react';
import { updateAppointment } from '../../api/doctorApi';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/UpdateAppointment.css';


const UpdateAppointment = ({ visitId }) => {
  const { token } = useAuth();
  const [appointmentData, setAppointmentData] = useState({});
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`/appointments/${visitId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setAppointmentData(data);
        setTreatments(data.treatments || []);
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    };
    fetchAppointment();
  }, [visitId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({
      ...appointmentData,
      [name]: value
    });
  };

  const handleTreatmentChange = (index, e) => {
    const { name, value } = e.target;
    const newTreatments = [...treatments];
    newTreatments[index] = { ...newTreatments[index], [name]: value };
    setTreatments(newTreatments);
  };

  const addTreatment = () => {
    setTreatments([...treatments, { name: '', cost: '' }]);
  };

  const removeTreatment = (index) => {
    setTreatments(treatments.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAppointment(visitId, { ...appointmentData, treatments }, token);
      console.log('Appointment updated successfully:', response);
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <div>
      <h2>Update Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="visitDate">Visit Date:</label>
        <input
          type="datetime-local"
          id="visitDate"
          name="visitDate"
          value={appointmentData.visitDate}
          onChange={handleChange}
        />
        <label>Treatments:</label>
        {treatments.map((treatment, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              value={treatment.name}
              onChange={(e) => handleTreatmentChange(index, e)}
              placeholder="Treatment Name"
            />
            <input
              type="number"
              name="cost"
              value={treatment.cost}
              onChange={(e) => handleTreatmentChange(index, e)}
              placeholder="Cost"
            />
            <button type="button" onClick={() => removeTreatment(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addTreatment}>Add Treatment</button>
        <button type="submit">Update Appointment</button>
      </form>
    </div>
  );
};

export default UpdateAppointment;
