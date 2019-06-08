'use strict'

const Table = require('../model/table');
const tablesDB = require('../db/tables.db');
const playerDB = require('../db/players.db');
const gamesDB = require('../db/games.db');

class RankingsController {

    // public methods

    async getAllRankings() {
        return this.tables;
    }

    async addGame(tableId, playerOneName, playerOneScore, playerTwoName, playerTwoScore) {
        if (!(await tablesDB.existsTable(tableId))) {
            throw `Table ${tableId} does not exist`;
        }
        await this._addPlayersIfNeeded([ playerOneName, playerTwoName ], tableId);
        const gameId = await gamesDB.addGame(playerOneName, playerTwoName, playerOneScore, playerTwoScore, tableId);
        playerDB.addGameToPlayer(playerOneName, playerOneScore, playerTwoScore, tableId);
        playerDB.addGameToPlayer(playerTwoName, playerTwoScore, playerOneScore, tableId);
    }

    async addTable(tableName) {
        const tableId = await tablesDB.createTable(tableName);
        return new Table(tableId, tableName, [], []);
    }

    // private methods

    async _addPlayersIfNeeded(playerNames, tableId) {
        playerNames.forEach(async playerName => {
            try {
                playerId = await playerDB.createPlayer(playerName);
                await playerDB.addPlayerToTable(tableId, playerId);
            } catch (err) {
                console.log(err);
            }
        });
    }
}

module.exports = new RankingsController();
