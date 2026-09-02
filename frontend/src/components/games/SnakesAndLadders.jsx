import { useEffect, useRef, useState } from "react";
import { Check, X, RotateCcw, Trophy, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";

const DICE_ICONS = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

const PLAYER_COLORS = [
  { hex: "#C82B62", text: "text-rutuja-pink" },
  { hex: "#295EAA", text: "text-rutuja-blue" },
  { hex: "#059669", text: "text-emerald-600" },
  { hex: "#D97706", text: "text-amber-600" },
];

const LADDER_COLOR = "#059669";
const SNAKE_COLOR = "#C82B62";

const SPECIAL_SQUARES = [
  { square: 4, dest: 25, type: "ladder" },
  { square: 13, dest: 46, type: "ladder" },
  { square: 27, dest: 5, type: "snake" },
  { square: 33, dest: 49, type: "ladder" },
  { square: 40, dest: 19, type: "snake" },
  { square: 42, dest: 63, type: "ladder" },
  { square: 54, dest: 31, type: "snake" },
  { square: 66, dest: 45, type: "snake" },
  { square: 74, dest: 92, type: "ladder" },
  { square: 89, dest: 68, type: "snake" },
].sort((a, b) => a.square - b.square);

const SPECIAL_MAP = new Map(SPECIAL_SQUARES.map((s) => [s.square, s]));

function cellPosition(square) {
  const band = Math.floor((square - 1) / 10);
  const posInBand = (square - 1) % 10;
  const col = band % 2 === 0 ? posInBand : 9 - posInBand;
  const row = 9 - band;
  return { row, col };
}

function squareAt(row, col) {
  const band = 9 - row;
  return band % 2 === 0 ? band * 10 + col + 1 : band * 10 + (10 - col);
}

function cellCenter(square) {
  const { row, col } = cellPosition(square);
  return { x: col * 10 + 5, y: row * 10 + 5 };
}

function ladderPath(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  const w = 1.7;
  const rail1 = { x1: p1.x + px * w, y1: p1.y + py * w, x2: p2.x + px * w, y2: p2.y + py * w };
  const rail2 = { x1: p1.x - px * w, y1: p1.y - py * w, x2: p2.x - px * w, y2: p2.y - py * w };
  const rungs = [];
  const count = Math.max(3, Math.round(len / 8));
  for (let i = 1; i < count; i++) {
    const t = i / count;
    const cx = p1.x + dx * t;
    const cy = p1.y + dy * t;
    rungs.push({ x1: cx + px * w, y1: cy + py * w, x2: cx - px * w, y2: cy - py * w });
  }
  return { rail1, rail2, rungs };
}

function snakePath(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  const segments = 5;
  const amplitude = 3.6;
  let d = `M ${p1.x} ${p1.y}`;
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const bx = p1.x + dx * t;
    const by = p1.y + dy * t;
    const amp = i === segments ? 0 : i % 2 === 0 ? amplitude : -amplitude;
    const midT = (i - 0.5) / segments;
    const cx = p1.x + dx * midT + px * amp;
    const cy = p1.y + dy * midT + py * amp;
    d += ` Q ${cx} ${cy} ${bx} ${by}`;
  }
  return d;
}

function TokenDot({ color }) {
  return (
    <span
      className="h-[80%] w-[80%] rounded-full border-2 border-white shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
      style={{ backgroundColor: color }}
    />
  );
}

