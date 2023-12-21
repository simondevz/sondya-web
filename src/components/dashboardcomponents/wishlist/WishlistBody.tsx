import { BsDot } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FormatNumber } from "../../shareables/FormatNumber";
import { Ratings } from "../../shareables/Ratings";
import EmptyWishlisBody from "./EmptyWishlisBody";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromWishlistAction,
  viewWishlistAction,
} from "../../../redux/actions/wishlist.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { WishlistItemType } from "../../../redux/types/wishlist.types";
import { productImage1 } from "../../../images/products";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const WishlistBody = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<WishlistItemType[]>([]);

  const wishlistRedux = useSelector(
    (state: ReducersType) => state.viewWishlist
  ) as ReduxResponseType<WishlistItemType[]>;

  useEffect(() => {
    if (wishlistRedux.success) {
      setWishlist(wishlistRedux.serverResponse.data);
    } else {
      setWishlist([]);
    }
  }, [wishlistRedux.serverResponse.data, wishlistRedux.success]);

  useEffect(() => {
    dispatch(viewWishlistAction() as any);
  }, [dispatch]);

  const deleteWishlistItem = useCallback(
    (item: WishlistItemType) => {
      setTimeout(() => {
        dispatch(removeFromWishlistAction(item) as any);

        // send toast message
        toast("Removed from Wishlist!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1000);
    },
    [dispatch]
  );

  return (
    <>
      {wishlist?.length === 0 ? (
        <EmptyWishlisBody />
      ) : (
        <section className="p-3 w-full">
          <div className="flex flex-col gap-3 w-full">
            {wishlist?.map((item) => {
              return (
                <div
                  className={"flex flex-row gap-3 p-3 w-full border rounded-md"}
                >
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col md:flex-row gap-2 w-4/5">
                      <img
                        className="object-cover w-1/3"
                        src={item?.image?.[0]?.url || productImage1}
                        alt=""
                      />
                      <div className="md:w-2/3 gap-2 h-full flex flex-col justify-around items-start">
                        <div className="font-[600] text-[#1C1C1C]">
                          {item.name}
                        </div>
                        <div className="font-[600] text-[#1C1C1C]">
                          $<FormatNumber price={item?.current_price || 0} />
                        </div>
                        <div className="flex flex-row gap-0 text-sm">
                          <Ratings rating={0} starColor={"text-[#FF9017]"} />
                          <span className="font-[400] text-[#FF9017]">{0}</span>
                          <span className="font-[400] text-[#8B96A5]">
                            <BsDot />
                          </span>
                          <span className="font-[400] text-[#8B96A5] whitespace-nowrap">
                            <FormatNumber price={5} /> orders
                          </span>
                          <span className="font-[400] text-[#8B96A5]">
                            <BsDot />
                          </span>
                          <span className="font-[400] text-[#00B517] whitespace-nowrap">
                            Free shipping
                          </span>
                        </div>
                        <div className="text-[#505050] font-[400]">
                          {item?.description}
                        </div>
                        <button
                          onClick={() =>
                            navigate(
                              item.isProduct
                                ? `/product/details/${item?._id}/${item?.name}`
                                : `/service/details/${item?._id}/${item?.name}`
                            )
                          }
                          className="text-[#EDB842] font-[600]"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[#EDB842] text-2xl w-fit p-1 h-fit border-2 border-[#DEE2E7] rounded-full">
                        <MdDelete
                          onClick={() => {
                            deleteWishlistItem(item);
                            setTimeout(() => {
                              setWishlist(wishlistRedux.serverResponse?.data);
                              window.location.reload();
                            }, 1200);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default WishlistBody;
