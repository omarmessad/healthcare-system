import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const getDoctors = async () => {
  try {
    const response = await axios.get(`${API_URL}/doctors`); 
    return response.data;
  } catch (error) {
    throw new Error('Error fetching doctors.');
  }
};

export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_URL}/doctors/appointments`); 
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch appointments.');
  }
};

export const getAppointmentByPatientName = async (patientName, token) => {
  try {
    const response = await axios.get(`/api/doctor/appointments`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        patientName
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching appointment:', error);
    throw error;
  }
};

export const createAppointment = async (visitData, token) => {
  try {
    const response = await axios.post(`${API_URL}/doctors/appointments`, visitData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create an appointment.');
  }
};

export const updateAppointment = async (visitId, visitData, token) => {
  try {
    const response = await axios.put(`${API_URL}/appointments/${visitId}`, visitData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update appointment.');
  }
};

export const deleteAppointment = async (visitId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/appointments/${visitId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete appointment.');
  }
};
