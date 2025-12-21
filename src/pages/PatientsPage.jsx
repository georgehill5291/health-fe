import React from 'react';
import Patients from "../components/Patients";

const PatientsPage = () => {
    return (
        <div>
            <h1>Patients</h1>
            <div style={{ display: "flex", gap: 40 }}>
              <div style={{ width: 400 }}>
                <Patients />
              </div>
            </div>
        </div>
    );
};

export default PatientsPage;