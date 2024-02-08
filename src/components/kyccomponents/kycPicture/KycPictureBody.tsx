import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { kycDisplayPictureAction } from "../../../redux/actions/userDashboard/kyc.actions";
import { GetUserProfileAction } from "../../../redux/actions/userDashboard/profile.actions";
import { KYC_DISPLAY_PICTURE_RESET } from "../../../redux/constants/userDashboard/kyc.constants";
import { ReducersType } from "../../../redux/store";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { kycDisplayPictureType } from "../../../redux/types/kyc.types";
import { ImageType, adminUGetUserType } from "../../../redux/types/users.types";

const KycPictureBody = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<kycDisplayPictureType>({});
  const [fetchedData, setFetchedData] = useState<{ image?: ImageType[] }>({});

  // fetch data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProfileDetailsRedux = useSelector(
    (state: ReducersType) => state?.getProfile
  ) as ReduxResponseType<adminUGetUserType>;

  useEffect(() => {
    dispatch(GetUserProfileAction() as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getProfileDetailsRedux?.serverResponse?.data) {
      setFetchedData((prevState) => ({
        ...prevState,
        ...getProfileDetailsRedux?.serverResponse?.data,
      }));
    }
  }, [getProfileDetailsRedux?.serverResponse?.data]);

  const kycDisplayPictureReducer = useSelector(
    (state: ReducersType) => state?.kycDisplayPicture
  ) as ReduxResponseType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      dispatch(kycDisplayPictureAction(formData) as any);
      // console.log(formData);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData((prevState) => ({
        ...prevState,
        image: file,
        // [e.target.name]: e.target.value,
      }));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData((prevState) => ({
        ...prevState,
        image: file,
        // [e.target.name]: e.target.value,
      }));
    }
  };

  useEffect(() => {
    // updateProfileSocialRedux?.error &&
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     timer: 5000,
    //     text: updateProfileSocialRedux?.error,
    //   });
    kycDisplayPictureReducer?.success &&
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 5000,
        text: kycDisplayPictureReducer?.serverResponse?.message,
      });
    if (kycDisplayPictureReducer?.success) {
      setTimeout(function () {
        // dispatch(GetUserProfileAction() as any);
        navigate("/kyc/company/info");
      }, 1000);
      setTimeout(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch({ type: KYC_DISPLAY_PICTURE_RESET });
      }, 2000);
    }
  }, [kycDisplayPictureReducer, dispatch, navigate]);
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col p-3 md:p-10 h-full w-full justify-center items-center my-10">
        <div className="bg-[#EDB84233] flex flex-row p-3 md:p-10 text-center items-center max-w-xl rounded-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-[#FFFFFF] m-0 w-full py-8 px-3 md:px-6 rounded-md shadow-lg flex flex-col gap-4"
          >
            <div className="font-[700] text-[13px] md:text-[20px] text-[#191C1F]">
              Profile picture
            </div>
            <div className="font-[400] text-[11px] md:text-[15px] text-[#5F6C72]">
              Upload a picture below
            </div>
            <div className="flex flex-col w-full shadow-sm rounded-md p-2">
              <div className="p-3">
                <ol type="1" className="text-left text-[#5F6C72]">
                  <li>1.The Picture should show your face</li>
                  <li>2.The Picture should be clear</li>
                  <li>3.the picture should be of good quality</li>
                </ol>
              </div>
              {/* <div className="font-[600] text-lg text-[#1D1F2C]">Thumbnail</div> */}
              <div className="">
                {/* <label className="font-[400] text-sm text-[#777980]" htmlFor="">
                  Photo
                </label> */}
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
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected"
                        className="mx-auto h-32"
                      />
                    ) : Array.isArray(fetchedData?.image) &&
                      fetchedData?.image.length >= 1 &&
                      !selectedFile ? (
                      <img
                        src={fetchedData?.image[0].url}
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
                          Browse
                        </button>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="">
              {kycDisplayPictureReducer?.error && (
                <div className="text-[#DB4444]">
                  {kycDisplayPictureReducer?.error}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="p-2 flex flex-row justify-center gap-3 items-center rounded-md bg-[#EDB842] text-center text-white"
            >
              {kycDisplayPictureReducer?.loading ? (
                <div className="" style={{ height: "25px" }}>
                  <PulseLoader color="#ffffff" />
                </div>
              ) : (
                <>
                  <span>Submit</span>
                  <AiOutlineArrowRight />
                </>
              )}
            </button>
            <hr />
            <div className="text-[#475156] text-[11px] md:text-[15px]">
              Fill in the required information and click continue to proceed to
              next section
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default KycPictureBody;
