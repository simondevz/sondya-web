import {
  AiFillStar,
  AiOutlineArrowRight,
  AiOutlineRight,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import {
  BsArrowRight,
  BsHandThumbsDown,
  BsHandThumbsUp,
  BsSearch,
  BsSend,
} from "react-icons/bs";
import { FaFlag, FaHome } from "react-icons/fa";
import { MdEmail, MdFavoriteBorder, MdMenu } from "react-icons/md";
import { Service1, Service2, ServiceMain } from "../../images";
import { Facebook, Twitter, Whatsapp } from "../../images/dashboard";
import { user2 } from "../../images/users";
import { Ratings } from "../shareables/Ratings";

const ServiceDetailsBody = () => {
  return (
    <section className="p-3 flex flex-col gap-4">
      <div className="text-[#5F6C72] flex flex-row justify-between">
        <div className="hidden md:flex flex-row items-center gap-1">
          <FaHome /> <span>Home</span> <AiOutlineRight /> <span>Category</span>{" "}
          <AiOutlineRight /> <span>Product</span> <AiOutlineRight />{" "}
          <span>Electronics Devices</span>
          <AiOutlineRight /> <span>Macbook Pro</span>{" "}
        </div>
        <div className="flex flex-row items-center gap-3 ms-auto">
          <MdMenu />
          <MdFavoriteBorder />
          <span className="border border-[#DADBDD] p-1 rounded-md">2,767</span>
          <span className="border border-[#DADBDD] p-2 rounded-md">
            <FaFlag />
          </span>
          <span className="border border-[#DADBDD] p-2 rounded-md text-[#EDB842]">
            {" "}
            <AiOutlineShareAlt />
          </span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 justify-start">
        <div className="flex flex-col gap-3 w-full md:w-3/5">
          <div className="font-[700] text-xl">
            I will create an amazing website or app promo video
          </div>
          <div className="flex gap-3">
            <img className="w-5 object-contain" src={user2} alt="" />
            <div className="text-[#404145] font-[500]">airb123</div>
            <div className="flex gap-2">
              <Ratings rating={4} />{" "}
              <span className="text-[#95979D]">(904)</span>
            </div>
          </div>
          <div className="">
            <img src={Service2} alt="" />
            <div className="flex gap-1 overflow-y-auto">
              <img
                className="rounded-sm object-contain"
                src={ServiceMain}
                alt=""
              />
              <img
                className="rounded-sm object-contain"
                src={Service1}
                alt=""
              />
              <img
                className="rounded-sm object-contain"
                src={ServiceMain}
                alt=""
              />
              <img
                className="rounded-sm object-contain"
                src={ServiceMain}
                alt=""
              />
              <img
                className="rounded-sm object-contain"
                src={ServiceMain}
                alt=""
              />
              <img
                className="rounded-sm object-contain"
                src={ServiceMain}
                alt=""
              />
              <img
                className="rounded-sm object-contain"
                src={ServiceMain}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 flex flex-col gap-3 rounded-sm border justify-between max-w-[25rem]">
          <div className="border-b p-3 font-[600] text-xl text-[#EDB842]">
            Service Package
          </div>
          <div className="flex flex-col gap-5 p-2 h-5/6">
            <div className="flex justify-between text-lg font-[600]">
              <div className="">GiG</div>
              <div className="">NGN868</div>
            </div>
            <div className=" text-lg font-[600] text-[#EDB842]">
              Brief Description
            </div>
            <div className="text-[#95979D]">
              Package includes Only Laptop-scenes Includes, Background
              Music,Logo, and 720HD Video
            </div>
            <div className="flex justify-start gap-4 font-[600]">
              <div className="">4 Days Delivery</div>
              <div className="flex flex-row gap-3 items-center">
                <BiRefresh />1 Revision
              </div>
            </div>
            <button className="flex flex-row gap-3 text-white bg-[#EDB842] rounded-md p-2 items-center justify-center">
              <span className="">Continue</span>
              <AiOutlineArrowRight />
            </button>
          </div>
          <div className="p-4">
            <button className="border broder-[#62646A] rounded-md text-[#62646A] p-2 w-full">
              Contact Seller
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-[50rem] p-4">
        <div className="text-xl font-[600]">About Gig</div>
        <div className="font-[400] text-[#62646A]">
          Currently, WordPress powers 35% of the internet and has over 400
          million people visiting their sites every month. With a diverse set of
          features, WordPress is well suited to a wide range of users including
          personal sites, blogs, e-commerce and business sites that have
          advanced requirements. Filled with resources and downloads, this
          course covers everything you need to know to start using wordPress
          like a pro. You'll learn how to set up your website, add content
          including pages and blog posts, select and customize a theme, add
          widgets and plugins to expand your site's features, connect it to your
          social networks and upload media including videos and images - all
          without having to code! If you don’t already have a WordPress account,
          all you need is an email address. Being so simple, there’s no reason
          why you shouldn’t enroll now, taking advantage of the 25% Fiverr User
          discount on WordPress, to get your website started today.
        </div>
      </div>
      <div className="">
        <div className="flex gap-3 items-center">
          share on:{" "}
          <span className="text-[#7A7D85] text-xl">
            <MdEmail />
          </span>{" "}
          <img src={Whatsapp} alt="" />
          <img src={Facebook} alt="" />
          <img src={Twitter} alt="" />
        </div>
      </div>
      <AboutSellerServceDetails />
      <ServiceDetailsChat />
      <ReviewsService />
    </section>
  );
};

export const ServiceDetailsChat = () => {
  return (
    <div className="p-3 max-w-[50rem] flex flex-col gap-4 border-2 rounded-md shadow-md">
      <div className="p-2 shadow-md">Away. Avg. response time:1 Hour</div>
      <div className="p-3 border max-w-[30rem] mx-auto rounded-lg">
        Ask Extreme Design a question or share your project details
        (requirements, timeline, budget, etc.)
      </div>
      <div className="rounded-2xl border p-2">
        👋 Hey Extreme Design, can you help me with...
      </div>
      <div className="rounded-2xl border p-2">
        Would it be possible to get a custom offer for...
      </div>
      <div className="rounded-2xl border p-2">
        Do you think you can deliver an order by...
      </div>
      <div className="">
        <div className="bg-[#EDB84233] p-2 h-fit rounded-2xl flex gap-2 items-center">
          <span className="text-white text-2xl">
            <BsSend />
          </span>
          <textarea
            className="p-2 bg-[#EDB84209] outline-none w-full"
            name=""
            id=""
            cols={30}
            rows={1}
            placeholder="Send message"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

const AboutSellerServceDetails = () => {
  return (
    <div className="flex flex-col gap-4 max-w-[50rem]">
      <div className="font-[700] text-2xl">About The Seller</div>
      <div className="flex flex-row gap-4 items-center md:w-full">
        <div className="">
          <img src={user2} alt="" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-lg font-[700] text-[#0E0E0F]">
            Marjorie Asturias
          </div>
          <div className="font-[400] text-[#95979D] ">
            WordPress expert with 10+ years working with business owners,
            influencers and bloggers to expand their online audience.
          </div>
          <div className="flex items-center gap-3 text-[#95979D]">
            <Ratings rating={4} />
            (974)
          </div>
        </div>
      </div>
      <div className="border p-5 rounded-md text-[#62646A] font-[400] text-sm md:w-full">
        <div className="flex flex-row gap-3 justify-between py-3">
          <div className="flex flex-col gap-3">
            <div className="">
              <div className="text-[#74767E] font-[400]">From</div>
              <div className="text-[#62646A] font-[600]">Sri Lanka</div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">
                Avg. response time
              </div>
              <div className="text-[#62646A] font-[600]">1 hour</div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">Languages</div>
              <div className="text-[#62646A] font-[600]">English</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="">
              <div className="text-[#74767E] font-[400]">Member since</div>
              <div className="text-[#62646A] font-[600]">Aug 2019</div>
            </div>
            <div className="">
              <div className="text-[#74767E] font-[400]">Aug 2019</div>
              <div className="text-[#62646A] font-[600]">about 3 hours</div>
            </div>
          </div>
        </div>
        <hr />
        <div className="py-3">
          At Airbluesoft Premium Digital Studio we create all kinds of creative
          videos, specializing in Creating Promos( Website, Apps, Fashion, Real
          Estate, Youtube, NFT) and all other promos and all instructional
          videos.
          <br />
          <br />
          We Create Basic To High-End Videos.
          <br />
          <br />
          Creativity Beyond the Limits. -Airbluesoft Premium Digital Studio-
        </div>
      </div>
    </div>
  );
};

const ReviewsService = () => {
  return (
    <div className="flex flex-col gap-4 p-5 w-full md:w-3/5 max-w-[50rem]">
      <div className="">Reviews</div>
      <div className="flex flex-row  gap-5">
        <span>902 reviews for this Gig</span> <Ratings rating={4.6} />
      </div>
      <div className="flex flex-row items-center">
        <input
          className="border-[1px]  p-[0.46rem] border-[#C5C6C9] outline-none rounded-l-md"
          type="text"
        />
        <button className="bg-[#222325] px-3 py-3 text-white -m-2 rounded-r-md">
          <BsSearch />
        </button>
      </div>
      <div className="flex gap-3 text-[#404145]">
        Sort By:{" "}
        <select className="outline-none" name="" id="">
          <option value="">Search reviews</option>
        </select>
      </div>
      <div className="flex flex-row gap-3 text-[#62646A] items-center">
        <input type="checkbox" name="" id="" />
        <label htmlFor="">Delivery images (558)</label>
      </div>
      <div className="flex flex-col gap-4 border shadow-md p-5 rounded-md">
        <div className="border-b-4 text-[#EDB842] border-b-[#EDB842] w-20 whitespace-nowrap text-lg">
          Write Review
        </div>
        <div className="flex flex-row gap-2 text-2xl text-[#DADDE5]">
          {" "}
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <textarea
          className="border-2 p-3 rounded-md"
          name="comment"
          id=""
          cols={20}
          rows={5}
        >
          Share you thought about this seller...
        </textarea>
        <button className="flex flex-row gap-2 justify-between px-4 py-2 items-center text-white bg-[#EDB842] rounded-md max-w-[190px]">
          <span>publish Review</span>
          <span>
            <BsArrowRight />
          </span>
        </button>
      </div>
      <hr />
      <div className="flex flex-row gap-4">
        <div className="">
          <span className="bg-[#E4E5E7] p-2 rounded-full text-white">M</span>
        </div>
        <div className="flex flex-col gap-2 text-[#62646A]">
          <div className="text-[#404145]">marvinachi</div>
          <div className="">United states</div>
          <div className="flex flex-row gap-4 items-center">
            <Ratings rating={5} /> <span>1 month ago</span>
          </div>
          <div className="">
            Amazing work. Will def work again with him this was a big project
            and he knocked it out of the park.
          </div>
          <div className="flex gap-3 items-center">
            {" "}
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
      <div className="flex flex-row gap-4">
        <div className="">
          <span className="bg-[#E4E5E7] p-2 rounded-full text-white">M</span>
        </div>
        <div className="flex flex-col gap-2 text-[#62646A]">
          <div className="text-[#404145]">jcpconsulting</div>
          <div className="">United states</div>
          <div className="flex flex-row gap-4 items-center">
            <Ratings rating={5} /> <span>1 month ago</span>
          </div>
          <div className="">
            Amazing work. Will def work again with him this was a big project
            and he knocked it out of the park.
          </div>
          <div className="flex gap-3 items-center">
            {" "}
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
      <div className="text-[#EDB842] text-lg font-[700]">+ See More</div>
    </div>
  );
};
export default ServiceDetailsBody;
