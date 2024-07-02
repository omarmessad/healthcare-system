import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;

export const getVisitDetails = async (visitId) => {
  try {
    const response = await axios.get(`${API_URL}/finance/visits/${visitId}`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch visit details.');
  }
};

export const calculateTotalAmountByPatientName = async (patientName) => {
  try {
    const response = await axios.get(`${API_URL}/finance/calculate-total`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`
      },
      params: { patientName }
    });
    return response.data.totalAmount;
  } catch (error) {
    throw new Error('Failed to calculate total amount.');
  }
};
