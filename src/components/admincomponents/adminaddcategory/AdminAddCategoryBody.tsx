import { useEffect, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { adminCreateCategoryAction } from "../../../redux/actions/admin/categories.actions";
import { ADMIN_CREATE_CATEGORY_RESET } from "../../../redux/constants/admin/categories.constants";
import { ReducersType } from "../../../redux/store";
import { AdminCreateCategory } from "../../../redux/types/categories.types";
import { ReduxResponseType } from "../../../redux/types/general.types";

const AdminAddCategoryBody = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      setFormData((prevState) => ({
        ...prevState,
        image: file,
        // [e.target.name]: e.target.value,
      }));
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
      setFormData((prevState) => ({
        ...prevState,
        image: file,
        // [e.target.name]: e.target.value,
      }));
    }
  };

  // create category
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AdminCreateCategory>({
    name: "",
    description: "",
  });
  // console.log(formData);
  const { name, description } = formData;

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      // image: selectedFile,
      [e.target.name]: e.target.value,
    }));
  };

  let adminCreateCategoryRedux = useSelector(
    (state: ReducersType) => state?.adminCreateCategory
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && description) {
      dispatch(adminCreateCategoryAction(formData) as any);
    }
  };

  useEffect(() => {
    adminCreateCategoryRedux?.error &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: adminCreateCategoryRedux?.error,
      });
    adminCreateCategoryRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: adminCreateCategoryRedux?.serverResponse?.message,
      });
    if (adminCreateCategoryRedux?.success) {
      setTimeout(function () {
        // navigate("/auth/success");
        navigate("/admin/category");
        // handleClose();
      }, 4000);
    }
    setTimeout(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dispatch({ type: ADMIN_CREATE_CATEGORY_RESET });
    }, 2000);
  }, [adminCreateCategoryRedux, dispatch, navigate]);

  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Categories</div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => navigate("/admin/category")}
              className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2"
            >
              <span className="text-[#EDB842]">
                <FaTimes />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Cancel</span>
            </button>
            <button
              onClick={() => navigate("/admin/category")}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              <span className="whitespace-nowrap">Categories</span>
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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full md:w-3/4 lg:w-4/5 shadow-sm rounded-md p-3 gap-3"
          >
            <div className="font-[600] text-lg text-[#1D1F2C]">
              General Information
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm">
              <label htmlFor="">Category Name</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Type category name here. . ."
                onChange={onChange}
                name="name"
                autoFocus={true}
                autoComplete="off"
                required
              />
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm">
              <label htmlFor="">Description</label>
              <textarea
                className="border p-2 rounded-md bg-[#F9F9FC]"
                name="description"
                id=""
                cols={30}
                rows={6}
                onChange={onChange}
                autoComplete="off"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="p-2 border text-white bg-[#EDB842] rounded-md"
            >
              {adminCreateCategoryRedux?.loading ? (
                <div className="" style={{ height: "25px" }}>
                  <PulseLoader color="#ffffff" />
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminAddCategoryBody;
