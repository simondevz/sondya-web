import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { user2 } from "../../../images/users";

const AdminTestimonialBody = () => {
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Testimonial</div>
          <div className="flex flex-row gap-2">
            <Link
              to={"/admin/testimonial/edit"}
              className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2"
            >
              <span className="text-2xl">
                <MdEdit />
              </span>
              <span className="whitespace-nowrap">Edit</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-3 md:p-8 justify-center items-center">
          {/* first testinonial */}
          <div className="flex flex-row gap-3 bg-[#F5F5F594] shadow-md shadow-[#EDB842] rounded-md p-3 max-w-[45rem]">
            <div className="">
              <img src={user2} alt="" />
            </div>
            <div className="flex flex-col gap-[0.1rem]">
              <div className="font-[700] text-xl">Leona Paul</div>
              <div className="font-[300]">CEO of Floatcom</div>
              <div className="font-[400]">
                “My experience with Mark is a complete success, from customer
                service, wide range of products, clean store, purchasing
                experience, the newsletter. Thank you.”
              </div>
              <div className="flex flex-row gap-3 self-end mt-3">
                <button className="p-2 border text-white bg-[#EDB842CF] rounded-md font-[600]">
                  APPROVE POST
                </button>
                <button className="p-2 border text-white bg-[#ED4242B0] rounded-md font-[600]">
                  DECLINE POST
                </button>
              </div>
            </div>
          </div>
          {/* 2nd testinonial */}
          <div className="flex flex-row gap-3 bg-[#F5F5F594] shadow-md shadow-[#EDB842] rounded-md p-3 max-w-[45rem]">
            <div className="">
              <img src={user2} alt="" />
            </div>
            <div className="flex flex-col gap-[0.1rem]">
              <div className="font-[700] text-xl">Leona Paul</div>
              <div className="font-[300]">CEO of Floatcom</div>
              <div className="font-[400]">
                “My experience with Mark is a complete success, from customer
                service, wide range of products, clean store, purchasing
                experience, the newsletter. Thank you.”
              </div>
              <div className="flex flex-row gap-3 self-end mt-3">
                <button className="p-2 border text-white bg-[#EDB842CF] rounded-md font-[600]">
                  APPROVE POST
                </button>
                <button className="p-2 border text-white bg-[#ED4242B0] rounded-md font-[600]">
                  DECLINE POST
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminTestimonialBody;
