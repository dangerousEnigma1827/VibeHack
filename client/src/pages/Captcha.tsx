import {
  useState,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import confetti from "canvas-confetti";

const tiles = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  row: Math.floor(index / 3),
  col: index % 3,
}));

// Update these IDs to match the squares containing Modi.
const correctTiles = [1, 2, 4, 5];
const confettiColors = ["#ff39d4", "#7137ff", "#b6ff00", "#00e5ff", "#ff6b35"];

function launchCaptchaConfetti() {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  const fire = confetti.create(canvas, { resize: true, useWorker: true });
  const burst = (origin: { x: number; y: number }) => {
    void fire({
      particleCount: 90,
      spread: 100,
      startVelocity: 42,
      origin,
      colors: confettiColors,
    });
  };

  burst({ x: 0.2, y: 0.7 });
  burst({ x: 0.8, y: 0.7 });
  const followUp = window.setTimeout(() => {
    burst({ x: 0.5, y: 0.45 });
  }, 450);

  window.setTimeout(() => {
    window.clearTimeout(followUp);
    canvas.remove();
  }, 3500);
}

function TermsBox({
  captchaPassed,
  advancedQuestionSolved,
  onAccepted,
}: {
  captchaPassed: boolean;
  advancedQuestionSolved: boolean;
  onAccepted: () => void;
}) {
  const [confirmation, setConfirmation] = useState<0 | 1 | 2>(0);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [buttonPosition, setButtonPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const [hasDodged, setHasDodged] = useState(false);
  const [dodgeMessage, setDodgeMessage] = useState("");
  const [dodgeFinished, setDodgeFinished] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showCaptchaPrompt, setShowCaptchaPrompt] = useState(false);

  function handleAccept() {
    if (!captchaPassed) {
      setShowCaptchaPrompt(true);
      return;
    }

    if (!advancedQuestionSolved) {
      setShowCaptchaPrompt(true);
      return;
    }

    setConfirmation(1);
  }

  function handleAcceptPointerEnter(
    event: ReactPointerEvent<HTMLButtonElement>
  ) {
    if (event.pointerType !== "mouse") return;

    if (dodgeFinished) return;

    const button = event.currentTarget.getBoundingClientRect();
    const maxLeft = Math.max(8, window.innerWidth - button.width - 8);
    const maxTop = Math.max(8, window.innerHeight - button.height - 8);
    let position = { left: 8, top: 8 };

    for (let attempt = 0; attempt < 20; attempt += 1) {
      position = {
        left: 8 + Math.random() * (maxLeft - 8),
        top: 8 + Math.random() * (maxTop - 8),
      };
      const targetX = position.left + button.width / 2;
      const targetY = position.top + button.height / 2;
      if (
        Math.hypot(targetX - event.clientX, targetY - event.clientY) > 220
      ) {
        break;
      }
    }

    if (dodgeCount < 4) {
      if (dodgeCount === 3) {
        setButtonPosition(null);
        setHasDodged(false);
        setDodgeMessage("We're sorry. The button is back.");
      } else {
        setButtonPosition(position);
        setHasDodged(true);
        setDodgeMessage("");
      }
      setDodgeCount((count) => count + 1);
      return;
    }

    setButtonPosition(position);
    setHasDodged(true);
    setDodgeCount((count) => count + 1);
    if (dodgeCount === 8) {
      setDodgeFinished(true);
      setDodgeMessage("We're sorry. You can click ACCEPT now.");
    } else {
      setDodgeMessage("");
    }
  }

  if (accepted) return null;

  return (
    <div className="terms-column">
      <aside className="terms-card" aria-labelledby="terms-heading">
      <div className="terms-stamp" aria-label="Fictional terms, not legal advice">
        NOT LEGAL
      </div>
      <p className="terms-eyebrow">PLEASE READ ABSOLUTELY EVERYTHING</p>
      <h2 className="terms-heading" id="terms-heading">
        TERMS &amp;
        <br />
        CONDITIONS
      </h2>
      <p className="terms-intro">
        Our entire legal department is one intern in a trench coat. They
        insist you read this.
      </p>

      <ul className="terms-clauses">
        <li>
          <strong>Clause 01 — Financial Decisions</strong>
          <span>
            By entering this website, you acknowledge your wallet was happier
            before this interaction.
          </span>
        </li>
        <li>
          <strong>Clause 02 — Brain Usage</strong>
          <span>
            WHYBUY? accepts no responsibility for decisions made after 2 AM,
            during boredom, or under the influence of a 70% OFF badge.
          </span>
        </li>
        <li>
          <strong>Clause 03 — Shipping</strong>
          <span>
            Your package may arrive before you remember ordering it. This is
            called the Subscription to Confusion.
          </span>
        </li>
        <li>
          <strong>Clause 04 — Dispute Resolution</strong>
          <span>
            All disputes shall be settled by a pigeon, three interns, and a
            legally unqualified potato.
          </span>
        </li>
        <li>
          <strong>Clause 05 — Emotional Damage</strong>
          <span>
            The company is not responsible for the emotional journey from “Add
            to Cart” to “Why did I buy this?”
          </span>
        </li>
      </ul>

      <p className="terms-disclaimer">
        These are fictional joke clauses for the site’s personality, not actual
        legal terms.
      </p>

      </aside>
      {dodgeMessage && (
        <div className="terms-apology-popup" role="status" aria-live="polite">
          <strong>OFFICIAL BUTTON APOLOGY</strong>
          <span>{dodgeMessage}</span>
        </div>
      )}
      {showCaptchaPrompt && (
        <div className="terms-modal-backdrop">
          <section
            className="terms-confirmation"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="captcha-required-heading"
          >
            <h3 id="captcha-required-heading">One more thing...</h3>
            <p>
              {!captchaPassed
                ? "Please complete the CAPTCHA verification before accepting."
                : "Please solve the JEE question correctly before accepting."}
            </p>
            <button
              type="button"
              className="terms-accept"
              onClick={() => setShowCaptchaPrompt(false)}
            >
              COMPLETE CAPTCHA
            </button>
          </section>
        </div>
      )}
      {confirmation > 0 && !showCaptchaPrompt && (
        <div className="terms-modal-backdrop">
          <section
            className="terms-confirmation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-confirmation-heading"
          >
            <h3 id="terms-confirmation-heading">
              {confirmation === 1
                ? "Are you sure?"
                : "Are you sure you are sure?"}
            </h3>
            <div className="terms-confirmation-actions">
              <button
                type="button"
                className="terms-accept"
                onClick={() => {
                  if (confirmation === 1) {
                    setConfirmation(2);
                  } else {
                    setAccepted(true);
                    onAccepted();
                  }
                }}
              >
                {confirmation === 1 ? "YES" : "YES, I AM SURE"}
              </button>
              <button
                type="button"
                className="terms-cancel"
                onClick={() => setConfirmation(0)}
              >
                NO, GO BACK
              </button>
            </div>
          </section>
        </div>
      )}
      {confirmation === 0 && (
        <button
          type="button"
          className={`terms-accept terms-dodging-button ${
            hasDodged ? "is-dodging" : ""
          }`}
          style={
            buttonPosition
              ? {
                  left: `${buttonPosition.left}px`,
                  top: `${buttonPosition.top}px`,
                  right: "auto",
                  bottom: "auto",
                  transform: "none",
                }
              : undefined
          }
          onPointerEnter={handleAcceptPointerEnter}
          onClick={handleAccept}
        >
          ACCEPT
        </button>
      )}
    </div>
  );
}

