import pdfImage from "../../../../images/pdf.png";
import mp4Image from "../../../../images/mp4.png";
// import mkvImage from "../../../../images/mkv.png";
import mp3Image from "../../../../images/mp3.png";
// import movImage from "../../../../images/mov.png";
// import aviImage from "../../../../images/avi.png";
// import webmImage from "../../../../images/webm.png";
// import pptImage from "../../../../images/ppt.png";
// import docImage from "../../../../images/doc.png";
// import xlsImage from "../../../../images/xls.png";
// import txtImage from "../../../../images/txt.png";
// import wavImage from "../../../../images/wav.png";
// import unknownImage from "../../../../images/unknown.png";

const SelectedFilesPreview = ({ fileList }: { fileList: any[] }) => {
  return (
    <div className="flex gap-2 ">
      {fileList?.length ? (
        fileList?.map((file, index) => {
          return (
            <div
              key={index}
              className=" flex gap-2 w-24 h-24 p-2 overflow-x-auto shadow-xl"
            >
              {file.type.includes("image") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="uploaded"
                  className="object-fit w-full h-full"
                />
              ) : file.type.includes("video") ? (
                <img
                  src={mp4Image}
                  alt="video placeholder"
                  className="object-fit w-full h-full"
                />
              ) : file.type.includes("application") ? (
                <img
                  src={pdfImage}
                  alt="documentplace holder placeholde"
                  className="object-fit w-full h-full"
                />
              ) : file.type.includes("audio") ? (
                <img
                  src={mp3Image}
                  alt="audio placeholder"
                  className="object-fit w-full h-full"
                />
              ) : (
                <></>
              )}
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default SelectedFilesPreview;
