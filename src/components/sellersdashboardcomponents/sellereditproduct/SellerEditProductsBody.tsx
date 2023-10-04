import { FaTimes } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import { DropImages } from "../../admincomponents/adminaddproduct/AdminAddProductsBody";

const SellerEditProductsBody = () => {
  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Edit Product</div>
          <div className="flex flex-row gap-2">
            <button className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2">
              <span className="text-[#EDB842]">
                <FaTimes />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Cancel</span>
            </button>
            <button className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2">
              <span>
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Add Category</span>
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
                  <label htmlFor="">Category Name</label>
                  <input
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    type="text"
                    placeholder="Type category name here. . ."
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
                    Type product description here. . .
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
                  <label htmlFor="">Product Category</label>
                  <select
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    name=""
                    id=""
                  >
                    <option value="">Select a category</option>
                  </select>
                </div>
                <div className="text-[#777980] flex flex-col gap-2 text-sm w-full">
                  <label htmlFor="">Product Tags</label>
                  <select
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    name=""
                    id=""
                  >
                    <option value="">Select tags</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-3 shadow-md rounded-md p-2 w-full">
                <div className="font-[600] text-lg text-[#1D1F2C] w-full flex flex-row justify-between">
                  <span>Status</span>
                  <span className="p-1 w-fit h-fit bg-[#F0F1F3] text-[#667085] rounded-lg text-sm">
                    Draft
                  </span>
                </div>
                <div className="text-[#777980] flex flex-col gap-2 text-sm w-full">
                  <label htmlFor="">Product Status</label>
                  <select
                    className="border p-2 rounded-md bg-[#F9F9FC]"
                    name=""
                    id=""
                  >
                    <option value="">Draft</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 shadow-md rounded-md p-3">
          <div className="font-[600] text-lg text-[#1D1F2C]">Pricing</div>
          <div className="text-[#777980] flex flex-col gap-2 text-sm">
            <label htmlFor="">Base Price</label>
            <input
              className="border p-2 rounded-md bg-[#F9F9FC]"
              type="text"
              placeholder="Type base price here. . ."
            />
          </div>
          <div className="w-full flex flex-row gap-3">
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">Discount Type</label>
              <select
                className="border p-2 rounded-md bg-[#F9F9FC]"
                name=""
                id=""
              >
                <option value="">Select a discount type</option>
              </select>
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">Discount Precentage (%)</label>
              <select
                className="border p-2 rounded-md bg-[#F9F9FC]"
                name=""
                id=""
              >
                <option value="">Type discount precentage. . .</option>
              </select>
            </div>
          </div>
          <div className="w-full flex flex-row gap-3">
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">Tax Class</label>

              <select
                className="border p-2 rounded-md bg-[#F9F9FC]"
                name=""
                id=""
              >
                <option value="">Select a tax class</option>
              </select>
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">VAT Amount (%)</label>
              <select
                className="border p-2 rounded-md bg-[#F9F9FC]"
                name=""
                id=""
              >
                <option value="">Type VAT amount. . .</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 shadow-md rounded-md p-3">
          <div className="font-[600] text-lg text-[#1D1F2C]">Inventory</div>
          <div className="flex flex-wrap gap-3 items-stretch">
            <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[16rem]">
              <label htmlFor="">SKU</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="TType product SKU here. . ."
              />
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[16rem]">
              <label htmlFor="">Barcode</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Product barcode. . ."
              />
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[16rem]">
              <label htmlFor="">Quantity</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Type product quantity here. . ."
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 shadow-md rounded-md p-3">
          <div className="font-[600] text-lg text-[#1D1F2C]">Variation</div>
          <div className="w-full flex flex-row gap-3 items-end">
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">Variation Type</label>
              <select
                className="border p-2 rounded-md bg-[#F9F9FC]"
                name=""
                id=""
              >
                <option value="">Select a variation</option>
              </select>
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">Variation</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Variation. . ."
              />
            </div>
            <button className="bg-[#EDB84233] text-[#EDB842] p-[0.65rem] h-fit w-fit rounded-md">
              <MdOutlineAdd />
            </button>
          </div>
          <div className="w-full flex flex-row gap-3 items-end">
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">Variation Type</label>
              <select
                className="border p-2 rounded-md bg-[#F9F9FC]"
                name=""
                id=""
              >
                <option value="">Select a variation</option>
              </select>
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm w-1/2">
              <label htmlFor="">Variation</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Variation. . ."
              />
            </div>
            <button className="bg-[#EDB84233] text-[#EDB842] p-[0.65rem] h-fit w-fit rounded-md">
              <MdOutlineAdd />
            </button>
          </div>
          <button className="bg-[#EDB84233] text-[#EDB842] p-[0.65rem] h-fit w-fit rounded-md flex flex-row gap-2 items-center">
            <MdOutlineAdd />
            <span>Add Variant</span>
          </button>
        </div>
        <div className="flex flex-col gap-3 shadow-md rounded-md p-3">
          <div className="font-[600] text-lg text-[#1D1F2C]">Shiping</div>
          <div className="flex flex-row gap-3">
            {" "}
            <input type="checkbox" />{" "}
            <span className="text-[#EDB842]">This is a physical product</span>
          </div>
          <div className="flex flex-wrap gap-3 items-stretch">
            <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[13rem]">
              <label htmlFor="">Weight</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Product weight. . ."
              />
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[13rem]">
              <label htmlFor="">Height</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Height (cm). . ."
              />
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[13rem]">
              <label htmlFor="">Length</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Length (cm). . ."
              />
            </div>
            <div className="text-[#777980] flex flex-col gap-2 text-sm min-w-[13rem]">
              <label htmlFor="">Width</label>
              <input
                className="border p-2 rounded-md bg-[#F9F9FC]"
                type="text"
                placeholder="Width (cm). . ."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerEditProductsBody;
