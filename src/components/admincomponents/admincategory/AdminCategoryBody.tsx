import { useEffect, useState } from "react";
import { BiExport, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete, MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import Swal from "sweetalert2";
import {
  adminDeleteCategoryAction,
  adminGetCategoriesAction,
} from "../../../redux/actions/admin/categories.actions";
import { ReducersType } from "../../../redux/store";
import { AdminGetCategoryType } from "../../../redux/types/categories.types";
import { ReduxResponseType } from "../../../redux/types/general.types";

const AdminCategory = () => {
  // fetch categories
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [categories, setCategories] = useState<AdminGetCategoryType[]>([]);
  const adminGetCategoriesRedux = useSelector(
    (state: ReducersType) => state?.adminGetAllCategory
  ) as ReduxResponseType<AdminGetCategoryType[]>;

  useEffect(() => {
    dispatch(adminGetCategoriesAction() as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (adminGetCategoriesRedux?.serverResponse.data) {
      setCategories(adminGetCategoriesRedux?.serverResponse?.data);
    }
  }, [adminGetCategoriesRedux?.serverResponse, dispatch]);

  // delete category
  const adminDeleteCategoryByIDRedux = useSelector(
    (state: ReducersType) => state?.adminDeleteCategory
  ) as ReduxResponseType<AdminGetCategoryType>;

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
        dispatch(adminDeleteCategoryAction({ id }) as any);

        if (!adminDeleteCategoryByIDRedux.error) {
          Swal.fire(
            "Deleted!",
            adminDeleteCategoryByIDRedux.serverResponse.message,
            "success"
          );
          setTimeout(() => {
            dispatch(adminGetCategoriesAction() as any);
          }, 1000);
        } else {
          Swal.fire("Deleted!", adminDeleteCategoryByIDRedux?.error, "error");
        }
      }
    });
  };
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-2xl w-auto text-[#1D1F2C]">
            Category
          </div>
          <div className="flex flex-row gap-2">
            <button className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2">
              <span className="text-[#EDB842]">
                <BiExport />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Export</span>
            </button>
            <button
              onClick={() => navigate("/admin/category/add")}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              <span className="text-2xl">
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Add Category</span>
            </button>
          </div>
        </div>
        <div className="">
          <div className="mx-auto w-fit">
            {!adminGetCategoriesRedux.success && (
              <DotLoader
                cssOverride={{ margin: "30px" }}
                size={100}
                color="#EDB842"
              />
            )}
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr className="border-y">
                <th className="p-2 text-start text-[#1D1F2C]">Category Name</th>
                <th className="p-2 text-start text-[#1D1F2C]">Added</th>
                <th className="p-2 text-start text-[#1D1F2C]">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((t, i) => {
                return (
                  <tr className="border-b" key={i}>
                    <td className="p-3 text-[#1D1F2C]">{t.name}</td>
                    <td className="p-3 text-[#667085]">{t.name}</td>
                    <td className="p-3 text-[#667085]">
                      <div className="flex flex-row gap-2 items-center text-[#A3A9B6]">
                        <button
                          onClick={() =>
                            navigate(`/admin/category/edit/${t._id}`)
                          }
                        >
                          <FiEdit2 />
                        </button>
                        <button onClick={() => handleDelete(t._id)}>
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

export default AdminCategory;
