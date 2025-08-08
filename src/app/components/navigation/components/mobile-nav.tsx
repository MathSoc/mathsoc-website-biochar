"use client";

import Link from "next/link";
import { NavItem } from "../nav-items";
import "./mobile-nav.scss";
import { useState } from "react";
import Image from "next/image";
import { Row } from "../../layout/layout-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const MobileNav: React.FC<{
  items: NavItem[];
  isOpen: boolean;
  toggleMobileMenu: () => void;
}> = ({ items, isOpen, toggleMobileMenu }) => {
  return (
    <nav id="mobile-nav" className={isOpen ? "active" : ""}>
      <Row>
        <div className="nav-logo">
          <Image
            fill
            src="/img/logos/horizontal-logo.svg"
            className="nav-logo"
            id="pink-logo"
            alt="MathSoc Logo. Click to return to homepage"
          />
        </div>
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
      </Row>
      <ul className="items">
        {items.map((item, index) => (
          <MobileMenuButton
            key={index}
            toggleMobileMenu={toggleMobileMenu}
            item={item}
          />
        ))}
      </ul>
    </nav>
  );
};

const MobileMenuButton: React.FC<{
  item: NavItem;
  toggleMobileMenu: () => void;
}> = ({ item, toggleMobileMenu }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  if (item.ref) {
    return (
      <li className="dropdown">
        <Link href={item.ref} onClick={toggleMobileMenu}>
          <div className="dropdown-button">{item.title}</div>
        </Link>
      </li>
    );
  }

  return (
    <li className="dropdown">
      <button
        className="dropdown-button"
        onClick={() => setIsActive(!isActive)}
      >
        {item.title}
      </button>
      <ul className={`dropdown-content ${isActive ? "active" : ""}`}>
        {item.children!.map((childItem, childIndex) => (
          <li key={childIndex} className="sub-button">
            <Link href={childItem.ref!} onClick={toggleMobileMenu}>
              {childItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};
