import Link from "next/link";
import "./button.scss";
import { ButtonProps, constructButtonClassName } from "./button-util";

export const Button: React.FC<
  ButtonProps & {
    href?: string;
    action?: () => void;
  }
> = (props) => {
  const { children, href, action } = props;

  if (!href && !action) {
    throw new Error(`Button requires href or action`);
  }

  if (href && action) {
    throw new Error(`Button can only have either href or action`);
  }

  const className = constructButtonClassName(props);

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
