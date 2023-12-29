import { useEffect, useState } from "react";
import { FormatNumber } from "../shareables/FormatNumber";
import { useDispatch, useSelector } from "react-redux";
import { userGetServicesAction } from "../../redux/actions/userDashboard/services.actions";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import {
  UserGetServiceType,
  userGetServicesType,
} from "../../redux/types/services.types";
import { productImageA } from "../../images/products";
import { userGetProductsAction } from "../../redux/actions/userDashboard/products.action";
import {
  UserGetProductType,
  userGetProductsType,
} from "../../redux/types/products.types";
import { USER_GET_PRODUCTS_RESET } from "../../redux/constants/userDashboard/products.constants";
import { USER_GET_SERVICES_RESET } from "../../redux/constants/userDashboard/services.constants";

const LastComponent = () => {
  const dispatch = useDispatch();
  const [newServices, setNewServices] = useState<UserGetServiceType[]>();
  const [newProducts, setNewProducts] = useState<UserGetProductType[]>();

  const [mostRatedServices, setMostRatedServices] =
    useState<UserGetServiceType[]>();
  const [mostRatedProducts, setMostRatedProducts] =
    useState<UserGetProductType[]>();

  const servicesRedux = useSelector(
    (state: ReducersType) => state.userGetServices
  ) as ReduxResponseType<userGetServicesType>;

  const productsRedux = useSelector(
    (state: ReducersType) => state.userGetProducts
  ) as ReduxResponseType<userGetProductsType>;

  useEffect(() => {
    dispatch(userGetServicesAction("limit=3") as any);
  }, [dispatch]);

  // Get and set new services then get mostRated
  useEffect(() => {
    if (servicesRedux?.success && !newServices?.length) {
      setNewServices(servicesRedux?.serverResponse?.data?.services);
      dispatch({ type: USER_GET_SERVICES_RESET });
      dispatch(userGetServicesAction("limit=3&sortBy=mostRated") as any);
    }
  }, [
    dispatch,
    servicesRedux?.serverResponse?.data?.services,
    servicesRedux?.success,
    newServices?.length,
  ]);

  // set mostRated services
  useEffect(() => {
    if (servicesRedux?.success && newServices?.length) {
      setMostRatedServices(servicesRedux?.serverResponse?.data?.services);
      dispatch({ type: USER_GET_SERVICES_RESET });
    }
  }, [
    dispatch,
    servicesRedux?.serverResponse?.data?.services,
    newServices?.length,
    servicesRedux?.success,
  ]);

  useEffect(() => {
    dispatch(userGetProductsAction("limit=3") as any);
  }, [dispatch]);

  // Get and set new products then get mostRated
  useEffect(() => {
    if (productsRedux?.success && !newProducts?.length) {
      setNewProducts(productsRedux?.serverResponse?.data?.products);
      dispatch({ type: USER_GET_PRODUCTS_RESET });
      dispatch(userGetProductsAction("limit=3&sortBy=mostRated") as any);
    }
  }, [
    dispatch,
    productsRedux?.serverResponse?.data?.products,
    productsRedux?.success,
    newProducts?.length,
  ]);

  // set mostRated products
  useEffect(() => {
    if (productsRedux?.success && newProducts?.length) {
      setMostRatedProducts(productsRedux?.serverResponse?.data?.products);
      dispatch({ type: USER_GET_PRODUCTS_RESET });
    }
  }, [
    dispatch,
    productsRedux?.serverResponse?.data?.products,
    newProducts?.length,
    productsRedux?.success,
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
                    key={service?._id}
                    className="flex flex-row border p-3 justify-between gap-2"
                  >
                    <img
                      className="w-1/2 h-[5rem] object-cover"
                      src={service?.image?.[0]?.url || productImageA}
                      alt=""
                    />
                    <div className="flex flex-col justify-around">
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
                    key={t?._id}
                    className="flex flex-row border p-3 justify-between gap-2"
                  >
                    <img
                      className="w-1/2 h-[5rem] object-cover"
                      src={t?.image?.[0]?.url || productImageA}
                      alt=""
                    />
                    <div className="flex flex-col justify-around">
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
                    key={service?._id}
                    className="flex flex-row border p-3 justify-between gap-2"
                  >
                    <img
                      className="w-1/2 h-[5rem] object-cover"
                      src={service?.image?.[0]?.url || productImageA}
                      alt=""
                    />
                    <div className="flex flex-col justify-around">
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
                    key={t?._id}
                    className="flex flex-row border p-3 justify-between gap-2"
                  >
                    <img
                      className="w-1/2 h-[5rem] object-cover"
                      src={t?.image?.[0]?.url || productImageA}
                      alt=""
                    />
                    <div className="flex flex-col justify-around">
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
