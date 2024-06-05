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
        shorten: (str, length) => str.slice(0, length),
        formatDate: (dateObj) => dateObj.toLocaleDateString()
    } 
}));
app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, '/views')); 
/* OR (Another Method)*/
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        articles: articles.slice().sort((art1, art2) => art2.upvotes - art1.upvotes) //Sorting in descending order using Numeric Sort on Array in JS
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
        article: matchingArticle,
        articles: articles.filter(art => art.id !== articleId)
    });
});

app.put('/api/articles/:articleId/upvotes', (req, res) => {
    const { articleId } = req.params;
    const matchingArticle = articles.find(art => art.id === articleId);
    matchingArticle.upvotes += 1;
    res.json(matchingArticle);
});

app.post('/api/articles/:articleId/comments', (req, res) => {
    const { articleId } = req.params;
    const matchingArticle = articles.find(art => art.id === articleId);
    
    const { author, text } = req.body;
    const newComment = { author, text, createdAt: new Date().toLocaleDateString() };

    matchingArticle.comments.push(newComment);
    res.json(newComment); //We just have to send the new comment
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);
});