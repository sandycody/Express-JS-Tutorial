const express = require('express');
const { engine } = require('express-handlebars');
const { escapeExpression } = require('handlebars');
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());

let todos = [
    {
        id: '123',
        text: "Go to the grocery store",
        isCompleted: false
    },

    {
        id: '234',
        text: `Do 100 push-ups`,
        isCompleted: false
    }
];

app.engine('hbs', engine());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    const safeTodos = todos.map(t => ({
        ...t,
        text: escapeExpression(t.text)
    }));

    res.render('index', {
        layout: false,
        todos,
        todoString: JSON.stringify(safeTodos)
    });
});

app.post('/todos', (req, res) => {
    const { newTodoText } = req.body;
    const newTodo = {
        id: uuid(),
        text: escapeExpression(newTodoText),
        isCompleted: false
    };
    todos.push(newTodo);
    res.json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id === id);
    todo.isCompleted = true;
    res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoToDelete = todos.find(t => t.id === id);

    if (todoToDelete) {
        todos = todos.filter(t => t.id !== id);
        res.json(todoToDelete);
    } else {
        res.status(404).json({ error: "Todo not found" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);
});