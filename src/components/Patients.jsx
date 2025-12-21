import React, {useEffect, useState} from "react";
import {fetchPatients, createPatient} from "../services/api";
import '../styles/patients.css';

export default function Patients() {
    const [list, setList] = useState(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        setLoading(true);
        try {
            const p = await fetchPatients();
            setList(p);
        } finally {
            setLoading(false);
        }
    }

    async function onAdd(e) {
        e.preventDefault();
        if (!name) return;
        await createPatient({fullName: name});
        setName("");
        load();
    }

    // Normalize different API response shapes to an array of patients
    const items = Array.isArray(list)
        ? list
        : (list && Array.isArray(list.$values))
            ? list.$values
            : [];

    return (
        <div className="patients-panel">
            <h2>Patients</h2>
            <form onSubmit={onAdd} className="patient-form">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" />
                <button type="submit">Add</button>
            </form>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <ul className="patients-list">
                    {items.map(p => (
                        <li key={p.id}>{p.fullName} ({p.email || "no email"})</li>
                    ))}
                </ul>
            )}

            {(!loading && items.length === 0) && <div className="no-patients">No patients yet</div>}
        </div>
    );
}
