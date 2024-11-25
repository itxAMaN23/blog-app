import React, { useEffect } from 'react'
import '../components/navbar.css'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './authcontext';

export default function NavBar() {

    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/auth');
    };

    const location = useLocation();

    useEffect(() => {
        if (isLoggedIn && location.pathname === '/auth') {
            navigate('/');
        }
    }, [isLoggedIn, location, navigate]);

    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <img src="https://stackideas.com/images/apps/2429/logo.png" alt="BlogCraft" />
                </div>

                <div className="list-items">
                    <ul>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/all-blogs" className={({ isActive }) => isActive ? 'active' : ''}>All Blogs</NavLink>
                        </li>

                        {isLoggedIn ? (
                            <>
                                <li>
                                    <NavLink to="/create-a-blog" className={({ isActive }) => isActive ? 'active' : ''}>Create a Blog</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/my-blogs" className={({ isActive }) => isActive ? 'active' : ''}>My Blogs</NavLink>
                                </li>
                                <li>
                                    <i className="fa-solid fa-right-from-bracket" style={{ cursor: 'pointer' }} onClick={handleLogout}></i>
                                </li>
                            </>
                        ) : (
                            <li>
                                <NavLink to="/auth" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
                            </li>
                        )}
                    </ul>

                </div>

            </div>
        </>
    )
}
