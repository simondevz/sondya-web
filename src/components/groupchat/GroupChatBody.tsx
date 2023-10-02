import { AiOutlineArrowLeft, AiOutlineSend } from "react-icons/ai";
import { BsHandThumbsUp } from "react-icons/bs";
import { Logo } from "../../images/logo";
import { user1, user2 } from "../../images/users";

const GroupChatBody = () => {
  const GroupUsers: Array<string> = ["lucy", "scoba"];
  const GroupUsersList: Array<string> = [];

  for (let index = 0; index < 6; index++) {
    GroupUsersList.push(...GroupUsers);
  }

  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col shadow-md p-3">
          <div className="flex flex-row justify-around">
            <div className="flex flex-row gap-3 items-center text-2xl font-[600]">
              <AiOutlineArrowLeft />
              <div className="">Group 1</div>
            </div>
            <div className="">
              <img className="w-16" src={Logo} alt="" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-[#9F9F9F] p-2 ps-5">
            {GroupUsersList.map((t, i) => {
              return <div>{t}</div>;
            })}
          </div>
        </div>
        <div className="flex flex-col shadow-md py-3 px-6  gap-3">
          <GroupChat2 />
          <GroupChat1 />
          <GroupChat2 />
          <div className="flex flex-row gap-4 self-center w-2/3 items-center">
            <div className="bg-[#EDB84226] p-2 rounded-md w-full">
              <input
                className="bg-[#EDB84208] outline-none p-3"
                placeholder="Ask me anything... "
                type="text"
              />
            </div>
            <button className="text-white bg-[#EDB842] font-[600] text-2xl p-5 w-fit h-fit rounded-full">
              <AiOutlineSend />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const GroupChat1 = () => {
  return (
    <div className="flex flex-col gap-3 bg-[#EDB84270] w-2/3 md:w-1/3 p-2 rounded-md">
      <div className="flex items-center gap-3">
        <img className="rounded-full w-16" src={user1} alt="" />
        <div className="">
          <div className="text-[#181818] font-[600]">Scoba</div>
          <div className="text-[#5C5C5C] text-sm">12th Sept 2023, 10:20am</div>
        </div>
      </div>
      <div className="border-b border-[#4D4C6675] pb-3">
        Advertising is a marketing communication that employs an openly
        sponsored, non-personal message to promote or sell a product, service or
        idea. Sponsors of advertising are typically businesses wishing to
        promote their products or services. Advertising is differentiated from
        public relations in that an advertiser pays for and has control over the
        message. It differs from personal selling in that the message is
        non-personal, i.e., not directed to a particular individual.
      </div>
      <div className="flex gap-2 items-center px-4">
        <span className="font-[400]">180</span>
        <BsHandThumbsUp />
      </div>
    </div>
  );
};

const GroupChat2 = () => {
  return (
    <div className="flex flex-col gap-3 bg-[#EDB84270] w-2/3 md:w-1/3 p-2 rounded-md">
      <div className="flex items-center gap-3">
        <img className="rounded-full w-16" src={user2} alt="" />
        <div className="">
          <div className="text-[#181818] font-[600]">Lucy</div>
          <div className="text-[#5C5C5C] text-sm">12th Sept 2023, 10:20am</div>
        </div>
      </div>
      <div className="border-b border-[#4D4C6675] pb-3">
        Advertising is a marketing communication that employs an openly
        sponsored, non-personal message to promote or sell a product, service or
        idea.
      </div>
      <div className="flex gap-2 items-center px-4">
        <span className="font-[400]">180</span>
        <BsHandThumbsUp />
      </div>
    </div>
  );
};
export default GroupChatBody;
