import express from 'express'; // ECMAScript Module
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Built-in Middleware 
app.use(cookieParser()); // Third-party Middleware

// Basic syntax of using express-middleware
app.use((req, res, next) => {
    // We can access Request type and path of request
    console.log(`Received a ${req.method} request on ${req.path}`); //Here {req.method} --> specifies a HTTP method and {req.path} --> specifies path added after slash in Postman URL

    // User Authentication
    const { username, password } = req.body;

    if (username !== 'Sandeep' || password !== 'abc123!') {
        return res.sendStatus(401);
    }

    // User object
    req.user = {
        name: "Sandeep",
        age: 22
    }

    next();
});


// GET, POST, PUT, DELETE --> Different request types of HTTP

app.get('/products', (req, res) => {
    // res.status(200).json({message: "Received a GET request on /products!"});

    // Creating a new resource...
    /*res.sendStatus(201);*/

    // To modify headers using res.set() and there can be multiple headers
    // console.log(req.headers); // Accessing headers
    /* res.set() --> Sets specified response header ( header ) to the specified value ( value ).
    res.set('Content-Type', 'application/html');
    res.set('Message', 'Hello!!');
    res.set('A', 'One');
    res.set('B', 'Two');
    res.set('C', 'Three');
    res.set('Date', 'Tue, 21 Apr 2024 ');*/

    // Working with cookies
    // console.log(req.cookies); //{ 'Shopping-Cart': 'Empty', UserId: '2124214' }
    res.cookie('shoppingCart', 'Empty');
    res.send(`Here is a cookie, ${req.user.name}!`);
});

app.put('/shopping-cart', (req, res) => {
    const { productId } = req.body;
    const { shoppingCart } = req.cookies;

    if (!shoppingCart) {
        res.cookie('shoppingCart', productId); // '100'
    } else {
        res.cookie('shoppingCart', shoppingCart + `, ${productId}`);
    }
    res.json({ message: `Successfully added item to cart by ${req.user.name}!` });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});