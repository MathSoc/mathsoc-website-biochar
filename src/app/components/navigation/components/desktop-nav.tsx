import Image from "next/image";
import Link from "next/link";
import { NavItem } from "../nav-items";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const DesktopNav: React.FC<{
  items: NavItem[];
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}> = ({ items, toggleMobileMenu, closeMobileMenu }) => {
  return (
    <nav id="navbar">
      <div id="inner-navbar">
        <Link href="/" className="nav-logo-container" onClick={closeMobileMenu}>
          <div className="nav-logo">
            <Image
              fill
              src="/img/logos/horizontal-logo.svg"
              className="nav-logo"
              id="pink-logo"
              alt="MathSoc Logo. Click to return to homepage"
            />
          </div>
        </Link>

        <ul className="items">
          {items.map((category, index) => (
            <li key={index} className="dropdown">
              {!category.ref ? (
                <button className="dropdown-button">{category.title}</button>
              ) : (
                <a href={category.ref}>
                  <div className="dropdown-button">{category.title}</div>
                </a>
              )}
              {category.children && category.children.length > 0 && (
                <div className="dropdown-content">
                  {category.children.map((item, childIndex) => (
                    <a key={childIndex} href={item.ref}>
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
      </div>
    </nav>
  );
};
