const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const games = {};



router.post('/create', (req, res) => {
    const game = new Game();
    games[game.id] = game;
    res.json({ gameId: game.id, board: game.board });
});

router.post('/:id/move', (req, res) => {
    const { position } = req.body;
    const gameId = req.params.id;

    console.log(`Received move for game ID: ${gameId}, position: ${position}`);

    const game = games[gameId];
    if (!game) {
        console.log(`Game not found for ID: ${gameId}`);
        return res.status(404).json({ error: 'Game not found' });
    }

    const success = game.makeMove(position);
    if (!success) return res.status(400).json({ error: 'Invalid move' });

    res.json({
        board: game.board,
        currentPlayer: game.currentPlayer,
        winner: game.winner,
        isDraw: game.isDraw,
    });
});

router.get('/:id', (req, res) => {
    const game = games[req.params.id];
    if (!game) return res.status(404).json({ error: 'Game not found' });

    res.json({
        board: game.board,
        currentPlayer: game.currentPlayer,
        winner: game.winner,
        isDraw: game.isDraw,
    });
});


router.post('/:id/reset', (req, res) => {
    const game = games[req.params.id];
    if (!game) return res.status(404).json({ error: 'Game not found' });

    game.reset();
    res.json({ message: 'Game reset', board: game.board });
});

module.exports = router;