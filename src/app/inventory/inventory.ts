// Feel free to add new subcategories! The page will auto-adjust
export type NoveltiesSubcategory =
  | "Shirts and sweaters"
  | "Stickers"
  | "Ties"
  | "Miscellaneous";

export type StationarySubcategory =
  | "Calculator"
  | "Pens and pencils"
  | "Paper"
  | "General stationary";

export type InventoryItem = {
  name: string;
  price: number;
  category: "Novelties" | "Stationary";
  subcategory: NoveltiesSubcategory | StationarySubcategory;
  image?: string;
};

export const inventory: InventoryItem[] = [
  // Novelties - Shirts and sweaters
  {
    name: "Cheat Sheet Tee",
    price: 20.0,
    category: "Novelties",
    subcategory: "Shirts and sweaters",
  },
  {
    name: "I Wanna Pass Tee",
    price: 25.0,
    category: "Novelties",
    subcategory: "Shirts and sweaters",
  },
  {
    name: "Calcu-Lator Gator Tee",
    price: 21.0,
    category: "Novelties",
    subcategory: "Shirts and sweaters",
  },
  {
    name: "Sigma Goose Sweater",
    price: 35.0,
    category: "Novelties",
    subcategory: "Shirts and sweaters",
  },
  {
    name: "I Can’t Even Tee",
    price: 10.0,
    category: "Novelties",
    subcategory: "Shirts and sweaters",
  },
  {
    name: "Take Me To The Limit Tee",
    price: 10.0,
    category: "Novelties",
    subcategory: "Shirts and sweaters",
  },
  {
    name: "I Heart Math Tee",
    price: 10.0,
    category: "Novelties",
    subcategory: "Shirts and sweaters",
  },
  // Novelties - Stickers
  {
    name: "Calculator Sticker",
    price: 0.25,
    category: "Novelties",
    subcategory: "Stickers",
  },
  {
    name: "Sleeping Goose Sticker",
    price: 0.25,
    category: "Novelties",
    subcategory: "Stickers",
  },
  {
    name: "Laptop Fire Cat Sticker",
    price: 0.25,
    category: "Novelties",
    subcategory: "Stickers",
  },
  {
    name: "Skateboard Goose Sticker",
    price: 0.25,
    category: "Novelties",
    subcategory: "Stickers",
  },
  {
    name: "Thanks Baybe Pug Sticker",
    price: 0.25,
    category: "Novelties",
    subcategory: "Stickers",
  },
  {
    name: "Melting Cat Sticker",
    price: 0.25,
    category: "Novelties",
    subcategory: "Stickers",
  },
  {
    name: "Coo Coo Bonkers Sticker",
    price: 0.25,
    category: "Novelties",
    subcategory: "Stickers",
  },
  // Novelties - Ties
  {
    name: "2024 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2023 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2022 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2022 Black Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2021 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2019 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2019 Black Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2018 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2018 Black Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2017 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2017 Black Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2016 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2015 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2015 Black Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2014 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2013 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  {
    name: "2011 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
  },
  // Novelties - Miscellaneous
  {
    name: "Pink Tie Keychain",
    price: 2.99,
    category: "Novelties",
    subcategory: "Miscellaneous",
  },
  {
    name: "Toque",
    price: 22.6,
    category: "Novelties",
    subcategory: "Miscellaneous",
  },
  {
    name: "Pink Tie Pin",
    price: 0.99,
    category: "Novelties",
    subcategory: "Miscellaneous",
  },
  {
    name: "Mathematics Lanyard",
    price: 2.0,
    category: "Novelties",
    subcategory: "Miscellaneous",
  },
  {
    name: "MathSoc Mask",
    price: 4.0,
    category: "Novelties",
    subcategory: "Miscellaneous",
  },
  {
    name: "MathSoc Mug",
    price: 2.99,
    category: "Novelties",
    subcategory: "Miscellaneous",
  },
  {
    name: "Champagne Flute",
    price: 0.99,
    category: "Novelties",
    subcategory: "Miscellaneous",
  },
  {
    name: "Black Carabiner",
    price: 2.99,
    category: "Novelties",
    subcategory: "Miscellaneous",
  },
  // Stationary - Calculator
  {
    name: "Texas Instrument TI30XIIS",
    price: 17.0,
    category: "Stationary",
    subcategory: "Calculator",
  },
  {
    name: "Sharp EL-531XG03",
    price: 23.0,
    category: "Stationary",
    subcategory: "Calculator",
  },
  {
    name: "CASIO fx-300MS",
    price: 25.98,
    category: "Stationary",
    subcategory: "Calculator",
  },
  // Stationary - Pens and pencils
  {
    name: "MUJI Pens",
    price: 2.0,
    category: "Stationary",
    subcategory: "Pens and pencils",
  },
  {
    name: "Wood Pencil",
    price: 0.25,
    category: "Stationary",
    subcategory: "Pens and pencils",
  },
  {
    name: "Mechanical Lead Refills",
    price: 0.99,
    category: "Stationary",
    subcategory: "Pens and pencils",
  },
  {
    name: "Mechanical Pencil",
    price: 0.5,
    category: "Stationary",
    subcategory: "Pens and pencils",
  },
  {
    name: "Standard Ball Point Pen",
    price: 0.25,
    category: "Stationary",
    subcategory: "Pens and pencils",
  },
  // Stationary - Paper
  {
    name: "Cue Cards",
    price: 0.29,
    category: "Stationary",
    subcategory: "Paper",
  },
  {
    name: "Lined paper",
    price: 0.1,
    category: "Stationary",
    subcategory: "Paper",
  },
  {
    name: "Graph Paper",
    price: 0.1,
    category: "Stationary",
    subcategory: "Paper",
  },
  {
    name: "Printer Paper",
    price: 0.1,
    category: "Stationary",
    subcategory: "Paper",
  },
  // Stationary - General stationary
  {
    name: "Notebook",
    price: 4.5,
    category: "Stationary",
    subcategory: "General stationary",
  },
  {
    name: "Correction Tape",
    price: 0.99,
    category: "Stationary",
    subcategory: "General stationary",
  },
  {
    name: "Highlighters",
    price: 0.5,
    category: "Stationary",
    subcategory: "General stationary",
  },
  {
    name: "Rubber Eraser",
    price: 0.5,
    category: "Stationary",
    subcategory: "General stationary",
  },
  {
    name: "Ruler",
    price: 0.5,
    category: "Stationary",
    subcategory: "General stationary",
  },
];
