export type ButtonProps = {
  children: React.ReactNode;
  variant: "pink" | "white";
  size?: "small" | "default";
  disabled?: boolean;
};

export const constructButtonClassName = (props: ButtonProps): string => {
  return `button ${props.variant} ${props.size}`;
};
