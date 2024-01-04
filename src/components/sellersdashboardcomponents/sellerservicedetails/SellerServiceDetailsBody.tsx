import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Service2 } from "../../../images";
import { user2 } from "../../../images/users";
import {
  sellerDeleteServiceAction,
  sellerGetServiceByIdAction,
} from "../../../redux/actions/seller/seller-services.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminGetServiceType } from "../../../redux/types/services.types";
import { AboutSellerServceDetails } from "../../servicesdetails/ServiceDetailsBody";
import { Ratings } from "../../shareables/Ratings";
import Reviews from "../../shareables/reviews";

const SellerServiceDetailsBody = () => {
  // fetch data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [service, setService] = useState<AdminGetServiceType | null>(null);
  // image slider
  const [currentImage, setCurrentImage] = useState<string>(
    service?.image && service?.image.length > 0
      ? service?.image[0].url
      : Service2
  );

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
      setCurrentImage(
        sellerGetServiceByIdRedux?.serverResponse?.data?.image &&
          sellerGetServiceByIdRedux?.serverResponse?.data?.image.length > 0
          ? sellerGetServiceByIdRedux?.serverResponse?.data?.image[0].url
          : Service2
      );
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
              <Ratings rating={service?.rating} />{" "}
              <span className="text-[#95979D]">({service?.total_rating})</span>
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
              {service?.image && service?.image?.length > 0
                ? service?.image?.map((image, index) => {
                    return (
                      <img
                        onClick={() => setCurrentImage(image.url)}
                        className="wrounded-sm object-contain h-20 border-2 border-yellow-950 cursor-pointer animate__animated animate__slideInLeft"
                        src={image?.url}
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
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-[50rem] p-4">
        <div className="text-xl font-[600]">About Gig</div>
        <div className="font-[400] text-[#62646A]">{service?.description}</div>
      </div>
      <Reviews
        product_id={service?._id || ""}
        product_type={"service"}
        owner_id={service?.owner?.id}
      />
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
    </section>
  );
};

export default SellerServiceDetailsBody;
