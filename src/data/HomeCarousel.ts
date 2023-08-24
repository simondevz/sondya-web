import { carouselImage } from "../images";

type carouselType = {
  image: string;
  link: string;
};

export const homeCarousel: Array<carouselType> = [
  {
    image: carouselImage,
    link: "1st Link",
  },
  {
    image: carouselImage,
    link: "2nd Link",
  },
  {
    image: carouselImage,
    link: "3rd Link",
  },
  {
    image: carouselImage,
    link: "4th Link",
  },
];
