import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiExport, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsCalendar2, BsSearch, BsThreeDots, BsXCircle } from "react-icons/bs";
import { MdEdit, MdOutlineAdd, MdOutlineMoreVert } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import Swal from "sweetalert2";
import { defaultUser } from "../../../images";
import {
  adminDeleteUserAction,
  adminGetUsersAction,
} from "../../../redux/actions/admin/users.actions";
import { ReducersType } from "../../../redux/store";
import { Paginator, ReduxResponseType, AdminUsersFilterStatus } from "../../../redux/types/general.types";
import { adminUGetUserType } from "../../../redux/types/users.types";
import { FormatNumber } from "../../shareables/FormatNumber";
// import AdminCreateUserModal from "./AdminCreateUserModal";

type QueryType = {
  page: number;
  search: string;
  status: string;
};

const AdminUsersBody = () => {
  const [whichTab, setwhichTab] = useState<string>("all");
  const [click, setClick] = useState<number | null>();

  const limit: number = 5;
  const [query, setQuery] = useState<QueryType>({
    page: 1,
    search: "",
    status: ""
  });

  const [totalPages, setTotalPages] = useState<number>(0);
  const [queryString, setQueryString] = useState<string>("");
  const [dotIndex, setDotIndex] = useState<number>(0);

  // fetch data for user details
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const updateQueryString = useCallback(
    (newParams: QueryType) => {
      const searchParams = new URLSearchParams(location.search);
      // Update or add new parameters
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.set(key, String(value));
        } else {
          searchParams.delete(key);
        }
      });

      // Build the new search string
      const newSearch = searchParams.toString();

      // set query string
      setQueryString(newSearch);

      // Use navigate to change the URL
      navigate({
        pathname: location.pathname,
        search: newSearch,
      });
    },
    [location.pathname, location.search, navigate]
  )

  // const [users, setUsers] = useState<adminUGetUserType[]>([]);


  // Admin get users
  const adminGetUsersRedux = useSelector(
    (state: ReducersType) => state?.adminGetAllUser
  ) as ReduxResponseType<Paginator<adminUGetUserType[]>>;

  const users = useMemo(() => {
    return adminGetUsersRedux?.serverResponse?.data;
  }, [adminGetUsersRedux])


  useEffect(() => {
    dispatch(adminGetUsersAction(queryString) as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, queryString]);

  // useEffect(() => {
  //   if (adminGetUsersRedux?.serverResponse.data) {
  //     setUsers(adminGetUsersRedux?.serverResponse?.data);
  //   }
  // }, [adminGetUsersRedux?.serverResponse, dispatch]);

  // delete user
  const adminDeleteUserByIDRedux = useSelector(
    (state: ReducersType) => state?.adminDeleteUser
  ) as ReduxResponseType<adminUGetUserType>;

  const handleDelete = useCallback((id: string) => {
    // console.log(id);
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
        dispatch(adminDeleteUserAction({ id }) as any);

        if (!adminDeleteUserByIDRedux.error) {
          Swal.fire(
            "Deleted!",
            adminDeleteUserByIDRedux.serverResponse.message,
            "success"
          );
          setTimeout(() => {
            dispatch(adminGetUsersAction(queryString) as any);
          }, 1000)
        } else {
          Swal.fire("Deleted!", adminDeleteUserByIDRedux?.error, "error");
        }
      }
    });
  },
    [adminDeleteUserByIDRedux, dispatch, queryString]
  );

  const search = (e: | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLButtonElement>) => {
    setQuery({
      ...query,
      page: 1,
      search: e.target.value,
    });
    setDotIndex(0);
  };

  // button func----------
  const updateUsersFilterStatus = (status: AdminUsersFilterStatus) =>  {
    setwhichTab(status)
    setQuery({
      ...query,
      page: 1,
      status: status === AdminUsersFilterStatus.all ? '' : status
    })
  }

  const prevPage = () => {
    setQuery((prev) => {
      return {
        ...prev,
        page: prev.page--,
      };
    });
  };

  const nextPage = () => {
    setQuery((prev) => {
      return {
        ...prev,
        page: prev.page++,
      };
    });
  };

  const goToPage = (page: number) => {
    setQuery((prev) => {
      return {
        ...prev,
        page: page,
      }; // const [CreateAccountModal, setCreateAccountModal] = useState(false);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      updateQueryString(query);
    }, 1000);
  }, [query, updateQueryString]);

  useEffect(() => {
    adminGetUsersRedux?.serverResponse?.data?.count &&
      setTotalPages(
        Math.ceil(adminGetUsersRedux?.serverResponse?.data?.count / limit)
      );
  }, [adminGetUsersRedux?.serverResponse?.data?.count, query, setQuery])

  // console.log(users.count)
  // React state to control Modal visibility
  // const [CreateAccountModal, setCreateAccountModal] = useState(false);

  return (
    <section>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Users</div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => navigate("/admin/user/add")}
              className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2"
            >
              <span className="text-[#EDB842]">
                <BiExport />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Export</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/user/add")}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              <span className="text-2xl">
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Create Users</span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex flex-row border rounded-md p-1 text-[#667085] gap-2 w-fit overflow-x-auto">
            <button
              type="button"
              onClick={() => updateUsersFilterStatus(AdminUsersFilterStatus.all)}
              className={` ${whichTab === "all" && "text-[#EDB842] bg-[#EDB84233]"
                } p-2 rounded-md whitespace-nowrap`}
            >
              All Status
            </button>
            <button
              type="button"
              onClick={() => updateUsersFilterStatus(AdminUsersFilterStatus.active)}
              className={` ${whichTab === "active" && "text-[#EDB842] bg-[#EDB84233]"
                } p-2 rounded-md`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => updateUsersFilterStatus(AdminUsersFilterStatus.blocked)}             
              className={` ${whichTab === "blocked" && "text-[#EDB842] bg-[#EDB84233]"
                } p-2 rounded-md`}
            >
              Blocked
            </button>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-row items-center border h-fit p-2 rounded-md gap-2">
              <BsSearch />
              <input
                name="search"
                value={query?.search}
                onChange={search}
                className="p-1"
                type="text"
                placeholder="Search users. . ."
              />
            </div>
            <div className="flex flex-row items-center border h-fit p-2 rounded-md gap-2">
              <BsCalendar2 />
              <input className="p-1" type="text" placeholder="Search Date" />
            </div>
          </div>
          <div className="font-[600] p-2">Total Users: {users.count}</div>
        </div>
        <div className="mx-auto">
          {!adminGetUsersRedux.success && <DotLoader color="#EDB842" />}
        </div>
        <div className="">{adminGetUsersRedux.error}</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {users.data &&
            users.data.map((t, i) => {
              return (
                <div
                  className="flex flex-col gap-2 text-center shadow-md rounded-md p-3 hover:border border-[#EDB842]"
                  key={i}
                  onDoubleClick={() => navigate(`/admin/user/details/${t._id}`)}
                  onClick={() => click === i && setClick(null)}
                >
                  <div className="flex flex-row gap-2 justify-between">
                    <input type="checkbox" name="" id="" />
                    <img
                      className="object-cover w-2/3"
                      src={t.image[0]?.url ? t.image[0]?.url : defaultUser}
                      alt=""
                    />
                    <div className="relative">
                      <button
                        onClick={() => {
                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                          click !== i ? setClick(i) : setClick(null);
                        }}
                      >
                        <MdOutlineMoreVert />
                      </button>
                      {click === i && (
                        <div className="absolute top-12 right-9 bg-white border z-10 p-3 rounded-md text-[#464D61] flex flex-col gap-2 shadow-md">
                          <div
                            className="flex gap-4 items-center"
                            onClick={() =>
                              navigate(`/admin/user/details/${t._id}`)
                            }
                          >
                            <AiOutlineEye />{" "}
                            <span className="whitespace-nowrap">
                              View user Details
                            </span>
                          </div>
                          <div
                            className="flex gap-4 items-center"
                            onClick={() => navigate(`/admin/user/edit/${t._id}`)}
                          >
                            <MdEdit />{" "}
                            <span className="whitespace-nowrap">Edit</span>
                          </div>
                          <div className="flex gap-4 items-center text-[#27C200]">
                            <TiTick />{" "}
                            <span className="whitespace-nowrap">Active</span>
                          </div>
                          <div className="flex gap-4 items-center text-[#FB5B01]">
                            <BsXCircle />{" "}
                            <span className="whitespace-nowrap">pending</span>
                          </div>
                          <div
                            className="flex gap-4 items-center"
                            onClick={() => handleDelete(t._id)}
                          >
                            <AiOutlineEye />{" "}
                            <span className="whitespace-nowrap">Delete User</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-[#1D1F2C] font-[600]">
                    {t.first_name + " " + t.last_name}
                  </div>
                  <div
                    className={`${t.status === "active"
                      ? "bg-[#E9FAF7] text-[#1A9882]"
                      : "bg-[#FEECEE] text-[#EB3D4D]"
                      } w-fit p-1 mx-auto rounded-md`}
                  >
                    {t.status}
                  </div>
                  <div className="border-b border-dashed"></div>
                  <div className="flex flex-row justify-around">
                    <div className="">
                      <div className="text-[#667085] font-[400]">Orders</div>
                      <div className="text-[#1D1F2C] font-[600]">
                        <FormatNumber price={787} />
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[#667085] font-[400]">Balance</div>
                      <div className="text-[#1D1F2C] font-[600]">
                        <FormatNumber price={9876} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-[#667085]">Showing {(query.page - 1) * limit} -{" "}
            {users.count && users.count > limit
              ? query.page * limit
              : users.count}{" "}
            from page {query.page}</div>
          <div className="flex flex-row gap-2 items-center text-    [#EDB842] my-5">
            <button
              disabled={query.page <= 1}
              type="button"
              onClick={() => prevPage()}
              className="bg-[#EDB84233] p-2 rounded-md"
            >
              <BiSolidLeftArrow />
            </button>
            {Number.isInteger(totalPages) &&
              totalPages >= 0 &&
              Array.from({
                length: totalPages,
              }).map((_, i) => {
                if (i >= dotIndex && i <= dotIndex + 2) {
                  return (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`${query.page === i + 1 && "bg-[#EDB84233]"
                        } p-2 rounded-md`}
                    >
                      {i + 1}
                    </button>
                  );
                }
                return <div className="hidden">...</div>;
              })}
            {Number.isInteger(totalPages) && totalPages > 3 && (
              <button
                onClick={() => {
                  totalPages >= dotIndex
                    ? setDotIndex((prev) => prev + 3)
                    : setDotIndex(0);
                }}
                className="p-2 bg-[#EDB842] rounded-md text-white"
              >
                <BsThreeDots />
              </button>
            )}
            <button
              type="button"
              disabled={query.page >= totalPages}
              onClick={() => nextPage()}
              className="bg-[#EDB84233] p-2 rounded-md"
            >
              <BiSolidRightArrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminUsersBody;
