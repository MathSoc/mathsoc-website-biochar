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
    image: "/img/inventory/tshirts/cheatsheet.jpg",
  },
  {
    name: "I Wanna Pass Tee",
    price: 25.0,
    category: "Novelties",
    subcategory: "Shirts and sweaters",
    image: "/img/inventory/tshirts/iwannapass.jpg",
  },
  {
    name: "Calcu-Lator Gator Tee",
    price: 21.0,
    category: "Novelties",
    subcategory: "Shirts and sweaters",
    image: "/img/inventory/tshirts/calculatorgator.jpg",
  },
  {
    name: "Sigma Goose Sweater",
    price: 35.0,
    category: "Novelties",
    subcategory: "Shirts and sweaters",
    image: "/img/inventory/tshirts/sigmagoose.jpg",
  },
  {
    name: "I Can't Even Tee",
    price: 10.0,
    category: "Novelties",
    subcategory: "Shirts and sweaters",
    image: "/img/inventory/tshirts/icanteven.jpg",
  },
  {
    name: "Take Me To The Limit Tee",
    price: 10.0,
    category: "Novelties",
    subcategory: "Shirts and sweaters",
    image: "/img/inventory/tshirts/takemetothelimit.jpg",
  },
  {
    name: "I Heart Math Tee",
    price: 10.0,
    category: "Novelties",
    subcategory: "Shirts and sweaters",
    image: "/img/inventory/tshirts/iheartmath.jpg",
  },
  // Novelties - Stickers
  {
    name: "Calculator Sticker",
    price: 0.25,
    category: "Novelties",
    subcategory: "Stickers",
    image: "/img/inventory/stickers/calculator.jpg",
  },
  {
    name: "Sleeping Goose Sticker",
    price: 0.25,
    category: "Novelties",
    subcategory: "Stickers",
    image: "/img/inventory/stickers/sleepygoose.jpg",
  },
  {
    name: "Laptop Fire Cat Sticker",
    price: 0.25,
    category: "Novelties",
    subcategory: "Stickers",
    image: "/img/inventory/stickers/laptopfirecat.jpg",
  },
  {
    name: "Skateboard Goose Sticker",
    price: 0.25,
    category: "Novelties",
    subcategory: "Stickers",
    image: "/img/inventory/stickers/skateboardgoose.jpg",
  },
  {
    name: "Thanks Baybe Pug Sticker",
    price: 0.25,
    category: "Novelties",
    subcategory: "Stickers",
    image: "/img/inventory/stickers/thanksbaybe.jpg",
  },
  {
    name: "Melting Cat Sticker",
    price: 0.25,
    category: "Novelties",
    subcategory: "Stickers",
    image: "/img/inventory/stickers/meltingcat.jpg",
  },
  {
    name: "Coo Coo Bonkers Sticker",
    price: 0.25,
    category: "Novelties",
    subcategory: "Stickers",
    image: "/img/inventory/stickers/bonkers.png",
  },
  // Novelties - Ties
  {
    name: "2024 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2024-pink.png",
  },
  {
    name: "2023 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2023-pink.png",
  },
  {
    name: "2022 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2022-pink.jpg",
  },
  {
    name: "2022 Black Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2022-black.jpg",
  },
  {
    name: "2021 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2021-pink.jpg",
  },
  {
    name: "2019 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2019-pink.jpg",
  },
  {
    name: "2019 Black Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2019-black.jpg",
  },
  {
    name: "2018 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2018-pink.jpg",
  },
  {
    name: "2018 Black Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2018-black.jpg",
  },
  {
    name: "2017 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2017-pink.jpg",
  },
  {
    name: "2017 Black Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2017-black.jpg",
  },
  {
    name: "2016 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2016-pink.jpg",
  },
  {
    name: "2015 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2015-pink.jpg",
  },
  {
    name: "2015 Black Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2015-black.jpg",
  },
  {
    name: "2014 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2014-pink.jpeg",
  },
  {
    name: "2013 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2013-pink.jpg",
  },
  {
    name: "2011 Pink Tie",
    price: 2.0,
    category: "Novelties",
    subcategory: "Ties",
    image: "/img/inventory/ties/2011-pink.jpg",
  },
  // Novelties - Miscellaneous
  {
    name: "Pink Tie Keychain",
    price: 2.99,
    category: "Novelties",
    subcategory: "Miscellaneous",
    image: "/img/inventory/misc/tie-keychain.png",
  },
  {
    name: "Toque",
    price: 22.6,
    category: "Novelties",
    subcategory: "Miscellaneous",
    image: "/img/inventory/misc/toque-1.png",
  },
  {
    name: "Pink Tie Pin",
    price: 0.99,
    category: "Novelties",
    subcategory: "Miscellaneous",
    image: "/img/inventory/misc/pinkktiepin.jpg",
  },
  {
    name: "Mathematics Lanyard",
    price: 2.0,
    category: "Novelties",
    subcategory: "Miscellaneous",
    image: "/img/inventory/misc/lanyard.jpg",
  },
  {
    name: "MathSoc Mask",
    price: 4.0,
    category: "Novelties",
    subcategory: "Miscellaneous",
    image: "/img/inventory/misc/mathsk.jpeg",
  },
  {
    name: "MathSoc Mug",
    price: 2.99,
    category: "Novelties",
    subcategory: "Miscellaneous",
    image: "/img/inventory/misc/mugsoc.jpg",
  },
  {
    name: "Champagne Flute",
    price: 0.99,
    category: "Novelties",
    subcategory: "Miscellaneous",
    image: "/img/inventory/misc/chapmagne-flute.jpg",
  },
  {
    name: "Black Carabiner",
    price: 2.99,
    category: "Novelties",
    subcategory: "Miscellaneous",
    image: "/img/inventory/misc/carabiner.jpg",
  },
  // Stationary - Calculator
  {
    name: "Texas Instrument TI30XIIS",
    price: 17.0,
    category: "Stationary",
    subcategory: "Calculator",
    image: "/img/inventory/calculator/ti30xiis.jpg",
  },
  {
    name: "Sharp EL-531XG03",
    price: 23.0,
    category: "Stationary",
    subcategory: "Calculator",
    image: "/img/inventory/calculator/el531xgo3.jpg",
  },
  {
    name: "CASIO fx-300MS",
    price: 25.98,
    category: "Stationary",
    subcategory: "Calculator",
    image: "/img/inventory/calculator/casio.jpg",
  },
  // Stationary - Pens and pencils
  {
    name: "MUJI Pens",
    price: 2.0,
    category: "Stationary",
    subcategory: "Pens and pencils",
    image: "/img/inventory/writing-implements/mujipen.jpg",
  },
  {
    name: "Wood Pencil",
    price: 0.25,
    category: "Stationary",
    subcategory: "Pens and pencils",
    image: "/img/inventory/writing-implements/pencils.jpg",
  },
  {
    name: "Mechanical Lead Refills",
    price: 0.99,
    category: "Stationary",
    subcategory: "Pens and pencils",
    image: "/img/inventory/writing-implements/leadrefill.webp",
  },
  {
    name: "Mechanical Pencil",
    price: 0.5,
    category: "Stationary",
    subcategory: "Pens and pencils",
    image: "/img/inventory/writing-implements/mechanical-pencil.avif",
  },
  {
    name: "Standard Ball Point Pen",
    price: 0.25,
    category: "Stationary",
    subcategory: "Pens and pencils",
    image: "/img/inventory/writing-implements/pens.jpg",
  },
  // Stationary - Paper
  {
    name: "Cue Cards",
    price: 0.29,
    category: "Stationary",
    subcategory: "Paper",
    image: "/img/inventory/paper/cuecards.webp",
  },
  {
    name: "Lined paper",
    price: 0.1,
    category: "Stationary",
    subcategory: "Paper",
    image: "/img/inventory/paper/lined.webp",
  },
  {
    name: "Graph Paper",
    price: 0.1,
    category: "Stationary",
    subcategory: "Paper",
    image: "/img/inventory/paper/graph.webp",
  },
  {
    name: "Printer Paper",
    price: 0.1,
    category: "Stationary",
    subcategory: "Paper",
    image: "/img/inventory/paper/printer.jpg",
  },
  // Stationary - General stationary
  {
    name: "Notebook",
    price: 4.5,
    category: "Stationary",
    subcategory: "General stationary",
    image: "/img/inventory/general-stationary/notebook.jpg",
  },
  {
    name: "Correction Tape",
    price: 0.99,
    category: "Stationary",
    subcategory: "General stationary",
    image: "/img/inventory/general-stationary/correctiontape.webp",
  },
  {
    name: "Highlighters",
    price: 0.5,
    category: "Stationary",
    subcategory: "General stationary",
    image: "/img/inventory/general-stationary/highlighers.webp",
  },
  {
    name: "Rubber Eraser",
    price: 0.5,
    category: "Stationary",
    subcategory: "General stationary",
    image: "/img/inventory/general-stationary/eraser.webp",
  },
  {
    name: "Ruler",
    price: 0.5,
    category: "Stationary",
    subcategory: "General stationary",
    image: "/img/inventory/general-stationary/ruler.jpg",
  },
];
