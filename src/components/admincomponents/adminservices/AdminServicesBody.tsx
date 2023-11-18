import { useEffect, useState } from "react";
import { BiExport, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsEye, BsSearch } from "react-icons/bs";
import { MdDelete, MdEdit, MdMoreVert, MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { carRepair } from "../../../images/services";
import {
  adminDeleteServiceAction,
  adminGetServicesAction,
} from "../../../redux/actions/admin/services.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminGetServiceType } from "../../../redux/types/services.types";
import { FormatNumber } from "../../shareables/FormatNumber";

const AdminServicesBody = () => {
  const [Open, setOpen] = useState<number | undefined>();

  // fetch data for service details
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [services, setServices] = useState<AdminGetServiceType[]>([]);

  const adminGetServicesRedux = useSelector(
    (state: ReducersType) => state?.adminGetAllService
  ) as ReduxResponseType<AdminGetServiceType[]>;

  useEffect(() => {
    dispatch(adminGetServicesAction() as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (adminGetServicesRedux?.serverResponse.data) {
      setServices(adminGetServicesRedux?.serverResponse?.data);
    }
  }, [adminGetServicesRedux?.serverResponse, dispatch]);

  // delete service
  const adminDeleteServiceByIDRedux = useSelector(
    (state: ReducersType) => state?.adminDeleteService
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
        dispatch(adminDeleteServiceAction({ id }) as any);

        if (!adminDeleteServiceByIDRedux.error) {
          Swal.fire(
            "Deleted!",
            adminDeleteServiceByIDRedux.serverResponse.message,
            "success"
          );
          setTimeout(() => {
            dispatch(adminGetServicesAction() as any);
          }, 1000);
        } else {
          Swal.fire("Deleted!", adminDeleteServiceByIDRedux?.error, "error");
        }
      }
    });
  };

  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-2xl w-auto text-[#1D1F2C]">
            Services
          </div>
          <div className="flex flex-row gap-2">
            <button className="flex flex-row items-center p-2 rounded-md bg-[#EDB84233] gap-2">
              <span className="text-[#EDB842]">
                <BiExport />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Export</span>
            </button>
            <button
              onClick={() => navigate("/admin/service/add")}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              <span className="text-2xl">
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Add Services</span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex border p-2 items-center rounded-md">
            <span className="text-[#EDB842]">
              <BsSearch />
            </span>
            <input className="outline-none p-1" type="text" />
          </div>
          <div className="flex gap-2">
            <select className="border p-3 rounded-md" name="" id="">
              <option className="" value="">
                Category
              </option>
            </select>
            <select className="border p-3 rounded-md" name="" id="">
              <option className="" value="">
                Recently posted
              </option>
            </select>
            <select className="border p-3 rounded-md" name="" id="">
              <option className="" value="">
                All
              </option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((t, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-3 border border-[#EFEFF0] rounded-md"
              >
                <img className="rounded-t-md" src={carRepair} alt="" />
                <div className="flex gap-3 px-3">
                  <div className="p-3 rounded-full bg-[#EDB842] w-fit h-fit"></div>
                  <div className="">{t.user}</div>
                </div>
                <div className="h-12 overflow-y-hidden px-3">{t.name}</div>
                <div className="px-3">
                  ${t.current_price && <FormatNumber price={t.current_price} />}
                </div>
                <div className="relative border-t border-[#EFEFF0] flex justify-between p-2 items-center">
                  <button
                    onClick={() => navigate(`/admin/service/edit/${t._id}`)}
                    className="flex p-2 bg-[#EDB842] text-white items-center rounded-md"
                  >
                    <MdEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      Open === undefined ? setOpen(i) : setOpen(undefined);
                    }}
                  >
                    <MdMoreVert />
                  </button>
                  {Open === i && (
                    <div className="absolute bg-white z-20 p-3 top-10 rounded-md">
                      <button
                        onClick={() =>
                          navigate(`/admin/service/details/${t._id}`)
                        }
                        className="flex gap-5 text-[#464D61] items-center"
                      >
                        <BsEye />
                        <div className="whitespace-nowrap">
                          View Service Details
                        </div>
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="flex gap-5 text-[#464D61] items-center"
                      >
                        <MdDelete />
                        <div className="whitespace-nowrap">Delete Service</div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-[#667085]">Showing 1-10 from 100</div>
          <div className="flex flex-row gap-2 items-center text-[#EDB842] my-5">
            <span className="bg-[#EDB84233] p-2 rounded-md">
              <BiSolidLeftArrow />
            </span>
            <span className="bg-[#EDB84233] px-3 py-2 rounded-md">1</span>
            <span className="bg-[#EDB84233] px-3 py-2 rounded-md">2</span>
            <span className="bg-[#EDB84233] px-3 py-2 rounded-md">3</span>
            <span className="bg-[#EDB84233] px-3 py-2 rounded-md">4</span>
            <span className="bg-[#EDB84233] px-3 py-2 rounded-md">5</span>
            <span className="bg-[#EDB84233] px-3 py-2 rounded-md">...</span>
            <span className="bg-[#EDB84233] p-2 rounded-md">
              <BiSolidRightArrow />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminServicesBody;
