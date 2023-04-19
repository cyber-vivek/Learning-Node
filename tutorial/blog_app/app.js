const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();

// express app
const app = express();

// connet to mongodb
const dbURI = process.env.DBURI;

mongoose.connect(dbURI)
.then((result) => {
    app.listen(3000);
})
.catch((err) => {
    console.log("error occured")
    console.log(err);
})


// register view engine
app.set('view engine', 'ejs');

// To change directory to look for default folder is views
// app.set('views','myviews');


// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));


// midddleware
// app.use((req,res,next)=>{
//     console.log('new request made:');
//     console.log('host: ',req.hostname);
//     console.log('path: ',req.path);
//     console.log('mehtod: ',req.mehtod);
//     next();
// });


// routes

app.get('/', (req, res) => {

    // res.write();
    // res.end();

    // in express we can use this
    // with this we don't need to set header, express automatically infers the type of content we are sending and sets the content type
    // it also infers the status code
    // res.send('<p> Home</p>');

    // res.sendFile('./views/index.html',{root:__dirname})

    // to serve ejs files
    res.redirect('/blogs')
    // res.render('index', { title: 'Home' });
});

// middleware
// app.use((req,res,next)=>{
//     console.log('in the next middleware');
//     next();
// });

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})

app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

// blog routes
app.use('/blogs',blogRoutes);

// 404 page
// use() function tells to use this callback function if none of the urls match above get urls
// it must be at the bottom of the url mapping (it fires for every single request)
app.use((req, res) => {
    // status method returns the res object only
    res.status(404).render('404', { title: '404' });
})