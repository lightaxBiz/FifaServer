'use strict'

const Player = require('../model/player');
const Table = require('../model/table');

class RankinsController {
    constructor() {

    }

    async getAllRankings() {
        return [ new Table(1,
            'Fifa Tahat Hevre',
            [ new Player(1, 'Aviv', 5, 1, 3, 18, 7, 83),
              new Player(2, 'Yuster', 9, 2, 3, 23, 14, 90),
              new Player(3, 'Rozbaum', 5, 3, 3, 13, 12, 61),
              new Player(4, 'Avichay', 4, 3, 3, 7, 10, 45) ]) ];
    }
}

module.exports = new RankinsController();