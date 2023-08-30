import {
  productImage1,
  productImage2,
  productImage3,
  productImage4,
  productImage5,
  productImage6,
  productImage7,
  productImage8,
  productImage9,
  productImageA,
  productImageB,
  productImageC,
  productImageD,
  productImageE,
  productImageF,
} from "../images/products";

export type productItemsType = {
  image?: string;
  priceoff?: null | string;
  pricenow?: number;
  pricebefore?: number;
  name?: string;
  body?: string;
  hot?: boolean;
  sold?: boolean;
  rating?: number;
  totalrating?: number;
  like?: boolean;
};

export const ProductsItemsdata: Array<productItemsType> = [
  {
    image: productImage1,
    priceoff: "32% OFF",
    hot: true,
    pricenow: 442.12,
    pricebefore: 865.99,
    name: "Xbox Series S - 512GB SSD Console with Wireless Controller - EU Versio...",
    body: "Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.",
    rating: 5,
    totalrating: 52677,
    like: true,
  },
  {
    image: productImage2,
    sold: true,
    pricenow: 2300,
    name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
    rating: 4,
    totalrating: 52677,
    like: true,
  },
  {
    image: productImage3,
    pricenow: 220,
    name: "Simple Mobile 4G LTE Prepaid Smartphone",
    like: true,
    rating: 3.4,
    totalrating: 52677,
  },
  {
    image: productImage4,
    priceoff: "19% OFF",
    pricebefore: 865,
    pricenow: 150,
    name: "4K UHD LED Smart TV with Chromecast Built-in",
    like: false,
    rating: 5,
    totalrating: 52677,
  },
  {
    image: productImage5,
    pricenow: 1200,
    name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
    like: true,
    rating: 5,
    totalrating: 52677,
  },
  {
    image: productImage6,
    pricenow: 299,
    name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
    like: false,
    rating: 5,
    totalrating: 52677,
  },
  {
    image: productImage7,
    pricebefore: 865.99,
    pricenow: 70,
    name: "Portable Wshing Machine, 11lbs capacity Model 18NMFIAM",
    like: false,
    rating: 5,
    totalrating: 52677,
  },
  {
    image: productImage8,
    hot: true,
    pricenow: 160,
    name: "2-Barrel Carburetor Carb 2100 Engine Increase Horsepower",
    like: false,
    rating: 5,
    totalrating: 52677,
  },
  {
    image: productImage9,
    priceoff: "32% OFF",
    pricebefore: 360,
    pricenow: 250,
    name: "JBL FLIP 4 - Waterproof Portable Bluetooth Speaker - Black",
    like: false,
    rating: 5,
    totalrating: 52677,
  },
];

export const ProductsItemsdata2: Array<productItemsType> = [
  {
    image: productImageA,
    name: "Computer & Laptop",
  },
  {
    image: productImageB,
    name: "SmartPhone",
  },
  {
    image: productImageC,
    name: "Headphones",
  },
  {
    image: productImageD,
    name: "Accessories",
  },
  {
    image: productImageE,
    name: "Camera & Photo",
  },
  {
    image: productImageF,
    name: "TV & Homes",
  },
];
