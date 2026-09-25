import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const RAW_ASSET_BASE =
  "https://raw.githubusercontent.com/pranav-sketch-cc/itekron-invitation/main/assets/";

const asset = (path) =>
  RAW_ASSET_BASE + path.split("/").map(encodeURIComponent).join("/");

const FEATURED_POSTER = asset("non-tech/itekron-poster.jpg");

const POSTERS = [
  ["Cognexa", asset("non-tech/tech/Cognexa A4.png")],
  ["Convera", asset("non-tech/tech/Convera A4.png")],
  ["Mind 2 Code", asset("non-tech/tech/Mind 2 code A4.png")],
  ["WebbugX", asset("non-tech/tech/WebbugX A4.png")],
  ["UXify", asset("non-tech/tech/uxify A4.png")],
  ["Brainvex", asset("non-tech/BRAINVEX NON-TECHNICAL EVENT.jpg.jpeg")],
  ["Dreaden Crypta", asset("non-tech/DREADEN CRYPTA post (1).png")],
  ["Hogwarts Hustles", asset("non-tech/HOGWARTS HUSTLES post (1).png")],
  ["Meme Masters", asset("non-tech/MEME MASTERS post.png")],
  ["Mind Mosaic", asset("non-tech/Mind Mosaic.png")]
];

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

function PosterShowcase() {
  const carouselPosters = [...POSTERS, ...POSTERS];

  return (
    <section className="poster-showcase" aria-label="I-TEKRON'26 events and posters">
      <div className="featured-poster-wrap">
        <div className="featured-poster-card">
          <img
            src={FEATURED_POSTER}
            alt="I-TEKRON'26 poster"
            className="featured-poster"
          />
        </div>
      </div>

      <div className="event-meta" aria-label="Event date and time">
        <div>
          <span>DATE</span>
          <strong>26th September 2026</strong>
        </div>
        <i aria-hidden="true">✦</i>
        <div>
          <span>TIME</span>
          <strong>10:00 AM</strong>
        </div>
      </div>

      <div className="poster-carousel-shell">
        <div className="poster-carousel-heading">
          <span>EXPLORE THE EVENTS</span>
          <b>TECH &amp; NON-TECH</b>
        </div>

        <div className="poster-carousel" aria-label="Event poster carousel">
          <div className="poster-track">
            {carouselPosters.map(([name, src], index) => (
              <div className="poster-card" key={name + "-" + index}>
                <img src={src} alt={name + " event poster"} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InvitationContent() {
  return (
    <div className="letter-paper">
      <div className="letter-frame">
        <header className="letter-top">
          <img
            className="college-logo"
            src={asset("non-tech/itekron Certificate final.pdf.png")}
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
          <PosterShowcase />
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
