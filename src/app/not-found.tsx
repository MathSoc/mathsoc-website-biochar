import "./components/page/page.scss";

// somehow, importing any react component into this file
// breaks all subsequent imports of that component across the site.
// i cannot fathom why. beware.
export default function NotFound() {
  return (
    <div className="page">
      <div className="page-inner">
        <h2>Page not found :(</h2>
      </div>
    </div>
  );
}
