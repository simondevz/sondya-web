import {
  serviceImage1,
  serviceImage10,
  serviceImage11,
  serviceImage12,
  serviceImage2,
  serviceImage3,
  serviceImage4,
  serviceImage5,
  serviceImage6,
  serviceImage7,
  serviceImage8,
  serviceImage9,
} from "../images/serviceimages";

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
  user?: string;
};

export const serviceItemsdata2: Array<serviceItemsType> = [
  {
    image: serviceImage1,
    user: "Sam Repairs",
    name: "Best car repair and maintenances at best rates",
    rating: 4.9,
    totalrating: 902,
    pricenow: 20,
  },
  {
    image: serviceImage2,
    user: "creativesmith99",
    name: "I will create a professional business website design in figma",
    rating: 4.9,
    totalrating: 49,
    pricenow: 60,
  },
  {
    image: serviceImage3,
    user: "mukaramhussain0",
    name: "I will do attractive mobile UI UX design or app UI UX design",
    rating: 5.0,
    totalrating: 163,
    pricenow: 1200,
  },
  {
    image: serviceImage4,
    user: "cc__creative",
    name: "I will design UI UX for mobile app with figma for ios or android",
    rating: 5.0,
    totalrating: 570,
    pricenow: 1000,
  },
  {
    image: serviceImage5,
    user: "airb123",
    name: "I will create an amazing website or app promo video",
    rating: 4.9,
    totalrating: 902,
    pricenow: 67,
  },
  {
    image: serviceImage6,
    user: "Dr. Sam",
    name: "Home Service Dentist always at your beck and call",
    rating: 4.9,
    totalrating: 902,
    pricenow: 91,
  },
  {
    image: serviceImage7,
    user: "almomen980",
    name: "I will design social media post, instagram post, facebook post ads fb ads, banner ads",
    rating: 4.9,
    totalrating: 287,
    pricenow: 70,
  },
  {
    image: serviceImage8,
    user: "Edet",
    name: "I will repair your devices without problems",
    rating: 4.9,
    totalrating: 902,
    pricenow: 81,
  },
  {
    image: serviceImage9,
    user: "mukaramhussain0",
    name: "I will do attractive mobile UI UX design or app UI UX design",
    rating: 5.0,
    totalrating: 163,
    pricenow: 70,
  },
  {
    image: serviceImage10,
    user: "almomen980",
    name: "I will design social media post, instagram post, facebook post ads fb ads, banner ads",
    rating: 4.9,
    totalrating: 287,
    pricenow: 500,
  },
  {
    image: serviceImage11,
    user: "Edet",
    name: "I will repair your devices without problems",
    rating: 4.9,
    totalrating: 902,
    pricenow: 13,
  },
  {
    image: serviceImage12,
    user: "mukaramhussain0",
    name: "I will do attractive mobile UI UX design or app UI UX design",
    rating: 5.0,
    totalrating: 163,
    pricenow: 20,
  },
];
