import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { PiRocketBold, PiStackBold, PiStackSimpleBold } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { circleWavy } from "../../../images";

const SellerPostProductBody = () => {
  const [status1] = useState<"closed" | "open" | "done">("done");
  const [status2] = useState<"closed" | "open" | "done">("open");
  const [status3] = useState<"closed" | "open" | "done">("closed");
  const [open, setOpen] = useState<string>("tab1");
  const [done, setDone] = useState<boolean>(true);
  return (
    <section className="flex flex-col">
      <div className="p-5 shadow-md rounded-md flex flex-col gap-6">
        {!done ? (
          <>
            {/* head */}
            <div className="flex flex-row justify-between border-b">
              {/* step1 */}
              <div
                className={`flex gap-2 p-2 w-full ${
                  open === "tab1" && " border-b-4 border-[#EDB842]"
                }`}
                onClick={() => setOpen("tab1")}
              >
                <div
                  className={`${
                    status1 === "closed"
                      ? "bg-[#C5C9D6]"
                      : status1 === "open"
                      ? "bg-[#EDB842]"
                      : "bg-[#27C200]"
                  } p-3 w-fit h-fit rounded-full text-white text-lg`}
                >
                  {status1 === "done" ? <TiTick /> : <PiStackSimpleBold />}
                </div>
                <div className="">
                  <div className="font-[600]">Steps 01</div>
                  <div className="font-[400] text-[#767E94]">
                    Product Information
                  </div>
                </div>
              </div>
              {/* step2 */}
              <div
                className={`flex gap-2 p-2 h-full w-full ${
                  open === "tab2" && " border-b-4 border-[#EDB842]"
                }`}
                onClick={() => setOpen("tab2")}
              >
                <div
                  className={`${
                    status2 === "closed"
                      ? "bg-[#C5C9D6]"
                      : status2 === "open"
                      ? " bg-[#EDB842] border-b-2 border-[#EDB842]"
                      : "bg-[#27C200]"
                  } p-3 w-fit h-fit rounded-full text-white text-lg`}
                >
                  {status2 === "done" ? <TiTick /> : <PiStackBold />}
                </div>
                <div className="">
                  <div className="font-[600]">Steps 02</div>
                  <div className="font-[400] text-[#767E94]">Description</div>
                </div>
              </div>
              {/* step3 */}
              <div
                className={`flex gap-2 p-2 h-full w-full ${
                  open === "tab3" && " border-b-4 border-[#EDB842]"
                }`}
                onClick={() => setOpen("tab3")}
              >
                <div
                  className={`${
                    status3 === "closed"
                      ? "bg-[#C5C9D6]"
                      : status3 === "open"
                      ? " bg-[#EDB842] border-b-2 border-[#EDB842]"
                      : "bg-[#27C200]"
                  } p-3 w-fit h-fit rounded-full text-white text-lg`}
                >
                  {status3 === "done" ? <TiTick /> : <PiRocketBold />}
                </div>
                <div className="font-[600]">
                  <div className="font-[600]">Steps 03</div>
                  <div className="font-[400] text-[#767E94]">Post Product</div>
                </div>
              </div>
            </div>
            <div className="">
              {open === "tab1" ? (
                <Productstab1 />
              ) : open === "tab2" ? (
                <Productstab2 />
              ) : (
                <Productstab3 setDone={setDone} />
              )}
            </div>
          </>
        ) : (
          <ProductsDone setDone={setDone} />
        )}
      </div>
    </section>
  );
};

