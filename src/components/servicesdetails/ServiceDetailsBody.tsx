import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineArrowRight, AiOutlineRight } from "react-icons/ai";
import { BsFacebook, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Service2 } from "../../images";
import { user2 } from "../../images/users";
import { homeGetServiceDetailsAction } from "../../redux/actions/home.actions";
import { GetUserProfileAction } from "../../redux/actions/userDashboard/profile.actions";
import { createServiceOrderAction } from "../../redux/actions/userDashboard/serviceOrder.actions";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "../../redux/actions/wishlist.actions";
import { CREATE_SERVICE_ORDER_RESET } from "../../redux/constants/userDashboard/serviceOrder.constants";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { ServiceOrderType } from "../../redux/types/serviceOrders.types";
import { AdminGetServiceType } from "../../redux/types/services.types";
import { adminUGetUserType } from "../../redux/types/users.types";
import { WishlistItemType } from "../../redux/types/wishlist.types";
import inWishlist from "../../utils/checkWhishlist";
import {
  copyToClipboard,
  shareOnFacebook,
  shareOnTwitter,
  shareOnWhatsApp,
} from "../../utils/copytoClipboard.utils";
import { Ratings } from "../shareables/Ratings";
import Reviews from "../shareables/reviews";
import { ServiceDetailsChat } from "../shareables/serviceChatBox";

