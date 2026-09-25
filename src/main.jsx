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

function InvitationContent() {
  return (
    <div className="letter-paper">
      <div className="letter-frame">
        <header className="letter-top">
          <img
            className="college-logo"
            src="https://npsbcet.edu.in/wp-content/uploads/2026/02/cred.png"
            alt="New Prince Shri Bhavani College of Engineering and Technology"
          />
          <p className="college-name">
            NEW PRINCE SHRI BHAVANI
            <br />
            COLLEGE OF ENGINEERING AND TECHNOLOGY
          </p>
        </header>

        <section className="invitation-hero">
          <p className="eyebrow">YOU ARE CORDIALLY INVITED TO</p>
          <h1>I-TEKRON&apos;26</h1>
          <div className="hero-line" aria-hidden="true">
            <span />
            <b>✦</b>
            <span />
          </div>
          <img
            className="college-image"
            src="https://npsbcet.edu.in/wp-content/uploads/2026/02/imm-300x300.png"
            alt="New Prince Shri Bhavani College of Engineering and Technology campus"
          />
          <p className="invite-text">
            Join us for a celebration of technology, creativity and innovation.
          </p>
          <span className="scroll-cue" aria-hidden="true">
            Scroll to explore
            <span>↓</span>
          </span>
        </section>

        <section className="invitation-section">
          <span className="section-mark">✦</span>
          <p className="section-kicker">A SPECIAL INVITATION</p>
          <h2>Technology. Creativity. Innovation.</h2>
          <p>
            Step into I-TEKRON&apos;26 and experience an invitation crafted
            especially for a celebration of ideas, imagination and the spirit
            of technology.
          </p>
          <p>
            We look forward to welcoming you and making this occasion a
            memorable one.
          </p>
        </section>

        <footer className="letter-footer">
          <span>✦</span>
          <p>I-TEKRON&apos;26</p>
          <span>✦</span>
        </footer>
      </div>
    </div>
  );
}

function App() {
  const [opened, setOpened] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("invitation-open", settled);
    return () => document.body.classList.remove("invitation-open");
  }, [settled]);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
  };

  return (
    <main className={"scene " + (opened ? "is-open " : "") + (settled ? "is-settled" : "")}>
      <div className="sticky-stage">
        <div className="ambient" aria-hidden="true" />

        <section className="envelope-scene" aria-label="Invitation envelope">
          <div className="envelope-shadow" />

          <div className="envelope">
            <div className="envelope-back" />
            <div className="envelope-front" />
            <div className="envelope-flap" />
            <div className="envelope-edge" />

            {!opened && (
              <div className="seal-wrap">
                <button
                  className="seal"
                  onClick={handleOpen}
                  aria-label="Open invitation"
                  type="button"
                >
                  <span className="seal-inner">✦</span>
                </button>
                <div className="tap-hint">Tap the seal to open the invitation</div>
              </div>
            )}
          </div>

          <div
            className="letter"
            aria-label="I-TEKRON'26 invitation"
            onAnimationEnd={(event) => {
              if (event.animationName === "letterReveal") setSettled(true);
            }}
          >
            <InvitationContent />
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
