import { useState } from "react";
import { homeCarousel } from "../../data/HomeCarousel";
import { arrowLeft, arrowRight } from "../../images";

const Hero = () => {
  let [index, setIndex] = useState<number>(0);
  let [animate, setAnimate] = useState<string>("");
  return (
    <div className="flex relative">
      <img
        className="h-14 md:h-auto absolute left-0  z-10 top-1/2 transform -translate-y-1/2"
        onClick={
          index > 0
            ? () => {
                setAnimate("animate__slideInRight");
                setIndex(--index);
              }
            : undefined
        }
        src={arrowLeft}
        alt=""
      />
      {homeCarousel.map((t, i) => {
        if (i === index) {
          return (
            <div className={`animate__animated ${animate}`} key={i}>
              <img src={t.image} alt="" />
            </div>
          );
        }
        return <div className="hidden"></div>;
      })}
      <img
        className="h-14 md:h-auto absolute right-0 z-10 top-1/2 transform -translate-y-1/2"
        onClick={
          index < homeCarousel.length - 1
            ? () => {
                setAnimate("animate__slideInLeft");
                setIndex(++index);
              }
            : undefined
        }
        src={arrowRight}
        alt=""
      />
    </div>
  );
};

export default Hero;
