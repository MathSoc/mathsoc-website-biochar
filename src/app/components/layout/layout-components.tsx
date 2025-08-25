import "./layout.scss";

export const Row: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={`row ${className ?? ""}`}>{children}</div>;
};

export const Column: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="column">{children}</div>;
};
