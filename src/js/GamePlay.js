export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.startGameListeners = [];
    this.stopGameListeners = [];
    this.currentPosition = -1;
    this.goblinEl = null;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("container is not HTMLElement");
    }
    this.container = container;
  }

  drawUi(theme) {
    this.checkBinding();

    this.container.innerHTML = `
      <div class="controls">
        <button data-id="action-start" class="btn">Начать</button>
        <button data-id="action-stop" class="btn">Остановить</button>
      </div>
      <div class="board-container">
        <div data-id="board" class="board"></div>
      </div>
    `;

    this.startGameEl = this.container.querySelector("[data-id=action-start]");
    this.stopGameEl = this.container.querySelector("[data-id=action-stop]");

    this.startGameEl.addEventListener("click", (event) =>
      this.onStartGameClick(event)
    );
    this.stopGameEl.addEventListener("click", (event) =>
      this.onStopGameClick(event)
    );

    this.boardEl = this.container.querySelector("[data-id=board]");

    this.boardEl.classList.add(theme);
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement("div");
      cellEl.classList.add("cell", "map-tile", "map-tile-center");
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error("GamePlay not bind to DOM");
    }
  }

  addStartGameListener(callback) {
    this.startGameListeners.push(callback);
  }

  addStopGameListener(callback) {
    this.stopGameListeners.push(callback);
  }

  onStartGameClick(event) {
    event.preventDefault();
    this.startGameListeners.forEach((o) => o.call(null));
  }

  onStopGameClick(event) {
    event.preventDefault();
    this.stopGameListeners.forEach((o) => o.call(null));
  }

  static showMessage(message) {
    alert(message);
  }

  showGoblin(position) {
    if (position != this.currentPosition) {
      this.clearCell();
      const cellEl = this.boardEl.children[position];
      const goblinEl = document.createElement("div");
      goblinEl.classList.add("goblin");
      cellEl.appendChild(goblinEl);
      this.currentPosition = position;
    }
  }

  clearCell() {
    if (this.currentPosition > -1) {
      this.cells[this.currentPosition].innerHTML = "";
    }
  }
}
