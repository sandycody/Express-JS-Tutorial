const express = require('express');
const { v4: uuid } = require('uuid');

// In-memory JS array of games 
let games = [];

const app = express();
app.use(express.json());

// Helper function for generating 9 default moves('A1', 'A2', 'A3', 'B1', 'B2', 'B3' and so on...) in all
function generateTicTacToeMoves() {
    const alphas = ['A', 'B', 'C'];
    const numbers = [1, 2, 3];
    return alphas.flatMap(letter => numbers.map(num => letter + num));
}

app.get('/', (req, res) => {
    res.send("Welcome to My Home Page of Game");
});

// End-point for creating a new game
app.post('/games', (req, res) => {
    const newGameId = uuid();
    const newGame = {
        id: newGameId,
        playerXMoves: [],
        playerOMoves: [],
        availableMoves: generateTicTacToeMoves()
    }
    games.push(newGame);
    res.send(`Welcome to Tic-Tac-Toe! Your game id is ${newGameId}`);
});

// Helper function for getting game by id
function getGameById(id) {
    return games.find(game => game.id === id);
}

function isHorizontalWin(playerMoves) {
    return ['1', '2', '3'].some(num => playerMoves.filter(move => move.includes(num)).length >= 3);
}

function isVerticalWin(playerMoves) {
    return ['A', 'B', 'C'].some(letter => playerMoves.filter(move => move.includes(letter)).length >= 3);
}

function isDiagonalWin(playerMoves) {
    return ['A1', 'B2', 'C3'].every(move => playerMoves.includes(move)) 
            || 
           ['C1', 'B2', 'A3'].every(move => playerMoves.includes(move));
}

function isCornersWin(playerMoves) {
    return ['A1', 'C1', 'A3', 'C3'].every(move => playerMoves.includes(move));
} 

// Wrapper function of all above functions
function isWin(playerMoves) {
    return isHorizontalWin(playerMoves)
        || isVerticalWin(playerMoves)
        || isDiagonalWin(playerMoves)
        || isCornersWin(playerMoves);
}

// End-point for placing new moves on the board (or playing game)
app.post('/games/:gameId', (req, res) => {
    const { gameId } = req.params;
    const { move } = req.body;

    const game = getGameById(gameId);

    if (!game.availableMoves.includes(move)) {
        return res.send(`${move} is not a valid move!`);
    }

    game.playerXMoves.push(move);
    game.availableMoves = game.availableMoves.filter(m => m !== move);

    if (isWin(game.playerXMoves)) {
        return res.send('You won the game!');
    }
    
    if (game.availableMoves.length === 0) {
        res.send('The game is over! Nobody wins');
    }

    const serverMove = game.availableMoves[Math.floor(Math.random() * game.availableMoves.length)]; //Server can choose a random move from 9 default moves
    game.playerOMoves.push(serverMove);
    game.availableMoves = game.availableMoves.filter(m => m !== serverMove);

    if (isWin(game.playerOMoves)) {
        return res.send('You lost the game! Better luck next time');
    }

    res.json(game);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);
});