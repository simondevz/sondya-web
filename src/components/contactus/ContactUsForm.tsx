import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { MdLocationOn, MdPhone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { CreateContactUsAction } from "../../redux/actions/contactus.actions";
import { CONTACT_US_RESET } from "../../redux/constants/contactus.constants";
import { ReducersType } from "../../redux/store";
import { CreateContactUsType } from "../../redux/types/contactus.types";
import { ReduxResponseType } from "../../redux/types/general.types";

const ContactUsForm = () => {
  // create category
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateContactUsType>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { name, email, message } = formData;

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  let createContactUsRedux = useSelector(
    (state: ReducersType) => state?.contactus
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && email && message) {
      dispatch(CreateContactUsAction(formData) as any);
    }
  };

  useEffect(() => {
    createContactUsRedux?.error &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: createContactUsRedux?.error,
      });
    createContactUsRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: createContactUsRedux?.serverResponse?.message,
      });
    if (createContactUsRedux?.success) {
      setTimeout(function () {
        // navigate("/auth/success");
        // navigate("/admin/category");
        // handleClose();
      }, 4000);
    }
    setTimeout(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dispatch({ type: CONTACT_US_RESET });
    }, 2000);
  }, [createContactUsRedux, dispatch, navigate]);
  return (
    <div className="flex flex-col gap-3 py-14 px-3">
      <div className="w-4/5 md:w-3/5 mx-auto text-center">
        <div className="">Get In Touch With Us</div>
        <div className="text-[#9F9F9F]">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-center md:gap-2 p-4 gap-10">
        <div className="flex flex-col w-4/5 md:w-1/2 md:ms-auto justify-evenly gap-3">
          <div className="flex flex-row gap-3">
            <div className="text-[#EDB842] text-2xl">
              <MdLocationOn />
            </div>
            <div className="flex flex-col gap-1">
              <div className="">Address</div>
              <div className="">
                236 5th SE Avenue, New York NY10000, United States
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="text-[#EDB842] text-2xl">
              <MdPhone />
            </div>
            <div className="flex flex-col gap-1">
              <div className="">Phone</div>
              <div className="">
                Mobile: +(84) 546-6789 <br /> Hotline: +(84) 456-6789
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="text-[#EDB842] text-2xl">
              <FaClock />
            </div>
            <div className="flex flex-col gap-1">
              <div className="">Working Time</div>
              <div className="">
                Monday-Friday: 9:00 - 22:00 <br /> Saturday-Sunday: 9:00 - 21:00
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 md:me-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="">Your name</label>
              <input
                className="border-[#9F9F9F] border-[1px] rounded-md p-2"
                type="text"
                placeholder="Abc"
                name="name"
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Email address</label>
              <input
                className="border-[#9F9F9F] border-[1px] rounded-md p-2"
                type="text"
                placeholder="Abc@def.com"
                name="email"
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Subject</label>
              <input
                className="border-[#9F9F9F] border-[1px] rounded-md p-2"
                type="text"
                placeholder="Subject"
                name="subject"
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Message</label>
              <textarea
                className="border-[#9F9F9F] border-[1px] rounded-md p-2"
                name="message"
                cols={30}
                rows={3}
                placeholder="Input your text Here"
                onChange={onChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#EDB842C9] p-2 rounded-md text-white"
            >
              {createContactUsRedux?.loading ? (
                <div className="" style={{ height: "25px" }}>
                  <PulseLoader color="#ffffff" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
