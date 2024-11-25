import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext';

export default function EditBlog() {
    const { id } = useParams();
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

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/edit-blog/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setTitle(data.title);
                    setImage(data.image);
                    setDesc(data.desc);
                } else {
                    setError('Failed to load blog data');
                }
            } catch (error) {
                setError('Failed to load blog data');
            }
        };

        fetchBlogData();
    }, [id]);

    async function handleUpdate(e) {
        e.preventDefault();

        const updatedPost = { title, image, desc };

        try {
            const response = await fetch(`http://localhost:5000/update-blog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedPost),
            });

            if (response.ok) {
                setSuccess('Blog post updated successfully!');
                setError('');
                setTitle('');
                setImage('');
                setDesc('');
                setTimeout(() => {
                    navigate(`/my-blogs`);
                }, 1000);
                
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to update post');
                setSuccess('');
            }
        } catch (error) {
            setError('Failed to update post: ' + error.message);
            setSuccess('');
        }
    }

    return (
        <div className='create-blog' style={{ fontFamily: 'Poppins', color: '#fff', margin: '10px 0 30px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1>Edit Blog Post</h1>

            <form onSubmit={handleUpdate} className='form' style={{ backgroundColor: '#634897', borderRadius: '10px', width: '100%', maxWidth: '700px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="title" style={{ margin: '10px 0 5px' }}>Blog Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter blog title" required style={{ fontFamily: 'Poppins', outline: 'none', borderRadius: '10px', padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }} />

                <label htmlFor="image" style={{ margin: '10px 0 5px' }}>Image URL</label>
                <input type="url" id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter image URL" required style={{ fontFamily: 'Poppins', outline: 'none', borderRadius: '10px', padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }} />

                <label htmlFor="description" style={{ margin: '10px 0 5px' }}>Description</label>
                <textarea id="description" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Write your blog description..." rows="4" style={{ fontFamily: 'Poppins', outline: 'none', borderRadius: '10px', padding: '10px', border: '1px solid #ccc', maxWidth: '670px', marginBottom: '10px' }} required />

                <button type="submit" style={{ fontFamily: 'Poppins', margin: 'auto', backgroundColor: '#ff4081', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s' }}>
                    Update Blog Post
                </button>

                <div className="show-errors" style={{ marginTop: '10px', color: '#ff4d4f', fontWeight: 'bold', textAlign: 'center', fontSize: '1rem', backgroundColor: '#f9d6d5', padding: '5px', borderRadius: '5px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '700px', display: error ? 'block' : 'none' }}>
                    {error && <p>{error}</p>}
                </div>

                <div className="show-success" style={{ marginTop: '10px', color: '#4CAF50', fontWeight: 'bold', textAlign: 'center', fontSize: '1rem', backgroundColor: '#d4edda', padding: '5px', borderRadius: '5px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '700px', display: success ? 'block' : 'none' }}>
                    {success && <p>{success}</p>}
                </div>
            </form>
        </div>
    );
}
