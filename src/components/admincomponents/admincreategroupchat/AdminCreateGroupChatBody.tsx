import { useEffect, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { adminCreateGroupChatAction } from "../../../redux/actions/admin/groupchat.actions";
import { adminGroupChatType } from "../../../redux/types/groupchat.types";
import { ADMIN_CREATE_GROUPCHAT_RESET } from "../../../redux/constants/admin/groupchat.constants";

const AdminCreateGroupChat = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<adminGroupChatType>({
    name: "",
    description: "",
    status: "active",
    admin_id: "",
  });
  const { name, description } = formData;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setSelectedFile(file);
      setFormData((prevState) => ({
        ...prevState,
        files: file,
      }));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files;
    if (file) {
      setSelectedFile(file);
      setFormData((prevState) => ({
        ...prevState,
        files: file,
      }));
    }
  };

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  let adminCreateGroupchatRedux = useSelector(
    (state: ReducersType) => state?.adminCreateGroupchat
  ) as ReduxResponseType;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name && description) {
      dispatch(adminCreateGroupChatAction(formData) as any);
    }
  };

  useEffect(() => {
    adminCreateGroupchatRedux?.error &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: adminCreateGroupchatRedux?.error,
      });
    adminCreateGroupchatRedux?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: adminCreateGroupchatRedux?.serverResponse?.message,
      });
    if (adminCreateGroupchatRedux?.success) {
      setTimeout(function () {
        navigate("/admin/groupchat/list");
      }, 4000);
    }
    setTimeout(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dispatch({ type: ADMIN_CREATE_GROUPCHAT_RESET });
    }, 2000);
  }, [adminCreateGroupchatRedux, dispatch, navigate]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex justify-between px-2">
          <h2 className="flex font-bold text-[1.5rem]">Group Chat</h2>
          <button
            onClick={handleSubmit}
            className="flex gap-2 bg-[#EDB842] rounded-md px-6 py-2"
          >
            {adminCreateGroupchatRedux?.loading ? (
              <div className="" style={{ height: "25px" }}>
                <PulseLoader color="#ffffff" />
              </div>
            ) : (
              <span className="flex my-auto text-white font-semibold">
                Publish Now
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex flex-col w-full md:w-1/4 lg:w-1/5 shadow-sm rounded-md p-2">
          <div className="font-[600] text-lg text-[#1D1F2C]">Group Photo</div>
          <div className="">
            <label className="font-[400] text-sm text-[#777980]" htmlFor="">
              Photo
            </label>
            <div
              className="border-2 border-dashed border-[#E0E2E7] p-4 text-center rounded-md bg-[#F9F9FC]"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                id="pictureInput"
              />
              <label
                className="flex flex-col justify-center"
                htmlFor="pictureInput"
              >
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile?.[0])}
                    alt="Selected"
                    className="mx-auto h-32"
                  />
                ) : (
                  <div className="flex flex-col justify-center gap-2">
                    <div className="mx-auto p-2 bg-[#EDB842] rounded-md text-white">
                      <BsFillImageFill />
                    </div>
                    <span className="text-[#858D9D] text-sm">
                      Drag and drop image here, or click add image
                    </span>
                    <button className="bg-[#EDB84233] text-[#EDB842] px-4 py-2 rounded-lg mt-2">
                      Add Image
                    </button>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
        <form className="flex flex-col w-full md:w-3/4 lg:w-4/5 shadow-sm rounded-md p-3 gap-3">
          <div className="font-[600] text-lg text-[#1D1F2C]">
            General Information
          </div>
          <div className="text-[#777980] flex flex-col gap-2 text-sm">
            <label htmlFor="">Group Name</label>
            <input
              className="border p-2 rounded-md bg-[#F9F9FC]"
              type="text"
              placeholder="Type group name here. . ."
              onChange={onChange}
              name="name"
              autoFocus={true}
              autoComplete="off"
              required
            />
          </div>
          <div className="text-[#777980] flex flex-col gap-2 text-sm">
            <label htmlFor="">Description</label>
            <textarea
              className="border p-2 rounded-md bg-[#F9F9FC]"
              name="description"
              placeholder="Type description here. . ."
              id=""
              cols={30}
              rows={6}
              onChange={onChange}
              autoComplete="off"
              required
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateGroupChat;
