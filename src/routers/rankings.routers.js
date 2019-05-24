const express = require('express');
const router = express.Router();

const getRankings = async (req, res, next) => {
    try {
        res.status(200).json('rankings');
    } catch (err) {
        next(err);
    }
}

router.get('/', getRankings);

module.exports = router;
