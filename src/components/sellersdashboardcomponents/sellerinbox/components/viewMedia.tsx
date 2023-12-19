import pdfImage from "../../../../images/pdf.png";
import mp4Image from "../../../../images/mp4.png";
import mkvImage from "../../../../images/mkv.png";
import mp3Image from "../../../../images/mp3.png";
import movImage from "../../../../images/mov.png";
import aviImage from "../../../../images/avi.png";
import webmImage from "../../../../images/webm.png";
import pptImage from "../../../../images/ppt.png";
import docImage from "../../../../images/doc.png";
import xlsImage from "../../../../images/xls.png";
import txtImage from "../../../../images/txt.png";
import wavImage from "../../../../images/wav.png";
import unknownImage from "../../../../images/unknown.png";
import { fileAttachmentType } from "../../../../redux/types/chats.types";

const ViewMedia = ({ files }: { files: fileAttachmentType[] }) => {
  return (
    <div className="grid grid-cols-2">
      {files?.map((file) => {
        const fileUrl = file?.url;
        return (
          <div
            key={file._id}
            className=" flex gap-2 w-24 h-24 p-2 overflow-x-auto shadow-xl"
          >
            {file?.format === "pdf" ? (
              <a href={fileUrl} download={file?.filename}>
                <img
                  src={pdfImage}
                  alt="uploaded"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "mp4" ? (
              <a href={fileUrl} download={file?.filename}>
                <img
                  src={mp4Image}
                  alt="video placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "mp3" ? (
              <a href={fileUrl} download={file?.filename}>
                <img
                  src={mp3Image}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "png" ||
              file?.format === "jpg" ||
              file?.format === "jpeg" ? (
              <a href={fileUrl} download={file?.filename}>
                <img
                  src={fileUrl}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "txt" ? (
              <a href={fileUrl} download={file?.filename}>
                <img
                  src={txtImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "doc" || file?.format === "docx" ? (
              <a href={fileUrl} download={file?.filename}>
                <img
                  src={docImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file.format === "ppt" || file.format === "pptx" ? (
              <a href={fileUrl} download={file?.filename}>
                <img
                  src={pptImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "xls" || file.format === "xlsx" ? (
              <a href={fileUrl} download={file?.filename}>
                <img
                  src={xlsImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "mkv" ? (
              <a href={fileUrl} download={file?.filename}>
                <img
                  src={mkvImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "avi" ? (
              <a href={fileUrl} download={file?.filename}>
                <img
                  src={aviImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "webm" ? (
              <a href={fileUrl} download={file?.filename}>
                <img
                  src={webmImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "mov" ? (
              <a href={fileUrl} download={file?.filename}>
                <img
                  src={movImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : file?.format === "wav" ? (
              <a href={fileUrl} download={file?.filename}>
                <img
                  src={wavImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            ) : (
              <a href={fileUrl} download={file?.filename}>
                <img
                  src={unknownImage}
                  alt="placeholder"
                  className="object-fit w-full h-full"
                />
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ViewMedia;