const Productstab1 = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div className="font-[400]">Product Name</div>
        <input
          className="border p-2 rounded-md "
          type="text"
          placeholder="Ad Name"
        />
      </div>
      <div className="flex flex-row gap-3">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="font-[400]">Category</div>
          <select
            className="border p-2 rounded-md text-[#939AAD]"
            name=""
            id=""
          >
            <option value="">Select...</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="font-[400]">Subcategory</div>
          <select
            className="border p-2 rounded-md text-[#939AAD]"
            name=""
            id=""
          >
            <option value="">Select...</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="font-[400]">Brand</div>
          <select
            className="border p-2 rounded-md text-[#939AAD]"
            name=""
            id=""
          >
            <option value="">Select...</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="font-[400]">Model</div>
          <select
            className="border p-2 rounded-md text-[#939AAD]"
            name=""
            id=""
          >
            <option value="">Select...</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="font-[400]">Conditions</div>
          <select
            className="border p-2 rounded-md text-[#939AAD]"
            name=""
            id=""
          >
            <option value="">Select...</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="font-[400]">Authenticity</div>
          <select
            className="border p-2 rounded-md text-[#939AAD]"
            name=""
            id=""
          >
            <option value="">Select...</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-[400]">Tags</div>
        <input
          className="border p-2 rounded-md "
          type="text"
          placeholder="Product tag..."
        />
      </div>
      <div className="flex flex-row gap-3">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="font-[400]">Product Prices (USD)</div>
          <input
            className="border p-2 rounded-md "
            type="text"
            placeholder="Pick a good price - what would you pay?"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="font-[400]">Negotiable</div>
          <select
            className="border p-2 rounded-md text-[#939AAD]"
            name=""
            id=""
          >
            <option value="">Select...</option>
          </select>
        </div>
      </div>
      <div className="flex w-full justify-end gap-3">
        <button className="px-4 py-2 border-2 border-[#EDB842] text-[#EDB842] rounded-md font-[700]">
          View posting rules
        </button>
        <button className="px-4 py-2  bg-[#EDB842] flex flex-row gap-2 rounded-md items-center text-white font-[700]">
          {" "}
          <span>Next Steps</span>
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};
const Productstab2 = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div className="font-[400]">Description</div>
        <textarea
          className="border rounded-md text-[#939AAD] p-2"
          name=""
          id=""
          cols={30}
          rows={4}
        >
          Product description
        </textarea>
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
      <div className="flex flex-col gap-2">
        <div className="font-[400]">Upload Photos</div>
        <textarea
          className="border rounded-md text-[#939AAD] p-2"
          name=""
          id=""
          cols={30}
          rows={4}
        ></textarea>
      </div>
      <div className="flex w-full justify-end gap-3">
        <button className="px-4 py-2 border-2 border-[#EDB842] text-[#EDB842] rounded-md font-[700]">
          View posting rules
        </button>
        <button className="px-4 py-2  bg-[#EDB842] flex flex-row gap-2 rounded-md items-center text-white font-[700]">
          <span>Next Step</span>
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};
const Productstab3 = ({ setDone }: any) => {
  return (
    <div className="flex flex-col gap-3">
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
          <div className="font-[400]">Backup Phone Number (Optional)</div>
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
            <div className="font-[400]">State(Optional)</div>
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
      <div className="flex w-full justify-end gap-3">
        <button className="px-4 py-2 border-2 border-[#EDB842] text-[#EDB842] rounded-md font-[700]">
          View posting rules
        </button>
        <button
          onClick={() => setDone(true)}
          className="px-4 py-2  bg-[#EDB842] flex flex-row gap-2 rounded-md items-center text-white font-[700]"
        >
          {" "}
          <span>Post Product</span>
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

const ProductsDone = ({ setDone }: any) => {
  return (
    <div className="h-[60vh] w-full flex flex-col items-center justify-center text-center gap-2">
      <img className="object-contain" src={circleWavy} alt="" />
      <div className="text-2xl font-[700] playfair-display">
        Your Product is successfully publish
      </div>
      <div className="text-[#767E94] text-sm font-[400] w-1/2">
        Proin placerat risus non justo faucibus commodo. Nunc non neque sit amet
        magna aliquam condimentum.
      </div>
      <div className="flex w-full justify-center gap-3">
        <button
          onClick={() => setDone(false)}
          className="px-4 py-2 border-2 border-[#EDB842] text-[#EDB842] rounded-md font-[700]"
        >
          Go Back
        </button>
        <button className="px-4 py-2  bg-[#EDB842] flex flex-row gap-2 rounded-md items-center text-white font-[700]">
          {" "}
          <span>View Ads</span>
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

export default SellerPostProductBody;
