import express from 'express'; // ECMAScript Module
import cookieParser from 'cookie-parser';
import { v4 as uuid } from 'uuid';
import users from './users.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Built-in Middleware 
app.use(cookieParser()); // Third-party Middleware


// Create 

/* We'll see how to create endpoint for new resources*/

app.post('/users', (req, res) => {
    let { username, password } = req.body;
    
    let newUser = {
        id: uuid(), //Random id generation for a new user
        username,
        password,
        numberOfArticles: 0,
    };

    users.push(newUser);

    // res.sendStatus(201); //Sending status code as Created
    // res.status(201).send(newUser.id); //for sending response as random id
    // res.status(201).json(newUser); //for sending a new user as response
    res.status(201).json(users); //least efficient way
});

// Read (Load) --> If user wants to read all the resources, then it is referred to as a 'List' endpoint, 'Read One' and 'Search' endpoint

/*app.get('/users', (req, res) => {
    res.json(users);
});*/

// Using userId for individual user
app.get('/users/:userId', (req, res) => {
    let { userId } = req.params;
    let user = users.find(user => user.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404); //if user does not exist then execute this else statement
    }
});

// Loading resources using some sort of Search
// For that list endpoint and search endpoint, combined together to have a single endpoint
app.get('/users', (req, res) => {
    let { search } = req.query;

    if (search) {
        let matches = users.filter(user => user.username.includes(search));
        res.json(matches);
    } else {    
        res.json(users);
    }
});

// Update 
app.put('/users/:userId', (req, res) => { //Path is same as for using individual user
    let { userId } = req.params;
    let { username, numberOfArticles } = req.body;

    let user = users.find(user => user.id === userId);

    if (user) {
        user.username = username;
        user.numberOfArticles = numberOfArticles;
        res.status(201).json(user);
    } else {
        res.sendStatus(404);
    }
});

// Delete
app.delete('/users/:userId', (req, res) => {
    let { userId } = req.params;
    // find the index in users.js where this user occurs 
    let userIndex = users.findIndex(user => user.id === userId);

    if (userIndex >= 0) {
        // We'll use splice operation to remove the user
        users.splice(userIndex, 1);
        res.json(users);
    } else {
        res.json({message: "User Id doesn't exist"});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});