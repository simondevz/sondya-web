import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { circleWavy } from "../../../images";
import { UserTestimonialType } from "../../../redux/types/users.types";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { createTestimonialAction } from "../../../redux/actions/user.actions";
import { TESTIMONIAL_SHOW_FORM } from "../../../redux/constants/auth.constants";

const UserTestimonyBody = () => {
  const dispatch = useDispatch();
  const TestimonialRedux = useSelector(
    (state: ReducersType) => state?.testimonial
  ) as ReduxResponseType;
  console.log(TestimonialRedux);

  return (
    <section className="p-3 w-full">
      {TestimonialRedux.testimonial.success ? (
        <div className="shadow-md w-full flex flex-col justify-center items-center h-[60vh] rounded-md">
          <div className="mx-auto flex-col items-center text-center w-[30rem]">
            <img className="mx-auto" src={circleWavy} alt="" />
            <div className="text-[#191F33] playfair-display text-xl font-[600]">
              Testimonial is sent for approval
            </div>
            <div className="text-[#767E94]">
              Proin placerat risus non justo faucibus commodo. Nunc non neque
              sit amet magna aliquam condimentum.
            </div>
            <button
              onClick={() => {
                dispatch({ type: TESTIMONIAL_SHOW_FORM });
              }}
              className="border-[#EDB842] border text-[#EDB842] font-[600] rounded-md p-2"
            >
              Go back
            </button>
          </div>
        </div>
      ) : (
        <UserTestimonyBodyMain />
      )}
    </section>
  );
};

const UserTestimonyBodyMain = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState<UserTestimonialType>({
    name: "",
    title: "",
    date: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (formData?.name && formData?.date && formData?.title && value) {
      dispatch(createTestimonialAction({ ...formData, content: value }) as any);
    }
  };

  return (
    <>
      <div className="shadow-md flex flex-col gap-5 p-3 h-[80vh]">
        <div className="playfair-display font-[700]">Testimonial</div>
        <div className="flex flex-col md:flex-row gap-3 justify-around">
          <div className="">
            Name <span className="text-[#EF4444]"> *</span>
          </div>
          <input
            className="border p-2 rounded-md w-full md:w-10/12"
            type="text"
            name="name"
            placeholder="Ade Tiger"
            value={formData.name}
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
            name="title"
            placeholder="Ade Tiger"
            value={formData.title}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-3 justify-around">
          <div className="">
            Date <span className="text-[#EF4444]"> *</span>
          </div>
          <input
            className="border p-2 rounded-md w-full md:w-10/12"
            type="date"
            name="date"
            placeholder="Ade Tiger"
            value={formData.date}
            onChange={onChange}
          />
        </div>
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
      <div className="flex w-full justify-end py-6 px-10">
        <button
          onClick={handleSubmit}
          className="border px-6 py-2 flex z-50 bg-[#EDB842] font-semibold text-[#fff] text-[0.875rem] rounded-2xl"
        >
          Post
        </button>
      </div>
    </>
  );
};

export default UserTestimonyBody;
