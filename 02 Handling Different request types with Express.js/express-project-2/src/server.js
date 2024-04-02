import express from 'express'; // ECMAScript Module

const app = express();

app.use(express.json()); // Built-in Middleware 

const PORT = process.env.PORT || 3000;


// Three different ways of adding extra data to the client side and how to handle those three ways in express

/*
    1. Request Body (usually in JSON format)
    2. URL Parameters ('/products/123')
    3. Query Parameters (?search=expressjs&type=videos)
*/


// GET, POST, PUT, DELETE --> Different request types of HTTP

app.get('/products', (req, res) => {
    res.send('Received a GET request on /products!');
});

// Handling URL parameter
app.get('/products/:productId', (req, res) => {
    let { search, artist } = req.query;
    let { productId } = req.params;
    res.send(`Here is the product with id: ${productId}. Also the search string is ${search} and the artist is ${artist}.`);
});

// Request body parameter 
app.post('/login', (req, res) => {
    let { username, password } = req.body;
    res.send(`Logging in user with username : ${username} and Password : ${password}`);
});

app.post('/products', (req, res) => {
    let { productId } = req.body;
    res.send(`Received a POST request with the Product Id : ${productId}`);
});


app.put('/products', (req, res) => {
    res.send('Received a PUT request on /products!');
});

app.delete('/products', (req, res) => {
    res.send('Received a DELETE request on /products!');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});