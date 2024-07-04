"use client";
import React from "react";

import { UploadDropzone } from "@/lib/uploadThing";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface IProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}
const FileUpload = ({ onChange, endpoint }: IProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error.message || "something is not right"}`);
      }}
    />
  );
};

export default FileUpload;
