const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(express.json())
app.use(cors())

// Mongo DB Connection
mongoose.connect('mongodb://localhost:27017/blogAPP', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Schema 
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    desc: String,
    slug: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    author: String
});

// User Auth
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: String,
    createdAt: { type: Date, default: Date.now }
});

const userModel = mongoose.model('User', userSchema);

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const slugify = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-'); // Replace spaces with hyphens
};

const blogModel = mongoose.model('BlogPost', blogSchema);

// Routes
app.get('/all-blogs', (req, res) => {
    blogModel.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).send(err));
});

app.get('/blog/:slug', async (req, res) => {
    try {
        const slug = req.params.slug;
        const blog = await blogModel.findOne({ slug });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/create-a-blog', (req, res) => {
    const { title, image, desc, author } = req.body;
    const slug = slugify(title);

    const newPost = new blogModel({ title, image, desc, slug, author });
    newPost.save()
        .then(() => res.status(201).send('Post created'))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.post('/signup', (req, res) => {
    const { name, email, pass } = req.body;
    const newUser = new userModel({ name, email, password: pass });

    newUser.save()
        .then((savedUser) => {
            // Generate JWT token after successful signup
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(201).json({ message: 'User Created Successfully', name: name, email: email, JWT: token });
        })
        .catch(err => {
            console.error('Error saving user:', err); // Log the full error for debugging
            if (err.name === 'ValidationError') {
                res.status(400).json({ error: 'Validation Error', details: err.message });
            } else if (err.code === 11000) { // Duplicate key error
                res.status(400).json({ error: 'Email already exists' });
            } else {
                res.status(500).json({ error: 'Server error. Please try again later.' }); // Generic server error
            }
        });
});


app.post('/signin', async (req, res) => {
    const { email, pass } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (user.password !== pass) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = generateToken(user._id);
        res.json({ message: 'Login successful', name: user.name, JWT: token });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
        console.log(err.message)
    }
});

// Delete blog 
app.delete('/delete-blog/:id', (req, res) => {
    const { id } = req.params;
    blogModel.findByIdAndDelete(id)
        .then(() => res.json({ message: 'Blog deleted successfully' }))
        .catch(err => res.status(500).json({ error: 'Failed to delete blog' }));
});
// Fetch blog data by ID for editing
app.get('/edit-blog/:id', async (req, res) => {
    console.log('Requested Blog ID:', req.params.id); // Debugging log
    try {
        const blog = await blogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog); // Send the blog data to populate the edit form
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update blog post by ID
app.put('/update-blog/:id', async (req, res) => {
    const { title, image, desc } = req.body;

    try {
        const updatedBlog = await blogModel.findByIdAndUpdate(
            req.params.id,
            { title, image, desc },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json({ message: 'Blog updated successfully', updatedBlog });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: 'Failed to update blog' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
})

