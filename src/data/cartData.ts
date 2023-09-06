import { Cart1, Cart2 } from "../images/cart";

export type cartDataType = {
  image: string;
  name: string;
  price: number;
  quantity: number;
};

export const cartDataItem: Array<cartDataType> = [
  {
    image: Cart1,
    name: "MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty",
    price: 4349.0,
    quantity: 1,
  },
  {
    image: Cart2,
    name: "MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty",
    price: 4349.0,
    quantity: 2,
  },
];
