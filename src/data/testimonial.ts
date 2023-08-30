import { testimonial } from "../images/whoarewe";

export type testimonyType = {
  image: string;
  name: string;
  title: string;
  testimony: string;
};

export const testimonyData: Array<testimonyType> = [
  {
    image: testimonial,
    name: "Leona Paul",
    title: "CEO of Floatcom",
    testimony:
      "My experience with Mark is a complete success, from customer service, wide range of products, clean store, purchasing experience, the newsletter \n\n Thank you.",
  },
  {
    image: testimonial,
    name: "Leona Paul",
    title: "CEO of Floatcom",
    testimony:
      "My experience with Mark is a complete success, from customer service, wide range of products, clean store, purchasing experience, the newsletter \n Thank you.",
  },
  {
    image: testimonial,
    name: "Leona Paul",
    title: "CEO of Floatcom",
    testimony:
      "My experience with Mark is a complete success, from customer service, wide range of products, clean store, purchasing experience, the newsletter \n Thank you.",
  },
];
