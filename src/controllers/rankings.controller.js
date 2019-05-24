'use strict'

const Player = require('../model/player');
const Table = require('../model/table');
const Game = require('../model/game');

class RankinsController {

    constructor() {
        this.playersArray = [ new Player(1, 'Aviv', 0, 0, 0, 0, 0, 0, 0, []),
            new Player(2, 'Yuster', 0, 0, 0, 0, 0, 0, 0, []),
            new Player(3, 'Rozbaum', 0, 0, 0, 0, 0, 0, 0, []),
            new Player(4, 'Avichay', 0, 0, 0, 0, 0, 0, 0, []) ];
        this.gamesArray = [];
    }

    async getAllRankings() {
        return [ new Table(1,
            'Fifa Tahat Hevre',
            this.playersArray) ];
    }

    async addGame(playerOneName, playerOneScore,playerTwoName, playerTwoScore) {
        await this._addPlayersIfNeeded([ playerOneName, playerTwoName ]);
        const playerOne = await this._getPlayerByNames(playerOneName);
        const playerTwo = await this._getPlayerByNames(playerTwoName);
        await this._addGame(playerOne, playerTwo, playerOneScore, playerTwoScore);
    }

    async _addPlayersIfNeeded(playerNames) {
        playerNames.forEach(playerName => {
            if (!this.playersArray.find(player => player.getPlayerName() === playerName)) {
                this.playersArray.add(new Player(this.playersArray[this.playersArray.length -1].getPlayerId() + 1, playerOneName, 0, 0,0,0,0,0));
            }
        });
    }

    async _getPlayerByNames(playerName) {
        for (var i = 0; i < this.playersArray.length; i++) {
            const player = this.playersArray[i];
            if (playerName === player.getPlayerName()) {
                return player;
            }
        }
        return null;
    }

    async _addGame(playerOne, playerTwo, playerOneScore, playerTwoScore) {
        const game = new Game(this.gamesArray[this.gamesArray.length -1].getGameId() + 1, playerOne, playerTwo, playerOneScore, playerTwoScore);
        this.gamesArray.add(game);
        playerOne.addGame(game);
        playerTwo.addGame(game);
    }
}

module.exports = new RankinsController();