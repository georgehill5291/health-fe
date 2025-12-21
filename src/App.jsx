import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AppointmentsPage from './pages/AppointmentsPage';
import PatientsPage from './pages/PatientsPage';

// Add AuthProvider and LoginPage
import { AuthProvider, useAuth } from './contexts/AuthProvider';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditPatientPage from './pages/EditPatientPage';
import CreatePatientPage from './pages/CreatePatientPage';
import Header from './components/Header';
import LeftNav from './components/LeftNav';
import './styles/leftnav.css';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
};

const AppLayout = ({ children }) => (
    <div>
        <Header />
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <LeftNav />
            <main style={{ flex: 1, padding: 20 }}>{children}</main>
        </div>
    </div>
)

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppLayout>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/appointments" element={<ProtectedRoute><AppointmentsPage /></ProtectedRoute>} />
                        <Route path="/patients" element={<ProtectedRoute><PatientsPage /></ProtectedRoute>} />
                        <Route path="/patients/create" element={<ProtectedRoute><CreatePatientPage /></ProtectedRoute>} />
                        <Route path="/patients/:id/edit" element={<ProtectedRoute><EditPatientPage /></ProtectedRoute>} />
                        <Route path="/" element={<Navigate to="/patients" replace />} />
                    </Routes>
                </AppLayout>
            </Router>
        </AuthProvider>
    );
};

export default App;