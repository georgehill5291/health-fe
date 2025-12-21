import React, {useEffect, useState} from "react";
import {fetchPatients, createPatient} from "../services/api";

export default function Patients() {
    const [list, setList] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const p = await fetchPatients();
        setList(p);
    }

    async function onAdd(e) {
        e.preventDefault();
        const created = await createPatient({fullName: name});
        setName("");
        load();
    }

    return (
        <div>
            <h2>Patients</h2>
            <form onSubmit={onAdd}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name"/>
                <button type="submit">Add</button>
            </form>
            <ul>

                {
                    list?.$value?.map(p => (
                        <li key={p.id}>{p.fullName} ({p.email || "no email"})</li>
                    ))
                }
            </ul>
        </div>
    );
}
