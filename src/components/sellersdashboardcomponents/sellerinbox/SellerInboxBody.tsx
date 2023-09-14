import { AiOutlineSend } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { chatDataItem } from "../../../data/chat";
import { Chat1, OnlineImg } from "../../../images/chat";

const SellerInboxBody = () => {
  return (
    <section>
      <div className="flex flex-row w-full border rounded-md">
        <div className="flex flex-col gap-3 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 border p-4">
          <div className="font-[600] text-lg">Inbox</div>
          <input
            className="p-2 bg-[#EDB84233] rounded-md w-full"
            type="text"
            placeholder="Search"
          />
          {chatDataItem.map((t, i) => {
            return (
              <div className="flex flex-row gap-2 w-full">
                <img className="object-contain" src={t.image} alt="" />
                <div className="flex flex-col w-full">
                  <div className="w-full flex flex-row justify-between">
                    <span>{t.name}</span>
                    {t.unread && (
                      <span className="bg-[#EDB842] text-white px-3 py-1 rounded-full w-fit h-fit">
                        {t.unread}
                      </span>
                    )}
                  </div>
                  <div className="w-full flex flex-row justify-between font-[400] text-[#767E94]">
                    <span className="">{t.message}</span>
                    <span>{t.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ChatBox />
      </div>
    </section>
  );
};

const ChatBox = () => {
  return (
    <div className="hidden md:flex flex-col w-full border">
      <div className="flex flex-row items-center justify-between p-3 border-b-2">
        <div className="flex flex-row gap-3">
          <img className="object-contain" src={Chat1} alt="" />
          <div className="flex flex-col">
            <div className="font-[600]">Esther Howard</div>
            <div className="flex">
              <img className="object-contain" src={OnlineImg} alt="" />
              <span className="text-sm text-[#636A80] font-[400]">
                Active Now
              </span>
            </div>
          </div>
        </div>
        <span className="text-[#464D61] text-2xl">
          <MdDeleteOutline />
        </span>
      </div>
      {/* messages starts */}
      <div className="w-full p-2 h-full flex flex-col justify-end gap-5">
        <div className="w-full my-4">
          <hr className="text-[#EBEEF7]" />
          <div className="font-[600] mx-auto w-fit text-[#636A80] bg-white -mt-5 h-fit p-2">
            Today
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="">
            <img src={Chat1} alt="" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-[600] flex gap-2">
              <span>Jenny Wilson</span>
              <span className="text-[#939AAD]">3:14 PM</span>
            </div>
            <div className="text-[#636A80]">
              Hey Esther, Sorry Esther i can’t low the price. it’s already very
              low price. and right now i can’t lower the price. it’s now fixed
              prices
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="">
            <img src={Chat1} alt="" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-[600] flex gap-2">
              <span>Jenny Wilson</span>
              <span className="text-[#939AAD]">3:14 PM</span>
            </div>
            <div className="text-[#636A80]">
              Hey Esther, Sorry Esther i can’t low the price. it’s already very
              low price. and right now i can’t lower the price. it’s now fixed
              prices
            </div>
          </div>
        </div>
      </div>
      {/* message ends */}
      <div className="flex flex-row border-t p-3 mt-auto">
        <input
          className="p-2 outline-none flex-1"
          type="text"
          placeholder="Type your message..."
        />
        <button className="p-2 text-2xl text-white bg-[#EDB842] rounded-md">
          <AiOutlineSend />
        </button>
      </div>
    </div>
  );
};

export default SellerInboxBody;
