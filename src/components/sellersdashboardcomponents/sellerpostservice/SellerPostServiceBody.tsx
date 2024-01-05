import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { PiRocketBold, PiStackBold, PiStackSimpleBold } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { circleWavy } from "../../../images";
import { sellerCreateServiceAction } from "../../../redux/actions/seller/seller-services.actions";
import { SELLER_CREATE_SERVICE_RESET } from "../../../redux/constants/seller/seller-services.constants";
import { ReducersType } from "../../../redux/store";
import { LoginResponseType } from "../../../redux/types/auth.types";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminCreateService } from "../../../redux/types/services.types";
import { userGetServiceCategoriesAction } from "../../../redux/actions/userDashboard/services.actions";
import { AdminGetCategoryType } from "../../../redux/types/categories.types";

const SellerPostServiceBody = () => {
  const [status1] = useState<"closed" | "open" | "done">("done");
  const [status2] = useState<"closed" | "open" | "done">("open");
  const [status3] = useState<"closed" | "open" | "done">("closed");
  const [open, setOpen] = useState<string>("tab1");
  const [done, setDone] = useState<boolean>(false);

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

  let sellerCreateServiceRedux = useSelector(
    (state: ReducersType) => state?.sellerCreateService
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && description) {
      dispatch(sellerCreateServiceAction(formData) as any);
    }
  };

  const [error, setError] = useState<string>();

  useEffect(() => {
    // sellerCreateServiceRedux?.error &&
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     timer: 5000,
    //     text: sellerCreateServiceRedux?.error,
    //   });
    // sellerCreateServiceRedux?.success &&
    //   Swal.fire({
    //     icon: "success",
    //     title: "Successful",
    //     timer: 5000,
    //     text: sellerCreateServiceRedux?.serverResponse?.message,
    //   });
    if (sellerCreateServiceRedux?.error) {
      setError(sellerCreateServiceRedux?.error);
    }
    if (sellerCreateServiceRedux?.success) {
      setTimeout(function () {
        // navigate("/auth/success");
        // navigate("/admin/services");
        // handleClose();
        setDone(true);
      }, 4000);
    }

    setTimeout(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dispatch({ type: SELLER_CREATE_SERVICE_RESET });
    }, 2000);
  }, [sellerCreateServiceRedux, dispatch, navigate]);

  let subcategoriesRedux = useSelector(
    (state: ReducersType) => state?.userGetServiceCategories
  ) as ReduxResponseType<AdminGetCategoryType[]>;

  useEffect(() => {
    dispatch(userGetServiceCategoriesAction() as any);
  }, [dispatch]);

  console.log(formData);
  return (
    <section className="flex flex-col">
      <div className="p-5 shadow-md rounded-md flex flex-col gap-6">
        {!done ? (
          <>
            {/* head */}
            <div className="flex flex-row justify-between border-b">
              {/* step1 */}
              <div
                className={`flex gap-2 p-2 w-full ${
                  open === "tab1" && " border-b-4 border-[#EDB842]"
                }`}
                onClick={() => setOpen("tab1")}
              >
                <div
                  className={`${
                    status1 === "closed"
                      ? "bg-[#C5C9D6]"
                      : status1 === "open"
                      ? "bg-[#EDB842]"
                      : "bg-[#27C200]"
                  } p-3 w-fit h-fit rounded-full text-white text-lg`}
                >
                  {status1 === "done" ? <TiTick /> : <PiStackSimpleBold />}
                </div>
                <div className="">
                  <div className="font-[600]">Steps 01</div>
                  <div className="font-[400] text-[#767E94]">
                    Service Information
                  </div>
                </div>
              </div>
              {/* step2 */}
              <div
                className={`flex gap-2 p-2 h-full w-full ${
                  open === "tab2" && " border-b-4 border-[#EDB842]"
                }`}
                onClick={() => setOpen("tab2")}
              >
                <div
                  className={`${
                    status2 === "closed"
                      ? "bg-[#C5C9D6]"
                      : status2 === "open"
                      ? " bg-[#EDB842] border-b-2 border-[#EDB842]"
                      : "bg-[#27C200]"
                  } p-3 w-fit h-fit rounded-full text-white text-lg`}
                >
                  {status2 === "done" ? <TiTick /> : <PiStackBold />}
                </div>
                <div className="">
                  <div className="font-[600]">Steps 02</div>
                  <div className="font-[400] text-[#767E94]">Description</div>
                </div>
              </div>
              {/* step3 */}
              <div
                className={`flex gap-2 p-2 h-full w-full ${
                  open === "tab3" && " border-b-4 border-[#EDB842]"
                }`}
                onClick={() => setOpen("tab3")}
              >
                <div
                  className={`${
                    status3 === "closed"
                      ? "bg-[#C5C9D6]"
                      : status3 === "open"
                      ? " bg-[#EDB842] border-b-2 border-[#EDB842]"
                      : "bg-[#27C200]"
                  } p-3 w-fit h-fit rounded-full text-white text-lg`}
                >
                  {status3 === "done" ? <TiTick /> : <PiRocketBold />}
                </div>
                <div className="font-[600]">
                  <div className="font-[600]">Steps 03</div>
                  <div className="font-[400] text-[#767E94]">Post Services</div>
                </div>
              </div>
            </div>
            <div className="">
              {open === "tab1" ? (
                // Tab 1
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="font-[400]">Service Name</div>
                    <input
                      className="border p-2 rounded-md text-[#939AAD]"
                      type="text"
                      placeholder="Type service name here. . ."
                      onChange={onChange}
                      name="name"
                      autoFocus={true}
                      autoComplete="off"
                      required
                      value={formData.name}
                    />
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Status</div>
                      <select
                        className="border p-2 rounded-md bg-[#F9F9FC]"
                        name="service_status"
                        id=""
                        onChange={onChange}
                        required
                        value={formData.service_status}
                      >
                        <option value="">Select tags</option>
                        <option value="draft">Draft</option>
                        <option value="available">available</option>
                        <option value="suspended">Suspended</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Subcategory</div>
                      <select
                        className="border p-2 rounded-md bg-[#F9F9FC]"
                        name="category"
                        id=""
                        onChange={onChange}
                        value={formData.category}
                      >
                        <option value="">Select a category</option>
                        {subcategoriesRedux.success ? (
                          subcategoriesRedux.serverResponse.data?.map(
                            (subcategories: AdminGetCategoryType) => {
                              return (
                                <option value={subcategories?.name}>
                                  {subcategories?.name}
                                </option>
                              );
                            }
                          )
                        ) : (
                          <></>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="font-[400]">Brief Description</div>
                    <textarea
                      className="border rounded-md text-[#939AAD] p-2"
                      name="brief_description"
                      id=""
                      cols={30}
                      rows={2}
                      onChange={onChange}
                      autoComplete="off"
                      placeholder="Write about your service"
                      value={formData.brief_description}
                    >
                      service description
                    </textarea>
                  </div>

                  <div className="flex w-full justify-end gap-3">
                    <button
                      onClick={() => navigate("/seller/service/posting-rules")}
                      className="px-4 py-2 border-2 border-[#EDB842] text-[#EDB842] rounded-md font-[700]"
                    >
                      View posting rules
                    </button>
                    <button
                      onClick={() => setOpen("tab2")}
                      className="px-4 py-2  bg-[#EDB842] flex flex-row gap-2 rounded-md items-center text-white font-[700]"
                    >
                      {" "}
                      <span>Next Steps</span>
                      <AiOutlineArrowRight />
                    </button>
                  </div>
                </div>
              ) : open === "tab2" ? (
                // Tab 2
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="font-[400]">Full Description</div>
                    <textarea
                      className="border rounded-md text-[#939AAD] p-2"
                      name="description"
                      id=""
                      cols={30}
                      rows={4}
                      onChange={onChange}
                      autoComplete="off"
                      value={formData.description}
                    >
                      Service description
                    </textarea>
                  </div>
                  <div className="text-center font-[600] text-lg">Pricing</div>
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Current Price</div>
                      <input
                        className="border p-2 rounded-md text-[#939AAD]"
                        name="current_price"
                        type="text"
                        placeholder="Pick a good price - what you would pay?"
                        onChange={onChange}
                        value={formData.current_price}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Currency</div>
                      <select
                        className="border p-2 rounded-md text-[#939AAD]"
                        name="currency"
                        id=""
                        onChange={onChange}
                        value={formData.currency}
                      >
                        <option value="">Select...</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Nigeria">Sudan</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Old price</div>
                      <input
                        className="border p-2 rounded-md "
                        type="number"
                        placeholder="Old price"
                        onChange={onChange}
                        value={formData.old_price}
                        name="old_price"
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Duration</div>
                      <input
                        className="border p-2 rounded-md "
                        name="duration"
                        type="text"
                        placeholder="Duration 1day 2days etc "
                        onChange={onChange}
                        value={formData.duration}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Avg Response Time</div>
                      <input
                        className="border p-2 rounded-md "
                        type="text"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Location of service</div>
                      <textarea
                        className="border rounded-md text-[#939AAD] p-2"
                        name="location_description"
                        id=""
                        cols={30}
                        rows={2}
                        placeholder="Write about location for your service you"
                        onChange={onChange}
                        value={formData.location_description}
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-[400]">Upload Photos</div>
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
                  <div className="flex w-full justify-end gap-3">
                    <button
                      onClick={() => navigate("/seller/service/posting-rules")}
                      className="px-4 py-2 border-2 border-[#EDB842] text-[#EDB842] rounded-md font-[700]"
                    >
                      View posting rules
                    </button>
                    <button
                      onClick={() => setOpen("tab3")}
                      className="px-4 py-2  bg-[#EDB842] flex flex-row gap-2 rounded-md items-center text-white font-[700]"
                    >
                      <span>Next Step</span>
                      <AiOutlineArrowRight />
                    </button>
                  </div>
                </div>
              ) : (
                // Tab 3
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Phone Number</div>
                      <input
                        className="border p-2 rounded-md "
                        name="phone_number"
                        type="text"
                        placeholder="Phone Number"
                        onChange={onChange}
                        value={formData.phone_number}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">
                        Backup Phone Number (Optional)
                      </div>
                      <input
                        className="border p-2 rounded-md "
                        name="phone_number_backup"
                        type="text"
                        placeholder="Phone Number"
                        onChange={onChange}
                        value={formData.phone_number_backup}
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
                        value={formData.email}
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
                        value={formData.website_link}
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
                        value={formData.country}
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
                        value={formData.state}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Location</div>
                      <input
                        className="border p-2 rounded-md "
                        type="text"
                        placeholder="Your location"
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
                        value={formData.map_location_link}
                      />
                    </div>
                  </div>
                  <div className="">
                    {error && <div className="text-[#DB4444]">{error}</div>}
                  </div>
                  <div className="flex w-full justify-end gap-3">
                    <button
                      onClick={() => navigate("/seller/service/posting-rules")}
                      className="px-4 py-2 border-2 border-[#EDB842] text-[#EDB842] rounded-md font-[700]"
                    >
                      View posting rules
                    </button>
                    <button
                      type="submit"
                      // onClick={() => setDone(true)}
                      className="px-4 py-2  bg-[#EDB842] flex flex-row gap-2 rounded-md items-center text-white font-[700]"
                    >
                      {sellerCreateServiceRedux?.loading ? (
                        <div className="" style={{ height: "25px" }}>
                          <PulseLoader color="#ffffff" />
                        </div>
                      ) : (
                        <span>Post Services</span>
                      )}{" "}
                      <AiOutlineArrowRight />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        ) : (
          // Success page
          <div className="h-[60vh] w-full flex flex-col items-center justify-center text-center gap-2">
            <img className="object-contain" src={circleWavy} alt="" />
            <div className="text-2xl font-[700] playfair-display">
              Your Service is successfully publish
            </div>
            <div className="text-[#767E94] text-sm font-[400] w-1/2">
              Proin placerat risus non justo faucibus commodo. Nunc non neque
              sit amet magna aliquam condimentum.
            </div>
            <div className="flex w-full justify-center gap-3">
              <button
                onClick={() => setDone(false)}
                className="px-4 py-2 border-2 border-[#EDB842] text-[#EDB842] rounded-md font-[700]"
              >
                Go Back
              </button>
              <button className="px-4 py-2  bg-[#EDB842] flex flex-row gap-2 rounded-md items-center text-white font-[700]">
                {" "}
                <span>View Ads</span>
                <AiOutlineArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SellerPostServiceBody;
