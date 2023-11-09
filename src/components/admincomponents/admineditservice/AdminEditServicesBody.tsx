import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import {
  adminGetServiceByIdAction,
  adminUpdateServiceAction,
} from "../../../redux/actions/admin/services.actions";
import { ADMIN_UPDATE_SERVICE_RESET } from "../../../redux/constants/admin/services.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import {
  AdminGetServiceType,
  AdminUpdateService,
} from "../../../redux/types/services.types";
import { DropImages } from "../adminaddproduct/AdminAddProductsBody";

const AdminEditServicesBody = () => {
  // fetch data for service details
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams<string>();

  const [formData, setFormData] = useState<AdminUpdateService>({
    name: "",
    owner: {
      id: "",
      username: "",
      country: "",
      email: "",
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

    id: id as string,
  });

  const adminGetServiceByIDRedux = useSelector(
    (state: ReducersType) => state?.adminGetByIdService
  ) as ReduxResponseType<AdminGetServiceType>;

  useEffect(() => {
    dispatch(adminGetServiceByIdAction({ id }) as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (adminGetServiceByIDRedux?.serverResponse.data) {
      setFormData({
        ...adminGetServiceByIDRedux?.serverResponse?.data,
        id: id as string,
      });
    }
  }, [adminGetServiceByIDRedux?.serverResponse, dispatch, id]);

  // update service
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

  const adminUpdateServiceRedux = useSelector(
    (state: ReducersType) => state?.adminUpdateService
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      dispatch(adminUpdateServiceAction(formData) as any);
    }
  };

  useEffect(() => {
    adminUpdateServiceRedux?.error &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: adminUpdateServiceRedux?.error,
      });
    adminUpdateServiceRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: adminUpdateServiceRedux?.serverResponse?.message,
      });
    if (adminUpdateServiceRedux?.success) {
      setTimeout(function () {
        dispatch(adminGetServiceByIdAction(id as string) as any);
      }, 1000);
      setTimeout(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch({ type: ADMIN_UPDATE_SERVICE_RESET });
      }, 2000);
    }
  }, [adminUpdateServiceRedux, dispatch, id]);

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
                    value={formData.name}
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
                    value={formData.brief_description}
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
                    value={formData.description}
                  ></textarea>
                </div>
              </div>
              <div className="flex flex-col shadow-md rounded-md p-3 gap-3">
                <div className="font-[600] text-lg text-[#1D1F2C]">Media</div>
                <DropImages />
              </div>
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
                    value={formData.category}
                  >
                    <option value="">Select a category</option>
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
                    value={formData.service_status}
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
              value={formData.current_price}
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
                value={formData.currency}
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
                value={formData.old_price}
              />
            </div>
          </div>
          <div className="flex flex-row gap-3 whitespace-nowrap">
            <div className="flex flex-col gap-2 w-1/3">
              <div className="font-[400]">Service Duration</div>
              <input
                name="duration"
                className="border p-2 rounded-md "
                type="text"
                placeholder="Duration 1day 2days etc "
                onChange={onChange}
                value={formData.duration}
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
              value={formData.location_description}
            ></textarea>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Phone Number</div>
              <input
                name="phone_number"
                className="border p-2 rounded-md "
                type="text"
                placeholder="Phone Number"
                onChange={onChange}
                value={formData.phone_number}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400] whitespace-nowrap overflow-x-hidden">
                Backup Phone Number (Optional)
              </div>
              <input
                name="phone_number_backup"
                className="border p-2 rounded-md "
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
                name="email"
                className="border p-2 rounded-md "
                type="text"
                placeholder="Email address"
                onChange={onChange}
                value={formData.email}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Website Link (Optional)</div>
              <input
                name="website_link"
                className="border p-2 rounded-md "
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
                name="state"
                className="border p-2 rounded-md "
                type="text"
                placeholder="Your State"
                onChange={onChange}
                value={formData.state}
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
                placeholder="Your city"
                onChange={onChange}
                value={formData.city}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Map Location (Optional)</div>
              <input
                name="map_location_link"
                className="border p-2 rounded-md "
                type="text"
                placeholder="Map location"
                onChange={onChange}
                value={formData.map_location_link}
              />
            </div>
          </div>
          <button
            type="submit"
            className="p-2 border text-white bg-[#EDB842] rounded-md"
          >
            {adminUpdateServiceRedux?.loading ? (
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

export default AdminEditServicesBody;
