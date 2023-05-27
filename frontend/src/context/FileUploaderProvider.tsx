"use client";

import { getAuth } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

type FileUploaderProviderProps = {
  children: React.ReactNode;
  defaultImage: string;
};

type FileUploader = {
  imageToUpload: File | null;
  setImageToUpload: (image: File) => void;
  uploadFile: () => Promise<string | void>;
  uploadedUrl: string | null;
  defaultImage: string;
};

export const FileUploaderContext = createContext<FileUploader | null>(null);

export const FileUploaderProvider = ({
  children,
  defaultImage,
}: FileUploaderProviderProps) => {
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const uploadFile = async () => {
    if (imageToUpload === null) {
      toast.error("Please select an image");
      return;
    }

    const storage = getStorage();
    const userId = getAuth()?.currentUser?.uid;
    if (!userId) {
      toast.error("Please sign in to upload an image");
      return;
    }

    const imageRef = storageRef(storage, `avatars/${userId}/${uuid()}`);

    return uploadBytes(imageRef, imageToUpload)
      .then(async (snapshot) => {
        const url = await getDownloadURL(snapshot.ref);
        toast(url);
        setUploadedUrl(url);
        return url;
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <FileUploaderContext.Provider
      value={{
        imageToUpload,
        setImageToUpload,
        uploadFile,
        uploadedUrl,
        defaultImage,
      }}
    >
      {children}
    </FileUploaderContext.Provider>
  );
};

export default FileUploaderProvider;
