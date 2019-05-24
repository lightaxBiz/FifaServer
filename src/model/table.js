'use strict';

class Table {
    constructor(tableId, tableName, players) {
        this.tableId = tableId;
        this.tableName = tableName;
        this.players = players;
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
}

module.exports = Table;