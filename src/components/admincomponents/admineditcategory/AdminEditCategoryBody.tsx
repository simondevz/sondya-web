import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";

const AdminEditCategoryBody = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Categories</div>
          <div className="flex flex-row gap-2">
            <button className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2">
              <span className="text-[#EDB842]">
                <FaTimes />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Cancel</span>
            </button>
            <button className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2">
              <span>
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Edit Category</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex flex-col w-full md:w-1/4 lg:w-1/5 shadow-sm rounded-md p-2">
            <div className="font-[600] text-lg text-[#1D1F2C]">Thumbnail</div>
            <div className="">
              <label className="font-[400] text-sm text-[#777980]" htmlFor="">
                Photo
              </label>
              <div
                className="border-2 border-dashed border-[#E0E2E7] p-4 text-center rounded-md bg-[#F9F9FC]"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  id="pictureInput"
                />
                <label
                  className="flex flex-col justify-center"
                  htmlFor="pictureInput"
                >
                  {selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected"
                      className="mx-auto h-32"
                    />
                  ) : (
                    <div className="flex flex-col justify-center gap-2">
                      <div className="mx-auto p-2 bg-[#EDB842] rounded-md text-white">
                        <BsFillImageFill />
                      </div>
                      <span className="text-[#858D9D] text-sm">
                        Drag and drop image here, or click add image
                      </span>
                      <button className="bg-[#EDB84233] text-[#EDB842] px-4 py-2 rounded-lg mt-2">
                        Browse
                      </button>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-3/4 lg:w-4/5 shadow-sm rounded-md p-3 gap-3">
            <div className="font-[600] text-lg text-[#1D1F2C]">
              General Information
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm">
              <label htmlFor="">Category Name</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Type category name here. . ."
              />
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm">
              <label htmlFor="">Description</label>
              <textarea
                className="border p-2 rounded-md bg-[#F9F9FC]"
                name=""
                id=""
                cols={30}
                rows={6}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminEditCategoryBody;
