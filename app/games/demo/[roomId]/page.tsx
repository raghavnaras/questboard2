"use client";

import { useState, useEffect, useRef } from "react";
import { use } from "react";
import Link from "next/link";
import PartySocket from "partysocket";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Cell = "X" | "O" | null;
type Player = "X" | "O";

interface GameState {
  board: Cell[];
  currentPlayer: Player;
  status: "waiting" | "playing" | "won" | "draw";
  winner: Player | null;
  winLine: number[] | null;
  mySymbol: Player | null;
  playerCount: number;
}

const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST ?? "localhost:1999";

export default function MultiplayerDemoPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);

  const [game, setGame] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: "X",
    status: "waiting",
    winner: null,
    winLine: null,
    mySymbol: null,
    playerCount: 0,
  });
  const [copied, setCopied] = useState(false);
  const socketRef = useRef<PartySocket | null>(null);

  useEffect(() => {
    const socket = new PartySocket({ host: PARTYKIT_HOST, room: roomId });
    socketRef.current = socket;

    socket.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.type === "welcome") {
        setGame((prev) => ({ ...prev, mySymbol: msg.symbol }));
      } else if (msg.type === "state") {
        setGame((prev) => ({ ...msg, mySymbol: prev.mySymbol ?? msg.mySymbol }));
      }
    };

    return () => socket.close();
  }, [roomId]);

  function handleCellClick(i: number) {
    if (!socketRef.current) return;
    if (game.status !== "playing") return;
    if (game.board[i]) return;
    if (game.currentPlayer !== game.mySymbol) return;
    socketRef.current.send(JSON.stringify({ type: "move", index: i }));
  }

  function handleRestart() {
    socketRef.current?.send(JSON.stringify({ type: "restart" }));
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isMyTurn = game.status === "playing" && game.currentPlayer === game.mySymbol;

  const statusText =
    game.status === "waiting"
      ? game.mySymbol
        ? "Waiting for opponent… share the link below 👇"
        : "Waiting for the game to start…"
      : game.status === "won" && game.winner === game.mySymbol
      ? "Victory! You won! 🏆"
      : game.status === "won"
      ? `${game.winner} wins! 👑`
      : game.status === "draw"
      ? "Stalemate — great minds think alike 🤝"
      : isMyTurn
      ? `Your turn — place your ${game.mySymbol === "X" ? "❌" : "⭕"}`
      : `Opponent's turn…`;

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <p className="text-sm text-zinc-500 mb-8">
          <Link href="/games" className="hover:text-zinc-700 transition-colors">Games</Link>
          {" › "}
          <Link href="/games/demo" className="hover:text-zinc-700 transition-colors">Demo Quest</Link>
          {" › "}
          <span className="font-mono">{roomId}</span>
        </p>

        {/* Title */}
        <div className="text-center mb-10">
          <span className="text-5xl block mb-4">🎮</span>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Demo Quest: Multiplayer</h1>
          <p className="text-zinc-500 text-base">
            You are{" "}
            {game.mySymbol
              ? <strong>{game.mySymbol === "X" ? "❌ X" : "⭕ O"}</strong>
              : "a spectator"}
          </p>
        </div>

        {/* Share link */}
        {game.status === "waiting" && game.mySymbol && (
          <div className="max-w-sm mx-auto mb-8">
            <div className="bg-white border border-zinc-200 rounded-2xl p-4 flex items-center gap-3">
              <p className="text-xs text-zinc-500 font-mono truncate flex-1">{typeof window !== "undefined" ? window.location.href : ""}</p>
              <button
                onClick={handleCopyLink}
                className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}

        {/* Game card */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8 max-w-sm mx-auto">
          <p className="text-sm font-semibold text-zinc-700 text-center mb-6">{statusText}</p>

          <div className="grid grid-cols-3 gap-2 w-fit mx-auto mb-6">
            {game.board.map((cell, i) => {
              const isWinCell = game.winLine?.includes(i);
              const canClick = game.status === "playing" && !cell && isMyTurn;

              let cls = "w-20 h-20 rounded-xl text-3xl flex items-center justify-center border transition-colors ";
              if (isWinCell) {
                cls += "bg-indigo-600 border-indigo-600";
              } else if (cell === "X") {
                cls += "bg-indigo-100 border-indigo-200";
              } else if (cell === "O") {
                cls += "bg-zinc-200 border-zinc-300";
              } else if (canClick) {
                cls += "bg-zinc-100 hover:bg-indigo-50 border-zinc-200 cursor-pointer";
              } else {
                cls += "bg-zinc-100 border-zinc-200 cursor-not-allowed opacity-60";
              }

              return (
                <button
                  key={i}
                  className={cls}
                  onClick={() => handleCellClick(i)}
                  disabled={!canClick}
                  aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ", empty"}`}
                >
                  {cell === "X" ? "❌" : cell === "O" ? "⭕" : null}
                </button>
              );
            })}
          </div>

          {game.status !== "waiting" && game.mySymbol && (
            <div className="text-center">
              <button
                onClick={handleRestart}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors"
              >
                Play Again 🔄
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-xl font-bold text-zinc-900 mb-2">Ready for a real adventure?</p>
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
