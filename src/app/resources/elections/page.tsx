import { Banner, BannerTitles } from "@/app/components/banner/banner";
import { Page } from "../../components/page/page-component";
import "./elections.scss";
import { Button } from "@/app/components/button/button";
import { Row } from "@/app/components/layout/layout-components";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Elections" };

export default async function ElectionsPage() {
  return (
    <Page id="elections-page" variant="pink">
      <Banner src="/img/banners/pinktie-mc.jpeg" variant="pink" size="large">
        <BannerTitles title="Elections" />
        <Row>
          <Button href="/resources/elections/candidates">
            Current candidates
          </Button>

          <Button href="/resources/elections/results">Election results</Button>
        </Row>
      </Banner>
    </Page>
  );
}
