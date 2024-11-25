import React, { useState, useEffect } from 'react';
import { useAuth } from './authcontext';
import { useNavigate } from 'react-router-dom';
import './createblog.css';

export default function CreateBlog() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [desc, setDesc] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/auth');
        }
    }, [isLoggedIn, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        const newPost = { title, image, desc, author: localStorage.getItem('username') };

        try {
            const response = await fetch('http://localhost:5000/create-a-blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newPost),
            });

            if (response.ok) {
                setSuccess('Blog post created successfully!');
                setError('');
            } else {
                setSuccess('');
                const errorData = await response.json();
                setError(errorData.message || 'Failed to create post');
            }

            setTitle('');
            setImage('');
            setDesc('');
            setError('');

        } catch (error) {
            setError('Failed to create post: ' + error.message);
            setSuccess('');
        }
    }

    function handleChange(e) {
        const { id, value } = e.target;
        if (id === 'title') setTitle(value);
        if (id === 'image') setImage(value);
        if (id === 'description') setDesc(value);
    }

    return (
        <div className='create-blog'>
            <h1>Create a New Blog Post!</h1>
            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor="title">Blog Title</label>
                <input type="text" id="title" value={title} onChange={handleChange} placeholder="Enter blog title" required />
                
                <label htmlFor="image">Image URL</label>
                <input type="url" id="image" value={image} onChange={handleChange} placeholder="Enter image URL" required />
                
                <label htmlFor="description">Description</label>
                <textarea id="description" value={desc} onChange={handleChange} placeholder="Write your blog description..." rows="4" required></textarea>
                
                <button type="submit">Create Blog Post</button>

                {error && <div className="show-errors"><p>{error}</p></div>}
                {success && <div className="show-success"><p>{success}</p></div>}
            </form>
        </div>
    );
}
