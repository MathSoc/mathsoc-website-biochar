import { Button } from "./components/button/button";
import "./components/page/page.scss";

export default function NotFound() {
  return (
    <div className="page">
      <div className="page-inner">
        <h2>Error 404: Not Found</h2>

        <Button href="/" variant="pink">
          Home
        </Button>
      </div>
    </div>
  );
}
