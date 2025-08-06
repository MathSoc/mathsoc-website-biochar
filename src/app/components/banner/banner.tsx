import Image from "next/image";
import "./banner.scss";

export const Banner: React.FC<{
  imgPath: string;
  children: React.ReactNode;
  variant?: "pink";
  size?: "normal" | "large";
}> = ({ imgPath, children, variant, size }) => {
  return (
    <div
      className={`banner ${variant} ${size === "large" ? "height-full" : ""}`}
    >
      <div className={`banner-container`}>
        <Image
          src={imgPath}
          alt=""
          fill
          className="banner-image"
          objectFit="cover"
        ></Image>
        <div className="banner-contents">
          <div className="centerer">{children}</div>
        </div>
      </div>
      <div className="banner-placeholder"></div>
    </div>
  );
};

export const BannerTitles: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="banner-titles">
      <h1 className="banner-subtitle">{subtitle}</h1>
      <h1 className="banner-title">{title}</h1>
    </div>
  );
};
