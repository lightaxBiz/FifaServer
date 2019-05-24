'use strict';

class Table {
    constructor(tableId, tableName, players, games) {
        this.tableId = tableId;
        this.tableName = tableName;
        this.players = players;
        this.games = games;
    }

    getTableId() {
        return this.tableId;
    }

    getTableName() {
        return this.tableName;
    }

    getPlayers() {
        return this.players;
    }

    getGames() {
        return this.games;
    }
}

module.exports = Table;