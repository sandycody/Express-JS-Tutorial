const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('hbs', engine());
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
        layout: false, 
        pageTitle: "My First Handlebars Page",
        mainHeading: "Hello from Handlebars!"
    });
});

/*app.get('/products', (req, res) => {
    res.render('index', {
        layout: false,
        pageTitle: 'Products',
        mainHeading: 'All Products'
    });
});*/

let users = [
    {
        id: '1',
        name: 'Sandeep',
        age: 22,
        hairColor: 'Black'   
    },

    {
        id: '2',
        name: 'Rajan',
        age: 34,
        hairColor: 'Blonde'
    },

    {
        id: '3',
        name: 'Khan Bhaini',
        age: 40,
        hairColor: 'Brown'
    },

    {
        id: '4',
        name: 'Mira Aunty',
        hairColor: 'Brown'
    }
];

app.get('/users', (req, res) => {
    res.render('users-list', {
        layout: false,
        users
    });
});

// Combining URL Parameter with Templates
app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const user = users.find(user => user.id === userId);

    if (user) {
        res.render('user-profile', {
            layout: false,
            /*name: user.name,
            age: user.age,
            hairColor: user.hairColor*/
            // Instead of all this which has done above, we can use:
            user
        });
    } else {
        res.sendStatus(404);
    }

});

let products = [
    {
        name: 'Shoes',
        price: 50
    }, 
    
    {
        name: 'Socks',
        price: 10
    },

    {
        name: 'Shirt',
        price: 20
    },

    {
        name: 'Jeans',
        price: 30
    }
];

// Combining query parameter with templates 
app.get('/products', (req, res) => {
    const { name, price } = req.query;

    let responseProducts = products;

    if (name) {
        responseProducts = responseProducts.filter(p => p.name.includes(name));
    } 
    
    if (price) {
        responseProducts = responseProducts.filter(p => p.price < Number(price));
    }

    res.render('products', {
        layout: false,
        productNames: responseProducts.map(p => p.name).join(', ')
    });
});


// User 1 Template
/*app.get('/user-1', (req, res) => {
    res.render('user-profile', {
        layout: false,
        name: 'Sandeep',
        age: 22,
        hairColor: 'Black'
    });
});*/

// User 2 Template
/*app.get('/user-2', (req, res) => {
    res.render('user-profile', {
        layout: false,
        name: 'Rajan',
        age: 34,
        hairColor: 'Blonde'
    });
});*/

// User 3 Template
/*app.get('/user-3', (req, res) => {
    res.render('user-profile', {
        layout: false,
        name: 'Khan Bhaini',
        age: 40,
        hairColor: 'Brown'
    });
});*/

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});