export default function Captcha({ onSuccess }: { onSuccess?: () => void }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [message, setMessage] = useState("");
  const [passed, setPassed] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [mathAnswer, setMathAnswer] = useState("");
  const [mathMessage, setMathMessage] = useState("");

  function toggleTile(id: number) {
    if (passed) return;

    setSelected((current) =>
      current.includes(id)
        ? current.filter((tileId) => tileId !== id)
        : [...current, id]
    );

    setMessage("");
  }

  function verifyCaptcha() {
    const isCorrect =
      selected.length === correctTiles.length &&
      correctTiles.every((id) => selected.includes(id));

    if (isCorrect) {
      setPassed(true);
      setMessage("HUMANITY CONFIRMED. UNFORTUNATELY.");
      launchCaptchaConfetti();
      onSuccess?.();
      window.setTimeout(() => setShowChallenge(true), 2500);
    } else {
      setMessage("WRONG. SELECT EVERY SQUARE CONTAINING MODI.");
    }
  }

  function checkMathAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isCorrect =
      mathAnswer.trim() !== "" && Number(mathAnswer) === 5;
    setMathMessage(
      isCorrect ? "CORRECT. YOU MAY REST." : "INCORRECT. TRY AGAIN."
    );
  }

  if (showChallenge) {
    return (
      <main className="site-layout">
        <section className="jee-section">
          <h1>YOU PASSED. HOW UNFORTUNATE.</h1>
          <p>Welcome to the next stage of suffering.</p>

          <div className="exam-paper">
            <h2>JEE ADVANCED — GOOD LUCK.</h2>
            <img
              src="/images/jee-question.jpg"
              alt="JEE Advanced question"
              className="jee-question-image"
            />
          </div>

          <div className="just-kidding">
            <h2>JUST KIDDING.</h2>
            <p>What is 2 + 3?</p>
            <form className="math-form" onSubmit={checkMathAnswer}>
              <input
                type="text"
                inputMode="numeric"
                value={mathAnswer}
                onChange={(event) => {
                  setMathAnswer(event.target.value);
                  setMathMessage("");
                }}
                aria-label="Your answer to 2 plus 3"
                placeholder="Your answer"
                required
              />
              <button type="submit">CHECK ANSWER</button>
            </form>
            {mathMessage && (
              <p
                className={`captcha-feedback ${
                  mathMessage.startsWith("CORRECT") ? "success" : ""
                }`}
                role="status"
              >
                {mathMessage}
              </p>
            )}
          </div>
        </section>
        <TermsBox
          captchaPassed={passed}
          advancedQuestionSolved={mathMessage.startsWith("CORRECT")}
          onAccepted={() => window.location.assign("/homepage")}
        />
      </main>
    );
  }

  return (
    <main className="site-layout">
      <section className="captcha-section">
        <p className="captcha-eyebrow">
          HUMAN VERIFICATION SYSTEM™
        </p>

        <h1 className="captcha-heading">PROVE YOU HAVE A SOUL</h1>

        <p className="captcha-subtitle">
          (our robot has trust issues and a tiny clipboard)
        </p>

        <div className="captcha-panel">
          <div className="captcha-topbar">
            <span>SECURITY-ISH CHECK</span>
            <span>FORM 001-B (PROBABLY)</span>
          </div>

          <p className="captcha-instruction">
            SELECT ALL SQUARES CONTAINING MODI
          </p>

          <div className="captcha-grid">
            {tiles.map((tile) => (
              <button
                key={tile.id}
                type="button"
                className={`captcha-tile ${
                  selected.includes(tile.id) ? "is-selected" : ""
                }`}
                onClick={() => toggleTile(tile.id)}
                aria-label={`Square ${tile.id}`}
                aria-pressed={selected.includes(tile.id)}
              >
                <span
                  className="captcha-crop"
                  style={{
                    backgroundImage: 'url("/images/modimeloni.jpg")',
                    backgroundPosition: `${tile.col * 50}% ${tile.row * 50}%`,
                  }}
                />

                {selected.includes(tile.id) && (
                  <span className="captcha-check">✓</span>
                )}
              </button>
            ))}
          </div>

          <p className="captcha-legal">
            By continuing, you waive your right to happiness and a
            reasonable shopping experience.
          </p>

          <button
            type="button"
            className="captcha-verify"
            onClick={verifyCaptcha}
            disabled={passed}
          >
            {passed ? "HUMAN DETECTED ✓" : "VERIFY MY EXISTENCE →"}
          </button>

          {message && (
            <p
              className={`captcha-feedback ${passed ? "success" : ""}`}
              role="status"
            >
              {message}
            </p>
          )}

          <p className="captcha-footer">
            PROTECTED BY ABSOLUTELY NO ONE
          </p>
        </div>
      </section>
      <TermsBox
        captchaPassed={passed}
        advancedQuestionSolved={mathMessage.startsWith("CORRECT")}
        onAccepted={() => window.location.assign("/homepage")}
      />
    </main>
  );
}