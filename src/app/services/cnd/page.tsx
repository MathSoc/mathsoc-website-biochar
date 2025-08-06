import { Banner, BannerTitles } from "@/app/components/banner/banner";
import { MarkdownSection } from "../../components/markdown-section/markdown-section";
import { Page } from "../../components/page/page-component";
import "./cnd.scss";

export default async function CndPage() {
  return (
    <Page id="cnd-page" variant="pink">
      {/* @todo update this to a photo of cnd */}
      <Banner src="/img/banners/board-games.jpeg" variant="pink" size="large">
        <BannerTitles title={getDailySpecial()} subtitle="Today's Special" />
      </Banner>
      <MarkdownSection markdownFilePath="src/app/services/cnd/cnd.md" />
    </Page>
  );
}

const getDailySpecial = () => {
  const today = new Date().getDay();

  switch (today) {
    case 0:
    case 6:
    default: {
      return "closed :(";
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
