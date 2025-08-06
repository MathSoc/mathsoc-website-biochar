import Link from "next/link";
import "./button.scss";

export const Button: React.FC<{ children: React.ReactNode; href: string }> = ({
  children,
  href,
}) => {
  return (
    <Link href={href} className="button">
      {children}
    </Link>
  );
};
