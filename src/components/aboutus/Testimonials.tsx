import { useState, useEffect } from "react";
import {
  arrowLeftTestimonial,
  arrowRightTestimonial,
  testimonial,
} from "../../images/whoarewe";
import { useDispatch, useSelector } from "react-redux";
import { getStateTestimonialAction } from "../../redux/actions/userDashboard/testimonials.actions";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { AdminTestimonialType } from "../../redux/types/users.types";
import DOMPurify from "dompurify";

const Testimonials = () => {
  let [index, setIndex] = useState<number>(0);
  let [animate, setAnimate] = useState<string>("");

  const dispatch = useDispatch();
  const TestimonialRedux = useSelector(
    (state: ReducersType) => state?.getApprovedTestimonial
  ) as ReduxResponseType;
  console.log(TestimonialRedux);

  useEffect(() => {
    dispatch(getStateTestimonialAction() as any);
  }, [dispatch]);

  return (
    <section className="flex flex-col items-center gap-4 py-14 px-1 md:px-6">
      <div className="playfair-display font-[700] text-[30px]">
        Testimonials
      </div>
      <div className="">Over 15,000 happy customers.</div>
      <div className="flex flex-row w-full items-center border-b-[1px] border-b-[#EDB842] py-5">
        {TestimonialRedux?.serverResponse?.data.map(
          (t: AdminTestimonialType, i: number) => {
            if (i === index) {
              return (
                <div
                  key={i}
                  className={`flex flex-row w-full items-center gap-4 animate__animated ${animate}`}
                >
                  <img
                    className="w-1/2 h-full"
                    src={
                      t.user_id.image[0]?.url
                        ? t.user_id.image[0]?.url
                        : testimonial
                    }
                    alt=""
                  />
                  <div className="w-1/2 flex flex-col text-[0.875rem] justify-between gap-3 h-ful p-5">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(t?.content),
                      }}
                      className="font-[400] flex flex-col max-w-lg"
                    ></div>
                    <div className="font-[700]">{t.name}</div>
                    <div className="">{t.title}</div>
                  </div>
                </div>
              );
            }
            return <div key={i} className="hidden"></div>;
          }
        )}
        <div className="flex flex-col gap-4">
          <span
            className=""
            onClick={
              index < TestimonialRedux?.serverResponse?.data.length - 1
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
