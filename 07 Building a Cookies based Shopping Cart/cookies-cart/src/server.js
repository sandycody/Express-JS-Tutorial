const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

let shoppingCarts = [
    {
        userId: '123', 
        itemIds: ['1', '2'] //Inserting ids of the names of user has in Cart
    }, 

    {
        userId: '234',
        itemIds: ['2', '3', '4']
    },

    {
        userId: '345',
        itemIds: ['4']
    }
];

// Another array of objects for storing names
let products = [
    {
        id: '1',
        name: 'Shoes',
        price: '$40.00'
    },

    {
        id: '2',
        name: 'Shirt',
        price: '$20.00'
    },

    {
        id: '3',
        name: 'Pants',
        price: '$30.00'
    },

    {
        id: '4',
        name: 'Hat',
        price: '$10.00'
    }
];

// let cartCookiesMiddleware = (req, res, next) => {
//     const cartIds = JSON.parse(req.cookies.cart);
//     req.cartIds = cartIds;
//     next();
// }

let cartCookiesMiddleware = (req, res, next) => {
    try {
        let cartIds = JSON.parse(req.cookies.cart);
        req.cartIds = cartIds;  // Assigning parsed cart IDs to req.cartIds
    } catch (error) {
        console.error('Error parsing cart cookie:', error);
        req.cartIds = [];  // Assigning an empty array as a fallback
    }
    next();
}

app.use(cartCookiesMiddleware);

let populateItemIds = (itemIds) => {
    return itemIds.map(id => products.find(p => p.id === id));
}

app.get('/cart', (req, res) => {
    // Loading Products and Shopping Cart Data and endpoint is also changed from '/users/:userId/cart' to '/cart' only
    // const cartIds = JSON.parse(req.cookies.cart); // We have created middleware above and done this parsing part there
    const cartProducts = req.cartIds.map(id => products.find(p => p.id === id));
    res.json(cartProducts);

    // const { userId } = req.params;
    // let shoppingCart = shoppingCarts.find(cart => cart.userId === userId);

    // if (shoppingCart) {
    //     res.json(shoppingCart.itemIds);
    // } else {
    //     res.sendStatus(404);
    // }
});

app.post('/cart', (req, res) => {
    const { itemId } = req.body;
    // const cartIds = JSON.parse(req.cookies.cart); // We have created middleware above and done this parsing part there
    const updatedCartIds = [...req.cartIds, itemId];
    const updatedCartProducts = populateItemIds(updatedCartIds);
        
    res.cookie('cart', JSON.stringify(updatedCartIds));
    res.json(updatedCartProducts);

    // const { userId } = req.params;
    // const { itemId } = req.body;
    // let shoppingCart = shoppingCarts.find(cart => cart.userId === userId);

    // shoppingCart.itemIds.push(itemId);
    // res.sendStatus(201);
});

app.delete('/cart/:itemId', (req, res) => {
    const { itemId } = req.params;
    // const cartIds = JSON.parse(req.cookies.cart); // We have created middleware above and done this parsing part there
    const updatedCartIds = req.cartIds.filter(id => id !== itemId);
    const updatedCartProducts = populateItemIds(updatedCartIds);

    res.cookie('cart', JSON.stringify(updatedCartIds));
    res.json(updatedCartProducts);

    // const { userId, itemId } = req.params;
    /*let shoppingCart = shoppingCarts.find(cart => cart.userId === userId);

    shoppingCart.itemIds = shoppingCart.itemIds.filter(id => id !== itemId)
    res.sendStatus(200);*/
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});