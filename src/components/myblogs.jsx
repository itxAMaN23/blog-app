import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './myblogs.css';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [showBlogs, setShowBlogs] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');
    const username = localStorage.getItem('username');

    useEffect(() => {
        const blogDelay = setTimeout(() => {
            setShowBlogs(true);
        }, 600);

        return () => clearTimeout(blogDelay);
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/all-blogs')
            .then(response => response.json())
            .then(data => {
                const userBlogs = data.filter(blog => blog.author === username);
                setBlogs(userBlogs);
            })
            .catch(error => console.error('Error fetching blogs:', error));
    }, [username]);

    return (
        <div className={`all-blogs-container fade-in ${showBlogs ? 'visible' : ''}`}>
            {deleteMessage && (
                <div className="delete-message">
                    {deleteMessage}
                </div>
            )}
            {blogs.length === 0 ? (
                <p style={{
                    backgroundColor: '#f9f9f9', color: '#333', textAlign: 'center', padding: '20px', borderRadius: '5px', margin: '20px auto', maxWidth: '600px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                }}>
                    You haven't created any blogs yet.
                </p>
            ) : (
                blogs.map(blog => (
                    <MyBlogCard key={blog._id} blog={blog} setDeleteMessage={setDeleteMessage} setBlogs={setBlogs} blogs={blogs} />
                ))
            )}
        </div>
    );
};

const MyBlogCard = ({ blog, setDeleteMessage, setBlogs, blogs }) => {
    const blogSlug = encodeURIComponent(blog.title.toLowerCase().replace(/ /g, '-'));

    const handleDelete = () => {
        const confirmed = window.confirm('Are you sure you want to delete this blog?');
        if (confirmed) {
            fetch(`http://localhost:5000/delete-blog/${blog._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => response.json())
                .then(() => {
                    setDeleteMessage('Blog deleted successfully!');
                    setBlogs(blogs.filter(item => item._id !== blog._id));
                    setTimeout(() => setDeleteMessage(''), 3000);
                })
                .catch(error => console.error('Error deleting blog:', error));
        }
    };

    return (
            <div className="blog-card">
                <div className="blog-image">
                    <img src={blog.image} alt={blog.title} />
                </div>
                <div className="blog-content">
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-description">{blog.desc.substring(0, 100)}...</p>
                    <div className="blog-author-date">
                        <span><b>{blog.author}</b> - {new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <Link to={`/blog/${blogSlug}`} className="read-more">
                        Read More
                    </Link>
                    <div className="blog-actions">
                        <Link to={`/edit-blog/${blog._id}`} className="edit-button">
                            <i className="fas fa-edit"></i> Edit
                        </Link>
                        <button onClick={handleDelete} className="delete-button">
                            <i className="fas fa-trash-alt"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
    );
};

export default MyBlogs;
