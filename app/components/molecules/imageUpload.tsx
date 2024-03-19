"use client";


import imageHelper from "@/app/helpers/imageHelper";
import { CldUploadButton } from "next-cloudinary";
import PopupData from "./PopUpData";

const ImageUpload = () => {
  const handleUploadSuccess = async (response:any) => {

    const url = response.info.secure_url;

    // const res = await imageHelper(PopupData,url);

    console.log("Upload successful:", url);

  };

  const handleUploadError = (error:any) => {
    console.error("Upload error:", error);
  };

  return (
    <div>
      <CldUploadButton
        options={{ multiple: true }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onSuccess={handleUploadSuccess}
        onError={handleUploadError}
      >
        <span className="px-4 py-2 bg-custPrimary hover:bg-custPrimary/80 text-custWhite rounded-sm">
          Upload Gambar
        </span>
      </CldUploadButton>
    </div>
  );
};


export default ImageUpload;
