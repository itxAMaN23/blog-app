import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './allblogs.css';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    const [showBlogs, setshowBlogs] = useState(false)

    useEffect(() => {
        const blogDelay = setTimeout(() => {
            setshowBlogs(true)
        }, 600);

        return () => clearTimeout(blogDelay);
    }, [])


    useEffect(() => {
        fetch('http://localhost:5000/all-blogs')
            .then(response => response.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);

    return (
        <div className={`all-blogs-container fade-in ${showBlogs ? 'visible' : ''}`}>
            {blogs.length === 0 ? (
                <p className="no-blogs-message">
                    Your Blogs will be shown here.
                </p>
            ) : (
                blogs.map(blog => (
                    <BlogCard key={blog._id} blog={blog} />
                ))
            )}
        </div>
    );

};

const BlogCard = ({ blog }) => {
    const blogSlug = encodeURIComponent(blog.title.toLowerCase().replace(/ /g, '-'));
    return (
        <div className="blog-card">
            <div className="blog-image">

                <img src={blog.image} alt={blog.title} />
            </div>
            <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-description">{blog.desc.substring(0, 100)}...</p>
                <div className="blog-author-date">
                    <span><b>{blog.author}</b> - {new Date().toLocaleDateString()}</span>
                </div>
                <Link to={`/blog/${blogSlug}`} className="read-more">
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default AllBlogs;
