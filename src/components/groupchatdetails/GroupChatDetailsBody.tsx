import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { groupChatMain } from "../../images";
import {
  groupChat1,
  groupChat2,
  groupChat3,
  groupChat4,
  groupChat5,
  groupChatMore,
} from "../../images/groupchat";
import { Logo } from "../../images/logo";

const GroupChatDetailsBody = () => {
  return (
    <div className="flex flex-col gap-5 items-center my-4">
      <div className="flex flex-col shadow-md p-3 w-full">
        <div className="flex flex-row justify-around">
          <div className="flex flex-row gap-3 items-center text-2xl font-[600]">
            <AiOutlineArrowLeft />
            <div className="">Group 1</div>
          </div>
          <div className="">
            <img className="w-16" src={Logo} alt="" />
          </div>
        </div>
      </div>
      <img src={groupChatMain} alt="" />
      <div className="">Become Sondya Partner</div>
      <div className="shadow-md p-4 max-w-[50rem] rounded-lg">
        <div className="flex gap-2 p-2 items-center">
          <div className="font-[600]">
            Advertising is a marketing communication that employs an openly
            sponsored, non-personal message to promote or sell a product,
            service or idea. Sponsors of advertising are typically businesses
            wishing to promote their products or services.{" "}
          </div>
          <div className="text-[#8696A0]">
            <MdEdit />
          </div>
        </div>
        <div className="font-[300] text-[#EDB842]">
          Group created by you, yesterday at 1:17 AM
        </div>
      </div>
      <div className="text-[#A4A4A4] font-[600]">
        Public group <span className="text-[#EDB842]">37K</span> members.
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-1">
          <img src={groupChat1} alt="" />
          <img src={groupChat2} alt="" />
          <img src={groupChat3} alt="" />
          <img src={groupChat4} alt="" />
          <img src={groupChat5} alt="" />
          <div className="bg-black rounded-md">
            <img className="rounded-md" src={groupChatMore} alt="" />
          </div>
          <button className="bg-[#2C37E1] p-2 text-white rounded-md">
            + Invite
          </button>
        </div>
        <div className=" p-2 border-b border-[#EDB842]">Members</div>
        <div className="bg-[#F7F7FC] py-1 px-3 text-[#ADB5BD] rounded-lg flex items-center gap-3">
          <span>
            <BsSearch />
          </span>
          <input
            placeholder="Search"
            className="p-2 bg-[#F7F7FC] outline-none"
            type="text"
          />
        </div>
        <div className="p-2 border-b flex gap-2">
          <img src={groupChat1} alt="" />
          <div className="">
            <div className="text-[#0F1828] font-[600]">Athalia Putri</div>
            <div className="text-[#ADB5BD] font-[400] text-sm">
              Last seen yesterday
            </div>
          </div>
        </div>
        <div className="p-2 border-b flex gap-2">
          <img src={groupChat2} alt="" />
          <div className="">
            <div className="text-[#0F1828] font-[600]">Erlan Sadewa</div>
            <div className="text-[#ADB5BD] font-[400] text-sm">Online</div>
          </div>
        </div>
        <div className="p-2 border-b flex gap-2">
          <img src={groupChat3} alt="" />
          <div className="">
            <div className="text-[#0F1828] font-[600]">Erlan Sadewa</div>
            <div className="text-[#ADB5BD] font-[400] text-sm">Online</div>
          </div>
        </div>
        <div className="p-2 border-b flex gap-2">
          <img src={groupChat4} alt="" />
          <div className="">
            <div className="text-[#0F1828] font-[600]">Nafisa Gitari</div>
            <div className="text-[#ADB5BD] font-[400] text-sm">Online</div>
          </div>
        </div>
        <div className="p-2 border-b flex gap-2">
          <img src={groupChat5} alt="" />
          <div className="">
            <div className="text-[#0F1828] font-[600]">Raki Devon</div>
            <div className="text-[#ADB5BD] font-[400] text-sm">Online</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatDetailsBody;
