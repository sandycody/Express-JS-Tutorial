const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const users = [
    {
        id: '100',
        name: 'Sandeep Wadhawan'
    },

    {
        id: '200',
        name: 'Khan Bhaini'
    },

    {
        id: '300',
        name: 'Navaan Sandhu'
    }
];

app.get('/', (req, res) => {
    // console.log(__dirname); //D:\Kirabiz Internship\Building Webservers with Express.js Tutorial\05 Front-End Execution Basics\front-end-basics\src
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/users', (req, res) => {
    res.json(users); // This res.json(users) sends back the array of user objects as a JSON response to Javascript code which receives the response.
}); 

app.post('/api/users', (req, res) => {
    const { name } = req.body;
    users.push({id: '400', name});
    res.json(users);
});

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);
});