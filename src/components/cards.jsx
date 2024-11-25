import React from 'react';
import './cards.css';

const topicColors = {
    Gaming: '#ffcc00', // Yellow
    Food: '#ff5733',   // Red
    Travel: '#33ccff', // Blue
    Astrology: '#9b59b6', // Purple
    Space: '#2ecc71',  // Green
};

const Card = ({ image, topic, title, description, date, author }) => {
    return (
        <div className="card-wrapper">
            <div className="card">
                <img src={image} alt={title} className="card-image" />
                <span className="card-badge" style={{ backgroundColor: topicColors[topic] }}>{topic}</span>
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                <div className="card-footer">
                    <span className="card-date">{date}</span>
                    <span className="card-author">~ {author}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
