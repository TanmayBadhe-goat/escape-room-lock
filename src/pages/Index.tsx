import { useState } from "react";
import revealImage from "@/assets/unlock-reveal.jpg";

const CORRECT_PASSWORD = "3025";

const Index = () => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [shake, setShake] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  const handleKey = (digit: string) => {
    if (status === "success") return;
    if (input.length >= 4) return;
    const next = input + digit;
    setInput(next);
    setStatus("idle");

    if (next.length === 4) {
      if (next === CORRECT_PASSWORD) {
        setStatus("success");
        setTimeout(() => setShowReveal(true), 800);
      } else {
        setStatus("error");
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setInput("");
          setStatus("idle");
        }, 700);
      }
    }
  };

  const handleClear = () => {
    setInput("");
    setStatus("idle");
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
    setStatus("idle");
  };

  if (showReveal) {
    return (
      <div
        className="reveal-screen"
        onClick={() => {
          setShowReveal(false);
          setInput("");
          setStatus("idle");
        }}
      >
        <img src={revealImage} alt="Secret revealed" className="reveal-image" />
        <p className="reveal-hint">tap to lock again</p>
      </div>
    );
  }

  return (
    <div className="lock-screen">
      {/* Ambient candle flickers */}
      <div className="candle-glow" />

      <div className="lock-container">
        <div className="lock-header">
          <div className="lock-icon">🔒</div>
          <h1 className="lock-title">ENTER CODE</h1>
          <p className="lock-subtitle">The door awaits the worthy</p>
        </div>

        {/* Display */}
        <div className={`display-row ${shake ? "shake" : ""}`}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`display-dot ${
                i < input.length
                  ? status === "error"
                    ? "dot-error"
                    : status === "success"
                    ? "dot-success"
                    : "dot-filled"
                  : "dot-empty"
              }`}
            />
          ))}
        </div>

        {status === "error" && (
          <p className="error-msg">✗ Wrong code. Try again.</p>
        )}
        {status === "success" && (
          <p className="success-msg">✓ Unlocking…</p>
        )}

        {/* Keypad */}
        <div className="keypad">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
            <button key={d} className="key-btn" onClick={() => handleKey(d)}>
              {d}
            </button>
          ))}
          <button className="key-btn key-clear" onClick={handleClear}>
            CLR
          </button>
          <button className="key-btn" onClick={() => handleKey("0")}>
            0
          </button>
          <button className="key-btn key-del" onClick={handleDelete}>
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
