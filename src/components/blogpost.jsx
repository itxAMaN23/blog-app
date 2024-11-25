import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './blogpost.css';

const Blogpost = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [suggestedBlogs, setSuggestedBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/blog/${slug}`);

                if (!response.ok) {
                    throw new Error('Blog not found');
                }
                const data = await response.json();
                setBlog(data);

                const suggestedResponse = await fetch(`http://localhost:5000/all-blogs`);
                const suggestedData = await suggestedResponse.json();
                setSuggestedBlogs(suggestedData.filter(b => b.slug !== slug));

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    if (loading) return <p className="loading-message">Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!blog) return <p className="no-blog-message">No blog found.</p>;

    return (
        <div className="blog-container">
            <div className="blog-title">
                <h1>{blog.title}</h1>
            </div>
            <div className="author-date">
                <span>{`By ${blog.author} on ${new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })}`}</span>
            </div>

            <div className="separator"></div>
            <div className="image-container">
                <img src={blog.image} alt={blog.title} />
            </div>
            <div className="desc-container">
                <h2>Description</h2>
                <p>{blog.desc}</p>
            </div>

            <div className="suggested-blogs">
                <h2>Suggested Blogs</h2>
                <div className="suggested-blogs-container">
                    {suggestedBlogs.map(suggestedBlog => (
                        <div key={suggestedBlog._id} className="suggested-blog-card">
                            <img src={suggestedBlog.image} alt={suggestedBlog.title} />
                            <div className="suggested-blog-content">
                                <h3>{suggestedBlog.title}</h3>
                                <Link to={`/blog/${suggestedBlog.slug}`} className="read-more-link">Read More</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogpost;
