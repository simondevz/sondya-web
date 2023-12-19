import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Chat1 } from "../../../../images/chat";
import { userGetProductByIdAction } from "../../../../redux/actions/userDashboard/products.action";
import { userGetServiceByIdAction } from "../../../../redux/actions/userDashboard/services.actions";
import { chatMessageType } from "../../../../redux/types/chats.types";
import { AdminGetProductType } from "../../../../redux/types/products.types";
import { AdminGetServiceType } from "../../../../redux/types/services.types";
import FormatDate from "../../../shareables/dateFormatter";
import Attachment from "./attachment";
import ViewMedia from "./viewMedia";

const ChatMessage = ({
  message,
  setAttachment,
}: {
  message: chatMessageType;
  setAttachment: React.Dispatch<
    React.SetStateAction<
      | ((AdminGetProductType | AdminGetServiceType) & { isProduct: boolean })
      | undefined
    >
  >;
}) => {
  const dispatch = useDispatch();
  const service_id = message?.service_id;
  const product_id = message?.product_id;

  const [product, setProduct] = useState<AdminGetProductType>();
  const [service, setService] = useState<AdminGetServiceType>();

  useEffect(() => {
    if (product_id)
      dispatch(
        userGetProductByIdAction(
          product_id as string,
          setProduct as React.Dispatch<
            React.SetStateAction<
              (AdminGetProductType & { isProduct: boolean }) | undefined
            >
          >
        ) as any
      );
  }, [product_id, dispatch]);

  useEffect(() => {
    if (service_id)
      dispatch(
        userGetServiceByIdAction(
          service_id as string,
          setService as React.Dispatch<
            React.SetStateAction<
              (AdminGetServiceType & { isProduct: boolean }) | undefined
            >
          >
        ) as any
      );
  }, [service_id, dispatch]);

  return (
    <div key={message?._id} className={"flex flex-row gap-2 w-full my-2"}>
      <div className="">
        <img src={message?.sender_id?.image?.[0]?.url || Chat1} alt="" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-[600] flex gap-2">
          <span>
            {message?.sender_id?.first_name} {message?.sender_id?.last_name}
          </span>
          <FormatDate
            dateString={message.createdAt as string}
            className="text-[#939AAD]"
          />
        </div>
        <div className="text-[#636A80]">{message?.message}</div>

        {product?._id ? (
          <Attachment
            setAttachment={setAttachment}
            data={{ ...product, isProduct: true }}
            showforward
          />
        ) : (
          <></>
        )}
        {service?._id ? (
          <Attachment
            setAttachment={setAttachment}
            data={{ ...service, isProduct: false }}
            showforward
          />
        ) : (
          <></>
        )}
        {message?.file_attachments?.length ? (
          <ViewMedia files={message.file_attachments} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
