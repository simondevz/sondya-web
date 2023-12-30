import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AiOutlineArrowRight,
  AiOutlineRight,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { FaFlag, FaHome } from "react-icons/fa";
import { MdEmail, MdFavorite, MdFavoriteBorder, MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Service2 } from "../../images";
import { Facebook, Twitter, Whatsapp } from "../../images/dashboard";
import { user2 } from "../../images/users";
import { homeGetServiceDetailsAction } from "../../redux/actions/home.actions";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { AdminGetServiceType } from "../../redux/types/services.types";
import { Ratings } from "../shareables/Ratings";
import { LoginResponseType } from "../../redux/types/auth.types";
import { chatMessageType } from "../../redux/types/chats.types";
import { API_ROUTES } from "../../redux/routes";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { userGeChatMessagesAction } from "../../redux/actions/userDashboard/chats.actions";
import Swal from "sweetalert2";
import { reviewStatType } from "../../redux/types/review.types";
import Reviews from "../shareables/reviews";
import { useNavigate, useParams } from "react-router-dom";
import ChatMessage from "../sellersdashboardcomponents/sellerinbox/components/chatBoxMessage";
import { AdminGetProductType } from "../../redux/types/products.types";
import { toast } from "react-toastify";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "../../redux/actions/wishlist.actions";
import { WishlistItemType } from "../../redux/types/wishlist.types";
import inWishlist from "../../utils/checkWhishlist";
import { createServiceOrderAction } from "../../redux/actions/userDashboard/serviceOrder.actions";
import { ServiceOrderType } from "../../redux/types/serviceOrders.types";
import { PulseLoader } from "react-spinners";
import { CREATE_SERVICE_ORDER_RESET } from "../../redux/constants/userDashboard/serviceOrder.constants";
import { adminUGetUserType } from "../../redux/types/users.types";
import { GetUserProfileAction } from "../../redux/actions/userDashboard/profile.actions";

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

  const reviewStatRedux = useSelector(
    (state: ReducersType) => state?.reviewStat
  ) as ReduxResponseType<reviewStatType>;

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
      <div className="text-[#5F6C72] flex flex-row justify-between">
        <div className="hidden md:flex flex-row items-center gap-1">
          <FaHome /> <span>Home</span> <AiOutlineRight /> <span>Category</span>{" "}
          <AiOutlineRight /> <span>Product</span> <AiOutlineRight />{" "}
          <span>Electronics Devices</span>
          <AiOutlineRight /> <span>Macbook Pro</span>{" "}
        </div>
        <div className="flex flex-row items-center gap-3 ms-auto">
          <MdMenu />
          <MdFavoriteBorder />
          <span className="border border-[#DADBDD] p-1 rounded-md">2,767</span>
          <span className="border border-[#DADBDD] p-2 rounded-md">
            <FaFlag />
          </span>
          <span className="border border-[#DADBDD] p-2 rounded-md text-[#EDB842]">
            {" "}
            <AiOutlineShareAlt />
          </span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 justify-start">
        <div className="flex flex-col gap-3 w-full md:w-3/5">
          <div className="font-[700] text-xl">{service?.name}</div>
          <div className="flex gap-3">
            <img className="w-5 object-contain" src={user2} alt="" />
            <div className="text-[#404145] font-[500]">
              {service.owner?.username}
            </div>
            <div className="flex gap-2">
              <Ratings
                rating={
                  reviewStatRedux?.serverResponse?.data?.averageRating || 0
                }
              />{" "}
              <span className="text-[#95979D]">
                ({reviewStatRedux?.serverResponse?.data?.totalReviews || 0})
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
            <button className="border broder-[#62646A] rounded-md text-[#62646A] p-2 w-full">
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
        <div className="flex gap-3 items-center">
          share on:{" "}
          <span className="text-[#7A7D85] text-xl">
            <MdEmail />
          </span>{" "}
          <img src={Whatsapp} alt="" />
          <img src={Facebook} alt="" />
          <img src={Twitter} alt="" />
        </div>
      </div>
      <AboutSellerServceDetails />
      <ServiceDetailsChat
        owner_id={service?.owner?.id || ""}
        service_id={service?._id || ""}
      />
      <Reviews product_id={service?._id} product_type={"service"} />
    </section>
  );
};

