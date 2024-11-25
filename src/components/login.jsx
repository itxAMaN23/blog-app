import React, { useState, useEffect } from 'react';
import '../components/login.css';
import { useAuth } from './authcontext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isSignUp ? 'http://localhost:5000/signup' : 'http://localhost:5000/signin';
        const userData = isSignUp ? { name, email, pass } : { email, pass };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.JWT);
                localStorage.setItem('username', data.name);
                setIsLoggedIn(true);
                setError('');
                navigate('/');
            } else {
                setError(data.error || data.message || 'Something went wrong');
            }
        } catch (error) {
            setError('Server error');
        }
    };

    return (
        <div className="auth-wrapper">
            <form onSubmit={handleSubmit} className="myForm">
                <h1>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</h1>

                {isSignUp && (
                    <div className="input-group">
                        <i className="fa-solid fa-user icon"></i>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your username" minLength={6} required
                        />
                    </div>
                )}

                <div className="input-group">
                    <i className="fa-solid fa-envelope icon"></i>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required
                    />
                </div>

                <div className="input-group">
                    <i className="fa-solid fa-lock icon"></i>
                    <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter your password" required minLength={6}
                    />
                </div>

                {error && (
                    <p className="show-error" aria-live="polite"> <i className="fa-solid fa-exclamation-circle"></i> {error}
                    </p>
                )}

                <button type="submit"> {isSignUp ? 'SIGN UP' : 'SIGN IN'} </button>

                <p className="toggle-signup">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <span onClick={() => setIsSignUp(!isSignUp)}> {isSignUp ? ' Sign In' : ' Create New Here'}</span>
                </p>
            </form>
        </div>
    );
}
