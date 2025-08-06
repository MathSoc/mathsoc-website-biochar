import { Banner, BannerTitles } from "@/app/components/banner/banner";
import { MarkdownSection } from "../../components/markdown-section/markdown-section";
import { Page } from "../../components/page/page-component";
import "./discord.scss";

export default async function DiscordPage() {
  return (
    <Page id="discord-page">
      <Banner imgPath="/img/banners/mathsoc-wall.jpeg" variant="pink">
        <BannerTitles
          title="The MathSoc Discord server"
          subtitle="Steps to access"
        />
      </Banner>
      <MarkdownSection markdownFilePath="src/app/resources/discord/discord.md" />
    </Page>
  );
}
