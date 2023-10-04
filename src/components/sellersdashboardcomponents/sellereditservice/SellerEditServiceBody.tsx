import { AiOutlineArrowRight } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { DropImages } from "../../admincomponents/adminaddproduct/AdminAddProductsBody";

const SellerEditServiceBody = () => {
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Edit Service</div>
          <div className="flex flex-row gap-2">
            <button className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2">
              <span className="text-[#EDB842]">
                <FaTimes />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Cancel</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-[600] text-lg text-[#1D1F2C]">
            General Information
          </div>
          <div className="flex flex-col lg:flex-row gap-1">
            <div className="flex flex-col gap-3 w-full lg:w-3/4 xl:w-4/5">
              <div className="flex flex-col shadow-sm rounded-md p-3 gap-3">
                <div className="text-[#777980] flex flex-col gap-2 text-sm">
                  <label htmlFor="">Service Name</label>
                  <input
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    type="text"
                    placeholder="Type service name here. . ."
                    value="I will create an amazing website or app promo video"
                  />
                </div>
                <div className="text-[#777980] flex flex-col gap-2 text-sm">
                  <label htmlFor="">Description</label>
                  <textarea
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    name=""
                    id=""
                    cols={30}
                    rows={6}
                  >
                    Currently, WordPress powers 35% of the internet and has over
                    400 million people visiting their sites every month. With a
                    diverse set of features, WordPress is well suited to a wide
                    range of users including personal sites, blogs, e-commerce
                    and business sites that have advanced requirements. Filled
                    with resources and downloads, this course covers everything
                    you need to know to start using wordPress like a pro. You'll
                    learn how to set up your website, add content including
                    pages and blog posts, select and customize a theme, add
                    widgets and plugins to expand your site's features, connect
                    it to your social networks and upload media including videos
                    and images - all without having to code! If you don’t
                    already have a WordPress account, all you need is an email
                    address. Being so simple, there’s no reason why you
                    shouldn’t enroll now, taking advantage of the 25% Fiverr
                    User discount on WordPress, to get your website started
                    today.
                  </textarea>
                </div>
              </div>
              <div className="flex flex-col shadow-md rounded-md p-3 gap-3">
                <div className="font-[600] text-lg text-[#1D1F2C]">Media</div>
                <DropImages />
              </div>
            </div>
            <div className="flex flex-row lg:flex-col gap-3 rounded-md p-1 w-full lg:w-1/4 xl:w-1/5 lg:flex-grow">
              <div className="flex flex-col gap-3 shadow-md rounded-md p-2 w-full">
                <div className="font-[600] text-lg text-[#1D1F2C]">
                  Category
                </div>
                <div className="text-[#777980] flex flex-col gap-2 text-sm w-full">
                  <label htmlFor="">Service Category</label>
                  <select
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    name=""
                    id=""
                  >
                    <option value="">Select a category</option>
                  </select>
                </div>
                <div className="text-[#777980] flex flex-col gap-2 text-sm w-full">
                  <label htmlFor="">Service Tags</label>
                  <select
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    name=""
                    id=""
                  >
                    <option value="">Select tags</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 shadow-md p-3 rounded-md">
          <div className="">About Seller</div>
          <div className="flex flex-col gap-2">
            <div className="font-[600]">Ade Scoba</div>
            <textarea
              className="border rounded-md text-[#939AAD] p-2"
              name=""
              id=""
              cols={30}
              rows={4}
              placeholder="Write about you"
            >
              service description
            </textarea>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">From</div>
              <select
                className="border p-2 rounded-md text-[#939AAD]"
                name=""
                id=""
              >
                <option value="">Select...</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Member since</div>
              <input
                className="border p-2 rounded-md "
                type="text"
                placeholder="Date"
              />
            </div>
          </div>
          <div className="flex flex-row gap-3 whitespace-nowrap">
            <div className="flex flex-col gap-2 w-1/3">
              <div className="font-[400]">Language</div>
              <select
                className="border p-2 rounded-md text-[#939AAD]"
                name=""
                id=""
              >
                <option value="">Select...</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-1/3">
              <div className="font-[400]">Avg. response time</div>
              <select
                className="border p-2 rounded-md text-[#939AAD]"
                name=""
                id=""
              >
                <option value="">Select...</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-1/3">
              <div className="font-[400]">Last delivery</div>
              <select
                className="border p-2 rounded-md text-[#939AAD]"
                name=""
                id=""
              >
                <option value="">Select...</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 shadow-md p-3 rounded-md">
          <div className="flex flex-col gap-2 w-full">
            <div className="font-[400]">Service Prices (USD)</div>
            <input
              className="border p-2 rounded-md "
              type="text"
              placeholder="Pick a good price - what you would pay?"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-[400]">Feature (optional)</div>
            <textarea
              className="border rounded-md text-[#939AAD] p-2"
              name=""
              id=""
              cols={30}
              rows={4}
            >
              Write a feature in each line eg. Feature 1 Feature 2
            </textarea>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <div className="font-[400]">Estimated Date of Delivery</div>
            <select
              className="border p-2 rounded-md text-[#939AAD]"
              name=""
              id=""
            >
              <option value="">Select...</option>
            </select>
          </div>
        </div>
        {/* last one */}
        <div className="flex flex-col gap-3 shadow-md p-3">
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Phone Number</div>
              <input
                className="border p-2 rounded-md "
                type="text"
                placeholder="Phone Number"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400] whitespace-nowrap overflow-x-hidden">
                Backup Phone Number (Optional)
              </div>
              <input
                className="border p-2 rounded-md "
                type="text"
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Email Address</div>
              <input
                className="border p-2 rounded-md "
                type="text"
                placeholder="Email address"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Website Link (Optional)</div>
              <input
                className="border p-2 rounded-md "
                type="text"
                placeholder="your website url"
              />
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Country</div>
              <select
                className="border p-2 rounded-md text-[#939AAD]"
                name=""
                id=""
              >
                <option value="">Select...</option>
              </select>
            </div>
            <div className="flex flex-row gap-3 w-1/2">
              <div className="flex flex-col gap-2 w-1/2">
                <div className="font-[400]">City</div>
                <select
                  className="border p-2 rounded-md text-[#939AAD]"
                  name=""
                  id=""
                >
                  <option value="">Select...</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <div className="font-[400] overflow-x-hidden">
                  State(Optional)
                </div>
                <select
                  className="border p-2 rounded-md text-[#939AAD]"
                  name=""
                  id=""
                >
                  <option value="">Select...</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Location</div>
              <input
                className="border p-2 rounded-md "
                type="text"
                placeholder="Your location"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="font-[400]">Map Location (Optional)</div>
              <input
                className="border p-2 rounded-md "
                type="text"
                placeholder="Map location"
              />
            </div>
          </div>
          <div className="flex w-full justify-center gap-3">
            <button className="px-4 py-2 border-2 border-[#EDB842] text-[#EDB842] rounded-md font-[700]">
              Back
            </button>
            <button className="px-4 py-2  bg-[#EDB842] flex flex-row gap-2 rounded-md items-center text-white font-[700]">
              {" "}
              <span>Edit</span>
              <AiOutlineArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerEditServiceBody;