export const ServiceDetailsChat = ({
  owner_id,
  service_id,
}: {
  owner_id: string;
  service_id: string;
}) => {
  // Websockets related logic
  const [message, setMessage] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);

  const socketUrl = API_ROUTES.websocket.personal;
  const [messageHistory, setMessageHistory] = useState<chatMessageType[]>([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 5,
    reconnectInterval: 3000,
  });

  const dispatch = useDispatch();
  const loginRedux = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType<LoginResponseType>;

  const chatMessagesRedux = useSelector(
    (state: ReducersType) => state?.userGetChatMessages
  ) as ReduxResponseType;

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage?.data);
      console.log("data ==>> ", data);
      setMessageHistory((prev: chatMessageType[]) => {
        setSending(false);
        setMessage("");
        return prev.concat(data);
      });
    }
  }, [lastMessage, setMessageHistory]);

  // Clear last messages when receiver changes
  useEffect(() => {
    setMessageHistory([]);
  }, [owner_id]);

  // Effect to join websocket
  useEffect(() => {
    sendMessage(
      JSON.stringify({
        meta: "join_conversation",
        room_id: "",
        sender_id: loginRedux?.serverResponse?.data?.id || "",
        receiver_id: owner_id,
        message: "",
      })
    );
  }, [loginRedux?.serverResponse?.data?.id, sendMessage, owner_id]);

  // Effect to get the list of users online.
  // Todo: make this function to be getting if the person is online or not
  // useEffect(() => {
  //   setInterval(() => {
  //     sendMessage(
  //       JSON.stringify({
  //         meta: "user_online_check",
  //         room_id: "",
  //         user_id: loginRedux?.serverResponse?.data?.id,
  //         message: "",
  //       })
  //     );
  //   }, 10000); // checks every 10 seconds
  // }, [loginRedux?.serverResponse?.data?.id, sendMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const handleSendMesage = async () => {
    setSending(true);
    if (connectionStatus !== "Open") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: "Please check your Internet Connection and Reload the page...",
      });
      setSending(false);
      return;
    }

    if (!loginRedux?.serverResponse?.data?.id) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: "Please login to send messages...",
      });
      setSending(false);
      return;
    }

    // Can only send images in actual chat
    let images: any[] = [];
    sendMessage(
      JSON.stringify({
        room_id: "",
        sender_id: loginRedux?.serverResponse?.data?.id,
        receiver_id: owner_id,
        message,
        images,
        service_id: service_id,
      })
    );
  };

  useEffect(() => {
    if (owner_id) {
      dispatch(
        userGeChatMessagesAction(
          `receiver_id=${owner_id}&sender_id=${loginRedux?.serverResponse?.data?.id}&service_id=${service_id}`
        ) as any
      );
    }
  }, [dispatch, owner_id, loginRedux?.serverResponse?.data?.id, service_id]);

  return (
    <div className="p-3 max-w-[50rem] max-h-[25rem] flex flex-col gap-4 border-2 rounded-md shadow-md overflow-y-scroll">
      <div className="p-2 shadow-md">Away. Avg. response time:1 Hour</div>
      <div className="p-3 border max-w-[30rem] mx-auto rounded-lg">
        Ask Extreme Design a question or share your project details
        (requirements, timeline, budget, etc.)
      </div>
      <div className="rounded-2xl border p-2">
        👋 Hey Extreme Design, can you help me with...
      </div>
      <div className="rounded-2xl border p-2">
        Would it be possible to get a custom offer for...
      </div>
      <div className="rounded-2xl border p-2">
        Do you think you can deliver an order by...
      </div>
      <div>
        {/* messages from database */}
        {chatMessagesRedux?.success ? (
          chatMessagesRedux?.serverResponse?.data?.length ? (
            chatMessagesRedux?.serverResponse?.data?.map(
              (message: chatMessageType) => {
                return (
                  <ChatMessage
                    key={message?._id}
                    message={message}
                    setAttachment={function (
                      value: SetStateAction<
                        | ((AdminGetServiceType | AdminGetProductType) & {
                            isProduct: boolean;
                          })
                        | undefined
                      >
                    ): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                );
              }
            )
          ) : (
            <></>
          )
        ) : chatMessagesRedux?.loading ? (
          <div>loading...</div>
        ) : (
          <></>
        )}

        {/* messages from the websocket */}
        {messageHistory.map((message: chatMessageType) => {
          return (
            <ChatMessage
              key={message?._id}
              message={message}
              setAttachment={function (
                value: SetStateAction<
                  | ((AdminGetServiceType | AdminGetProductType) & {
                      isProduct: boolean;
                    })
                  | undefined
                >
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          );
        })}

        {/* message ends */}
        {sending ? <>sending...</> : <></>}
      </div>
      <div className="">
        <div className="bg-[#EDB84233] p-2 h-fit rounded-2xl flex gap-2 items-center">
          <span
            onClick={handleSendMesage}
            className="text-white cusor-pointer text-2xl"
          >
            <BsSend />
          </span>
          <textarea
            className="p-2 bg-[#EDB84209] outline-none w-full"
            name=""
            id=""
            cols={30}
            rows={1}
            placeholder="Send message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

const AboutSellerServceDetails = () => {
  return (
    <div className="flex flex-col gap-4 max-w-[50rem]">
      <div className="font-[700] text-2xl">About The Seller</div>
      <div className="flex flex-row gap-4 items-center md:w-full">
        <div className="">
          <img src={user2} alt="" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-lg font-[700] text-[#0E0E0F]">
            Marjorie Asturias
          </div>
          <div className="font-[400] text-[#95979D] ">
            WordPress expert with 10+ years working with business owners,
            influencers and bloggers to expand their online audience.
          </div>
          <div className="flex items-center gap-3 text-[#95979D]">
            <Ratings rating={4} />
            (974)
          </div>
        </div>
      </div>
      <div className="border p-5 rounded-md text-[#62646A] font-[400] text-sm md:w-full">
        <div className="flex flex-row gap-3 justify-between py-3">
          <div className="flex flex-col gap-3">
            <div className="">
              <div className="text-[#74767E] font-[400]">From</div>
              <div className="text-[#62646A] font-[600]">Sri Lanka</div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">
                Avg. response time
              </div>
              <div className="text-[#62646A] font-[600]">1 hour</div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">Languages</div>
              <div className="text-[#62646A] font-[600]">English</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="">
              <div className="text-[#74767E] font-[400]">Member since</div>
              <div className="text-[#62646A] font-[600]">Aug 2019</div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">Aug 2019</div>
              <div className="text-[#62646A] font-[600]">about 3 hours</div>
            </div>
          </div>
        </div>
        <hr />
        <div className="py-3">
          At Airbluesoft Premium Digital Studio we create all kinds of creative
          videos, specializing in Creating Promos( Website, Apps, Fashion, Real
          Estate, Youtube, NFT) and all other promos and all instructional
          videos.
          <br />
          <br />
          We Create Basic To High-End Videos.
          <br />
          <br />
          Creativity Beyond the Limits. -Airbluesoft Premium Digital Studio-
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsBody;
