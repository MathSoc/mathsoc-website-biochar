import "./layout.scss";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export const Row: React.FC<LayoutProps> = (props) => {
  return <Layout type="row" {...props} />;
};

export const Column: React.FC<LayoutProps> = (props) => {
  return <Layout type="column" {...props} />;
};

export const Centered: React.FC<LayoutProps> = (props) => {
  return (
    <Layout type="centered" {...props}>
      <div className="centered-col">{props.children}</div>
    </Layout>
  );
};

const Layout: React.FC<{ type: string } & LayoutProps> = ({
  type,
  children,
  className = "",
  id = "",
}) => {
  return (
    <div className={`${type} ${className}`} id={id}>
      {children}
    </div>
  );
};
