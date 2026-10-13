"use client";

import "./navbar.scss";
import { navItems } from "./nav-items";
import { DesktopNav } from "./components/desktop-nav";
import { MobileNav } from "./components/mobile-nav";
import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isBoardGames =
    pathname === "/board-games" ||
    pathname.startsWith("/board-games/");

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((open) => !open);
  }, []);

  return (
    <div className={isBoardGames ? "board-games-navigation" : undefined}>
      <a className="skip-to-main-content" href="#main-content">
        Skip to main content
      </a>

      <DesktopNav
        items={navItems}
        toggleMobileMenu={toggleMobileMenu}
        closeMobileMenu={() => setMobileMenuOpen(false)}
      />
      <MobileNav
        items={navItems}
        isOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
    </div>
  );
}