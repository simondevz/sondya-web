import { BiArrowBack } from "react-icons/bi";
import { MdHome } from "react-icons/md";
import { Footer, Nav } from "../components/layout";
import { notFound } from "../images";

const ErrorPage = () => {
  return (
    <div className="">
      <Nav />
      <div className="w-full h-[80vh]  flex flex-col items-center p-2">
        <div className="flex flex-col gap-3 my-auto mx-auto text-center justify-center items-center">
          <img
            className="object-cover h-[20vh] md:h-[30vh]"
            src={notFound}
            alt=""
          />
          <div className="text-2xl font-[600]">404, Page not founds</div>
          <div className="">
            Something went wrong. It’s look that your requested could not be
            found. It’s look like the link is broken or the page is removed.
          </div>
          <div className="flex flex-row gap-4">
            <button className="flex flex-row gap-2 items-center bg-[#EDB842] p-2 text-white rounded-md font-[700]">
              <BiArrowBack />
              <span>Go Back</span>
            </button>
            <button className="flex flex-row gap-2 items-center p-2 text-[#EDB842] rounded-md border border-[#EDB842] font-[700]">
              <MdHome />
              <span>Go To home</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
