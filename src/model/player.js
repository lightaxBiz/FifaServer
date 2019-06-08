'use strict';

const Game = require('./game');
const GameResultEnum = require('./game-result.enum');
const WINNING_POINT = 3;
const TECHNICAL_WINNING_POINTS = 4;
const LOSE_POINTS = 0;
const DUCE_POINTS = 1;
const HIGHEST_POSSIBLE_RANK = 100;
const TECHNICAL_WIN_DIFFERENT = 3

class Player {
    constructor(playerName, wins, technicalWins, losts, duces, goalsFor, goalsAgainst, rank) {
        this.playerName = playerName;
        this.wins = wins;
        this.technicalWins = technicalWins;
        this.losts = losts;
        this.duces = duces;
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.rank = rank;
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

    incrementResultValue(myScore, opponentScore) {
        this.goalsFor += myScore;
        this.goalsAgainst += opponentScore;
        const gameResult = getGameResult(myScore, opponentScore);
        switch (gameResult) {
            case GameResultEnum.WIN:
                this.wins++
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
        return gameResult;
    }

    getNewRank() {
        const totalGameNumber = this.wins + this.technicalWins + this.losts + this.duces;
        const highestValue = totalGameNumber * WINNING_POINT;
        const currentValue = this.wins * WINNING_POINT
        + this.technicalWins * TECHNICAL_WINNING_POINTS
        + this.losts * LOSE_POINTS
        + this.duces * DUCE_POINTS;
        return (currentValue / highestValue) * HIGHEST_POSSIBLE_RANK;
    }
}

module.exports = Player;

function getGameResult(myScore, opponentScore) {
    let gameResult;
    gameResult = myScore > opponentScore
        ? GameResultEnum.WIN
        : myScore < opponentScore
            ? GameResultEnum.LOST : GameResultEnum.DUCE;
    if (gameResult === GameResultEnum.WIN && (myScore - opponentScore >= TECHNICAL_WIN_DIFFERENT)) {
        gameResult = GameResultEnum.TECHNICAL_WIN;
    }
    return gameResult;
}
