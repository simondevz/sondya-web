import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { circleWavy } from "../../../images";
import { createTestimonialAction } from "../../../redux/actions/userDashboard/testimonials.actions";
import { CREATE_TESTIMONIAL_RESET } from "../../../redux/constants/userDashboard/testimonials.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { UserTestimonialType } from "../../../redux/types/users.types";

const UserTestimonyBody = () => {
  const dispatch = useDispatch();
  const TestimonialRedux = useSelector(
    (state: ReducersType) => state?.testimonial
  ) as ReduxResponseType<UserTestimonialType>;

  // console.log(TestimonialRedux);

  return (
    <section className="p-3 w-full">
      {TestimonialRedux?.success ? (
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
                dispatch({ type: CREATE_TESTIMONIAL_RESET });
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
  const TestimonialRedux = useSelector(
    (state: ReducersType) => state?.testimonial
  ) as ReduxResponseType<UserTestimonialType>;

  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState<UserTestimonialType>({
    name: "",
    title: "",
  });

  // console.log(formData);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    dispatch(createTestimonialAction({ ...formData, content: value }) as any);
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
            name="date"
            placeholder="Ade Tiger"
            value={formData.date}
            onChange={onChange}
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
    </>
  );
};

export default UserTestimonyBody;
