"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Player = "X" | "O";
type Cell = Player | null;

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWinner(board: Cell[]): { winner: Player; line: number[] } | null {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: [a, b, c] };
    }
  }
  return null;
}

export default function DemoPage() {
  const router = useRouter();

  function handleMultiplayer() {
    const roomId = Math.random().toString(36).slice(2, 8);
    router.push(`/games/demo/${roomId}`);
  }

  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [status, setStatus] = useState<"playing" | "won" | "draw">("playing");
  const [winner, setWinner] = useState<Player | null>(null);
  const [winLine, setWinLine] = useState<number[] | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  useEffect(() => {
    if (currentPlayer !== "O" || status !== "playing") return;

    setIsAiThinking(true);
    const timer = setTimeout(() => {
      const empty = board.map((v, i) => (v === null ? i : -1)).filter((i) => i !== -1);
      if (empty.length === 0) return;

      const idx = empty[Math.floor(Math.random() * empty.length)];
      const next = [...board];
      next[idx] = "O";

      const result = checkWinner(next);
      if (result) {
        setBoard(next);
        setWinner(result.winner);
        setWinLine(result.line);
        setStatus("won");
      } else if (next.every(Boolean)) {
        setBoard(next);
        setStatus("draw");
      } else {
        setBoard(next);
        setCurrentPlayer("X");
      }
      setIsAiThinking(false);
    }, 420);

    return () => clearTimeout(timer);
  }, [currentPlayer, status, board]);

  function handleCellClick(i: number) {
    if (status !== "playing" || board[i] || currentPlayer !== "X" || isAiThinking) return;

    const next = [...board];
    next[i] = "X";

    const result = checkWinner(next);
    if (result) {
      setBoard(next);
      setWinner(result.winner);
      setWinLine(result.line);
      setStatus("won");
    } else if (next.every(Boolean)) {
      setBoard(next);
      setStatus("draw");
    } else {
      setBoard(next);
      setCurrentPlayer("O");
    }
  }

  function handleRestart() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setStatus("playing");
    setWinner(null);
    setWinLine(null);
    setIsAiThinking(false);
  }

  const statusText =
    status === "won" && winner === "X" ? "Victory! You defeated the guardian! 🏆" :
    status === "won" && winner === "O" ? "The guardian wins! 👹" :
    status === "draw" ? "Stalemate — the puzzle remains unsolved 🤝" :
    isAiThinking ? "The guardian is thinking… ⏳" :
    "Your turn — place your ❌";

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <p className="text-sm text-zinc-500 mb-8">
          <Link href="/games" className="hover:text-zinc-700 transition-colors">Games</Link>
          {" › "}
          <span>Demo Quest</span>
        </p>

        {/* Title */}
        <div className="text-center mb-10">
          <span className="text-5xl block mb-4">🎮</span>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Demo Quest: Tic-Tac-Toe</h1>
          <p className="text-zinc-500 text-base max-w-md mx-auto">
            A quick warm-up before your real adventure begins. Can you outwit the dungeon&apos;s ancient puzzle guardian?
          </p>
        </div>

        {/* Game card */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8 max-w-sm mx-auto">
          {/* Status */}
          <p className="text-sm font-semibold text-zinc-700 text-center mb-6">{statusText}</p>

          {/* Board */}
          <div className="grid grid-cols-3 gap-2 w-fit mx-auto mb-6">
            {board.map((cell, i) => {
              const isWinCell = winLine?.includes(i);
              const isEmpty = cell === null;

              let cellClass = "w-20 h-20 rounded-xl text-3xl flex items-center justify-center border transition-colors ";
              if (isWinCell) {
                cellClass += "bg-indigo-600 border-indigo-600";
              } else if (cell === "X") {
                cellClass += "bg-indigo-100 border-indigo-200";
              } else if (cell === "O") {
                cellClass += "bg-zinc-200 border-zinc-300";
              } else if (status === "playing" && !isAiThinking) {
                cellClass += "bg-zinc-100 hover:bg-indigo-50 border-zinc-200 cursor-pointer";
              } else {
                cellClass += "bg-zinc-100 border-zinc-200 cursor-not-allowed opacity-60";
              }

              return (
                <button
                  key={i}
                  className={cellClass}
                  onClick={() => handleCellClick(i)}
                  disabled={!isEmpty || status !== "playing" || isAiThinking}
                  aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ", empty"}`}
                >
                  {cell === "X" ? "❌" : cell === "O" ? "⭕" : null}
                </button>
              );
            })}
          </div>

          {/* Restart */}
          <div className="text-center">
            <button
              onClick={handleRestart}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors"
            >
              Play Again 🔄
            </button>
          </div>
        </div>

        {/* Multiplayer invite */}
        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-500 mb-3">Want to play against a friend?</p>
          <button
            onClick={handleMultiplayer}
            className="inline-block bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-sm px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md border border-zinc-200 transition-all"
          >
            Play with a Friend 🔗
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-xl font-bold text-zinc-900 mb-2">Ready for the real thing?</p>
          <p className="text-zinc-500 text-sm mb-6">Browse real games run by professional Game Masters.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/games"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Find Games
            </Link>
            <Link
              href="/game-masters"
              className="inline-block bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg border border-zinc-200 transition-all"
            >
              Find Game Masters
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
