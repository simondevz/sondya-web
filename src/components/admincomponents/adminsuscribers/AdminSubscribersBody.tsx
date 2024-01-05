import { useCallback, useEffect, useState } from "react";
import { getSubscribersAction } from "../../../redux/actions/subscribers.actions";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import {
  SubscriberType,
  getSubscribersType,
} from "../../../redux/types/subscribers.types";
import { format } from "date-fns";
import { ADMIN_GET_SUBSCRIBERS_RESET } from "../../../redux/constants/subscribers.constants";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";

export type QueryType = {
  limit: number;
  page: number;
  search: string;
};

export default function AdminSubscribersBody() {
  const dispatch = useDispatch();
  const [subscribers, setSubscribers] = useState<SubscriberType[]>([]);
  const [total, setTotal] = useState<number>(0);

  const limit = 10;
  const navigate = useNavigate();
  const location = useLocation();

  const emailRedux = useSelector(
    (state: ReducersType) => state.getSubscribers
  ) as ReduxResponseType<getSubscribersType>;

  const [queryString, setQueryString] = useState<string>("");
  const [dotIndex, setDotIndex] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [query, setQuery] = useState<QueryType>({
    page: 1,
    search: "",
    limit: limit,
  });

  // update query and url
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
  );

  useEffect(() => {
    setTimeout(() => {
      updateQueryString(query);
    }, 1500);
  }, [query, updateQueryString]);

  const prevPage = () => {
    setQuery((prev: QueryType) => {
      return {
        ...prev,
        page: prev.page--,
      };
    });
  };

  const nextPage = () => {
    setQuery((prev: QueryType) => {
      alert(prev.page++);
      return {
        ...prev,
        page: prev.page++,
      };
    });
  };

  const goToPage = (page: number) => {
    setQuery((prev: QueryType) => {
      return {
        ...prev,
        page: page,
      };
    });
  };

  useEffect(() => {
    dispatch(getSubscribersAction(queryString) as any);
  }, [dispatch, queryString]);

  useEffect(() => {
    if (emailRedux?.success) {
      setTotalPages(
        Math.ceil(Number(emailRedux?.serverResponse?.data?.count) / limit)
      );
      setTotal(emailRedux?.serverResponse?.data?.count);
      setSubscribers(emailRedux?.serverResponse?.data?.subscribers);
      dispatch({ type: ADMIN_GET_SUBSCRIBERS_RESET });
    }
  }, [dispatch, emailRedux?.success, emailRedux?.serverResponse?.data]);

  return (
    <section>
      <div>
        <div className="flex justify-between">
          <div className="flex my-4 w-56 items-center border rounded-md border-[#EDB842] p-1 h-fit text-[#EDB842]">
            <input
              className="p-1 outline-none"
              type="text"
              placeholder="Search for emails..."
              value={query.search}
              onChange={(event) => {
                setQuery({ ...query, search: event.target.value, page: 1 });
              }}
            />
          </div>
          <span className={"font-semibold text-[#292929] my-auto"}>
            {query.search ? "Results:" : "Total Subscribers:"} {total}
          </span>
        </div>
        <table className="table-auto w-full">
          <thead className="bg-[#EDB84233]">
            <tr>
              <th className="py-4 px-6 w-8 font-[400] text-[#292929]">S/N</th>
              <th className="py-4 px-6 font-[400] text-[#292929]">Email</th>
              <th className="py-4 px-6 font-[400] text-[#292929]">
                Subscription Date
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length > 0 ? (
              subscribers.map((subscriber, index) => {
                const dateString = subscriber.createdAt
                  ? subscriber.createdAt
                  : "";
                const dateObject = new Date(dateString);
                const formattedDate = format(dateObject, "MMMM d, yyyy");
                return (
                  <tr key={index}>
                    <td className="py-4 px-6 w-8 text-[#292929] font-[700] whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                      {subscriber.email}
                    </td>
                    <td className="py-4 px-6 text-[#292929] font-[400] whitespace-nowrap">
                      {formattedDate}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td></td>
                <div className="w-full">No Subscribers yet</div>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex flex-row gap-2 items-center text-[#EDB842] self-center my-5">
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
                    className={`${
                      query.page === i + 1 && "bg-[#EDB84233]"
                    } px-4 py-2 rounded-md`}
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
                  ? setDotIndex((prev: number) => prev + 3)
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
    </section>
  );
}
