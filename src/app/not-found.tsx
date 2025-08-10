import { Page } from "./components/page/page-component";
import { Column } from "./components/layout/layout-components";
import { Button } from "./components/button/button";

export default function NotFound() {
  return (
    <Page id="not-found-page">
      <h2>Error 404: Not Found</h2>
      <div className="body"></div>
      <Column>
        <Button href="/" variant="pink">
          Home
        </Button>
      </Column>
    </Page>
  );
}
