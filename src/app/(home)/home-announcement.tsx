"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./home-announcement.scss";

// Change a notice ID when publishing an updated announcement.
const notices = [
  { id: "election-results-short-2026-10", message: "Election results are out! Meet your new councillors.", href: "/community/leadership" },
  { id: "board-games-launch-2026-10", message: "Explore our new board-games catalogue and find your next game to borrow.", href: "/board-games" },
];

export function HomeAnnouncement() {
  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  useEffect(() => {
    setVisibleIds(notices.filter(notice => {
      try { return localStorage.getItem(`mathsoc-home-notice-${notice.id}`) !== "dismissed"; }
      catch { return true; }
    }).map(notice => notice.id));
  }, []);

  function dismiss(id: string) {
    try { localStorage.setItem(`mathsoc-home-notice-${id}`, "dismissed"); }
    catch { /* Closing still works when browser storage is unavailable. */ }
    setVisibleIds(ids => ids.filter(value => value !== id));
  }

  return (
    <>
      {notices.filter(notice => visibleIds.includes(notice.id)).map(notice => (
        <section key={notice.id} className="home-announcement" aria-label="MathSoc announcement">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v6" />
            <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
          </svg>
          <p>{notice.message}</p>
          <Link href={notice.href} aria-label={`Learn more: ${notice.message}`}>Learn more</Link>
          <button type="button" aria-label={`Dismiss: ${notice.message}`} onClick={() => dismiss(notice.id)}>
            <span aria-hidden="true">×</span>
          </button>
        </section>
      ))}
    </>
  );
}
