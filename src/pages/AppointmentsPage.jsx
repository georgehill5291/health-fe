import React from 'react';
import Appointments from "../components/Appointments";

const AppointmentsPage = () => {
    return (
        <div>
            <h1>Appointments</h1>
            <div style={{display: "flex", gap: 40}}>
                <div style={{width: 600}}>
                    <Appointments/>
                </div>
            </div>
        </div>
    );
};

export default AppointmentsPage;