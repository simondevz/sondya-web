import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { PiRocketBold, PiStackBold, PiStackSimpleBold } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { circleWavy } from "../../../images";
import { sellerCreateProductAction } from "../../../redux/actions/seller/seller-products.actions";
import { userGetProductsCategoriesAction } from "../../../redux/actions/userDashboard/products.action";
import { SELLER_CREATE_PRODUCT_RESET } from "../../../redux/constants/seller/seller-products.constants";
import { ReducersType } from "../../../redux/store";
import { LoginResponseType } from "../../../redux/types/auth.types";
import { AdminGetCategoryType } from "../../../redux/types/categories.types";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminCreateProduct } from "../../../redux/types/products.types";
import InputVariants from "../../shareables/inputVariants";

const SellerPostProductBody = () => {
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
    setFormData((prevState: any) => ({
      ...prevState,
      image: newFiles,
    }));
  };

  // handle images end

  // get uploader details starts
  let login = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType<LoginResponseType>;

  // create categories
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<AdminCreateProduct>({
    name: "",
    category: "",
    description: "",
    owner: {
      id: login?.serverResponse?.data?.id,
      username: login?.serverResponse?.data?.username as string,
      email: login?.serverResponse?.data?.email,
    },
    total_stock: 0,
    tag: "",
    brand: "",
    model: "",
    current_price: 0,
    quantity: 0,
    product_status: "",
    old_price: 0,
    discount_percentage: 0,
    vat_percentage: 0,
    total_variants: 0,
    variants: {},

    //location
    country: "",
    state: "",
    city: "",
    address: "",
    zip_code: "",
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

  let sellerCreateProductRedux = useSelector(
    (state: ReducersType) => state?.sellerCreateProduct
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && description) {
      dispatch(sellerCreateProductAction(formData) as any);
    }
  };

  useEffect(() => {
    // adminCreateProductRedux?.error &&
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     timer: 5000,
    //     text: adminCreateProductRedux?.error,
    //   });
    // adminCreateProductRedux?.success &&
    //   Swal.fire({
    //     icon: "success",
    //     title: "Successful",
    //     timer: 5000,
    //     text: adminCreateProductRedux?.serverResponse?.message,
    //   });
    if (sellerCreateProductRedux?.success) {
      setTimeout(function () {
        // navigate("/seller/products");
        // handleClose();
        setFormData({
          // name: "",
          // category: "",
          // description: "",
          ...formData,
          owner: {
            id: login?.serverResponse?.data?.id,
            username: login?.serverResponse?.data?.username as string,
            email: login?.serverResponse?.data?.email,
          },
        });
        setDone(true);
      }, 4000);
    }

    setTimeout(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dispatch({ type: SELLER_CREATE_PRODUCT_RESET });
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sellerCreateProductRedux,
    dispatch,
    navigate,
    login?.serverResponse?.data?.id,
    login?.serverResponse?.data?.username,
    login?.serverResponse?.data?.email,
  ]);
  // console.log(sellerCreateProductRedux?.error);

  let subcategoriesRedux = useSelector(
    (state: ReducersType) => state?.userGetProductsCategories
  ) as ReduxResponseType<AdminGetCategoryType[]>;

  useEffect(() => {
    dispatch(userGetProductsCategoriesAction() as any);
  }, [dispatch]);

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
                    Product Information
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
                  <div className="font-[400] text-[#767E94]">Post Product</div>
                </div>
              </div>
            </div>
            <div className="">
              {open === "tab1" ? (
                // Tab 1
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="font-[400]">Product Name</div>
                    <input
                      name="name"
                      className="border p-2 rounded-md "
                      type="text"
                      placeholder="Ad Name"
                      onChange={onChange}
                      autoFocus={true}
                      value={formData.name}
                    />
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Status</div>
                      <select
                        className="border p-2 rounded-md text-[#939AAD]"
                        name="product_status"
                        onChange={onChange}
                        value={formData.product_status}
                      >
                        <option value="">Select status</option>
                        <option value="draft">draft</option>
                        <option value="available">available</option>
                        <option value="hot">hot</option>
                        <option value="sold">sold</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Subcategory</div>
                      <select
                        className="border p-2 rounded-md text-[#939AAD]"
                        name="category"
                        id=""
                        value={formData.category}
                        onChange={onChange}
                      >
                        <option value="">Select...</option>
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
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Brand</div>
                      <input
                        name="brand"
                        className="border p-2 rounded-md "
                        type="text"
                        placeholder="Brand name"
                        onChange={onChange}
                        value={formData.brand}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Tags</div>
                      <input
                        className="border p-2 rounded-md "
                        name="tag"
                        id=""
                        onChange={onChange}
                        value={formData.tag}
                      />
                    </div>
                  </div>

                  {/* location for products start */}
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Country</div>
                      <input
                        name="country"
                        className="border p-2 rounded-md "
                        type="text"
                        placeholder="country"
                        onChange={onChange}
                        value={formData.country}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">State</div>
                      <input
                        className="border p-2 rounded-md "
                        name="state"
                        id="state"
                        onChange={onChange}
                        value={formData.state}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">City</div>
                      <input
                        name="city"
                        className="border p-2 rounded-md "
                        type="text"
                        placeholder="city"
                        onChange={onChange}
                        value={formData.city}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">ZipCode</div>
                      <input
                        className="border p-2 rounded-md "
                        name="zip_code"
                        id="51001"
                        type="text"
                        onChange={onChange}
                        value={formData.zip_code}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-[400]">Address</div>
                    <input
                      name="address"
                      className="border p-2 rounded-md "
                      type="text"
                      placeholder="51 est street, lagos"
                      onChange={onChange}
                      value={formData.address}
                      required
                    />
                  </div>
                  {/* location for products ends */}

                  <div className="flex w-full justify-end gap-3">
                    <button className="px-4 py-2 border-2 border-[#EDB842] text-[#EDB842] rounded-md font-[700]">
                      View posting rules
                    </button>
                    <button
                      onClick={() => setOpen("tab2")}
                      className="px-4 py-2  bg-[#EDB842] flex flex-row gap-2 rounded-md items-center text-white font-[700]"
                    >
                      <span>Next Steps</span>
                      <AiOutlineArrowRight />
                    </button>
                  </div>
                </div>
              ) : open === "tab2" ? (
                // Tab 2
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="font-[400]">Description</div>
                    <textarea
                      className="border rounded-md text-[#939AAD] p-2"
                      name="description"
                      id=""
                      cols={30}
                      rows={4}
                      onChange={onChange}
                      placeholder="Product description"
                    ></textarea>
                  </div>
                  <div className="text-center font-[600] text-xl">
                    Prices data
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-[400]">Product Prices</div>
                    <input
                      className="border p-2 rounded-md "
                      type="number"
                      placeholder="Type base price here. . ."
                      name="current_price"
                      onChange={onChange}
                      value={formData.current_price}
                    />
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Old Price</div>
                      <input
                        className="border p-2 rounded-md "
                        name="old_price"
                        type="number"
                        placeholder="Type before price here. . ."
                        onChange={onChange}
                        value={formData.old_price}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Discount percentage</div>
                      <input
                        className="border p-2 rounded-md "
                        type="number"
                        name="discount_percentage"
                        id=""
                        onChange={onChange}
                        value={formData.discount_percentage}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Total Stock</div>
                      <input
                        className="border p-2 rounded-md "
                        name="total_stock"
                        type="number"
                        placeholder="total here. . ."
                        onChange={onChange}
                        value={formData.total_stock}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="font-[400]">Vat Amount</div>
                      <input
                        className="border p-2 rounded-md "
                        name="vat_percentage"
                        type="number"
                        placeholder="total here. . ."
                        onChange={onChange}
                        value={formData.vat_percentage}
                      />
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
                                  alt={`Images ${index + 1}`}
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
                    <button className="px-4 py-2 border-2 border-[#EDB842] text-[#EDB842] rounded-md font-[700]">
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
                  <div className="flex flex-col gap-3 shadow-md rounded-md p-3">
                    <div className="font-[600] text-lg text-[#1D1F2C]">
                      Inventory
                    </div>
                    <div className="flex flex-wrap gap-3 items-stretch">
                      <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[16rem]">
                        <label htmlFor="">Model Number</label>
                        <input
                          className="border p-2 rounded-md bg-[#F9F9FC]"
                          name="model"
                          type="text"
                          placeholder="Product Model Number here. . ."
                          onChange={onChange}
                          value={formData.model}
                        />
                      </div>
                      <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[16rem]">
                        <label htmlFor="">Total variant</label>
                        <input
                          className="border p-2 rounded-md bg-[#F9F9FC]"
                          name="total_variants"
                          type="number"
                          placeholder="Total variant"
                          onChange={onChange}
                          value={formData.total_variants}
                        />
                      </div>
                      <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[16rem]">
                        <label htmlFor="">Quantity</label>
                        <input
                          className="border p-2 rounded-md bg-[#F9F9FC]"
                          name="quantity"
                          type="number"
                          placeholder="Type product quantity here. . ."
                          onChange={onChange}
                          value={formData.quantity}
                        />
                      </div>
                    </div>
                  </div>
                  <InputVariants setFormData={setFormData} />
                  <div className="flex flex-col gap-3 shadow-md rounded-md p-3">
                    <div className="font-[600] text-lg text-[#1D1F2C]">
                      Shiping
                    </div>
                    <div className="flex flex-row gap-3">
                      {" "}
                      <input type="checkbox" />{" "}
                      <span className="text-[#EDB842]">
                        This is a physical product
                      </span>
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
                    <div className="">
                      {sellerCreateProductRedux?.error && (
                        <div className="text-[#DB4444]">
                          {sellerCreateProductRedux?.error}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex w-full justify-end gap-3">
                    <button className="px-4 py-2 border-2 border-[#EDB842] text-[#EDB842] rounded-md font-[700]">
                      View posting rules
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2  bg-[#EDB842] flex flex-row gap-2 rounded-md items-center text-white font-[700]"
                    >
                      {sellerCreateProductRedux?.loading ? (
                        <div className="" style={{ height: "25px" }}>
                          <PulseLoader color="#ffffff" />
                        </div>
                      ) : (
                        <span>Post Product</span>
                      )}

                      <AiOutlineArrowRight />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        ) : (
          <div className="h-[60vh] w-full flex flex-col items-center justify-center text-center gap-2">
            <img className="object-contain" src={circleWavy} alt="" />
            <div className="text-2xl font-[700] playfair-display">
              Your Product is successfully publish
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

export default SellerPostProductBody;
