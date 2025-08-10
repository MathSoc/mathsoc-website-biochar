import Image from "next/image";
import "./headshot.scss";
import Link from "next/link";

export const Headshot: React.FC<{
  name: string;
  position: string;
  email: string;
  image?: string;
}> = ({
  name,
  position,
  email,
  image = "/img/councillor-images/default.png",
}) => {
  return (
    <div className="headshot">
      <div className="headshot-container">
        <Image src={image} alt="" fill objectFit="contain" />
      </div>
      <span className="headshot-name">{name}</span>
      <span className="headshot-position">{position}</span>
      <span className="headshot-email">
        <Link href={`mailto:${email}`}>{email}</Link>
      </span>
    </div>
  );
};
