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
  return <div className="petals" aria-hidden="true">
    {PETALS.map((p) => (
      <span key={p.id} className="petal" style={{
        left: p.left + "%",
        animationDelay: p.delay + "s",
        animationDuration: p.duration + "s",
        width: p.size + "px",
        height: p.size * 1.35 + "px",
        "--drift": p.drift + "px"
      }} />
    ))}
  </div>;
}

function App() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened) return;
    document.body.classList.add("invitation-open");
    return () => document.body.classList.remove("invitation-open");
  }, [opened]);

  return (
    <main className={"scene " + (opened ? "is-open" : "")}>
      <div className="sticky-stage">
        <div className="ambient" aria-hidden="true" />

        <section className="envelope-scene" aria-label="Invitation envelope">
          <div className="envelope-shadow" />
          <div className="envelope">
            <div className="envelope-back" />

            <div className="letter" aria-hidden="true">
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

        <div className="open-hint" aria-hidden="true">
          <span>Opening your invitation</span>
          <i />
        </div>

        <Petals />
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
