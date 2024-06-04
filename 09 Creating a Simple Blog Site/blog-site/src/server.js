const express = require('express');
const { engine } = require('express-handlebars');
// const path = require('path'); //To join different file locations
const articles = require('./articles-data');

const app = express();
app.use(express.json());

app.engine('hbs', engine({
    extname: 'hbs', 
    // partialsDir: path.join(__dirname, '/views', '/partials'),
    /* OR using without path.join() */
    partialsDir: __dirname + '/views' + '/partials',
    helpers: {
        shorten: (str, length) => str.slice(0, length)
    } 
}));
app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, '/views')); 
/* OR (Another Method)*/
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

app.get('/articles', (req, res) => {
    res.render('articles-list', {
        title: 'Articles',
        articles 
    });
});

app.get('/articles/:articleId', (req, res) => {
    const { articleId } = req.params;
    const matchingArticle = articles.find(art => art.id === articleId);
    res.render('individual-article', {
        title: matchingArticle.title,
        article: matchingArticle
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);
});