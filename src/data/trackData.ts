import { trackIpad, trackMacbook } from "../images/cart";

export type trackDataType = {
  image: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  ramSize: string;
  diskSize: string;
};

export const trackDataItem: Array<trackDataType> = [
  {
    image: trackMacbook,
    name: "MackBook Pro 14",
    price: 2599.0,
    quantity: 1,
    color: "Space Gray",
    ramSize: "32GB",
    diskSize: "1TB",
  },
  {
    image: trackIpad,
    name: "iPad Pro 12.9",
    price: 2599.0,
    quantity: 1,
    color: "Space Gray",
    ramSize: "32GB",
    diskSize: "1TB",
  },
  {
    image: trackIpad,
    name: "iPad Pro 12.9",
    price: 2599.0,
    quantity: 1,
    color: "Space Gray",
    ramSize: "32GB",
    diskSize: "1TB",
  },
];
