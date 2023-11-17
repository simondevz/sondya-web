import { useState } from "react";
import ReactQuill from "react-quill";
import { useLocation } from "react-router-dom";
import {
  AdminTestimonialType,
  UserTestimonialType,
} from "../../../redux/types/users.types";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminUpdateTestimonialAction } from "../../../redux/actions/admin/testimonials.actions";

const AdminEditTestimonialBody = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { testimonial }: { testimonial: AdminTestimonialType } =
    location?.state;

  const TestimonialRedux = useSelector(
    (state: ReducersType) => state?.adminUpdateTestimonial
  ) as ReduxResponseType<UserTestimonialType>;
  const [value, setValue] = useState<string>(testimonial?.content);

  const [formData, setFormData] = useState<UserTestimonialType>({
    name: testimonial?.name,
    title: testimonial?.title,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    dispatch(
      AdminUpdateTestimonialAction({
        ...testimonial,
        content: value,
        name: formData.name,
        title: formData.title,
      }) as any
    );
  };

  return (
    <section className="p-3 w-full">
      <div className="shadow-md flex flex-col gap-5 p-3 h-[80vh]">
        <div className="playfair-display font-[700]">Testimonial</div>
        <div className="flex flex-col md:flex-row gap-3 justify-around">
          <div className="">
            Name <span className="text-[#EF4444]"> *</span>
          </div>
          <input
            className="border p-2 rounded-md w-full md:w-10/12"
            type="text"
            placeholder="Ade Tiger"
            value={formData?.name}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-3 justify-around">
          <div className="">
            Title <span className="text-[#EF4444]"> *</span>
          </div>
          <input
            className="border p-2 rounded-md w-full md:w-10/12"
            type="text"
            placeholder="Ade Tiger"
            value={formData?.title}
            onChange={onChange}
          />
        </div>
        {/* <div className="flex flex-col md:flex-row gap-3 justify-around">
          <div className="">
            Date <span className="text-[#EF4444]"> *</span>
          </div>
          <input
            className="border p-2 rounded-md w-full md:w-10/12"
            type="date"
            placeholder="Ade Tiger"
          />
        </div> */}
        <div className="flex flex-col md:flex-row gap-3 justify-around">
          <div className="">
            Content <span className="text-[#EF4444]"> *</span>
          </div>
          <ReactQuill
            className="w-full md:w-10/12 h-40"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      {TestimonialRedux?.error && (
        <div className="text-[#DB4444] flex p-2">{TestimonialRedux?.error}</div>
      )}
      <div className="flex w-full justify-end py-6 px-10">
        <button
          onClick={handleSubmit}
          className="border px-6 py-2 flex z-50 bg-[#EDB842] font-semibold text-[#fff] text-[0.875rem] rounded-2xl"
        >
          {TestimonialRedux?.loading ? (
            <div className="" style={{ height: "20px" }}>
              <PulseLoader color="#ffffff" />
            </div>
          ) : (
            "Post"
          )}
        </button>
      </div>
    </section>
  );
};

export default AdminEditTestimonialBody;
