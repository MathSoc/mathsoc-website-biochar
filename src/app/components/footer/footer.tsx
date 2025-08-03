import "./footer.scss";

interface FooterProps {
  footer?: {
    socialLinks: {
      discord: string;
      instagram: string;
      mail: string;
    };
  };
}

export default function Footer({ footer }: FooterProps) {
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
            {footer?.socialLinks.discord && (
              <a
                href={footer.socialLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/img/social/discord.svg" alt="Discord Icon" />
              </a>
            )}
            {footer?.socialLinks.instagram && (
              <a
                href={footer.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/img/social/instagram.svg"
                  alt="Instagram Icon"
                />
              </a>
            )}
            {footer?.socialLinks.mail && (
              <a
                href={footer.socialLinks.mail}
                target="_blank"
                rel="noopener noreferrer"
                className="mail-icon"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/img/social/mail.svg" alt="Mail Icon" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
