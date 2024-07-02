import React, { useState } from 'react';
import { calculateTotalAmountByPatientName } from '../../api/financeApi';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/CalculateTotalAmount.css';


const CalculateTotalAmount = () => {
  const { token } = useAuth();
  const [patientName, setPatientName] = useState('');
  const [totalAmount, setTotalAmount] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    if (!patientName) {
      setError('Please enter a patient name.');
      return;
    }

    try {
      const amount = await calculateTotalAmountByPatientName(patientName);
      setTotalAmount(amount);
      setError('');
    } catch (error) {
      setError('Failed to calculate total amount.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Calculate Total Amount</h2>
      <label htmlFor="patientName">Patient Name:</label>
      <input
        type="text"
        id="patientName"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />
      <button onClick={handleCalculate}>Calculate</button>
      {error && <p>{error}</p>}
      {totalAmount !== null && <p><strong>Total Amount Due:</strong> ${totalAmount}</p>}
    </div>
  );
};

export default CalculateTotalAmount;