export default function SnakesAndLadders({ questions, text, why, badgeIcons }) {
  const [phase, setPhase] = useState("setup");
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState([]);
  const [turnIndex, setTurnIndex] = useState(0);
  const [turnPhase, setTurnPhase] = useState("question"); // "question" | "unlocked"
  const [qCounter, setQCounter] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [diceValue, setDiceValue] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [moving, setMoving] = useState(false);
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState(null);
  const [winner, setWinner] = useState(null);
  const rollTimer = useRef(null);
  const stepTimer = useRef(null);

  useEffect(
    () => () => {
      window.clearInterval(rollTimer.current);
      window.clearInterval(stepTimer.current);
    },
    []
  );

  const beginGame = (n) => {
    setNumPlayers(n);
    setPlayers(Array.from({ length: n }, () => ({ position: 1 })));
    setTurnIndex(0);
    setTurnPhase("question");
    setQCounter(0);
    setCorrectCount(0);
    setDiceValue(null);
    setRolling(false);
    setMoving(false);
    setMessage(text.startMessage);
    setSelected(null);
    setWinner(null);
    setPhase("playing");
  };

  const canRoll = phase === "playing" && turnPhase === "unlocked" && !rolling && !moving;
  const DiceIcon = DICE_ICONS[(diceValue || 1) - 1];
  const activeColor = PLAYER_COLORS[turnIndex % PLAYER_COLORS.length];
  const currentQuestion = questions[qCounter % questions.length];

  const updatePosition = (idx, pos) => {
    setPlayers((ps) => ps.map((p, i) => (i === idx ? { ...p, position: pos } : p)));
  };

  const advanceTurn = (gotExtraTurn) => {
    if (!gotExtraTurn) setTurnIndex((i) => (i + 1) % numPlayers);
  };

  const startNextQuestion = (gotExtraTurn) => {
    advanceTurn(gotExtraTurn);
    setQCounter((c) => c + 1);
    setSelected(null);
    setTurnPhase("question");
  };

  const resolveLanding = (next, finalValue, playerIdx) => {
    const special = SPECIAL_MAP.get(next);

    if (next === 100) {
      setMessage(text.moveMessage.replace("{n}", finalValue).replace("{p}", next));
      setWinner(playerIdx);
      setPhase("won");
      return;
    }

    if (special) {
      const slideMsg = special.type === "ladder" ? text.ladderMessage : text.snakeMessage;
      setMessage(slideMsg.replace("{p}", special.dest));
      window.setTimeout(() => {
        updatePosition(playerIdx, special.dest);
        startNextQuestion(finalValue === 6);
      }, 550);
      return;
    }

    const baseMsg = text.moveMessage.replace("{n}", finalValue).replace("{p}", next);
    setMessage(finalValue === 6 ? `${baseMsg} ${text.extraTurn}` : baseMsg);
    startNextQuestion(finalValue === 6);
  };

  const stepMove = (idx, from, to) =>
    new Promise((resolve) => {
      let cur = from;
      stepTimer.current = window.setInterval(() => {
        cur += 1;
        updatePosition(idx, cur);
        if (cur >= to) {
          window.clearInterval(stepTimer.current);
          resolve();
        }
      }, 200);
    });

  const finishRoll = async (finalValue) => {
    setDiceValue(finalValue);
    setRolling(false);
    setMoving(true);
    const playerIdx = turnIndex;
    const from = players[playerIdx].position;
    const to = Math.min(from + finalValue, 100);
    await stepMove(playerIdx, from, to);
    setMoving(false);
    resolveLanding(to, finalValue, playerIdx);
  };

  const rollDice = () => {
    if (!canRoll) return;
    setRolling(true);
    let ticks = 0;
    rollTimer.current = window.setInterval(() => {
      setDiceValue(1 + Math.floor(Math.random() * 6));
      ticks += 1;
      if (ticks >= 8) {
        window.clearInterval(rollTimer.current);
        finishRoll(1 + Math.floor(Math.random() * 6));
      }
    }, 80);
  };

  const selectOption = (i) => {
    if (turnPhase !== "question" || selected !== null) return;
    setSelected(i);
  };

  const confirmAnswer = () => {
    const isCorrect = selected === currentQuestion.correct;
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setSelected(null);
      setTurnPhase("unlocked");
      setMessage(text.correctUnlock);
    } else {
      const nextPlayerNum = (numPlayers === 1 ? 1 : ((turnIndex + 1) % numPlayers) + 1);
      setMessage(text.incorrectSkip.replace("{n}", nextPlayerNum));
      startNextQuestion(false);
    }
  };

  const restart = () => {
    window.clearInterval(rollTimer.current);
    window.clearInterval(stepTimer.current);
    setPhase("setup");
  };

  const currentPlayerPos = players[turnIndex]?.position ?? 1;
  const progressPct = Math.min(currentPlayerPos, 100);

  if (phase === "setup") {
    return (
      <div data-testid="sl-setup" className="mx-auto max-w-lg text-center">
        <p className="text-sm leading-relaxed text-rutuja-slate">{text.intro}</p>
        <h3 className="mt-8 font-serif text-xl text-rutuja-ink md:text-2xl">{text.setupTitle}</h3>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {[2, 3, 4].map((n) => (
            <button
              key={n}
              type="button"
              data-testid={`sl-players-${n}`}
              onClick={() => beginGame(n)}
              className="hover-glow-pink flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-rutuja-pink/40 bg-rutuja-soft px-7 py-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="flex -space-x-2">
                {Array.from({ length: n }).map((_, i) => (
                  <span
                    key={i}
                    className="grid h-7 w-7 place-items-center rounded-full border-2 border-white text-[11px] font-bold text-white shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
                    style={{ backgroundColor: PLAYER_COLORS[i % PLAYER_COLORS.length].hex }}
                  >
                    {i + 1}
                  </span>
                ))}
              </span>
              <span className="text-sm font-semibold text-rutuja-ink">{text.playerCountCta.replace("{n}", n)}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="snakes-ladders-game">
      <div className="flex flex-wrap items-center justify-center gap-2" data-testid="sl-badge-tracker">
        {badgeIcons.map((Icon, i) => {
          const isEarned = i < Math.min(correctCount, badgeIcons.length);
          return (
            <span
              key={i}
              className={`grid h-9 w-9 place-items-center rounded-full border transition-[background-color,border-color,color] duration-300 ${
                isEarned ? "border-rutuja-pink bg-rutuja-pink text-white" : "border-dashed border-rutuja-line bg-rutuja-soft/60 text-rutuja-muted"
              }`}
            >
              <Icon size={16} aria-hidden="true" />
            </span>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
        <div className="relative mx-auto aspect-square w-full max-w-xl border border-rutuja-line bg-rutuja-soft/30" data-testid="sl-board">
          <div className="grid h-full w-full grid-cols-10 grid-rows-10">
            {Array.from({ length: 10 }).map((_, row) =>
              Array.from({ length: 10 }).map((__, col) => {
                const num = squareAt(row, col);
                const special = SPECIAL_MAP.get(num);
                let cellClass = "bg-white";
                if (special?.type === "ladder") cellClass = "bg-green-50";
                else if (special?.type === "snake") cellClass = "bg-rutuja-soft";
                return (
                  <div key={num} className={`relative border border-rutuja-line/60 ${cellClass}`}>
                    <span className="absolute left-0.5 top-0 text-[8px] leading-tight text-rutuja-muted sm:text-[10px]">{num}</span>
                  </div>
                );
              })
            )}
          </div>

          <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
            {SPECIAL_SQUARES.map((s) => {
              const p1 = cellCenter(s.square);
              const p2 = cellCenter(s.dest);
              if (s.type === "ladder") {
                const { rail1, rail2, rungs } = ladderPath(p1, p2);
                return (
                  <g key={s.square}>
                    <line x1={rail1.x1} y1={rail1.y1} x2={rail1.x2} y2={rail1.y2} stroke={LADDER_COLOR} strokeWidth={1.1} strokeLinecap="round" />
                    <line x1={rail2.x1} y1={rail2.y1} x2={rail2.x2} y2={rail2.y2} stroke={LADDER_COLOR} strokeWidth={1.1} strokeLinecap="round" />
                    {rungs.map((r, i) => (
                      <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={LADDER_COLOR} strokeWidth={0.9} strokeLinecap="round" />
                    ))}
                  </g>
                );
              }
              const d = snakePath(p1, p2);
              return (
                <g key={s.square}>
                  <path d={d} fill="none" stroke={SNAKE_COLOR} strokeWidth={2.2} strokeLinecap="round" opacity={0.85} />
                  <circle cx={p1.x} cy={p1.y} r={2.2} fill={SNAKE_COLOR} />
                  <circle cx={p1.x - 0.7} cy={p1.y - 0.6} r={0.35} fill="white" />
                  <circle cx={p1.x + 0.7} cy={p1.y - 0.6} r={0.35} fill="white" />
                </g>
              );
            })}
          </svg>

          {players.map((p, i) => {
            const { row, col } = cellPosition(p.position);
            const quadrants = [
              { top: 0, left: 0 },
              { top: 0, left: 5 },
              { top: 5, left: 0 },
              { top: 5, left: 5 },
            ];
            const q = quadrants[i % 4];
            const isCurrent = i === turnIndex && phase === "playing";
            return (
              <div
                key={i}
                data-testid={`sl-token-${i}`}
                className={`absolute grid place-items-center transition-all duration-300 ease-out ${isCurrent ? "z-10" : ""}`}
                style={{ top: `${row * 10 + q.top}%`, left: `${col * 10 + q.left}%`, width: "5%", height: "5%" }}
              >
                <TokenDot color={PLAYER_COLORS[i % PLAYER_COLORS.length].hex} />
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-4 border border-rutuja-line bg-rutuja-soft/40 p-6 text-center">
          <div className="flex w-full flex-wrap justify-center gap-2" data-testid="sl-standings">
            {players.map((p, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-[transform,box-shadow] duration-300 ${
                  i === turnIndex && phase === "playing" ? "scale-110 border-transparent text-white shadow-[0_2px_8px_rgba(0,0,0,0.25)]" : "border-rutuja-line bg-white text-rutuja-ink"
                }`}
                style={i === turnIndex && phase === "playing" ? { backgroundColor: PLAYER_COLORS[i % PLAYER_COLORS.length].hex } : undefined}
              >
                P{i + 1} · {p.position}
              </span>
            ))}
          </div>

          {phase === "playing" && (
            <p className={`text-sm font-bold ${activeColor.text}`} data-testid="sl-turn">
              {text.turnLabel.replace("{n}", turnIndex + 1)}
            </p>
          )}

          <div className="h-2 w-full overflow-hidden rounded-full bg-rutuja-line" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="h-full rounded-full transition-[width] duration-500 ease-out"
              style={{ width: `${progressPct}%`, backgroundColor: activeColor.hex }}
            />
          </div>

          {turnPhase === "question" && phase === "playing" ? (
            <div className="w-full text-left" data-testid="sl-question-card">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-rutuja-pink">{text.lockedLabel}</p>
              <h3 className="mt-2 text-sm font-semibold leading-snug text-rutuja-ink">{currentQuestion.q}</h3>
              <div className="mt-3 grid gap-2">
                {currentQuestion.options.map((opt, i) => {
                  const isChosen = selected === i;
                  const isCorrectOpt = i === currentQuestion.correct;
                  let stateClass = "border-rutuja-line bg-white hover:border-rutuja-blue";
                  if (selected !== null) {
                    if (isCorrectOpt) stateClass = "border-green-600 bg-green-50";
                    else if (isChosen) stateClass = "border-rutuja-pink bg-white";
                  }
                  return (
                    <button
                      key={i}
                      type="button"
                      data-testid={`sl-option-${i}`}
                      onClick={() => selectOption(i)}
                      disabled={selected !== null}
                      className={`flex items-center justify-between gap-2 rounded-lg border-2 px-3 py-2 text-left text-xs font-medium text-rutuja-ink transition-colors duration-200 disabled:cursor-default ${stateClass}`}
                    >
                      {opt}
                      {selected !== null && isCorrectOpt && <Check size={14} className="shrink-0 text-green-600" aria-hidden="true" />}
                      {selected !== null && isChosen && !isCorrectOpt && <X size={14} className="shrink-0 text-rutuja-pink" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className="mt-3 border-l-2 border-rutuja-pink bg-white p-2.5 text-[11px] leading-relaxed text-rutuja-slate">
                  <span className="font-semibold text-rutuja-pinkdark">{why}</span> {currentQuestion.explanation}
                </div>
              )}

              <button
                type="button"
                data-testid="sl-continue"
                onClick={confirmAnswer}
                disabled={selected === null}
                className="btn-primary mt-3 w-full justify-center rounded-sm py-2 text-xs disabled:pointer-events-none disabled:opacity-40"
              >
                {text.continueCta}
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                data-testid="sl-roll"
                onClick={rollDice}
                disabled={!canRoll}
                aria-label={text.rollCta}
                className={`grid h-20 w-20 place-items-center rounded-2xl border-2 border-dashed bg-white transition-transform duration-200 disabled:cursor-default disabled:opacity-60 ${
                  rolling ? "animate-spin" : "hover:-translate-y-0.5"
                }`}
                style={{ borderColor: activeColor.hex, color: activeColor.hex }}
              >
                <DiceIcon size={40} aria-hidden="true" />
              </button>
              <p className="text-sm font-semibold text-rutuja-ink">{rolling || moving ? text.rolling : text.rollCta}</p>
            </>
          )}

          <div aria-live="polite" className="min-h-[3rem] text-sm leading-relaxed text-rutuja-slate">
            {message}
          </div>
        </div>
      </div>

      {phase === "won" && (
        <div data-testid="sl-win-screen" className="mx-auto mt-10 max-w-xl border border-rutuja-line bg-rutuja-soft/40 p-10 text-center">
          <p className="text-5xl" aria-hidden="true">
            {text.winEmoji}
          </p>
          <h3 className="mt-4 font-serif text-2xl text-rutuja-ink md:text-3xl" style={{ color: PLAYER_COLORS[winner % PLAYER_COLORS.length].hex }}>
            {text.winTitle.replace("{n}", winner + 1)}
          </h3>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-rutuja-slate">{text.winBody}</p>

          <div className="mx-auto mt-6 flex max-w-sm flex-col gap-2">
            {[...players]
              .map((p, i) => ({ ...p, i }))
              .sort((a, b) => b.position - a.position)
              .map((p) => (
                <div key={p.i} className="flex items-center justify-between rounded-lg border border-rutuja-line bg-white px-4 py-2 text-sm">
                  <span className="flex items-center gap-2 font-semibold text-rutuja-ink">
                    <span
                      className="grid h-5 w-5 place-items-center rounded-full text-[9px] font-bold text-white"
                      style={{ backgroundColor: PLAYER_COLORS[p.i % PLAYER_COLORS.length].hex }}
                    >
                      {p.i + 1}
                    </span>
                    {text.playerLabel.replace("{n}", p.i + 1)}
                    {p.i === winner && <Trophy size={14} className="text-amber-500" aria-hidden="true" />}
                  </span>
                  <span className="text-rutuja-slate">{text.squareShort.replace("{p}", p.position)}</span>
                </div>
              ))}
          </div>

          <button type="button" data-testid="sl-restart" onClick={restart} className="btn-secondary mx-auto mt-7 rounded-full px-7 py-3.5 text-sm">
            <RotateCcw size={16} /> {text.winCta}
          </button>
        </div>
      )}
    </div>
  );
}
