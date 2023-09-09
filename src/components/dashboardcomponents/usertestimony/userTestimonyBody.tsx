import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UserTestimonyBody = () => {
  const [value, setValue] = useState("");
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
    </section>
  );
};

export default UserTestimonyBody;
