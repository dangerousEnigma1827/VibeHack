import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import CollageBackground from "./loading/CollageBackground";
import IsoLoadingBar from "./loading/IsoLoadingBar";

export interface LoadingPageProps {
  /** Called once when loading finishes and the visitor should be sent to the store. */
  onEnterStore?: () => void;
  /** Total loading time in seconds. */
  duration?: number;
}

const STATUS = [
  "Inflating prices…",
  "Hiding the checkout button…",
  "Misplacing your cart…",
  "Deleting every discount…",
  "Almost there (lie)…",
  "Done. Regret awaits.",
];
const HOVER_STATUS = [
  "Hovering costs progress. Obviously.",
  "The bar noticed you. Keep hovering to lose everything.",
  "Please stop touching the loading bar.",
  "Congratulations, you broke the loading bar.",
];

const FONTS =
  "@import url('https://fonts.googleapis.com/css2?family=Anton&family=Permanent+Marker&display=swap');";

function LoadingPage({ onEnterStore, duration = 6 }: LoadingPageProps) {
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const hoverPenalty = useMotionValue(0);
  const visibleProgress = useMotionValue(0);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [hoverStatus, setHoverStatus] = useState<string>();

  const hoverAudioRef = useRef<HTMLAudioElement>(null);
  const enterRef = useRef(onEnterStore);
  enterRef.current = onEnterStore;
  const enteredRef = useRef(false);
  const sabotageTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (sabotageTimer.current !== undefined) {
        window.clearInterval(sabotageTimer.current);
      }
      hoverAudioRef.current?.pause();
    },
    [],
  );

  const updateVisibleProgress = (value: number, penalty: number) => {
    visibleProgress.set(Math.max(0, Math.min(1, value + penalty)));
  };
  useMotionValueEvent(progress, "change", (value) => {
    updateVisibleProgress(value, hoverPenalty.get());
  });
  useMotionValueEvent(hoverPenalty, "change", (penalty) => {
    updateVisibleProgress(progress.get(), penalty);
  });
  useMotionValueEvent(visibleProgress, "change", (v) => {
    setPct(Math.round(v * 100));
    setDone(v >= 1);
  });

  const sabotage = () => {
    if (sabotageTimer.current !== undefined) return;
    setHoverStatus(HOVER_STATUS[Math.floor(Math.random() * HOVER_STATUS.length)]);
    const drain = () => {
      const nextPenalty = Math.max(-1, hoverPenalty.get() - 0.12);
      hoverPenalty.set(nextPenalty);
      if (nextPenalty === -1) {
        window.clearInterval(sabotageTimer.current);
        sabotageTimer.current = undefined;
      }
    };
    drain();
    sabotageTimer.current = window.setInterval(drain, 250);
  };

  const stopSabotage = () => {
    if (sabotageTimer.current !== undefined) {
      window.clearInterval(sabotageTimer.current);
      sabotageTimer.current = undefined;
    }
    animate(hoverPenalty, 0, { duration: 0.8, ease: "easeOut" });
  };

  const startHoverAudio = () => {
    const audio = hoverAudioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch((error: unknown) => {
      console.error("Unable to play loading-bar hover audio.", error);
    });
  };

  const stopHoverAudio = () => {
    const audio = hoverAudioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  // Stuttering, lurching progress: it stalls and jumps, like a chaotic store should.
  useEffect(() => {
    const controls = reduce
      ? animate(progress, 1, { duration: duration * 0.5, ease: "linear" })
      : animate(
          progress,
          [0, 0.14, 0.23, 0.24, 0.47, 0.59, 0.6, 0.84, 0.92, 1],
          {
            duration,
            times: [0, 0.12, 0.2, 0.27, 0.42, 0.55, 0.62, 0.8, 0.9, 1],
            ease: "easeInOut",
          },
        );
    return () => controls.stop();
  }, [progress, duration, reduce]);

  // Completion: hand off to the store exactly once.
  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => {
      if (visibleProgress.get() < 1) return;
      if (enteredRef.current) return;
      enteredRef.current = true;
      enterRef.current?.();
    }, 900);
    return () => window.clearTimeout(id);
  }, [done]);

  const status =
    hoverStatus ?? STATUS[Math.min(STATUS.length - 1, Math.floor((pct / 100) * STATUS.length))];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading WORSTBUY"
      className="fixed inset-0 overflow-hidden bg-[#16001f]"
      style={{ height: "100dvh" }}
    >
      <audio ref={hoverAudioRef} preload="auto" src="/audio/faaa.mp3" />
      <style>{FONTS}</style>
      <CollageBackground />

      <div className="absolute inset-0 grid place-items-center p-3 sm:p-6">
        <motion.div
          initial={reduce ? false : { scale: 0.85, rotate: -6, opacity: 0 }}
          animate={{ scale: 1, rotate: -1.5, opacity: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 14 }}
          className="relative w-[min(94vw,860px)] max-h-[92dvh] border-4 border-black bg-white px-4 pb-4 pt-6 shadow-[8px_8px_0_#000] sm:px-8 sm:pb-6"
        >
          {/* tape */}
          <span className="absolute -top-3 left-6 h-6 w-20 -rotate-6 bg-yellow-200/80 sm:w-28" />
          <span className="absolute -top-3 right-8 h-6 w-20 rotate-3 bg-pink-300/80 sm:w-28" />

          <div
            className="mb-1 text-center text-3xl uppercase leading-none tracking-wide text-[#16001f] sm:text-5xl"
            style={{ fontFamily: "'Anton','Impact',sans-serif" }}
          >
            Worst<span className="text-[#ff2fb3]">Buy</span>
          </div>

          <div
            className="mx-auto w-full cursor-not-allowed"
            onMouseEnter={() => {
              sabotage();
              startHoverAudio();
            }}
            onMouseLeave={() => {
              stopSabotage();
              stopHoverAudio();
            }}
            title="Do not hover. Seriously. It only gets worse."
          >
            <IsoLoadingBar progress={visibleProgress} className="mx-auto block h-auto max-h-[40dvh] w-full" />
          </div>

          <div className="mt-1 flex items-end justify-between gap-3">
            <p
              className="min-w-0 truncate text-sm text-[#16001f] sm:text-xl"
              style={{ fontFamily: "'Permanent Marker','Comic Sans MS',cursive" }}
            >
              {status}
            </p>
            <p
              className="shrink-0 text-4xl leading-none text-[#1cbf00] sm:text-6xl"
              style={{ fontFamily: "'Anton','Impact',sans-serif", WebkitTextStroke: "2px #0a3d00" }}
            >
              {pct}%
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoadingPage;