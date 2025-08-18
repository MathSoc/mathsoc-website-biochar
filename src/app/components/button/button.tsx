import Link from "next/link";
import "./button.scss";

export const Button: React.FC<{
  children: React.ReactNode;
  href?: string;
  action?: () => void;
  variant: "pink" | "white" | "pink small";
}> = ({ children, href, action, variant = "white" }) => {
  if (!href && !action) {
    throw new Error(`Button requires href or action`);
  }

  if (href && action) {
    throw new Error(`Button can only have either href or action`);
  }

  const className = `button ${variant}`;

  if (action) {
    return (
      <form action={action}>
        <button className={className}>{children}</button>
      </form>
    );
  }

  return (
    <Link href={href!} className={className}>
      {children}
    </Link>
  );
};
