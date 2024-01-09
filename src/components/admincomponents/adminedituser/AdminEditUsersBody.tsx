import { useEffect, useState } from "react";
import { BiExport } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { defaultUser } from "../../../images";
import {
  adminGetUserByIdAction,
  adminUpdateUserAction,
} from "../../../redux/actions/admin/users.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import {
  adminUGetUserType,
  adminUpdateUserType,
} from "../../../redux/types/users.types";

const AdminEditUsersBody = () => {
  // fetch data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState<adminUpdateUserType>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    type: "",
    phone_number: "",
    address: "",
    state: "",
    country: "",
    zip_code: "",
    status: "",

    //social media
    facebook_url: "",
    linkedin_url: "",
    youtube_url: "",
    instagram_url: "",
    twitter_url: "",
    tiktok_url: "",

    id: id,

    //new
    city: "",
    currency: "",
    language: "",

    // company details
    company_details: {
      company_name: "",
      company_website: "",
      company_email: "",
      contact_person_name: "",
      contact_person_number: "",
    },
  });

  const adminGetUsersRedux = useSelector(
    (state: ReducersType) => state?.adminGetByIdUser
  ) as ReduxResponseType<adminUGetUserType>;

  useEffect(() => {
    dispatch(adminGetUserByIdAction(id as string) as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (adminGetUsersRedux?.serverResponse.data) {
      setFormData({ ...adminGetUsersRedux?.serverResponse?.data, id: id });
    }
  }, [adminGetUsersRedux?.serverResponse, dispatch, id]);

  // console.log(formData);

  // update data
  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeCompany = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      company_details: {
        ...prevState.company_details,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const adminUpdateUserRedux = useSelector(
    (state: ReducersType) => state?.adminUpdateUser
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      dispatch(adminUpdateUserAction(formData) as any);
    }
  };
  // console.log(adminUpdateUserRedux?.error);
  useEffect(() => {
    adminUpdateUserRedux?.error &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: adminUpdateUserRedux?.error,
      });
    adminUpdateUserRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: adminUpdateUserRedux?.serverResponse?.message,
      });
    if (adminUpdateUserRedux?.success) {
      setTimeout(function () {
        dispatch(adminGetUserByIdAction(id as string) as any);
      }, 1000);
    }
  }, [adminUpdateUserRedux, dispatch, id]);

  return (
    <section>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Edit User</div>
          <div className="flex flex-row gap-2">
            <button className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2">
              <span className="text-[#EDB842]">
                <BiExport />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Export</span>
            </button>
            <button
              type="button"
              onClick={() => navigate(`/admin/user/details/${formData?.id}`)}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              <span className="whitespace-nowrap">Users Details</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 border p-3">
          <div className="px-3">Account Setting</div>
          <div className="flex flex-col md:flex-row gap-3 border-t p-3">
            <div className="w-full md:w-1/5 max-w-[17rem]">
              <img src={defaultUser} alt="" />
            </div>
            <div className="flex flex-row gap-3 w-full md:w-4/5">
              <div className="w-1/2">
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    First Name
                  </label>
                  <input
                    name="first_name"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="First Name"
                    value={formData?.first_name}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Last Name
                  </label>
                  <input
                    name="last_name"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="Last Name"
                    value={formData?.last_name}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Email
                  </label>
                  <input
                    name="email"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="email"
                    placeholder="email"
                    value={formData?.email}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Phone Number
                  </label>
                  <input
                    name="phone_number"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="phone number"
                    value={formData?.phone_number}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Status
                  </label>
                  <select
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    name="status"
                    id=""
                    value={formData?.status || "active"}
                    onChange={onChange}
                  >
                    <option value="active">Active</option>
                    <option value="suspend">Suspend</option>
                    <option value="block">Block</option>
                  </select>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Password
                  </label>
                  <input
                    name="password"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="password"
                    value={""}
                    onChange={onChange}
                  />
                </div>
              </div>
              {/* second division */}
              <div className="w-1/2">
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Address
                  </label>
                  <input
                    name="address"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="address"
                    value={formData?.address}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Username
                  </label>
                  <input
                    name="username"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="username"
                    value={formData?.username}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Country
                  </label>
                  <input
                    name="country"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="country"
                    value={formData?.country}
                    onChange={onChange}
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    State/Province
                  </label>
                  <input
                    name="state"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="state"
                    value={formData?.state}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    city
                  </label>
                  <input
                    name="city"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="city"
                    value={formData?.city}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    currency
                  </label>
                  <input
                    name="currency"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="currency"
                    value={formData?.currency}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    language
                  </label>
                  <input
                    name="language"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="language"
                    value={formData?.language}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Zip Code
                  </label>
                  <input
                    name="zip_code"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="Zip code"
                    value={formData?.zip_code}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 border p-3">
          <div className="px-3">Company Details</div>
          <div className="flex flex-col md:flex-row gap-3 border-t p-3">
            <div className="flex flex-row gap-3 w-full">
              <div className="w-1/2">
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Company details
                  </label>
                  <input
                    name="company_name"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="Company name"
                    onChange={onChangeCompany}
                    value={formData?.company_details?.company_name}
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Company Website
                  </label>
                  <input
                    name="company_website"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="Company Website"
                    onChange={onChangeCompany}
                    value={formData?.company_details?.company_website}
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Company Email
                  </label>
                  <input
                    name="company_email"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="Company Email"
                    onChange={onChangeCompany}
                    value={formData?.company_details?.company_email}
                    autoComplete="off"
                  />
                </div>
              </div>
              {/* second division */}
              <div className="w-1/2">
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Contact Person Name
                  </label>
                  <input
                    name="contact_person_name"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="Contact person name"
                    onChange={onChangeCompany}
                    value={formData?.company_details?.contact_person_name}
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Contact Person Number
                  </label>
                  <input
                    name="contact_person_number"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="Contact Person Email"
                    onChange={onChangeCompany}
                    value={formData?.company_details?.contact_person_number}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 border p-3">
          <div className="px-3">Social Media</div>
          <div className="flex flex-col md:flex-row gap-3 border-t p-3">
            <div className="flex flex-row gap-3 w-full">
              <div className="w-1/2">
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Facebook
                  </label>
                  <input
                    name="facebook_url"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="link/url"
                    value={formData?.facebook_url}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Youtube
                  </label>
                  <input
                    name="youtube_url"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="link/url"
                    value={formData?.youtube_url}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Instagram
                  </label>
                  <input
                    name="instagram_url"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="link/url"
                    value={formData?.instagram_url}
                    onChange={onChange}
                  />
                </div>
              </div>
              {/* second division */}
              <div className="w-1/2">
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Linkedin
                  </label>
                  <input
                    name="linkedin_url"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="link/url"
                    value={formData?.linkedin_url}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Twitter
                  </label>
                  <input
                    name="twitter_url"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="state"
                    value={formData?.twitter_url}
                    onChange={onChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-[400] text-sm" htmlFor="">
                    Tiktok
                  </label>
                  <input
                    name="tiktok_url"
                    className="border p-2 rounded-md bg-[#D9D9D970] outline-none"
                    type="text"
                    placeholder="link/url"
                    value={formData?.tiktok_url}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 flex w-full">
          <button
            type="submit"
            className="text-white bg-[#EDB842] p-3 rounded-md whitespace-nowrap w-full"
          >
            {adminUpdateUserRedux?.loading ? (
              <div className="" style={{ height: "25px" }}>
                <PulseLoader color="#ffffff" />
              </div>
            ) : (
              "Edit"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminEditUsersBody;
