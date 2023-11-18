import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Service1, Service2, ServiceMain } from "../../../images";
import { user2 } from "../../../images/users";
import {
  sellerDeleteServiceAction,
  sellerGetServiceByIdAction,
} from "../../../redux/actions/seller/seller-services.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminGetServiceType } from "../../../redux/types/services.types";
import { Ratings } from "../../shareables/Ratings";

const SellerServiceDetailsBody = () => {
  // fetch data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [service, setService] = useState<AdminGetServiceType | null>(null);

  const sellerGetServiceByIdRedux = useSelector(
    (state: ReducersType) => state?.sellerGetByIdService
  ) as ReduxResponseType<AdminGetServiceType>;

  useEffect(() => {
    dispatch(sellerGetServiceByIdAction({ id }) as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sellerGetServiceByIdRedux?.serverResponse.data) {
      setService({
        ...sellerGetServiceByIdRedux?.serverResponse?.data,
      });
    }
  }, [sellerGetServiceByIdRedux?.serverResponse, dispatch, id]);

  // delete service
  const sellerDeleteServiceByIDRedux = useSelector(
    (state: ReducersType) => state?.sellerDeleteService
  ) as ReduxResponseType<AdminGetServiceType>;

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(sellerDeleteServiceAction({ id }) as any);

        if (!sellerDeleteServiceByIDRedux.error) {
          Swal.fire(
            "Deleted!",
            sellerDeleteServiceByIDRedux.serverResponse.message,
            "success"
          );
          setTimeout(() => {
            // dispatch(sellerGetServicesAction() as any);
            navigate("/seller/service");
          }, 1000);
        } else {
          Swal.fire("Deleted!", sellerDeleteServiceByIDRedux?.error, "error");
        }
      }
    });
  };
  return (
    <section className="p-3 flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div
          onClick={() => navigate("/seller/services")}
          className="flex items-center gap-3"
        >
          <AiOutlineArrowLeft />
          <div className="text-lg text-[#1D1F2C] font-[600]">Services</div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() =>
              navigate(`/seller/service/edit/${service?._id as string}`)
            }
            className="bg-[#EDB84233] rounded-md p-2 text-[#EDB842]"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(service?._id as string)}
            className="flex items-center gap-2 bg-[#E52626B2] text-white p-2 rounded-md"
          >
            <MdDelete />
            <span>Delete Service</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 justify-start">
        <div className="flex flex-col gap-3 w-full md:w-3/5">
          <div className="font-[700] text-xl">{service?.name}</div>
          <div className="flex gap-3">
            <img className="w-5 object-contain" src={user2} alt="" />
            <div className="text-[#404145] font-[500]">
              {service?.owner?.username
                ? service?.owner?.username
                : service?.owner?.email}
            </div>
            <div className="flex gap-2">
              <Ratings rating={4} />{" "}
              <span className="text-[#95979D]">(904)</span>
            </div>
          </div>
          <div className="">
            <img src={Service2} alt="" />
            <div className="flex gap-1 overflow-y-auto">
              <img
                className="rounded-sm object-contain"
                src={ServiceMain}
                alt=""
              />
              <img
                className="rounded-sm object-contain"
                src={Service1}
                alt=""
              />
              <img
                className="rounded-sm object-contain"
                src={ServiceMain}
                alt=""
              />
              <img
                className="rounded-sm object-contain"
                src={ServiceMain}
                alt=""
              />
              <img
                className="rounded-sm object-contain"
                src={ServiceMain}
                alt=""
              />
              <img
                className="rounded-sm object-contain"
                src={ServiceMain}
                alt=""
              />
              <img
                className="rounded-sm object-contain"
                src={ServiceMain}
                alt=""
              />
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
              <div className="">NGN{service?.current_price}</div>
            </div>
            <div className=" text-lg font-[600] text-[#EDB842]">
              Brief Description
            </div>
            <div className="text-[#95979D]">{service?.brief_description}</div>
            <div className="flex justify-start gap-4 font-[600]">
              <div className="">4 Days Delivery</div>
              <div className="flex flex-row gap-3 items-center">
                <BiRefresh />1 Revision
              </div>
            </div>
            <button className="flex flex-row gap-3 text-white bg-[#EDB842] rounded-md p-2 items-center justify-center">
              <span className="">Continue</span>
              <AiOutlineArrowRight />
            </button>
          </div>
          <div className="p-4">
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
      <AboutSellerServceDetails />
    </section>
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

export default SellerServiceDetailsBody;
