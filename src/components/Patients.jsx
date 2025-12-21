import React, {useEffect, useState} from "react";
import {fetchPatients, deletePatient} from "../services/api";
import { Link } from 'react-router-dom';
import '../styles/patients.css';

export default function Patients() {
    const [list, setList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        setLoading(true);
        setError(null);
        try {
            const p = await fetchPatients();
            setList(p);
        } catch (e) {
            setError(e?.message || 'Failed to load patients');
        } finally {
            setLoading(false);
        }
    }

    async function onDelete(id) {
        if (!window.confirm('Delete this patient?')) return;
        try {
            setDeleting(id);
            await deletePatient(id);
            // remove from UI list optimistically
            setList(prev => (Array.isArray(prev) ? prev.filter(x => x.id !== id) : prev));
        } catch (e) {
            // TODO: show error to user
            console.error(e);
            setError(e?.message || 'Delete failed');
        } finally {
            setDeleting(null);
        }
    }

    // Normalize different API response shapes to an array of patients
    const items = Array.isArray(list)
        ? list
        : (list && Array.isArray(list.$values))
            ? list.$values
            : [];

    return (
        <div className="patients-panel">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
                <h2 style={{margin: 0}}>Patients</h2>
                <Link to="/patients/create" className="add-btn">+ Add patient</Link>
            </div>

            {error && <div className="error">{error}</div>}

            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="patients-table" role="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(p => (
                            <tr key={p.id}>
                                <td data-label="ID">{p.id}</td>
                                <td data-label="Full name">{p.fullName}</td>
                                <td data-label="Email">{p.email || '—'}</td>
                                <td data-label="Phone">{p.phone || '—'}</td>
                                <td data-label="Actions">
                                    <div className="patient-actions">
                                        <Link to={`/patients/${p.id}/edit`} className="edit-link">Edit</Link>
                                        <button onClick={() => onDelete(p.id)} disabled={deleting === p.id} className="delete-btn">{deleting === p.id ? 'Deleting...' : 'Delete'}</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {(!loading && items.length === 0) && <div className="no-patients">No patients yet</div>}
        </div>
    );
}
