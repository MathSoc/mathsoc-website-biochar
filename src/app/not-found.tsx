import { MinimalPage } from "./components/page/minimal-page";
import "./components/page/page.scss";

/**
 * BEWARE: importing any file into this component, where the imported file
 * itself imports a stylesheet, will cause that stylesheet to break
 * literally everywhere else on the site. for some reason.
 */
export default function NotFound() {
  return (
    <MinimalPage id="not-found-page">
      <div className="page-inner">
        <h2>Page not found</h2>
      </div>
    </MinimalPage>
  );
}
