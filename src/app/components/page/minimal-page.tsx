/**
 * Page is a component used in not-found.tsx. However, because of
 * intricacies of how not-found.tsx is loaded, any complex or
 * context-heavy imports called by not-found.tsx or its dependencies
 * will break elsewhere in the app.
 *
 * To prevent this dependency problem while allowing not-found.tsx to
 * still use Page, we export this barebones page div, which not-found.tsx
 * can call directly.
 */
export const MinimalPage: React.FC<{
  children: React.ReactNode;
  id: string;
  variant?: "pink";
  size?: "large";
}> = ({ children, id, variant, size }) => (
  <div className={`page ${variant} ${size}`} id={id}>
    <div className="page-inner">{children}</div>
  </div>
);
