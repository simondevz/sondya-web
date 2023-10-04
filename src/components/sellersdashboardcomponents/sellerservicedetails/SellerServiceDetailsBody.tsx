import { AiOutlineArrowRight } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { Service1, Service2, ServiceMain } from "../../../images";
import { user2 } from "../../../images/users";
import { Ratings } from "../../shareables/Ratings";

const SellerServiceDetailsBody = () => {
  return (
    <section className="p-3 flex flex-col gap-4">
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
      <AboutSellerServceDetails />
    </section>
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

export default SellerServiceDetailsBody;
