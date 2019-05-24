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

router.get('/', getRankings);

module.exports = router;
