import {
  cameraService,
  carRepair,
  deliveryService,
  laundryService,
  pickupService,
  tvInstallation,
} from "../images/services";

export type serviceItemsType = {
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

export const serviceItemsdata: Array<serviceItemsType> = [
  {
    image: carRepair,
    name: "Car Repairs",
  },
  {
    image: deliveryService,
    name: "Delivery",
  },
  {
    image: pickupService,
    name: "Pickup",
  },
  {
    image: laundryService,
    name: "Laundry",
  },
  {
    image: cameraService,
    name: "Camera & Photo",
  },
  {
    image: tvInstallation,
    name: "TV Installation",
  },
];
