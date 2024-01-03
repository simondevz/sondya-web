import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import {
  BsSearch,
  BsArrowRight,
  BsHandThumbsUp,
  BsHandThumbsDown,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import {
  createReviewAction,
  reviewStatAction,
  listReviewsAction,
} from "../../redux/actions/userDashboard/reviews.actions";
import {
  USER_CREATE_REVIEW_RESET,
  USER_LIST_REVIEW_RESET,
  USER_REVIEW_STAT_RESET,
} from "../../redux/constants/userDashboard/review.constants";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import {
  userReviewType,
  reviewStatType,
  respondReviewType,
} from "../../redux/types/review.types";
import { Ratings } from "./Ratings";
import FormatDate from "./dateFormatter";
import { LoginResponseType } from "../../redux/types/auth.types";
import { sellerRespondReviewAction } from "../../redux/actions/seller/seller-reviewResponse.actions";
import { SELLER_RESPOND_REVIEW_RESET } from "../../redux/constants/seller/seller-reviewResponse.constants";

const Reviews = ({
  product_id,
  product_type,
  owner_id,
}: {
  product_id: string;
  product_type: "product" | "service";
  owner_id?: string;
}) => {
  const limit: number = 10;
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [moreReviews, setMoreReviews] = useState<boolean>(true);

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [reviews, setReviews] = useState<userReviewType[]>([]);
  const [reviewStat, setReviewStat] = useState<reviewStatType>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname: string = location.pathname;

  const createReviewRedux = useSelector(
    (state: ReducersType) => state.userCreateReview
  ) as ReduxResponseType<userReviewType>;

  const reviewStatRedux = useSelector(
    (state: ReducersType) => state.reviewStat
  ) as ReduxResponseType<reviewStatType>;

  const reviewsListRedux = useSelector(
    (state: ReducersType) => state.reviewsList
  ) as ReduxResponseType<userReviewType[]>;

  const handleMakeReview = async () => {
    let service_id;
    if (product_type === "service") {
      service_id = product_id;
      dispatch(createReviewAction({ rating, review, service_id }) as any);
      return;
    }
    dispatch(createReviewAction({ rating, review, product_id }) as any);
  };

  useEffect(() => {
    if (createReviewRedux.error)
      Swal.fire({
        title: "Error!",
        text: createReviewRedux?.error,
        icon: "error",
        timer: 7000,
        showDenyButton: true,
        confirmButtonText: "Okay",
      })
        .then((result) => {
          if (result.isConfirmed) {
            if (createReviewRedux?.error === "Please login to leave a review")
              navigate("/login", { state: { redirect: location.pathname } });
          }
        })
        .finally(() => dispatch({ type: USER_CREATE_REVIEW_RESET }));

    if (createReviewRedux.success)
      Swal.fire({
        title: "Successful",
        icon: "success",
        text: createReviewRedux?.serverResponse?.message,
        timer: 3000,
        confirmButtonText: "Okay",
      })
        .then(() => {
          setReviews((prev) => {
            return [createReviewRedux?.serverResponse?.data, ...prev];
          });
          setRating(0);
          setReview("");
        })
        .finally(() => dispatch({ type: USER_CREATE_REVIEW_RESET }));
  }, [
    createReviewRedux?.error,
    createReviewRedux?.loading,
    navigate,
    dispatch,
    location.pathname,
    createReviewRedux?.success,
    createReviewRedux?.serverResponse?.data,
    createReviewRedux?.serverResponse?.message,
  ]);

  useEffect(() => {
    setReviews([]);
  }, [pathname]);

  useEffect(() => {
    if (product_id) dispatch(reviewStatAction(product_type, product_id) as any);
  }, [dispatch, product_id, product_type]);

  useEffect(() => {
    if (product_id)
      dispatch(
        listReviewsAction(product_type, product_id, {
          limit,
          page,
          search,
        }) as any
      );
  }, [dispatch, product_id, limit, page, search, pathname, product_type]);

  useEffect(() => {
    if (reviewsListRedux?.success) {
      if (reviewsListRedux?.serverResponse?.data?.length) {
        if (page > 1) {
          setReviews((prev) => {
            return prev.concat(reviewsListRedux?.serverResponse?.data);
          });
        } else {
          setReviews(reviewsListRedux?.serverResponse?.data);
        }
      } else {
        setMoreReviews(false);
      }
      dispatch({ type: USER_LIST_REVIEW_RESET });
    }
  }, [
    reviewsListRedux?.serverResponse?.data,
    reviewsListRedux?.success,
    dispatch,
    page,
  ]);

  useEffect(() => {
    if (reviewStatRedux?.success) {
      setReviewStat(reviewStatRedux?.serverResponse?.data);
      dispatch({ type: USER_REVIEW_STAT_RESET });
    }
  }, [
    reviewStatRedux?.serverResponse?.data,
    reviewStatRedux?.success,
    dispatch,
  ]);

  return (
    <div className="flex flex-col gap-4 p-5 w-full md:w-3/5">
      <div className="">Reviews</div>
      <div className="flex flex-row gap-5">
        <span>{reviewStat?.totalReviews || 0} reviews for this Product</span>
        <Ratings rating={Math.round(reviewStat?.averageRating || 0)} />
      </div>
      <div className="flex flex-row items-center">
        <input
          className="border-[1px]  p-[0.46rem] border-[#C5C6C9] outline-none rounded-l-md"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button className="bg-[#222325] px-3 py-3 text-white -m-2 rounded-r-md">
          <BsSearch />
        </button>
      </div>
      <div className="flex flex-col gap-4 border shadow-md p-5 rounded-md">
        <div className="border-b-4 text-[#EDB842] border-b-[#EDB842] w-20 whitespace-nowrap text-lg">
          Write Review
        </div>
        <div className="flex flex-row gap-2 text-2xl text-[#DADDE5]">
          {Array(5)
            .fill(1)
            .map((_, index: number) => (
              <AiFillStar
                key={index}
                onClick={() => setRating(index + 1)}
                className={
                  rating >= index + 1
                    ? "text-[#EDB842] pointer-cusor "
                    : "pointer-cusor "
                }
              />
            ))}
        </div>
        <textarea
          className="border-2 p-3 rounded-md"
          name="comment"
          id=""
          cols={20}
          rows={5}
          placeholder="Share you thought about this seller..."
          value={review}
          onChange={(event) => setReview(event?.target?.value)}
        ></textarea>
        <button
          disabled={createReviewRedux?.loading}
          onClick={handleMakeReview}
          className="flex flex-row gap-2 justify-between px-4 py-2 items-center text-white bg-[#EDB842] rounded-md max-w-[190px]"
        >
          {createReviewRedux?.loading ? (
            <PulseLoader color="white" className="mx-auto h-6" />
          ) : (
            <>
              <span>publish Review</span>
              <span>
                <BsArrowRight />
              </span>
            </>
          )}
        </button>
      </div>
      <hr />
      {reviews?.length ? (
        reviews.map((reviewPost: userReviewType) => {
          return (
            <ReviewPost
              key={Math.random() + reviewPost?._id}
              review={reviewPost}
              owner_id={owner_id || ""}
            />
          );
        })
      ) : (
        <div>No Reviews yet</div>
      )}
      {!moreReviews && reviews?.length !== 0 && (
        <div>No More Reviews Found</div>
      )}
      <div
        onClick={() => {
          setSearch("");
          setPage(page + 1);
        }}
        className="text-[#EDB842] text-lg font-[700] cusor-pointer"
      >
        + See More
      </div>
    </div>
  );
};

const ReviewPost = ({
  review,
  owner_id,
}: {
  review: userReviewType;
  owner_id: string;
}) => {
  const [showResponseInput, setShowResponseInput] = useState(false);
  const loginRedux = useSelector(
    (state: ReducersType) => state.login
  ) as ReduxResponseType<LoginResponseType>;

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="">
          {review?.user_id?.image?.[0]?.url ? (
            <img src={review?.user_id?.image?.[0]?.url} alt="user profile" />
          ) : (
            <span className="bg-[#E4E5E7] p-2 rounded-full text-white">
              {review?.user_id?.username?.split("")[0].toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 text-[#62646A]">
          <div className="text-[#404145]">{review?.user_id?.username}</div>
          <div className="">United states</div>
          <div className="flex flex-row gap-4 items-center">
            <Ratings rating={review?.rating} />
            <FormatDate dateString={review?.createdAt} />
          </div>
          <div className="">{review?.review}</div>
          <div className="flex gap-3 items-center">
            {loginRedux?.serverResponse?.data?.id === owner_id ? (
              <span
                onClick={() => setShowResponseInput(!showResponseInput)}
                className="cusor-pointer"
              >
                Reply
              </span>
            ) : (
              <>
                <span>Helpful?</span>
                <span className="flex items-center">
                  Yes
                  <BsHandThumbsUp />
                </span>
                <span className="flex items-center">
                  No
                  <BsHandThumbsDown />
                </span>
              </>
            )}
          </div>
          {/* Write response */}
          <ReviewRespnseInput
            setShow={setShowResponseInput}
            show={showResponseInput}
            review_id={review?._id}
          />
          {/* Response */}
          {review?.responses?.length ? (
            review?.responses?.map((response) => {
              return (
                <div key={response?._id} className="mt-4 flex flex-row gap-4">
                  <div className="">
                    <span className="bg-[#E4E5E7] p-2 rounded-full text-white">
                      M
                    </span>
                  </div>
                  <div className="">
                    <div className="text-[#404145] font-[700]">
                      Seller's Response
                    </div>
                    <div className="text-[#404145] font-[400]">
                      {response?.response}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

const ReviewRespnseInput = ({
  show,
  setShow,
  review_id,
}: {
  show: boolean;
  review_id: string;
  setShow: (value: React.SetStateAction<boolean>) => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [response, setResponse] = useState<string>("");
  let respondReviewRedux = useSelector(
    (state: ReducersType) => state.reviewResponse
  ) as ReduxResponseType<respondReviewType[]>;

  useEffect(() => {
    if (respondReviewRedux.error)
      Swal.fire({
        title: "Error!",
        text: respondReviewRedux?.error,
        icon: "error",
        timer: 7000,
        showDenyButton: true,
        confirmButtonText: "Okay",
      })
        .then((result) => {
          if (result.isConfirmed) {
            if (respondReviewRedux?.error === "Please login to respond")
              navigate("/login", { state: { redirect: location.pathname } });
          }
        })
        .finally(() => dispatch({ type: SELLER_RESPOND_REVIEW_RESET }));

    if (respondReviewRedux.success)
      Swal.fire({
        title: "Successful",
        icon: "success",
        text: respondReviewRedux?.serverResponse?.message,
        timer: 3000,
        confirmButtonText: "Okay",
      }).finally(() => dispatch({ type: SELLER_RESPOND_REVIEW_RESET }));
  }, [
    respondReviewRedux?.error,
    respondReviewRedux?.loading,
    navigate,
    dispatch,
    location.pathname,
    respondReviewRedux?.success,
    respondReviewRedux?.serverResponse?.data,
    respondReviewRedux?.serverResponse?.message,
  ]);

  const handleRespondReview = () => {
    dispatch(
      sellerRespondReviewAction({
        response,
        review_id: review_id as string,
      }) as any
    );
    setResponse("");
    setShow(false);
  };
  return (
    <div
      className={
        (show ? "flex " : "hidden ") +
        "flex flex-col gap-4 border shadow-md p-5 rounded-md"
      }
    >
      <div className="border-b-4 text-[#EDB842] border-b-[#EDB842] w-20 whitespace-nowrap text-lg">
        Write Response
      </div>
      <textarea
        className="border-2 p-3 rounded-md"
        name="comment"
        id=""
        cols={20}
        rows={5}
        placeholder="Respond to your customers review..."
        value={response}
        onChange={(event) => setResponse(event?.target?.value)}
      ></textarea>
      <button
        disabled={respondReviewRedux?.loading}
        onClick={handleRespondReview}
        className="flex flex-row gap-2 justify-between px-4 py-2 items-center text-white bg-[#EDB842] rounded-md max-w-[190px]"
      >
        {respondReviewRedux?.loading ? (
          <PulseLoader color="white" className="mx-auto h-6" />
        ) : (
          <>
            <span>publish Response</span>
            <span>
              <BsArrowRight />
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default Reviews;
