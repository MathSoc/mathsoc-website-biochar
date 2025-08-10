import { Banner, BannerTitles } from "@/app/components/banner/banner";
import { MarkdownSection } from "../../components/markdown-section/markdown-section";
import { Page } from "../../components/page/page-component";
import "./cnd.scss";
import { Metadata } from "next";

export const metadata: Metadata = { title: "CnD" };

export default async function CndPage() {
  return (
    <Page id="cnd-page" variant="pink">
      <Banner src="/img/banners/cnd.jpg" variant="pink" size="large">
        <BannerTitles
          title={getDailySpecial()}
          pretitle={isOpen() ? "Today's Special" : undefined}
        />
      </Banner>
      <MarkdownSection src="src/app/services/cnd/cnd.md" />
    </Page>
  );
}

const isOpen = () => new Date().getDay() !== 0 && new Date().getDay() !== 6;

const getDailySpecial = () => {
  const today = new Date().getDay();

  switch (today) {
    case 0:
    case 6:
    default: {
      return "closed today :(";
    }
    case 1: {
      return "Mac 'n cheese";
    }
    case 2: {
      return "Creamy potato soup";
    }
    case 3: {
      return "Chicken stew";
    }
    case 4: {
      return "Boston clam chowder soup";
    }
    case 5: {
      return "Chili";
    }
  }
};
