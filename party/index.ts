import type * as Party from "partykit/server";

type Cell = "X" | "O" | null;

interface GameState {
  board: Cell[];
  currentPlayer: "X" | "O";
  status: "waiting" | "playing" | "won" | "draw";
  winner: "X" | "O" | null;
  winLine: number[] | null;
}

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWinner(board: Cell[]): { winner: "X" | "O"; line: number[] } | null {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as "X" | "O", line: [a, b, c] };
    }
  }
  return null;
}

function freshGame(): GameState {
  return {
    board: Array(9).fill(null),
    currentPlayer: "X",
    status: "waiting",
    winner: null,
    winLine: null,
  };
}

export default class TicTacToeServer implements Party.Server {
  game: GameState = freshGame();
  players: Record<string, "X" | "O"> = {};

  constructor(readonly party: Party.Party) {}

  onConnect(conn: Party.Connection) {
    const count = Object.keys(this.players).length;
    let symbol: "X" | "O" | null = null;

    if (count < 2) {
      symbol = count === 0 ? "X" : "O";
      this.players[conn.id] = symbol;
      if (count === 1) this.game.status = "playing";
    }

    conn.send(JSON.stringify({ type: "welcome", symbol }));
    this.broadcast();
  }

  onClose(conn: Party.Connection) {
    delete this.players[conn.id];
    if (Object.keys(this.players).length < 2) {
      this.game = freshGame();
    }
    this.broadcast();
  }

  onMessage(message: string, sender: Party.Connection) {
    const msg = JSON.parse(message);

    if (msg.type === "move") {
      const symbol = this.players[sender.id];
      if (!symbol) return;
      if (this.game.status !== "playing") return;
      if (this.game.currentPlayer !== symbol) return;
      if (this.game.board[msg.index] !== null) return;

      this.game.board[msg.index] = symbol;
      const result = checkWinner(this.game.board);
      if (result) {
        this.game.winner = result.winner;
        this.game.winLine = result.line;
        this.game.status = "won";
      } else if (this.game.board.every(Boolean)) {
        this.game.status = "draw";
      } else {
        this.game.currentPlayer = symbol === "X" ? "O" : "X";
      }
      this.broadcast();
    }

    if (msg.type === "restart") {
      if (!this.players[sender.id]) return;
      this.game = { ...freshGame(), status: "playing" };
      this.broadcast();
    }
  }

  broadcast() {
    const playerCount = Object.keys(this.players).length;
    for (const conn of this.party.getConnections()) {
      const symbol = this.players[conn.id] ?? null;
      conn.send(JSON.stringify({ type: "state", ...this.game, mySymbol: symbol, playerCount }));
    }
  }
}
