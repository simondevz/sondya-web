import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { productImageA } from "../../images/products";
import {
  userGetNewServicesAction,
  userGetTopRatedServicesAction,
} from "../../redux/actions/userDashboard/services.actions";
import {
  USER_GET_NEW_SERVICES_RESET,
  USER_GET_TOP_RATED_SERVICES_RESET,
} from "../../redux/constants/userDashboard/services.constants";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import {
  UserGetProductType,
  userGetProductsType,
} from "../../redux/types/products.types";
import {
  UserGetServiceType,
  userGetServicesType,
} from "../../redux/types/services.types";
import { FormatNumber } from "../shareables/FormatNumber";
import {
  userGetNewProductsAction,
  userGetTopRatedProductsAction,
} from "../../redux/actions/userDashboard/products.action";
import {
  USER_GET_NEW_PRODUCTS_RESET,
  USER_GET_TOP_RATED_PRODUCTS_RESET,
} from "../../redux/constants/userDashboard/products.constants";

const LastComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newServices, setNewServices] = useState<UserGetServiceType[]>();
  const [newProducts, setNewProducts] = useState<UserGetProductType[]>();

  const [mostRatedServices, setMostRatedServices] =
    useState<UserGetServiceType[]>();
  const [mostRatedProducts, setMostRatedProducts] =
    useState<UserGetProductType[]>();

  const servicesRedux = useSelector(
    (state: ReducersType) => state.userGetNewServices
  ) as ReduxResponseType<userGetServicesType>;

  const topRatedServicesRedux = useSelector(
    (state: ReducersType) => state.userGetTopRatedServices
  ) as ReduxResponseType<userGetServicesType>;

  const productsRedux = useSelector(
    (state: ReducersType) => state.userGetNewProducts
  ) as ReduxResponseType<userGetProductsType>;

  const topRatedProductsRedux = useSelector(
    (state: ReducersType) => state.userGetTopRatedProducts
  ) as ReduxResponseType<userGetProductsType>;

  useEffect(() => {
    dispatch(userGetNewServicesAction("limit=3") as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(userGetTopRatedServicesAction("limit=3&sortBy=mostRated") as any);
  }, [dispatch]);

  // Get and set new services then get mostRated
  useEffect(() => {
    if (servicesRedux?.success) {
      setNewServices(servicesRedux?.serverResponse?.data?.services);
      dispatch({ type: USER_GET_NEW_SERVICES_RESET });
    }
  }, [
    dispatch,
    servicesRedux?.serverResponse?.data?.services,
    servicesRedux?.success,
  ]);

  // set mostRated services
  useEffect(() => {
    if (topRatedServicesRedux?.success) {
      setMostRatedServices(
        topRatedServicesRedux?.serverResponse?.data?.services
      );
      dispatch({ type: USER_GET_TOP_RATED_SERVICES_RESET });
    }
  }, [
    dispatch,
    topRatedServicesRedux?.serverResponse?.data?.services,
    topRatedServicesRedux?.success,
  ]);

  useEffect(() => {
    dispatch(userGetNewProductsAction("limit=3") as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(userGetTopRatedProductsAction("limit=3&sortBy=mostRated") as any);
  }, [dispatch]);

  // Get and set new products then get mostRated
  useEffect(() => {
    if (productsRedux?.success) {
      setNewProducts(productsRedux?.serverResponse?.data?.products);
      dispatch({ type: USER_GET_NEW_PRODUCTS_RESET });
    }
  }, [
    dispatch,
    productsRedux?.serverResponse?.data?.products,
    productsRedux?.success,
    newProducts?.length,
  ]);

  // set mostRated products
  useEffect(() => {
    if (topRatedProductsRedux?.success) {
      setMostRatedProducts(
        topRatedProductsRedux?.serverResponse?.data?.products
      );
      dispatch({ type: USER_GET_TOP_RATED_PRODUCTS_RESET });
    }
  }, [
    dispatch,
    topRatedProductsRedux?.serverResponse?.data?.products,
    newProducts?.length,
    topRatedProductsRedux?.success,
  ]);

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-4 gap-3">
      <div className="flex flex-col gap-3">
        {newServices?.length ? (
          <>
            <div className="playfair-display font-[600] text-[18px]">
              NEW ARRIVAL SERVICES
            </div>
            <div className="flex flex-col gap-2">
              {newServices?.map((service) => {
                return (
                  <div
                    onDoubleClick={() =>
                      navigate(
                        `/service/details/${service._id}/${slugify(
                          service.name
                        )}`
                      )
                    }
                    key={service?._id}
                    className="flex flex-row border p-3 justify-between gap-2 rounded-md"
                  >
                    <img
                      className="w-1/2 h-[8rem] object-cover rounded-md"
                      src={service?.image?.[0]?.url || productImageA}
                      alt=""
                    />
                    <div className="flex flex-col justify-evenly flex-1">
                      <div className="font-[600] text-[11px] md:text-[13px]">
                        {service?.name}
                      </div>
                      <div className="text-[#EDB842]">
                        $
                        {service?.current_price ? (
                          <FormatNumber price={service?.current_price} />
                        ) : (
                          0.0
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {newProducts?.length && (
          <>
            <div className="playfair-display font-[600] text-[18px]">
              NEW ARRIVAL PRODUCTS
            </div>
            <div className="flex flex-col gap-2">
              {newProducts?.map((t) => {
                return (
                  <div
                    onDoubleClick={() =>
                      navigate(`/product/details/${t._id}/${slugify(t.name)}`)
                    }
                    key={t?._id}
                    className="flex flex-row border p-3 justify-between gap-2 rounded-md"
                  >
                    <img
                      className="w-1/2 h-[8rem] object-cover rounded-md"
                      src={t?.image?.[0]?.url || productImageA}
                      alt=""
                    />
                    <div className="flex flex-col  justify-evenly flex-1">
                      <div className="font-[600] text-[11px] md:text-[13px]">
                        {t.name}
                      </div>
                      <div className="text-[#EDB842]">
                        $
                        {t?.current_price ? (
                          <FormatNumber price={t?.current_price} />
                        ) : (
                          0.0
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {mostRatedServices?.length ? (
          <>
            <div className="playfair-display font-[600] text-[18px]">
              MOST RATED SERVICES
            </div>
            <div className="flex flex-col gap-2">
              {mostRatedServices?.map((service) => {
                return (
                  <div
                    onDoubleClick={() =>
                      navigate(
                        `/service/details/${service._id}/${slugify(
                          service.name
                        )}`
                      )
                    }
                    key={service?._id}
                    className="flex flex-row border p-3 justify-between gap-2 rounded-md"
                  >
                    <img
                      className="w-1/2 h-[8rem] object-cover rounded-md"
                      src={service?.image?.[0]?.url || productImageA}
                      alt=""
                    />
                    <div className="flex flex-col  justify-evenly flex-1">
                      <div className="font-[600] text-[11px] md:text-[13px]">
                        {service?.name}
                      </div>
                      <div className="text-[#EDB842]">
                        $
                        {service?.current_price ? (
                          <FormatNumber price={service?.current_price} />
                        ) : (
                          0.0
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {mostRatedProducts?.length && (
          <>
            <div className="playfair-display font-[600] text-[18px]">
              MOST RATED PRODUCTS
            </div>
            <div className="flex flex-col gap-2">
              {mostRatedProducts?.map((t) => {
                return (
                  <div
                    onDoubleClick={() =>
                      navigate(`/product/details/${t._id}/${slugify(t.name)}`)
                    }
                    key={t?._id}
                    className="flex flex-row border p-3 justify-between gap-2 rounded-md"
                  >
                    <img
                      className="w-1/2 h-[8rem] object-cover rounded-md"
                      src={t?.image?.[0]?.url || productImageA}
                      alt=""
                    />
                    <div className="flex flex-col  justify-evenly flex-1">
                      <div className="font-[600] text-[11px] md:text-[13px]">
                        {t.name}
                      </div>
                      <div className="text-[#EDB842]">
                        $
                        {t?.current_price ? (
                          <FormatNumber price={t?.current_price} />
                        ) : (
                          0.0
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LastComponent;
