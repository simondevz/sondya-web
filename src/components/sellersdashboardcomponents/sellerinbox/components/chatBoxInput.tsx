import { AiOutlineSend } from "react-icons/ai";
import { MdOutlineAttachFile } from "react-icons/md";

const ChatBoxInput = ({
  message,
  setMessage,
  handleSendMesage,
  setFiles,
}: {
  message: string;
  setMessage: (value: React.SetStateAction<string>) => void;
  handleSendMesage: () => Promise<void>;
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const acceptedFormats: string =
    ".png, .jpg, .jpeg, .mp4, .webm, .mkv, .avi, .mov, .wav, .mp3, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt";
  return (
    <div className="flex flex-row border-t p-3 mt-auto">
      <input
        className="p-2 outline-none flex-1"
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(event) => setMessage(event?.target.value)}
      />
      <button className="text-2xl text-white bg-[#EDB842] relative rounded-md mx-2">
        <label className="p-2 flex cusor-pointer" htmlFor="files_input">
          <MdOutlineAttachFile />
        </label>
      </button>
      <input
        className="hidden"
        type="file"
        multiple
        accept={acceptedFormats}
        onChange={(event) =>
          setFiles(event.target.files as unknown as Array<any>)
        }
        id="files_input"
      />
      <button
        onClick={handleSendMesage}
        className="p-2 text-2xl text-white bg-[#EDB842] rounded-md"
      >
        <AiOutlineSend />
      </button>
    </div>
  );
};

export default ChatBoxInput;
