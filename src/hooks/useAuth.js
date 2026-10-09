import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const session = sessionStorage.getItem('bg_session');
        if (session) {
            setUser(JSON.parse(session));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.success) {
                sessionStorage.setItem('bg_session', JSON.stringify(data.user));
                setUser(data.user);
                setIsAuthenticated(true);
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: 'Auth server offline' };
        }
    };

    const register = async (userData) => {
        try {
            const response = await fetch('http://localhost:5001/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            return await response.json();
        } catch (error) {
            return { success: false, message: 'Auth server offline' };
        }
    };

    const logout = () => {
        sessionStorage.removeItem('bg_session');
        setUser(null);
        setIsAuthenticated(false);
    };

    return { isAuthenticated, user, login, register, logout, loading };
};
