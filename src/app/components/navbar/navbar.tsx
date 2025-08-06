import Image from "next/image";
import Link from "next/link";
import "./navbar.scss";
import navItems from "./navbar.json";

export function Navbar() {
  return (
    <>
      <a className="skip-to-main-content" href="#body">
        Skip to main content
      </a>

      <nav id="navbar">
        <div id="inner-navbar">
          <Link href="/" className="nav-logo-container">
            <div className="nav-logo">
              <Image
                fill
                src="/logos/horizontal-logo.svg"
                className="nav-logo"
                id="pink-logo"
                alt="MathSoc Logo. Click to return to homepage"
              />
              {/* <Image
                fill
                src="/logos/horizontal-logo-white.svg"
                id="white-logo"
                alt="MathSoc Logo. Click to return to homepage"
              /> */}
            </div>
          </Link>

          <ul className="items">
            {navItems.map((category, index) => (
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

          <button id="mobile-menu-button">
            <Image fill src="/logos/single-downvote.svg" alt="Mobile menu" />
          </button>
        </div>
      </nav>

      <nav id="mobile-nav">
        <ul className="items">
          {navItems.map((category, index) => (
            <li key={index} className="dropdown">
              {category.ref ? (
                <a href={category.ref}>
                  <div className="dropdown-button">{category.title}</div>
                </a>
              ) : (
                <button className="dropdown-button">{category.title}</button>
              )}
              {category.children && category.children.length > 0 && (
                <ul className="dropdown-content">
                  {category.children.map((item, childIndex) => (
                    <li key={childIndex} className="sub-button">
                      <a href={item.ref}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
