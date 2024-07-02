import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;

export const searchDoctors = async (doctorName) => {
  try {
    const response = await axios.get(`${API_URL}/patient/doctors?name=${doctorName}`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to search for doctors.');
  }
};

export const reserveVisit = async (doctorId, visitDate) => {
  try {
    await axios.post(`${API_URL}/patient/reserve-visit`, { doctorId, visitDate }, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`
      }
    });
  } catch (error) {
    throw new Error('Failed to reserve visit.');
  }
};

export const getMyVisits = async () => {
  try {
    const response = await axios.get(`${API_URL}/patient/my-visits`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch visits.');
  }
};

export const getVisitDetails = async (visitId) => {
  try {
    const response = await axios.get(`${API_URL}/patient/visits/${visitId}`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch visit details.');
  }
};

export const cancelVisit = async (visitId) => {
  try {
    await axios.delete(`${API_URL}/patient/cancel-visit/${visitId}`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`
      }
    });
  } catch (error) {
    throw new Error('Failed to cancel visit.');
  }
};
