import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import slugify from "slugify";
import { serviceImage1 } from "../../images/serviceimages";
import { adminGetServiceCategoriesAction } from "../../redux/actions/admin/categories.actions";
import { homeGetServicesAction } from "../../redux/actions/home.actions";
import { ReducersType } from "../../redux/store";
import { AdminGetCategoryType } from "../../redux/types/categories.types";
import { Paginator, ReduxResponseType } from "../../redux/types/general.types";
import { AdminGetServiceType } from "../../redux/types/services.types";
import { DropdownServices } from "../shareables/Dropdown";
import { FormatNumber } from "../shareables/FormatNumber";
import { Like } from "../shareables/like";

type QueryType = {
  // page: number;
  search: string;
};

const Services = () => {
  // const [like, setLike] = useState<boolean>(false);

  // fetch products
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [query, setQuery] = useState<QueryType>({
    // page: 1,
    search: "",
  });

  const [queryString, setQueryString] = useState<string>("");

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

      navigate({
        pathname: location.pathname,
        search: newSearch,
      });
    },
    [location.pathname, location.search, navigate]
  );

  const search = (e: string) => {
    setQuery({
      // page: 1,
      search: e,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      updateQueryString(query);
    }, 1000);
  }, [query, updateQueryString]);

  //admin get categories
  const homeGetCategoriesRedux = useSelector(
    (state: ReducersType) => state?.adminGetServiceCategories
  ) as ReduxResponseType<AdminGetCategoryType[]>;

  const categories = useMemo(() => {
    return homeGetCategoriesRedux?.serverResponse?.data;
  }, [homeGetCategoriesRedux]);

  useEffect(() => {
    dispatch(adminGetServiceCategoriesAction() as any);
  }, [dispatch, queryString]);

  //admin get products
  const homeGetServicesRedux = useSelector(
    (state: ReducersType) => state?.homeGetServices
  ) as ReduxResponseType<Paginator<AdminGetServiceType[]>>;

  const services = useMemo(() => {
    return homeGetServicesRedux?.serverResponse?.data;
  }, [homeGetServicesRedux]);

  useEffect(() => {
    // console.log(queryString);
    dispatch(homeGetServicesAction(queryString) as any);
  }, [dispatch, queryString]);
  console.log(services.data && services.data);
  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="flex flex-row gap-2 md:gap-4 w-full p-2 items-baseline text-[lg]">
        <div className="flex flex-row  w-10/12">
          <DropdownServices options={categories} click={search} />
          <div className="hidden md:flex  flex-row gap-2 overflow-x-scroll font-[600] border-b-[2px] border-[#000]">
            {categories.map((t, i) => {
              return (
                <div
                  key={i}
                  className="whitespace-nowrap"
                  onClick={() => search(t.name)}
                >
                  {t.name}..
                </div>
              );
            })}
          </div>
        </div>
        <div
          onClick={() => navigate("/services")}
          className="flex flex-row gap-1 md:gap-2 font-[600] whitespace-nowrap"
        >
          View more{" "}
          <span className="text-2xl">
            <AiOutlineArrowRight />
          </span>
        </div>
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {services.data &&
          services.data.map((t, i) => {
            return (
              <div key={i} className="flex flex-col gap-1 border p-2 relative">
                <div className="relative">
                  <img
                    className="h-56 object-cover w-full"
                    src={
                      t.image && t.image.length > 0
                        ? t.image[0].url
                        : serviceImage1
                    }
                    alt=""
                  />
                  <div className="absolute gap-1  inset-0 bg-black bg-opacity-50 flex flex-row justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <Like />
                    <div className="text-xl text-[#000000] bg-white p-1 rounded-full">
                      <AiOutlineShoppingCart />
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/service/details/${t._id}/${slugify(t.name)}`)
                      }
                      className="text-xl bg-white text-[#000000] p-1 rounded-full"
                    >
                      <AiOutlineEye />
                    </div>
                  </div>
                </div>
                <div className="">{t.name && t.name}</div>
                <div className="flex gap-1">
                  <span className="text-[#929FA5] line-through">
                    {t.current_price && (
                      <span>
                        ${t.old_price && <FormatNumber price={t.old_price} />}
                      </span>
                    )}
                  </span>
                  <span className="text-[#EDB842]">
                    $
                    {t.current_price && (
                      <FormatNumber price={t.current_price} />
                    )}
                  </span>
                </div>
                {t.service_status === "hot" && (
                  <div className="absolute bg-[#EE5858] text-white p-1">
                    HOT
                  </div>
                )}
                {t.service_status === "sold" && (
                  <div className="absolute bg-[#000] text-white p-1">
                    SOLD OUT
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <div className="flex self-center w-1/2 md:w1/3 max-w-[100px]">
        <button className="flex flex-row gap-2 items-center whitespace-nowrap bg-[#EDB842C9] text-white p-3 rounded-md">
          {" "}
          <span>Explore all items</span>{" "}
          <span>
            <AiOutlineArrowRight />
          </span>
        </button>{" "}
      </div>
    </div>
  );
};

export default Services;
