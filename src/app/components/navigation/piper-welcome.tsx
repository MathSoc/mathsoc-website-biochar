"use client";

import { useCallback, useEffect, useRef } from "react";

const poses = ["piperwave", "pipermuah", "piperblush"];
const frames = [
  [{ opacity: 1, offset: 0 }, { opacity: 1, offset: .28 }, { opacity: 0, offset: .38 }, { opacity: 0, offset: 1 }],
  [{ opacity: 0, offset: 0 }, { opacity: 0, offset: .28 }, { opacity: 1, offset: .38 }, { opacity: 1, offset: .62 }, { opacity: 0, offset: .72 }, { opacity: 0, offset: 1 }],
  [{ opacity: 0, offset: 0 }, { opacity: 0, offset: .62 }, { opacity: 1, offset: .72 }, { opacity: 1, offset: 1 }],
];

export function PiperWelcome() {
  const button = useRef<HTMLButtonElement>(null);
  const running = useRef(false);
  const animations = useRef<Animation[]>([]);
  const generation = useRef(0);
  const replay = useCallback(async () => {
    if (running.current || !button.current) return;
    running.current = true;
    const token = generation.current;
    const images = Array.from(button.current.querySelectorAll<HTMLElement>("span"));
    const finish = () => images.forEach((image, index) => { image.style.opacity = index === 2 ? "1" : "0"; });
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { finish(); return; }
      animations.current = images.map((image, index) => image.animate(frames[index], { duration: 2600, easing: "linear", fill: "forwards" }));
      const start = document.timeline.currentTime;
      if (start !== null) animations.current.forEach(animation => { animation.startTime = start; });
      await Promise.all(animations.current.map(animation => animation.finished.catch(() => {})));
      if (generation.current === token) finish();
    } finally {
      if (generation.current === token) {
        animations.current.forEach(animation => animation.cancel());
        running.current = false;
      }
    }
  }, []);

  useEffect(() => {
    let active = true;
    const ready = Promise.all(poses.map(name => {
      const image = new Image();
      image.src = `/board-games-preview/assets/piper/${name}.png`;
      return image.decode().catch(() => {});
    }));
    void ready.then(() => { if (active) void replay(); });
    return () => {
      active = false;
      generation.current++;
      animations.current.forEach(animation => animation.cancel());
      running.current = false;
    };
  }, [replay]);

  return (
    <button ref={button} type="button" className="piper-nav-welcome" aria-label="Replay Piper welcome animation" onClick={() => { void replay(); }}>
      {poses.map((name, index) => <span key={name} aria-hidden="true" style={{ backgroundImage: `url(/board-games-preview/assets/piper/${name}.png)`, opacity: index === 0 ? 1 : 0 }} />)}
    </button>
  );
}
