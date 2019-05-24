'use strict';

class Game {
    constructor(gameId, firstPlayer, secondPlayer, fistPlayerScore, secondPlayerScore) {
        this.gameId = gameId;
        this.firstPlayer = firstPlayer;
        this.secondPlayer = secondPlayer;
        this.firstPlayerScore = fistPlayerScore;
        this.secondPlayerScore = secondPlayerScore;
    }

    getGameId() {
        return this.gameId;
    }

    getFirstPlayer() {
        return this.firstPlayer;
    }

    getSecondPlayer() {
        return this.secondPlayer;
    }

    getFirstPlayerScore() {
        return this.firstPlayerScore;
    }

    getSecondPlayerScore() {
        return this.secondPlayerScore;
    }
}

module.exports = Game;
