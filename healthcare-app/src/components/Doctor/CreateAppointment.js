import React, { useState, useEffect } from 'react';
import { createAppointment } from '../../api/doctorApi';
import { useAuth } from '../../hooks/useAuth';
import Cookies from 'js-cookie';
import '../../styles/CreateAppointment.css';


const CreateAppointment = () => {
  const { token } = useAuth();
  const [visitData, setVisitData] = useState({
    doctorName: '',
    patientName: '',
    visitDate: '',
    treatments: []
  });

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/doctors');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitData({
      ...visitData,
      [name]: value
    });
  };

  const handleTreatmentChange = (index, e) => {
    const { name, value } = e.target;
    const newTreatments = [...visitData.treatments];
    newTreatments[index] = { ...newTreatments[index], [name]: value };
    setVisitData({ ...visitData, treatments: newTreatments });
  };

  const addTreatment = () => {
    setVisitData({
      ...visitData,
      treatments: [...visitData.treatments, { name: '', cost: '' }]
    });
  };

  const removeTreatment = (index) => {
    setVisitData({
      ...visitData,
      treatments: visitData.treatments.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createAppointment({
        doctorName: visitData.doctorName,
        patientName: visitData.patientName,
        visitDate: visitData.visitDate,
        treatments: visitData.treatments
      }, token);
      console.log('Visit created successfully:', response);
    } catch (error) {
      console.error('Error creating visit:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Visit</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="doctorName">Doctor Name:</label>
        <select
          id="doctorName"
          name="doctorName"
          value={visitData.doctorName}
          onChange={handleChange}
        >
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor._id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </select>
        <label htmlFor="patientName">Patient Name:</label>
        <input
          type="text"
          id="patientName"
          name="patientName"
          value={visitData.patientName}
          onChange={handleChange}
        />
        <label htmlFor="visitDate">Visit Date:</label>
        <input
          type="datetime-local"
          id="visitDate"
          name="visitDate"
          value={visitData.visitDate}
          onChange={handleChange}
        />
        <label>Treatments:</label>
        {visitData.treatments.map((treatment, index) => (
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
        <button type="submit">Create Appointment</button>
      </form>
    </div>
  );
};

export default CreateAppointment;
