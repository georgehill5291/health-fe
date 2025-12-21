// import React from "react";
// import Patients from "./components/Patients";
// import Appointments from "./components/Appointments";

// export default function App() {
//   return (
//     <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
//       <h1>Healthcare Demo</h1>
//       <div style={{ display: "flex", gap: 40 }}>
//         <div style={{ width: 400 }}>
//           <Patients />
//         </div>
//         <div style={{ width: 600 }}>
//           <Appointments />
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppointmentsPage from './pages/AppointmentsPage';
import PatientsPage from './pages/PatientsPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/patients" element={<PatientsPage />} />
            </Routes>
        </Router>
    );
};

export default App;