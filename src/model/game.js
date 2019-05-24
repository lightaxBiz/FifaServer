'use strict';

class Game {
    constructor(gameId, firstPlayerName, secondPlayerName, fistPlayerScore, secondPlayerScore) {
        this.gameId = gameId;
        this.firstPlayerName = firstPlayerName;
        this.secondPlayerName = secondPlayerName;
        this.firstPlayerScore = fistPlayerScore;
        this.secondPlayerScore = secondPlayerScore;
    }

    getGameId() {
        return this.gameId;
    }

    getFirstPlayerName() {
        return this.firstPlayerName;
    }

    getSecondPlayerName() {
        return this.secondPlayerName;
    }

    getFirstPlayerScore() {
        return this.firstPlayerScore;
    }

    getSecondPlayerScore() {
        return this.secondPlayerScore;
    }
}

module.exports = Game;
