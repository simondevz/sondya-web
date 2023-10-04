import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { circleWavy } from "../../../images";

const UserTestimonyBody = () => {
  const [status] = useState(false);
  return (
    <section className="p-3 w-full">
      <div className="shadow-md w-full flex flex-col justify-center items-center h-[60vh] rounded-md">
        <div className="mx-auto flex-col items-center text-center w-[30rem]">
          <img className="mx-auto" src={circleWavy} alt="" />
          <div className="text-[#191F33] playfair-display text-xl font-[600]">
            Testimonial is sent for approval
          </div>
          <div className="text-[#767E94]">
            Proin placerat risus non justo faucibus commodo. Nunc non neque sit
            amet magna aliquam condimentum.
          </div>
          <button className="border-[#EDB842] border text-[#EDB842] font-[600] rounded-md p-2">
            Go back
          </button>
        </div>
      </div>
      {status && <UserTestimonyBodyMain />}
    </section>
  );
};

const UserTestimonyBodyMain = () => {
  const [value, setValue] = useState("");
  return (
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
        />
      </div>
      <div className="flex flex-col md:flex-row gap-3 justify-around">
        <div className="">
          Date <span className="text-[#EF4444]"> *</span>
        </div>
        <input
          className="border p-2 rounded-md w-full md:w-10/12"
          type="date"
          placeholder="Ade Tiger"
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
  );
};

export default UserTestimonyBody;
