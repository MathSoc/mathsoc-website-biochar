import Image from "next/image";
import "./headshot.scss";
import Link from "next/link";

const HEADSHOT_SIZE_PX = 150;

export const Headshot: React.FC<{
  name: string;
  position: string;
  email: string;
  path?: string;
}> = ({ name, position, email, path = "/councillor-images/default.png" }) => {
  return (
    <div className="headshot">
      <Image
        src={path}
        alt=""
        width={HEADSHOT_SIZE_PX}
        height={HEADSHOT_SIZE_PX}
      />
      <span className="headshot-name">{name}</span>
      <span className="headshot-position">{position}</span>
      <span className="headshot-email">
        <Link href={`mailto:${email}`}>{email}</Link>
      </span>
    </div>
  );
};
