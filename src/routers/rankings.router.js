const express = require('express');
const router = express.Router();
const rankingsController = require('../controllers/rankings.controller');

const getRankings = async (req, res, next) => {
    try {
        const allRankings = await rankingsController.getAllRankings();
        res.status(200).json(allRankings);
    } catch (err) {
        next(err);
    }
}

const addGame = async (req, res, next) => {
    try {
        const tableId = req.body.tableId;
        const playerOneName = req.body.playerOneName;
        const playerOneScore = req.body.playerOneScore;
        const playerTwoName = req.body.playerTwoName;
        const playerTwoScore = req.body.playerTwoScore;
        await rankingsController.addGame(tableId, playerOneName, playerOneScore,playerTwoName, playerTwoScore);
        res.status(200).json('Saved');
    } catch (err) {
        next(err);
    }
}

const addTable = async (req, res, next) => {
    try {
        const tableName = req.body.tableName;
        const table = await rankingsController.addTable(tableName);
        res.status(200).json(table);
    } catch (err) {
        next(err);
    }
}

router.get('/', getRankings);
router.post('/addGame', addGame);
router.post('/addTable', addTable);

module.exports = router;
