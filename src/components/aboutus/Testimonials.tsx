import { useState } from "react";
import { testimonyData } from "../../data/testimonial";
import {
  arrowLeftTestimonial,
  arrowRightTestimonial,
} from "../../images/whoarewe";

const Testimonials = () => {
  let [index, setIndex] = useState<number>(0);
  let [animate, setAnimate] = useState<string>("");
  return (
    <section className="flex flex-col items-center gap-4 py-14 px-1 md:px-6">
      <div className="playfair-display font-[700] text-[30px]">
        Testimonials
      </div>
      <div className="">Over 15,000 happy customers.</div>
      <div className="flex flex-row items-center border-b-[1px] border-b-[#EDB842] py-5">
        {testimonyData.map((t, i) => {
          if (i === index) {
            return (
              <div
                key={i}
                className={`flex flex-row items-center gap-4 animate__animated ${animate}`}
              >
                <img className="w-1/2 h-full" src={t.image} alt="" />
                <div className="w-1/2 flex flex-col justify-between gap-3 h-ful p-5">
                  <div className="">{t.testimony}</div>
                  <div className="font-[700]">{t.name}</div>
                  <div className="">{t.title}</div>
                </div>
              </div>
            );
          }
          return <div key={i} className="hidden"></div>;
        })}
        <div className="flex flex-col gap-4">
          <span
            className=""
            onClick={
              index < testimonyData.length - 1
                ? () => {
                    setAnimate("animate__slideInLeft");
                    setIndex(++index);
                  }
                : undefined
            }
          >
            <img
              className="w-24 object-cover"
              src={arrowLeftTestimonial}
              alt=""
            />
          </span>
          <span
            className=""
            onClick={
              index > 0
                ? () => {
                    setAnimate("animate__slideInRight");
                    setIndex(--index);
                  }
                : undefined
            }
          >
            <img
              className="w-24 object-cover"
              src={arrowRightTestimonial}
              alt=""
            />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
