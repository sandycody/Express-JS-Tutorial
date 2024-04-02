import express from 'express'; // ECMAScript Module
import fs from 'fs';

const app = express();

const PORT = process.env.PORT || 3000;

// Request handler
/* app.use((req, res) => {
    // Separating Express Routes by req.path and usinf if-else statements
    if (req.path === '/users') {
        res.send('The user is : Sandeep Wadhawan');
    } else if (req.path === '/products') {
        res.send('The site has 100 products');
    } else {
        res.send('Unrecognised path');
    }
}); */

// Separating Express Routes wihtout using req.path and if-else statements

app.use('/users', (req, res) => {
    res.send('The user is : Sandeep Wadhawan');
});

app.use('/products', (req, res) => {
    res.send('The site has 100 products');
});

app.use((req, res) => {
    res.send('Unrecognised Path');
});


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});