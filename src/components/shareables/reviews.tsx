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
import { USER_CREATE_REVIEW_RESET } from "../../redux/constants/userDashboard/review.constants";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { userReviewType, reviewStatType } from "../../redux/types/review.types";
import { Ratings } from "./Ratings";
import FormatDate from "./dateFormatter";

const Reviews = ({
  product_id,
  product_type,
}: {
  product_id: string;
  product_type: "product" | "service";
}) => {
  const limit: number = 10;
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [reviews, setReviews] = useState<userReviewType[]>([]);

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
    if (product_id) dispatch(reviewStatAction(product_type, product_id) as any);
  }, [dispatch, product_id, pathname, product_type]);

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
      if (reviewsListRedux?.serverResponse?.data?.length)
        if (page > 1) {
          setReviews((prev) => {
            return prev.concat(reviewsListRedux?.serverResponse?.data);
          });
        } else {
          setReviews(reviewsListRedux?.serverResponse?.data);
        }
    }
  }, [reviewsListRedux?.serverResponse?.data, reviewsListRedux?.success, page]);

  return (
    <div className="flex flex-col gap-4 p-5 w-full md:w-3/5">
      <div className="">Reviews</div>
      <div className="flex flex-row  gap-5">
        <span>
          {reviewStatRedux?.serverResponse?.data?.totalReviews || 0} reviews for
          this Product
        </span>
        <Ratings
          rating={Math.round(
            reviewStatRedux?.serverResponse?.data?.averageRating || 0
          )}
        />
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
            />
          );
        })
      ) : (
        <div>No Reviews yet</div>
      )}
      {reviewsListRedux?.serverResponse?.data?.length === 0 &&
        reviews?.length !== 0 && <div>No More Reviews Found</div>}
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

const ReviewPost = ({ review }: { review: userReviewType }) => {
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
            <span>Helpful?</span>
            <span className="flex items-center">
              Yes
              <BsHandThumbsUp />
            </span>
            <span className="flex items-center">
              No
              <BsHandThumbsDown />
            </span>
          </div>
          {/* Response */}
          <div className="mt-4 flex flex-row gap-4">
            <div className="">
              <span className="bg-[#E4E5E7] p-2 rounded-full text-white">
                M
              </span>
            </div>
            <div className="">
              <div className="text-[#404145] font-[700]">Seller's Response</div>
              <div className="text-[#404145] font-[400]">
                Thank you so much 😊
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Reviews;
