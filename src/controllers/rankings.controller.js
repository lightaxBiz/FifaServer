'use strict'

const Player = require('../model/player');
const Table = require('../model/table');
const Game = require('../model/game');

class RankingsController {

    constructor() {
        this.playersArray = [ new Player(1, 'Aviv', 0, 0, 0, 0, 0, 0, 0, []),
            new Player(2, 'Yuster', 0, 0, 0, 0, 0, 0, 0, []),
            new Player(3, 'Rozbaum', 0, 0, 0, 0, 0, 0, 0, []),
            new Player(4, 'Avichay', 0, 0, 0, 0, 0, 0, 0, []) ];
        this.gamesArray = [];
        this.tables = [ new Table(1, 'Fifa Tahat Hevre', this.playersArray, this.gamesArray) ];
    }

    async getAllRankings() {
        return this.tables;
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
		    const newPlayerId = this.playersArray.length === 0
		             ? 0
		             : this.playersArray[this.playersArray.length -1].getPlayerId() + 1
                this.playersArray.push(new Player(newPlayerId, playerName, 0, 0, 0, 0, 0, 0, 0, []));
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
	    const newGameId = this.gamesArray.length === 0
		    ? 0 
		    : this.gamesArray[this.gamesArray.length -1].getGameId() + 1;
        const game = new Game(newGameId, playerOne.getPlayerName(), playerTwo.getPlayerName(), playerOneScore, playerTwoScore);
        this.gamesArray.push(game);
        playerOne.addGame(game);
        playerTwo.addGame(game);
    }
}

module.exports = new RankingsController();
