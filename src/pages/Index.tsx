import { useState } from "react";
import revealImage from "@/assets/unlock-reveal.jpg";

const CORRECT_PASSWORD = "3025";

// Placeholder: replace these imports once the user uploads each file's image.
// For now all 4 files fall back to the existing reveal image.
const FILE_IMAGES: Record<string, string> = {
  "17": revealImage,
  "19": revealImage,
  "23": revealImage,
  "29": revealImage,
};

const FILES = ["17", "19", "23", "29"] as const;
type FileId = (typeof FILES)[number];

const Index = () => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [shake, setShake] = useState(false);
  const [showFileSystem, setShowFileSystem] = useState(false);
  const [openFile, setOpenFile] = useState<FileId | null>(null);

  const handleKey = (digit: string) => {
    if (status === "success") return;
    if (input.length >= 4) return;
    const next = input + digit;
    setInput(next);
    setStatus("idle");

    if (next.length === 4) {
      if (next === CORRECT_PASSWORD) {
        setStatus("success");
        setTimeout(() => setShowFileSystem(true), 800);
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

  const handleLock = () => {
    setShowFileSystem(false);
    setOpenFile(null);
    setInput("");
    setStatus("idle");
  };

  // ── Lightbox ──────────────────────────────────────────────────────────────
  if (openFile !== null) {
    return (
      <div className="lightbox-overlay" onClick={() => setOpenFile(null)}>
        <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
          <div className="lightbox-header">
            <button className="lightbox-back" onClick={() => setOpenFile(null)}>
              ← Back to files
            </button>
            <span className="lightbox-filename">FILE_{openFile}</span>
          </div>
          <img
            src={FILE_IMAGES[openFile]}
            alt={`File ${openFile}`}
            className="lightbox-image"
          />
        </div>
      </div>
    );
  }

  // ── File System ────────────────────────────────────────────────────────────
  if (showFileSystem) {
    return (
      <div className="file-system-screen">
        <div className="file-explorer-panel">
          {/* Header */}
          <div className="file-explorer-header">
            <span className="file-explorer-title">[ CLASSIFIED FILES ]</span>
            <button className="file-lock-btn" onClick={handleLock} title="Lock">
              🔒
            </button>
          </div>

          {/* Scanline decoration */}
          <div className="file-explorer-meta">
            ACCESS GRANTED · {FILES.length} RECORDS FOUND
          </div>

          {/* 2×2 Grid */}
          <div className="file-grid">
            {FILES.map((id) => (
              <button
                key={id}
                className="file-item"
                onClick={() => setOpenFile(id)}
              >
                <span className="file-icon">📁</span>
                <span className="file-name">{id}</span>
              </button>
            ))}
          </div>

          <div className="file-explorer-footer">
            CLASSIFIED · DO NOT DISTRIBUTE
          </div>
        </div>
      </div>
    );
  }

  // ── Lock Screen ────────────────────────────────────────────────────────────
  return (
    <div className="lock-screen">
      <div className="candle-glow" />

      <div className="lock-container">
        <div className="lock-header">
          <div className="lock-icon">🔒</div>
          <h1 className="lock-title">ENTER CODE</h1>
          <p className="lock-subtitle">The door awaits the worthy</p>
        </div>

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
