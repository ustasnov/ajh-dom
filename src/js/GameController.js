import { randomInteger } from "./utils";

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.intervalId = null;
  }

  init() {
    this.gamePlay.drawUi(this.theme);
    this.gamePlay.addStartGameListener(this.onStartGame.bind(this));
    this.gamePlay.addStopGameListener(this.onStopGame.bind(this));
  }

  showGoblin() {
    let position = randomInteger(0, this.gamePlay.boardSize ** 2 - 1);
    this.gamePlay.showGoblin(position);
  }

  onStartGame() {
    this.showGoblin();
    this.intervalId = setInterval(() => {
      this.showGoblin();
    }, 1000);
  }

  onStopGame() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.gamePlay.clearCell();
  }
}
