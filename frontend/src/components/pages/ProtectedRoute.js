import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children, requireAdmin = false }) {
    const { user, isAuthenticated, isAdmin } = useAuth();

    // Ila ma connectéch → redirect l login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Ila page khassa b-admin w user ma adminch → redirect l home
    if (requireAdmin) {
        // ✅ HNA: isAdmin hia function, dir () bach t-executiha
        if (!isAdmin()) {
            return <Navigate to="/" replace />;
        }
    }

    return children;
}

export default ProtectedRoute;