import React from 'react';
import Patients from "../components/Patients";
import '../styles/patients.css';

const PatientsPage = () => {
    return (
        <div className="patients-page">
            <h1>Patients</h1>
            <div className="patients-grid">
              <div className="patients-panel">
                <Patients />
              </div>
            </div>
        </div>
    );
};

export default PatientsPage;