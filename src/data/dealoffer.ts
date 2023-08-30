import {
  dealCamera,
  dealEarpiece,
  dealLaptop,
  dealPhone,
  dealWatch,
} from "../images/deal";
import {
  ExteriorCamera,
  ExteriorEarpiece,
  ExteriorEarpiece2,
  ExteriorJug,
  ExteriorLaptop,
  ExteriorPhone,
  ExteriorPhone2,
  ExteriorWatch,
} from "../images/exterior";
import { OfferCard1, OfferCard2, OfferCard3 } from "../images/featurebrand";
import {
  InteriorBed,
  InteriorBlender,
  InteriorCoffee,
  InteriorLight,
  InteriorPot,
  InteriorSofa,
  InteriorSpread,
  InteriorVase,
} from "../images/interior";

export type dealItemsType = {
  image?: string;
  name?: string;
  percentdiscount?: string;
  price?: number;
};

export const dealAndOffersItems: Array<dealItemsType> = [
  {
    image: dealWatch,
    name: "Smart watches",
    percentdiscount: "-25%",
  },
  {
    image: dealLaptop,
    name: "Laptops",
    percentdiscount: "-15%",
  },
  {
    image: dealCamera,
    name: "GoPro cameras",
    percentdiscount: "-40%",
  },
  {
    image: dealEarpiece,
    name: "Headphones",
    percentdiscount: "-25%",
  },
  {
    image: dealPhone,
    name: "Canon camreras",
    percentdiscount: "-25%",
  },
];

export const inDoorItems: Array<dealItemsType> = [
  {
    image: InteriorSofa,
    name: "Soft chairs",
    price: 19,
  },
  {
    image: InteriorLight,
    name: "Sofa & chair",
    price: 19,
  },
  {
    image: InteriorBed,
    name: "Kitchen dishes",
    price: 19,
  },
  {
    image: InteriorPot,
    name: "Smart watches",
    price: 19,
  },
  {
    image: InteriorCoffee,
    name: "Kitchen mixer",
    price: 100,
  },
  {
    image: InteriorBlender,
    name: "Blenders",
    price: 39,
  },
  {
    image: InteriorSpread,
    name: "Home appliance",
    price: 19,
  },
  {
    image: InteriorVase,
    name: "Coffee maker",
    price: 10,
  },
];

export const outDoorItems: Array<dealItemsType> = [
  {
    image: ExteriorWatch,
    name: "Smart watches",
    price: 19,
  },
  {
    image: ExteriorCamera,
    name: "Cameras",
    price: 89,
  },
  {
    image: ExteriorEarpiece,
    name: "Headphones",
    price: 10,
  },
  {
    image: ExteriorJug,
    name: "Smart watches",
    price: 90,
  },
  {
    image: ExteriorEarpiece2,
    name: "Gaming set",
    price: 35,
  },
  {
    image: ExteriorLaptop,
    name: "Laptops & PC",
    price: 340,
  },
  {
    image: ExteriorPhone,
    name: "Smartphones",
    price: 19,
  },
  {
    image: ExteriorPhone2,
    name: "Electric kattle",
    price: 240,
  },
];

export const featureBrandItems: Array<dealItemsType> = [
  {
    image: OfferCard1,
  },
  {
    image: OfferCard2,
  },
  {
    image: OfferCard3,
  },
];
