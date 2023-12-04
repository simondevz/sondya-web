import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { adminCreateServiceAction } from "../../../redux/actions/admin/services.actions";
import { ADMIN_CREATE_SERVICE_RESET } from "../../../redux/constants/admin/services.constants";
import { ReducersType } from "../../../redux/store";
import { LoginResponseType } from "../../../redux/types/auth.types";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminCreateService } from "../../../redux/types/services.types";
import { adminGetServiceCategoriesAction } from "../../../redux/actions/admin/categories.actions";
import { AdminGetCategoryType } from "../../../redux/types/categories.types";

const AdminAddServiceBody = () => {
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

  // get uploader details starts
  let login = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType<LoginResponseType>;

  // create services
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AdminCreateService>({
    name: "",
    owner: {
      id: login?.serverResponse?.data?.id,
      username: login?.serverResponse?.data?.username as string,
      email: login?.serverResponse?.data?.email,
    },
    category: "",
    brief_description: "",
    description: "",
    service_status: "",
    currency: "",
    old_price: 0,
    current_price: 0,
    percentage_price_off: 0,
    duration: "",

    location_description: "",
    phone_number: "",
    phone_number_backup: "",
    email: "",
    website_link: "",
    country: "",
    state: "",
    city: "",
    map_location_link: "",
  });

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

  let adminCreateServiceRedux = useSelector(
    (state: ReducersType) => state?.adminCreateService
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && description) {
      dispatch(adminCreateServiceAction(formData) as any);
    }
  };

  // stops infinite rerender
  const adminCreateServiceReduxRef = useRef(adminCreateServiceRedux);
  const [notify, setNotify] = useState<string>("");
  useLayoutEffect(() => {
    console.log(
      "adminCreateServiceReduxRef layout effect ==> ",
      adminCreateServiceReduxRef
    );
    adminCreateServiceReduxRef.current = adminCreateServiceRedux;
    if (adminCreateServiceRedux?.loading) setNotify("loading");
    if (adminCreateServiceRedux?.success) setNotify("success");
    if (adminCreateServiceRedux?.error) setNotify("error");
  }, [
    adminCreateServiceRedux?.success,
    adminCreateServiceRedux?.loading,
    adminCreateServiceRedux?.error,
    adminCreateServiceRedux,
  ]);

  useEffect(() => {
    console.log("adminCreateServiceReduxRef ==> ", adminCreateServiceReduxRef);
    notify === "error" &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: adminCreateServiceReduxRef.current?.error,
      });
    notify === "success" &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: adminCreateServiceReduxRef.current?.serverResponse?.message,
      });
    if (notify === "success") {
      setTimeout(function () {
        // navigate("/auth/success");
        // navigate("/admin/services");
        // handleClose();
      }, 4000);
    }

    setTimeout(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dispatch({ type: ADMIN_CREATE_SERVICE_RESET });
      setNotify("");
    }, 2000);
  }, [adminCreateServiceReduxRef, notify, dispatch, navigate]);
  // console.log(formData);

  // get list of categories for services
  let serviceCategoriesRedux = useSelector(
    (state: ReducersType) => state?.adminGetServiceCategories
  ) as ReduxResponseType<AdminGetCategoryType[]>;
  console.log(serviceCategoriesRedux);

  useEffect(() => {
    dispatch(adminGetServiceCategoriesAction() as any);
  }, [dispatch]);

  return (
    <section>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Edit Service</div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => navigate("/admin/services")}
              type="button"
              className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2"
            >
              <span className="text-[#EDB842]">
                <FaTimes />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Cancel</span>
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
                  <label htmlFor="">Service Name</label>
                  <input
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    type="text"
                    placeholder="Type service name here. . ."
                    onChange={onChange}
                    name="name"
                    autoFocus={true}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="text-[#777980] flex flex-col gap-2 text-sm">
                  <label htmlFor="">Brief Description</label>
                  <textarea
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    name="brief_description"
                    id=""
                    cols={30}
                    rows={3}
                    onChange={onChange}
                    autoComplete="off"
                    required
                  ></textarea>
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
                              alt={`Imagei ${index + 1}`}
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
                  <label htmlFor="">Service Category</label>
                  <select
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    name="category"
                    id=""
                    onChange={onChange}
                  >
                    <option value="">Select a category</option>
                    {serviceCategoriesRedux?.serverResponse?.data.map(
                      (subcategory: AdminGetCategoryType) => {
                        return (
                          <option
                            key={subcategory._id}
                            value={subcategory.name}
                          >
                            {subcategory.name}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
                <div className="text-[#777980] flex flex-col gap-2 text-sm w-full">
                  <label htmlFor="">Service Status</label>
                  <select
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    name="service_status"
                    id=""
                    onChange={onChange}
                    required
                  >
                    <option value="">Select tags</option>
                    <option value="draft">Draft</option>
                    <option value="available">available</option>
                    <option value="suspended">Suspended</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 shadow-md p-3 rounded-md">
          <div className="font-[600]">Pricing & Duration</div>
          <div className="flex flex-col gap-2 w-full">
            <div className="font-[400]">Service Prices (USD)</div>
            <input
              className="border p-2 rounded-md "
              name="current_price"
              type="text"
              placeholder="Pick a good price - what you would pay?"
              onChange={onChange}
            />
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Currency</div>
              <select
                className="border p-2 rounded-md text-[#939AAD]"
                name="currency"
                id=""
                onChange={onChange}
                required
              >
                <option value="">Select...</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Nigeria">Sudan</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Old price</div>
              <input
                name="old_price"
                className="border p-2 rounded-md "
                type="number"
                placeholder="Old price"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-row gap-3 whitespace-nowrap">
            <div className="flex flex-col gap-2 w-1/3">
              <div className="font-[400]">Service Duration</div>
              <input
                className="border p-2 rounded-md "
                name="duration"
                type="text"
                placeholder="Duration 1day 2days etc "
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/3">
              <div className="font-[400]">Avg. response time Pending...</div>
              <select
                className="border p-2 rounded-md text-[#939AAD]"
                name=""
                id=""
              >
                <option value="">Select...</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-1/3">
              <div className="font-[400]">Last delivery Pending...</div>
              <select
                className="border p-2 rounded-md text-[#939AAD]"
                name=""
                id=""
              >
                <option value="">Select...</option>
              </select>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col gap-3 shadow-md p-3 rounded-md"> */}
        {/* <div className="flex flex-col gap-2">
            <div className="font-[400]">Feature (optional)</div>
            <textarea
              className="border rounded-md text-[#939AAD] p-2"
              name=""
              id=""
              cols={30}
              rows={4}
            >
              Write a feature in each line eg. Feature 1 Feature 2
            </textarea>
          </div> */}
        {/* <div className="flex flex-col gap-2 w-1/2">
            <div className="font-[400]">Estimated Date of Delivery</div>
            <select
              className="border p-2 rounded-md text-[#939AAD]"
              name=""
              id=""
            >
              <option value="">Select...</option>
            </select>
          </div> */}
        {/* </div> */}
        {/* last one */}
        <div className="flex flex-col gap-3 shadow-md p-3">
          <div className="flex flex-col gap-2">
            <div className="font-[400]">Location description for service</div>
            <textarea
              className="border rounded-md text-[#939AAD] p-2"
              name="location_description"
              id=""
              cols={30}
              rows={4}
              placeholder="Write about location for your service you"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Phone Number</div>
              <input
                className="border p-2 rounded-md "
                name="phone_number"
                type="text"
                placeholder="Phone Number"
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400] whitespace-nowrap overflow-x-hidden">
                Backup Phone Number (Optional)
              </div>
              <input
                className="border p-2 rounded-md "
                name="phone_number_backup"
                type="text"
                placeholder="Phone Number"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Email Address</div>
              <input
                className="border p-2 rounded-md "
                name="email"
                type="text"
                placeholder="Email address"
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Website Link (Optional)</div>
              <input
                className="border p-2 rounded-md "
                name="website_link"
                type="text"
                placeholder="your website url"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Country</div>
              <select
                className="border p-2 rounded-md text-[#939AAD]"
                name="country"
                id=""
                onChange={onChange}
              >
                <option value="">Select...</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Sudan">Sudan</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">State</div>
              <input
                className="border p-2 rounded-md "
                name="state"
                type="text"
                placeholder="Your State"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">City</div>
              <input
                className="border p-2 rounded-md "
                name="city"
                type="text"
                placeholder="Your city"
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Map Location (Optional)</div>
              <input
                className="border p-2 rounded-md "
                name="map_location_link"
                type="text"
                placeholder="Map location"
                onChange={onChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="p-2 border text-white bg-[#EDB842] rounded-md"
          >
            {adminCreateServiceRedux?.loading ? (
              <div className="" style={{ height: "25px" }}>
                <PulseLoader color="#ffffff" />
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminAddServiceBody;
