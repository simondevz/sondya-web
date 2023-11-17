/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { adminCreateProductAction } from "../../../redux/actions/admin/products.actions";
import { ADMIN_CREATE_PRODUCT_RESET } from "../../../redux/constants/admin/products.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminCreateProduct } from "../../../redux/types/products.types";

const AdminAddProductsBody = () => {
  // handle images
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: File[] = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newFiles]);

      // sending images
      setFormData((prevState) => ({
        ...prevState,
        image: [...selectedFiles, ...newFiles],
      }));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const newFiles: File[] = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newFiles]);

      // sending images
      setFormData((prevState) => ({
        ...prevState,
        image: [...selectedFiles, ...newFiles],
      }));
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    // sending images
    setFormData((prevState) => ({
      ...prevState,
      image: newFiles,
    }));
  };

  // handle images end

  // create categories
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<AdminCreateProduct>({
    name: "",
    category: "",
    description: "",
    total_stock: 0,
    tag: "",
    brand: "",
    model: "",
    current_price: 0,
    product_status: "",
    old_price: 0,
    discount_percentage: 0,
    vat_percentage: 0,
    total_variants: 0,
  });

  // console.log(formData.image);

  const { name, description } = formData;

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  let adminCreateProductRedux = useSelector(
    (state: ReducersType) => state?.adminCreateProduct
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && description) {
      dispatch(adminCreateProductAction(formData) as any);
    }
  };

  useEffect(() => {
    adminCreateProductRedux?.error &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: adminCreateProductRedux?.error,
      });
    adminCreateProductRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: adminCreateProductRedux?.serverResponse?.message,
      });
    if (adminCreateProductRedux?.success) {
      setTimeout(function () {
        navigate("/admin/products");
        // handleClose();
      }, 4000);
    }

    setTimeout(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dispatch({ type: ADMIN_CREATE_PRODUCT_RESET });
    }, 2000);
  }, [adminCreateProductRedux, dispatch, navigate]);

  return (
    <section>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Add Product</div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => navigate("/admin/products")}
              className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2"
            >
              <span className="text-[#EDB842]">
                <FaTimes />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Cancel</span>
            </button>
            <button
              onClick={() => navigate("/admin/products")}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              <span className="whitespace-nowrap">Product</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-[600] text-lg text-[#1D1F2C]">
            General Information
          </div>
          <div className="flex flex-col lg:flex-row gap-1">
            <div className="flex flex-col gap-3 w-full lg:w-3/4 xl:w-4/5">
              <div className="flex flex-col shadow-sm rounded-md p-3 gap-3">
                <div className="text-[#777980] flex flex-col gap-2 text-sm">
                  <label htmlFor="">Product Name</label>
                  <input
                    name="name"
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    type="text"
                    placeholder="Type category name here. . ."
                    onChange={onChange}
                    autoFocus={true}
                  />
                </div>
                <div className="text-[#777980] flex flex-col gap-2 text-sm">
                  <label htmlFor="">Brand Name</label>
                  <input
                    name="brand"
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    type="text"
                    placeholder="Type brand name here. . ."
                    onChange={onChange}
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
                  >
                    Type product description here. . .
                  </textarea>
                </div>
              </div>
              {/* Handle Images starts */}
              <div className="flex flex-col shadow-md rounded-md p-3 gap-3">
                <div className="font-[600] text-lg text-[#1D1F2C]">Media</div>

                <div
                  // className="border-2 border-dashed border-gray-300 p-4"
                  className="border-2 border-dashed border-[#E0E2E7] p-4 text-center rounded-md bg-[#F9F9FC]"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                    id="multiplePictureInput"
                  />
                  <label
                    className="flex flex-col justify-center"
                    htmlFor="multiplePictureInput"
                  >
                    {selectedFiles.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Image ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-0 -right-1 bg-red-500 text-white py-1 px-2 rounded-full"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center gap-2">
                        <div className="mx-auto p-2 bg-[#EDB842] rounded-md text-white">
                          <BsFillImageFill />
                        </div>
                        <span className="text-[#858D9D] text-sm">
                          Drag and drop image here, or click add image
                        </span>
                        <button className="bg-[#EDB84233] text-[#EDB842] px-4 py-2 rounded-lg mt-2 w-fit mx-auto">
                          Browse
                        </button>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              {/* Handle Images ends */}
            </div>
            <div className="flex flex-row lg:flex-col gap-3 rounded-md p-1 w-full lg:w-1/4 xl:w-1/5 lg:flex-grow">
              <div className="flex flex-col gap-3 shadow-md rounded-md p-2 w-full">
                <div className="font-[600] text-lg text-[#1D1F2C]">
                  Category
                </div>
                <div className="text-[#777980] flex flex-col gap-2 text-sm w-full">
                  <label htmlFor="">Product Category</label>
                  <select
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    name="category"
                    id=""
                    onChange={onChange}
                  >
                    <option value="">Select a category</option>
                  </select>
                </div>
                <div className="text-[#777980] flex flex-col gap-2 text-sm w-full">
                  <label htmlFor="">Product Tags</label>
                  <select
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    name="tag"
                    id=""
                    onChange={onChange}
                  >
                    <option value="">Select tags</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-3 shadow-md rounded-md p-2 w-full">
                <div className="font-[600] text-lg text-[#1D1F2C] w-full flex flex-row justify-between">
                  <span>Status</span>
                  <span className="p-1 w-fit h-fit bg-[#F0F1F3] text-[#667085] rounded-lg text-sm">
                    Draft
                  </span>
                </div>
                <div className="text-[#777980] flex flex-col gap-2 text-sm w-full">
                  <label htmlFor="">Product Status</label>
                  <select
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    name="product_status"
                    onChange={onChange}
                    id=""
                    // value={"draft"}
                    required
                  >
                    <option value="">Select tags</option>
                    <option value="draft">draft</option>
                    <option value="available">available</option>
                    <option value="hot">hot</option>
                    <option value="sold">sold</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 shadow-md rounded-md p-3">
          <div className="font-[600] text-lg text-[#1D1F2C]">Pricing</div>
          <div className="text-[#777980] flex flex-col gap-2 text-sm">
            <label htmlFor="">Current Price</label>
            <input
              className="border p-2 rounded-md bg-[#F9F9FC]"
              type="number"
              placeholder="Type base price here. . ."
              name="current_price"
              onChange={onChange}
            />
          </div>
          <div className="w-full flex flex-row gap-3">
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">Old Price</label>
              <input
                name="old_price"
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="number"
                placeholder="Type base price here. . ."
                onChange={onChange}
              />
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">Discount Precentage (%)</label>
              <select
                className="border p-2 rounded-md bg-[#F9F9FC]"
                name="discount_percentage"
                id=""
                onChange={onChange}
              >
                <option value="">Type discount precentage. . .</option>
              </select>
            </div>
          </div>
          <div className="w-full flex flex-row gap-3">
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">Total Stock</label>
              <input
                name="total_stock"
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="number"
                placeholder="total here. . ."
                onChange={onChange}
              />
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">VAT Amount (%)</label>
              <input
                name="vat_percentage"
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="number"
                placeholder="total here. . ."
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 shadow-md rounded-md p-3">
          <div className="font-[600] text-lg text-[#1D1F2C]">Inventory</div>
          <div className="flex flex-wrap gap-3 items-stretch">
            <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[16rem]">
              <label htmlFor="">Model Number</label>
              <input
                name="model"
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Product Model Number here. . ."
                onChange={onChange}
              />
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[16rem]">
              <label htmlFor="">Total variant</label>
              <input
                name="total_variants"
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="number"
                placeholder="Total variant"
                onChange={onChange}
              />
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[16rem]">
              <label htmlFor="">Quantity</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Type product quantity here. . ."
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 shadow-md rounded-md p-3">
          <div className="font-[600] text-lg text-[#1D1F2C]">Variation</div>
          <div className="w-full flex flex-row gap-3 items-end">
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">Variation Type</label>
              <select
                className="border p-2 rounded-md bg-[#F9F9FC]"
                name=""
                id=""
              >
                <option value="">Select a variation</option>
              </select>
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">Variation</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Variation. . ."
              />
            </div>
            <button className="bg-[#EDB84233] text-[#EDB842] p-[0.65rem] h-fit w-fit rounded-md">
              <MdOutlineAdd />
            </button>
          </div>
          <div className="w-full flex flex-row gap-3 items-end">
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">Variation Type</label>
              <select
                className="border p-2 rounded-md bg-[#F9F9FC]"
                name=""
                id=""
              >
                <option value="">Select a variation</option>
              </select>
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">Variation</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Variation. . ."
              />
            </div>
            <button className="bg-[#EDB84233] text-[#EDB842] p-[0.65rem] h-fit w-fit rounded-md">
              <MdOutlineAdd />
            </button>
          </div>
          <button className="bg-[#EDB84233] text-[#EDB842] p-[0.65rem] h-fit w-fit rounded-md flex flex-row gap-2 items-center">
            <MdOutlineAdd />
            <span>Add Variant</span>
          </button>
        </div>
        <div className="flex flex-col gap-3 shadow-md rounded-md p-3">
          <div className="font-[600] text-lg text-[#1D1F2C]">Shiping</div>
          <div className="flex flex-row gap-3">
            {" "}
            <input type="checkbox" />{" "}
            <span className="text-[#EDB842]">This is a physical product</span>
          </div>
          <div className="flex flex-wrap gap-3 items-stretch">
            <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[13rem]">
              <label htmlFor="">Weight</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Product weight. . ."
              />
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[13rem]">
              <label htmlFor="">Height</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Height (cm). . ."
              />
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[13rem]">
              <label htmlFor="">Length</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Length (cm). . ."
              />
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[13rem]">
              <label htmlFor="">Width</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Width (cm). . ."
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="p-2 border text-white bg-[#EDB842] rounded-md"
        >
          {adminCreateProductRedux?.loading ? (
            <div className="" style={{ height: "25px" }}>
              <PulseLoader color="#ffffff" />
            </div>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </section>
  );
};

export const DropImages = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: File[] = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const newFiles: File[] = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  return (
    <div
      // className="border-2 border-dashed border-gray-300 p-4"
      className="border-2 border-dashed border-[#E0E2E7] p-4 text-center rounded-md bg-[#F9F9FC]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        multiple
        id="multiplePictureInput"
      />
      <label
        className="flex flex-col justify-center"
        htmlFor="multiplePictureInput"
      >
        {selectedFiles.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-0 -right-1 bg-red-500 text-white py-1 px-2 rounded-full"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center gap-2">
            <div className="mx-auto p-2 bg-[#EDB842] rounded-md text-white">
              <BsFillImageFill />
            </div>
            <span className="text-[#858D9D] text-sm">
              Drag and drop image here, or click add image
            </span>
            <button className="bg-[#EDB84233] text-[#EDB842] px-4 py-2 rounded-lg mt-2 w-fit mx-auto">
              Browse
            </button>
          </div>
        )}
      </label>
    </div>
  );
};

export default AdminAddProductsBody;
