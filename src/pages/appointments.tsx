import { useEffect, useState } from 'react';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📅 All Booked Appointments</h1>
      <table border="1" cellPadding="10" style={{ marginTop: '1rem', width: '100%' }}>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt: any) => (
            <tr key={appt.appointmentID}>
              <td>{appt.appointmentID}</td>
              <td>{appt.name}</td>
              <td>{appt.email}</td>
              <td>{appt.date}</td>
              <td>{appt.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

