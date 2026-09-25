import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const PETALS = Array.from({ length: 34 }, (_, i) => ({
  id: i,
  left: (i * 29) % 101,
  delay: ((i * 0.37) % 5.5).toFixed(2),
  duration: (7 + (i % 6) * 0.8).toFixed(2),
  size: 9 + (i % 5) * 3,
  drift: (i % 2 ? 1 : -1) * (25 + (i % 7) * 9)
}));

function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left + "%",
            animationDelay: p.delay + "s",
            animationDuration: p.duration + "s",
            width: p.size + "px",
            height: p.size * 1.35 + "px",
            "--drift": p.drift + "px"
          }}
        />
      ))}
    </div>
  );
}

function App() {
  const [opened, setOpened] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!opened) return;
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(window.scrollY / max, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [opened]);

  const letterStyle = {
    "--letter-progress": scrollProgress,
    "--letter-y": (18 - scrollProgress * 18) + "vh",
    "--letter-scale": 0.68 + scrollProgress * 0.32,
    "--letter-rotate": (0.8 - scrollProgress * 0.8) + "deg"
  };

  return (
    <main className={"scene " + (opened ? "is-open " : "") + (scrollProgress > 0.02 ? "has-scroll" : "")}>
      <div className="sticky-stage">
        <div className="ambient" aria-hidden="true" />

        <section className="envelope-scene" aria-label="Invitation envelope">
          <div className="envelope-shadow" />
          <div className="envelope">
            <div className="envelope-back" />

            <div className="letter" style={letterStyle} aria-hidden="true">
              <div className="letter-paper">
                <div className="letter-frame">
                  <div className="letter-ornament">✦</div>
                  <div className="blank-content" />
                  <div className="letter-ornament">✦</div>
                </div>
              </div>
            </div>

            <div className="envelope-front" />
            <div className="envelope-flap" />
            <div className="envelope-edge" />

            {!opened && (
              <div className="seal-wrap">
                <button className="seal" onClick={() => setOpened(true)} aria-label="Open invitation">
                  <span className="seal-inner">✦</span>
                </button>
                <div className="tap-hint">Tap the seal to open the invitation</div>
              </div>
            )}
          </div>
        </section>

        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll to reveal</span>
          <i />
        </div>

        <Petals />
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
