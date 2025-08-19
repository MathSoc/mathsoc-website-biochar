import { ButtonProps, constructButtonClassName } from "./button-util";
import "./button.scss";

export const Button: React.FC<
  ButtonProps & {
    onClick: () => void;
  }
> = (props) => {
  const { onClick, children } = props;
  return (
    <button onClick={onClick} className={constructButtonClassName(props)}>
      {children}
    </button>
  );
};
