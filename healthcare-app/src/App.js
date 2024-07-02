import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import CreateAppointment from './components/Doctor/CreateAppointment';
import ViewAppointments from './components/Doctor/ViewAppointments';
import UpdateAppointment from './components/Doctor/UpdateAppointment';
import ReserveVisit from './components/Patient/ReserveVisit';
import ViewVisit from './components/Patient/ViewVisit';  
import CancelVisit from './components/Patient/CancelVisit';
import ViewVisitDetails from './components/Finance/ViewVisitDetails';
import CalculateTotalAmount from './components/Finance/CalculateTotalAmount';
import { useAuth } from './hooks/useAuth';
import './App.css';

const App = () => {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/doctor/dashboard" element={
          <>
            <CreateAppointment />
            <ViewAppointments />
          </>
        } />
        <Route path="/patient/dashboard" element={
          <>
            <ReserveVisit />
            <ViewVisit />
            <CancelVisit />
          </>
        } />
        <Route path="/finance/dashboard" element={
          <>
            <ViewVisitDetails />
            <CalculateTotalAmount />
          </>
        } />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
