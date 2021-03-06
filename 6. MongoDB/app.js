const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://netninja:test1234@blogapp.gwt1w.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) =>{
    res.redirect('/blogs');
});

app.get('/about', (req, res) =>{
    res.render('about', {title: 'About Us'});
});

// blog routes
app.get('/blogs', (req, res) =>{
    Blog.find().sort({ createdAt: -1 })
        .then((result) =>{
            res.render('index', {title: 'All Blogs', blogs: result});
        })
        .catch((err) =>{
            console.log(err);
        });
});

app.get('/blogs/create', (req, res) =>{
    res.render('create', {title: 'Create New Blog'});
})

// 404 page
app.use((req, res) =>{
    res.status(404).render('404', {title: '404'});
});