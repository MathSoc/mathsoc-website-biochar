import Image from "next/image";
import "./banner.scss";

export const Banner: React.FC<{
  imgPath: string;
  children: React.ReactNode;
  variant?: "pink";
  size?: "normal" | "large";
}> = ({ imgPath, children, variant, size }) => {
  return (
    <div className={`banner ${variant}`}>
      <div
        className={`banner-container ${size === "large" ? "height-900" : ""}`}
      >
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
