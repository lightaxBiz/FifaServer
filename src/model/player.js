'use strict';

const Game = require('./game');
const GameResultEnum = require('./game-result.enum');
const WINNING_POINT = 3;
const TECHNICAL_WINNING_POINTS = 4;
const LOSE_POINTS = 0;
const DUCE_POINTS = 1;
const HIGHEST_POSSIBLE_RANK = 100;

class Player {
    constructor(playerId, playerName, wins, technicalWins, losts, duces, goalsFor, goalsAgainst, rank, games) {
        this.playerId = playerId;
        this.playerName = playerName;
        this.wins = wins;
        this.technicalWins = technicalWins;
        this.losts = losts;
        this.duces = duces;
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.rank = rank;
        this.games = games;
    }

    getPlayerId() {
        return this.playerId;
    }

    getPlayerName() {
        return this.playerName;
    }

    getWins() {
        return this.wins;
    }

    getTechnicalWins() {
        return this.technicalWins;
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

    getGames() {
        return this.games;
    }

    addGame(game) {
        let gameResult;
        if (game.getFirstPlayerName() === this.name) {
            this.goalsFor += game.getFirstPlayerScore();
            this.goalsAgainst += game.getSecondPlayerScore();
            gameResult = game.getFirstPlayerScore() > game.getSecondPlayerScore()
                ? GameResultEnum.WIN
                : game.getFirstPlayerScore() < game.getSecondPlayerScore()
                ? GameResultEnum.LOST : GameResultEnum.DUCE;
            if (gameResult === GameResultEnum.WIN && (game.getFirstPlayerScore() - game.getSecondPlayerScore() >= 3)) {
                gameResult = GameResultEnum.TECHNICAL_WIN;
            }
        } else {
            this.goalsFor += game.getSecondPlayerScore();
            this.goalsAgainst += game.getFirstPlayerScore();
            gameResult = game.getSecondPlayerScore() > game.getFirstPlayerScore()
                ? GameResultEnum.WIN
                : game.getSecondPlayerScore() < game.getFirstPlayerScore()
                    ? GameResultEnum.LOST : GameResultEnum.DUCE;
            if (gameResult === GameResultEnum.WIN && (game.getSecondPlayerScore() - game.getFirstPlayerScore() >= 3)) {
                gameResult = GameResultEnum.TECHNICAL_WIN;
            }
        }
        switch (gameResult) {
            case GameResultEnum.WIN:
                this.wins++;
                break;
            case GameResultEnum.TECHNICAL_WIN:
                this.technicalWins++;
                break;
            case GameResultEnum.LOST:
                this.losts++;
                break;
            case  GameResultEnum.DUCE:
                this.duces++;
                break;
        }
        this._updateRank();
        this.games.push(game);
    }

    _updateRank() {
        const totalGameNumber = this.wins + this.technicalWins + this.losts + this.duces;
        const highestValue = totalGameNumber * WINNING_POINT;
        const currentValue = this.wins * WINNING_POINT
            + this.technicalWins * TECHNICAL_WINNING_POINTS
            + this.losts * LOSE_POINTS
            + this.duces * DUCE_POINTS;
        this.rank = (currentValue / highestValue) * HIGHEST_POSSIBLE_RANK;
    }
}

module.exports = Player;
