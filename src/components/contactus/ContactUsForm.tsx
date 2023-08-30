import { FaClock } from "react-icons/fa";
import { MdLocationOn, MdPhone } from "react-icons/md";
import {
  ButtonSondya,
  InputSondya,
  TextAreaSondya,
} from "../shareables/FormShareables";

const ContactUsForm = () => {
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
          <form className="flex flex-col gap-2" action="" method="get">
            <div className="flex flex-col gap-1">
              <label htmlFor="">Your name</label>
              <InputSondya placeholder={"Abc"} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Email address</label>
              <InputSondya placeholder={"Abc@def.com"} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Subject</label>
              <InputSondya placeholder={"This is an optional"} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Message</label>
              <TextAreaSondya />
            </div>
            <ButtonSondya text={"Submit"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
