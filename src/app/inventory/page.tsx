import { Page } from "@/app/components/page/page-component";
import { Banner, BannerTitles } from "../components/banner/banner";
import { inventory, InventoryItem } from "./inventory";
import Image from "next/image";
import "./inventory.scss";

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
    <Image
      className="item-image"
      src={item.image ?? "/img/logos/tie-icon.svg"}
      alt=""
      width={80}
      height={80}
    />
    <div className="gap"></div>
    <span className="item-name">{item.name}</span>
    <span className="item-price">{priceFormatter.format(item.price)}</span>
  </div>
);
