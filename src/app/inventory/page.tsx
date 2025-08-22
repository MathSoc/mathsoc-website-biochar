import { Page } from "@/app/components/page/page-component";
import { Banner, BannerTitles } from "../components/banner/banner";
import { inventory, InventoryItem } from "./inventory";
import Image from "next/image";
import "./inventory.scss";
import { Metadata } from "next";
import { Button } from "../components/button/button.server";

export const metadata: Metadata = { title: "Inventory" };

const BOARD_GAMES_LINK =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQNCB57mU5TYuwKd5gbiqUGVa7DI8_KsCg_QYdUzZsgXHSIrnZR8QIfARNM0gc7PjkdvaPwwYZhlYTw/pubhtml?widget=true&amp;headers=false";

export default async function InventoryPage() {
  const novelties = inventory.filter((item) => item.category == "Novelties");
  const stationary = inventory.filter((item) => item.category == "Stationary");

  return (
    <Page id="inventory-page">
      <Banner src="/img/banners/board-games.jpeg" variant="pink">
        <BannerTitles
          title="MathSoc Inventory"
          pretitle="Merch, stationary, board games, and more"
        />
      </Banner>

      <h1>Novelties</h1>
      <InventorySection items={novelties} />
      <h1>Board games</h1>
      <BoardGameSheet />
      <Button href={BOARD_GAMES_LINK} variant="pink">
        Fullscreen
      </Button>
      <h1>Stationary</h1>
      <InventorySection items={stationary} />
    </Page>
  );
}

const InventorySection: React.FC<{ items: InventoryItem[] }> = ({ items }) => {
  const inventorySubsections = Object.groupBy(
    items,
    (item) => item.subcategory,
  );

  return (
    <div className="inventory-section">
      {Object.entries(inventorySubsections).map(([subsection, subitems]) => (
        <div className="inventory-subsection" key={subsection}>
          <h3>{subsection}</h3>
          <div className="item-list">
            {subitems.map((item) => (
              <InventoryItemCard item={item} key={item.name} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const priceFormatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
});

const InventoryItemCard: React.FC<{ item: InventoryItem }> = ({ item }) => (
  <div className="inventory-item">
    <div className="image-container">
      <Image
        className="item-image"
        src={item.image ?? "/img/logos/tie-icon.svg"}
        alt=""
        sizes="(max-width: 400px) 100vw"
        fill
      />
    </div>
    <div className="gap"></div>
    <span className="item-name">{item.name}</span>
    <span className="item-price">{priceFormatter.format(item.price)}</span>
  </div>
);

const BoardGameSheet = () => (
  <iframe
    src={BOARD_GAMES_LINK}
    width="1000"
    height="600"
    className="board-games-list"
  />
);
