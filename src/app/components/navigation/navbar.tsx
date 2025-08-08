"use client";

import "./navbar.scss";
import { navItems } from "./nav-items";
import { DesktopNav } from "./components/desktop-nav";
import { MobileNav } from "./components/mobile-nav";
import { useCallback, useState } from "react";

export function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = useCallback(
    () => setMobileMenuOpen(!isMobileMenuOpen),
    [isMobileMenuOpen, setMobileMenuOpen],
  );

  return (
    <>
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
    </>
  );
}