const ServiceDetailsBody = () => {
  // fetch service detail
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const id = String(params.id);
  const name = String(params.name);

  const homeGetServiceDetailsRedux = useSelector(
    (state: ReducersType) => state?.homeGetServiceDetails
  ) as ReduxResponseType<AdminGetServiceType>;

  const service = useMemo(() => {
    return homeGetServiceDetailsRedux?.serverResponse?.data;
  }, [homeGetServiceDetailsRedux]);

  useEffect(() => {
    dispatch(homeGetServiceDetailsAction({ id, name }) as any);
  }, [dispatch, id, name]);

  // image slider
  const [currentImage, setCurrentImage] = useState<string>(
    service.image && service.image.length > 0 ? service.image[0].url : Service2
  );

  useEffect(() => {
    setCurrentImage(
      service.image && service.image.length > 0
        ? service.image[0].url
        : Service2
    );
  }, [service.image]);

  const serviceOrderRedux = useSelector(
    (state: ReducersType) => state?.createServiceOrder
  ) as ReduxResponseType<ServiceOrderType>;

  const [inWishlistBool, setInWishlist] = useState<boolean>(
    inWishlist({ ...service, isProduct: true })
  );

  const getProfileDetailsRedux = useSelector(
    (state: ReducersType) => state?.getProfile
  ) as ReduxResponseType<adminUGetUserType>;

  const userData = useMemo(() => {
    return getProfileDetailsRedux?.serverResponse?.data;
  }, [getProfileDetailsRedux]);

  useEffect(() => {
    dispatch(GetUserProfileAction() as any);
  }, [dispatch]);

  useEffect(() => {
    if (serviceOrderRedux?.success) {
      const order_id = serviceOrderRedux?.serverResponse?.data?.order_id;
      dispatch({
        type: CREATE_SERVICE_ORDER_RESET,
      });
      navigate("/user/order/service/details/" + order_id);
    } else if (serviceOrderRedux?.error) {
      Swal.fire({
        title: "Error!!",
        text: serviceOrderRedux?.error,
        icon: "error",
        timer: 5000,
        confirmButtonText: "Okay",
      }).finally(() =>
        dispatch({
          type: CREATE_SERVICE_ORDER_RESET,
        })
      );
    }
  }, [
    service?.current_price,
    dispatch,
    serviceOrderRedux?.serverResponse?.data,
    serviceOrderRedux?.success,
    navigate,
    serviceOrderRedux?.error,
  ]);

  // add to wishlist
  const addToWishlist = useCallback(
    (item: WishlistItemType) => {
      setTimeout(() => {
        dispatch(addToWishlistAction(item) as any);

        // send toast message
        toast("Added to Wishlist!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1000);
    },
    [dispatch]
  );

  const deleteWishlistItem = useCallback(
    (item: WishlistItemType) => {
      setTimeout(() => {
        dispatch(removeFromWishlistAction(item) as any);

        // send toast message
        toast("Removed from Wishlist!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1000);
    },
    [dispatch]
  );

  return (
    <section className="p-3 flex flex-col gap-4">
      <div className="text-[#5F6C72] flex flex-row justify-start">
        <div className="hidden md:flex flex-row items-center gap-1">
          <FaHome /> <span>Home</span> <AiOutlineRight /> <span>Category</span>{" "}
          <AiOutlineRight /> <span>Service</span> <AiOutlineRight />{" "}
          <span>{service?.sub_category}</span>
          <AiOutlineRight /> <span>{service?.name}</span>{" "}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 justify-start">
        <div className="flex flex-col gap-3 w-full md:w-3/5">
          <div className="font-[700] text-xl">{service?.name}</div>
          <div className="flex gap-3 w-full">
            <img className="w-5 object-contain" src={user2} alt="" />
            <div className="text-[#404145] font-[500]">
              {service.owner?.username}
            </div>
            <div className="flex gap-2">
              <Ratings rating={service?.rating || 0} />{" "}
              <span className="text-[#95979D]">
                ({service?.total_rating || 0})
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-4/5">
            <img
              style={{ height: "70vh" }}
              className="w-full object-cover border border-yellow-950 cursor-pointer"
              src={currentImage}
              alt=""
            />
            <div className="flex gap-1 overflow-y-auto">
              {service.image && service.image?.length > 0
                ? service?.image?.map((image, index) => {
                    return (
                      <img
                        onClick={() => setCurrentImage(image.url)}
                        className="wrounded-sm object-contain h-20 border-2 border-yellow-950 cursor-pointer animate__animated animate__slideInLeft"
                        src={image.url}
                        alt=""
                        key={index}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 flex flex-col gap-3 rounded-sm border justify-between max-w-[25rem]">
          <div className="border-b p-3 font-[600] text-xl text-[#EDB842]">
            Service Package
          </div>
          <div className="flex flex-col gap-5 p-2 h-5/6">
            <div className="flex justify-between text-lg font-[600]">
              <div className="">GiG</div>
              <div className="">${service?.current_price}</div>
            </div>
            <div className=" text-lg font-[600] text-[#EDB842]">
              Brief Description
            </div>
            <div className="text-[#95979D]">{service?.brief_description}</div>
            <div className="flex justify-start gap-4 font-[600]">
              <div className="">{service?.duration} Delivery</div>
            </div>
            <button
              onClick={() => {
                dispatch(
                  createServiceOrderAction(
                    {
                      order_status: "IN PROGRESS",
                      seller: {
                        id: service?.owner?.id || "",
                        username: service?.owner?.username || "",
                        email: service?.owner?.email || "",
                        phone: service?.owner?.phone_number || "",
                      },
                      checkout_items: {
                        _id: service?._id,
                        name: service?.name,
                        category: "service",
                        sub_category: service?.category,
                        brief_description: service?.brief_description,
                        description: service?.description,
                        owner: {
                          id: service?.owner?.id || "",
                          username: service?.owner?.username || "",
                          email: service?.owner?.email || "",
                          phone_number: service?.owner?.phone_number || "",
                        },
                        currency: service?.currency,
                        old_price: service?.old_price,
                        current_price: service?.current_price,
                        percentage_price_off:
                          service?.percentage_price_off || 0,
                        service_status: service?.service_status,
                        image: service?.image,
                        location_description: service?.location_description,
                        phone_number: service?.phone_number,
                        phone_number_backup: service?.phone_number_backup,
                        email: service?.email,
                        website_link: service?.website_link,
                        country: service?.country,
                        state: service?.state,
                        city: service?.city,
                        map_location_link: service?.map_location_link,
                        terms: {
                          amount: service?.current_price,
                          duration: 24,
                          durationUnit: "hours",
                          acceptedByBuyer: false,
                          acceptedBySeller: false,
                          rejectedByBuyer: true,
                          rejectedBySeller: true,
                        },
                      },
                    },
                    userData?.phone_number
                  ) as any
                );
              }}
              className="flex flex-row gap-3 text-white bg-[#EDB842] rounded-md p-2 items-center justify-center"
            >
              {serviceOrderRedux?.loading ? (
                <PulseLoader color="white" />
              ) : (
                <>
                  <span className="">Continue</span>
                  <AiOutlineArrowRight />
                </>
              )}
            </button>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <span
              onClick={() => {
                if (inWishlist({ ...service, isProduct: false })) {
                  deleteWishlistItem({ ...service, isProduct: false });
                } else {
                  addToWishlist({ ...service, isProduct: false });
                }
                setInWishlist(inWishlist({ ...service, isProduct: false }));
              }}
              className="flex flex-wrap gap-2 items-center"
            >
              <span className="text-3xl">
                {inWishlistBool ? <MdFavoriteBorder /> : <MdFavorite />}
              </span>
              Add to Wishlist
            </span>
            <button
              onClick={() =>
                navigate("/user/inbox/" + service?.owner?.id, {
                  state: {
                    service_id: service?._id,
                  },
                })
              }
              className="border broder-[#62646A] rounded-md text-[#62646A] p-2 w-full"
            >
              Contact Seller
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-[50rem] p-4">
        <div className="text-xl font-[600]">About Gig</div>
        <div className="font-[400] text-[#62646A]">{service?.description}</div>
      </div>
      <div className="">
        <span className="flex flex-col items-center gap-2 ms-auto justify-center">
          <span className="text-3xl">share to:</span>
          <div className="flex flex-wrap text-lg gap-2">
            <FiCopy onClick={() => copyToClipboard(window.location.href)} />{" "}
            <BsFacebook
              onClick={() =>
                shareOnFacebook("check out this product", window.location.href)
              }
            />{" "}
            <BsTwitter
              onClick={() =>
                shareOnTwitter("check out this product", window.location.href)
              }
            />{" "}
            <BsWhatsapp
              onClick={() =>
                shareOnWhatsApp("check out this product", window.location.href)
              }
            />
          </div>
        </span>
      </div>
      <AboutSellerServceDetails
        owner={service?.owner}
        location_description={service?.location_description}
        phone_number={service?.phone_number}
        phone_number_backup={service?.phone_number_backup}
        email={service?.email}
        website_link={service?.website_link}
        country={service?.country}
        state={service?.state}
        city={service?.city}
        map_location_link={service?.map_location_link}
      />
      <ServiceDetailsChat
        owner_id={service?.owner?.id || ""}
        service_id={service?._id || ""}
      />
      <Reviews product_id={service?._id} product_type={"service"} />
    </section>
  );
};

export const AboutSellerServceDetails = ({
  owner,
  location_description,
  phone_number,
  phone_number_backup,
  email,
  website_link,
  country,
  state,
  city,
  map_location_link,
}: any) => {
  return (
    <div className="flex flex-col gap-4 max-w-[50rem]">
      <div className="font-[700] text-2xl">About The Seller</div>
      <div className="flex flex-row gap-4 items-center md:w-full">
        <div className="">
          <img src={user2} alt="" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-lg font-[700] text-[#0E0E0F]">
            {owner?.username || "N/A"}, {owner?.email || "N/A"}
          </div>
          <div className="font-[400] text-[#95979D] ">
            {location_description || "Not Available"}
          </div>
        </div>
      </div>
      <div className="border p-5 rounded-md text-[#62646A] font-[400] text-sm md:w-full">
        <div className="flex flex-row gap-3 justify-between py-3">
          <div className="flex flex-col gap-3">
            <div className="">
              <div className="text-[#74767E] font-[400]">From</div>
              <div className="text-[#62646A] font-[600]">
                {country || "N/A"}
              </div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">State</div>
              <div className="text-[#62646A] font-[600]">{state || "N/A"}</div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">City</div>
              <div className="text-[#62646A] font-[600]">{city || "N/A"}</div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">Website link</div>
              <div className="text-[#62646A] font-[600]">
                {website_link || "N/A"}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="">
              <div className="text-[#74767E] font-[400]">Email</div>
              <div className="text-[#62646A] font-[600]">{email || "N/A"}</div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">Phone Number</div>
              <div className="text-[#62646A] font-[600]">
                {phone_number || "N/A"}
              </div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">
                Phone Number Backup
              </div>
              <div className="text-[#62646A] font-[600]">
                {phone_number_backup || "N/A"}
              </div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">Map Location link</div>
              <div className="text-[#62646A] font-[600]">
                {map_location_link || "N/A"}
              </div>
            </div>
          </div>
        </div>
        <hr />
        {/* map location */}
      </div>
    </div>
  );
};

export default ServiceDetailsBody;
