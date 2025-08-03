import "./footer.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="section">
        <b>© {currentYear} Mathsoc</b>
      </div>
      <hr />
      <div className="section">
        <div className="link-section">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">Home</a>
          <a href="/contact-us">Contact</a>
        </div>
        <div className="social-section">
          <div className="socials">
            <a
              href={"/resources/discord-access"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/img/social/discord.svg" alt="Discord Icon" />
            </a>
            <a
              href={"https://www.instagram.com/uwmathsoc/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/img/social/instagram.svg"
                alt="Instagram Icon"
              />
            </a>
            <a
              href={"mailto:info@mathsoc.uwaterloo.ca"}
              target="_blank"
              rel="noopener noreferrer"
              className="mail-icon"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/img/social/mail.svg" alt="Mail Icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
