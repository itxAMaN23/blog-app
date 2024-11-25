import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedinIn, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import '../components/footer.css';

export default function Footer() {

    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const footer = document.getElementById('lazy-footer');
        if (footer && window.scrollY + window.innerHeight >= footer.offsetTop) {
            setIsVisible(true);
            window.removeEventListener('scroll', handleScroll); // Remove listener after loading
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
    }, []);

    return (
        <>
            <div id="lazy-footer" className={`footer-section ${isVisible ? 'fade-in' : ''}`}>
                <div className="left">
                    <h1>Get in Touch</h1>
                    <p>Whether you have questions, feedback, or just want to share your thoughts, feel free to reach out. Your insights help us grow and improve, and we’re always here to connect with our readers!</p>
                    <div className="socials">
                        <span><FontAwesomeIcon icon={faInstagram} /></span>
                        <span><FontAwesomeIcon icon={faLinkedinIn} /></span>
                        <span><FontAwesomeIcon icon={faPinterestP} /></span>
                        <span><FontAwesomeIcon icon={faTwitter} /></span>
                    </div>
                </div>

                <div className="right">
                    <div className="card">
                        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="link" >
                            <span> <FontAwesomeIcon icon={faGlobe} /> </span>
                            <span>Visit Our Website</span>
                        </a>
                    </div>
                    <div className="card">
                        <a href="mailto:your.email@example.com" className="link">
                            <span><FontAwesomeIcon icon={faEnvelope} /></span>
                            <span>Email Us</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
