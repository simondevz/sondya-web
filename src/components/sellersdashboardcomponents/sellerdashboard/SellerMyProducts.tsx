import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productImage1 } from "../../../images/products";
import { sellerGetProductsAction } from "../../../redux/actions/seller/seller-products.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { sellerGetProductsType } from "../../../redux/types/products.types";
import { FormatNumber } from "../../shareables/FormatNumber";
import { Ratings } from "../../shareables/Ratings";

const SellerMyProducts = () => {
  // fetch products
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get products
  const sellerGetProductsRedux = useSelector(
    (state: ReducersType) => state?.sellerGetAllProducts
  ) as ReduxResponseType<sellerGetProductsType>;

  const products = useMemo(() => {
    return sellerGetProductsRedux?.serverResponse?.data?.products;
  }, [sellerGetProductsRedux]);

  useEffect(() => {
    dispatch(sellerGetProductsAction("") as any);
  }, [dispatch]);

  return (
    <section className="flex flex-col gap-3">
      <div className=" font-[700] playfair-display text-lg">
        Product Category
      </div>
      <div className="bg-[#EDB84233] p-2 md:p-5 flex flex-col gap-3">
        <div className="flex flex-wrap gap-4">
          {products?.slice(0, 6).map((t, i) => {
            return (
              <div
                onClick={() => navigate(`/seller/products/details/${t._id}`)}
                key={i}
                className="flex gap-3 flex-col w-2/5 max-w-[18rem] flex-grow"
              >
                <div className="bg-white rounded-md">
                  <img
                    className="h-[16rem] w-full rounded-md object-cover"
                    src={
                      t.image && t.image.length >= 1
                        ? t.image[0].url
                        : productImage1
                    }
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="">
                  <div className="flex flex-row gap-2 text-sm">
                    <Ratings rating={t.rating} />
                    <span>({t.total_rating})</span>
                  </div>
                  <div className="">{t.name}</div>
                  <div className="text-[#EDB842]">
                    $
                    {t.current_price && (
                      <FormatNumber price={t.current_price} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => navigate("/seller/products")}
          className="bg-[#EDB842] py-2 px-4 rounded-md text-white self-center"
        >
          View More
        </button>
      </div>
    </section>
  );
};

export default SellerMyProducts;
