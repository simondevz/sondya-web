import { useEffect, useMemo, useRef, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { BsCart, BsGift, BsMessenger, BsSend, BsTwitter } from "react-icons/bs";
import { MdEmail, MdFacebook } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfileAction } from "../../redux/actions/userDashboard/profile.actions";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { adminUGetUserType } from "../../redux/types/users.types";

const ReferalBody = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      setCopied(true);
    }
  };

  // fetch data
  const dispatch = useDispatch();

  const getProfileDetailsRedux = useSelector(
    (state: ReducersType) => state?.getProfile
  ) as ReduxResponseType<adminUGetUserType>;

  const userData = useMemo(() => {
    return getProfileDetailsRedux?.serverResponse?.data;
  }, [getProfileDetailsRedux]);

  useEffect(() => {
    dispatch(GetUserProfileAction() as any);
  }, [dispatch]);

  return (
    <section className="flex flex-col justify-center items-center px-3 py-5">
      <div className="flex flex-col gap-3 max-w-[45rem] items-center">
        <div className="text-2xl font-[600]">
          Refer a friend! Give $20, Get $20
        </div>
        <button className="bg-[#EDB842] p-2 w-full rounded-md">
          Already 57683 customers shared this offer with friends.
        </button>
        <div className="bg-[#F2F4F7] p-4 md:p-6 w-full flex flex-col gap-4">
          <div className="text-center">
            Get your referral link to give your friends a $20 discount when they
            shop at Sondya. If they use it, we’ll reward you with $20.
          </div>
          <div className="mx-auto w-fit text-xl font-[600]">Share the love</div>
          <div className="flex gap-5 items-center">
            <div className="p-2 w-fit h-fit bg-white rounded-full border border-[#000000]">
              <BsSend />
            </div>
            <div className="font-[400] text-sm">
              Invite your friends to<span className="font-[600]"> Sondya</span>.
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div className="p-2 w-fit h-fit bg-white rounded-full border border-[#000000]">
              <BsCart />
            </div>
            <div className="font-[400] text-sm">
              Your friends get $20 off their first purchase.
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div className="p-2 w-fit h-fit bg-white rounded-full border border-[#000000]">
              <BsGift />
            </div>
            <div className="font-[400] text-sm">
              You get $20 for every friend that makes a $50 purchase.
            </div>
          </div>
          <div className="mx-auto w-fit text-[#122460]">
            Or copy your personal link
          </div>
          <div className="flex items-center w-full">
            <input
              ref={inputRef}
              placeholder="Sondyascoba.io"
              className="border border-black p-3 h-full w-full rounded-sm"
              type="text"
              defaultValue={
                window.location.origin + "/register?referrer=" + userData.email
              }
            />
            <div
              onClick={handleCopyClick}
              className="p-4 text-xl bg-[#EDB842] h-full text-white rounded-sm"
            >
              <BiCopy />
            </div>
          </div>
          <div className="text-[#001246] flex gap-4 mx-auto font-[700]">
            <input type="checkbox" />
            <div className="">I agree to Term & Conditions</div>
          </div>
          <div className="mx-auto font-[700]">Invite now using:</div>
          <div className="flex gap-3 items-center text-3xl text-[#001246] w-fit mx-auto">
            <MdEmail />
            <MdFacebook />
            <BsMessenger />
            <BsTwitter />
          </div>
          <button className="bg-[#EDB842] p-2 text-white font-[600] rounded-md">
            Start referring
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReferalBody;
