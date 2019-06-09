'use strict'

const Table = require('../model/table');
const Game = require('../model/game');
const tablesDB = require('../db/tables.db');
const playerDB = require('../db/players.db');
const gamesDB = require('../db/games.db');

class RankingsController {

    // public methods

    async getAllRankings() {
        const allTables = await tablesDB.getAllTables();
        return allTables;
    }

    async addGame(tableId, firstPlayerName, firstPlayerScore, secondPlayerName, seconfPlayerScore) {
        if (!(await tablesDB.existsTable(tableId))) {
            throw `Table ${tableId} does not exist`;
        }
        if (firstPlayerName === secondPlayerName) {
            throw 'Should be destinct players';
        }
        if (!firstPlayerName || !secondPlayerName) {
            throw 'Player names are illegal';
        }
        if (!this._validateScoreInput(firstPlayerScore) || !this._validateScoreInput(seconfPlayerScore)) {
            throw 'Scores should be a number bigger or equal to 0';
        }
        await this._addPlayersIfNeeded([ firstPlayerName, secondPlayerName ], tableId);
        const gameId = await gamesDB.addGame(firstPlayerName, secondPlayerName, firstPlayerScore, seconfPlayerScore, tableId);
        playerDB.addGameToPlayer(firstPlayerName, firstPlayerScore, seconfPlayerScore, tableId);
        playerDB.addGameToPlayer(secondPlayerName, seconfPlayerScore, firstPlayerScore, tableId);
        return new Game(gameId, firstPlayerName, secondPlayerName, firstPlayerScore, seconfPlayerScore);
    }

    async addTable(tableName) {
        if (!tableName) {
            throw 'You should provide a valid table name';
        }
        const tableId = await tablesDB.createTable(tableName);
        return new Table(tableId, tableName, [], []);
    }

    // private methods

    async _addPlayersIfNeeded(playerNames, tableId) {
        for (var i = 0; i < playerNames.length; i++) {
            try {
                await playerDB.addPlayerToTable(tableId, playerNames[i]);
            } catch (err) {
                console.log(err);
            }
        }
    }

    _validateScoreInput(scoreInput) {
        return !isNaN(scoreInput) && scoreInput >= 0;
    }
}

module.exports = new RankingsController();
