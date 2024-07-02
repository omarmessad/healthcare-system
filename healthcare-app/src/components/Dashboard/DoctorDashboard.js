import React from 'react';
import CreateAppointment from './CreateAppointment';
import UpdateAppointment from './UpdateAppointment';
import DeleteAppointment from './DeleteAppointment';
import ViewAppointments from './ViewAppointments';
import SearchPatientAppointment from './SearchPatientAppointment';

const DoctorDashboard = () => {
  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <CreateAppointment />
      <UpdateAppointment />
      <DeleteAppointment />
      <ViewAppointments />
      <SearchPatientAppointment />
    </div>
  );
};

export default DoctorDashboard;
