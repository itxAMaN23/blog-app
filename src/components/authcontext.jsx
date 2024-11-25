import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('token')));

    useEffect(() => {
        if (isLoggedIn) {
            localStorage.setItem('token', localStorage.getItem('token'));
        } else {
            localStorage.removeItem('token');
        }
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
