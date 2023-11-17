import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { user2 } from "../../../images/users";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminApproveTestimonialAction,
  adminDeleteTestimonialAction,
  adminGetUnapprovedTestimonialsAction,
} from "../../../redux/actions/admin/testimonials.actions";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { AdminTestimonialType } from "../../../redux/types/users.types";
import { PulseLoader } from "react-spinners";
import DOMPurify from "dompurify";

const AdminTestimonialBody = () => {
  const TestimonialRedux = useSelector(
    (state: ReducersType) => state?.adminGetUnapprovedTestimonial
  ) as ReduxResponseType;

  const ApproveTestimonialRedux = useSelector(
    (state: ReducersType) => state?.adminApproveTestimonial
  ) as ReduxResponseType;

  const DeleteTestimonialRedux = useSelector(
    (state: ReducersType) => state?.adminDeleteTestimonial
  ) as ReduxResponseType;

  // because the approve buttons share the same redux state if one is clicked they all show loading
  // the folllowing lines of code is to help show loading on only one
  const [idOfClickedButton, setIdOfClickedButton] = useState<string>("");
  const [idOfClickedButtonToDelete, setIdOfClickedButtonToDelete] =
    useState<string>(""); // Same concept but for delete

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminGetUnapprovedTestimonialsAction() as any);
  }, [dispatch]);

  const handleApprove = (id: string) => {
    dispatch(adminApproveTestimonialAction(id) as any);
  };

  const handleDelete = (id: string) => {
    dispatch(adminDeleteTestimonialAction(id) as any);
  };

  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Testimonial</div>
        </div>
        <div className="flex flex-col gap-3 p-4 md:p-6 justify-start w-full">
          {/* testinonials */}
          {TestimonialRedux?.serverResponse?.data &&
            TestimonialRedux?.serverResponse?.data.map(
              (testimonial: AdminTestimonialType) => {
                return (
                  <div
                    key={testimonial._id}
                    className="flex flex-row gap-3 bg-[#F5F5F594] shadow-md shadow-[#EDB842] rounded-md p-3 w-3/4"
                  >
                    <div className="p-2">
                      <img
                        src={
                          testimonial?.user_id?.image[0]?.url
                            ? testimonial?.user_id?.image[0]?.url
                            : user2
                        }
                        alt=""
                        className="w-16 h-16 mx-auto rounded-full object-cover flex"
                      />
                    </div>
                    <div className="flex flex-col w-full gap-[0.1rem]">
                      <div className="font-[700] text-xl flex">
                        {testimonial.name}
                      </div>
                      <div className="font-[300]">{testimonial.title}</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(testimonial?.content),
                        }}
                        className="font-[400] flex flex-col max-w-lg"
                      ></div>

                      <div className="flex flex-row justify-between w-full gap-6 self-end mt-3">
                        <div className="flex">
                          <Link
                            to={"/admin/testimonial/edit"}
                            state={{
                              testimonial,
                            }}
                          >
                            <button className="flex gap-2 py-[0.3rem] px-4 text-[0.875rem] text-white bg-[#EDB842] rounded-md font-[600]">
                              <span className="text-2xl">
                                <MdEdit className="w-4 my-auto" />
                              </span>
                              <span className="whitespace-nowrap my-auto">
                                Edit
                              </span>
                            </button>
                          </Link>
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={() => {
                              setIdOfClickedButton(testimonial._id);
                              handleApprove(testimonial._id);
                            }}
                            className="py-2 px-4 border text-[0.875rem] text-white bg-[#EDB842CF] rounded-md font-[600]"
                          >
                            {ApproveTestimonialRedux?.loading &&
                            idOfClickedButton === testimonial._id ? (
                              <div className="" style={{ height: "20px" }}>
                                <PulseLoader color="#ffffff" />
                              </div>
                            ) : (
                              "APPROVE POST"
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setIdOfClickedButtonToDelete(testimonial._id);
                              handleDelete(testimonial._id);
                            }}
                            className="py-2 px-4 border text-[0.875rem] text-white bg-[#ED4242B0] rounded-md font-[600]"
                          >
                            {DeleteTestimonialRedux?.loading &&
                            idOfClickedButtonToDelete === testimonial._id ? (
                              <div className="" style={{ height: "20px" }}>
                                <PulseLoader color="#ffffff" />
                              </div>
                            ) : (
                              "DECLINE POST"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
        </div>
      </div>
    </section>
  );
};

export default AdminTestimonialBody;
