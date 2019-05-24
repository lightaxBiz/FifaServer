'use strict';

class Player {
    constructor(playerId, playerName, wins, losts, duces, goalsFor, goalsAgainst, rank) {
        this.playerId = playerId;
        this.playerName = playerName;
        this.wins = wins;
        this.losts = losts;
        this.duces = duces;
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.rank = rank;
    }

    getPlayerId() {
        return this.playerId;
    }

    getPlayerNameName() {
        return this.playerName;
    }

    getWins() {
        return this.wins;
    }

    getLosts() {
        return this.losts;
    }

    getGoalsFor() {
        return this.goalsFor;
    }

    getGoalsAgainst() {
        return this.goalsAgainst;
    }

    getRank() {
        return this.rank;
    }
}

module.exports = Player;