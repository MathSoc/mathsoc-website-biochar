import "./layout.scss";

export const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="row">{children}</div>;
};

export const Column: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <div className={`column ${className}`}>{children}</div>;
};
