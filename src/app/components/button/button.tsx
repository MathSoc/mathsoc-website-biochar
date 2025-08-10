import Link from "next/link";
import "./button.scss";

export const Button: React.FC<{
  children: React.ReactNode;
  href: string;
  variant: "pink" | "white";
}> = ({ children, href, variant = "white" }) => {
  return (
    <Link href={href} className={`button ${variant}`}>
      {children}
    </Link>
  );
};
