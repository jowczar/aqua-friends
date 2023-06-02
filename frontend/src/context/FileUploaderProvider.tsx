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
import crypto from "crypto";

type FileUploaderProviderProps = {
  children: React.ReactNode;
  defaultImage: string;
};

type FileUploader = {
  imageToUpload: File | null;
  setImageToUpload: (image: File) => void;
  uploadFile: () => Promise<string | null>;
  uploadedUrl: string | null;
  defaultImage: string;
};

const getRandomUUID = () =>
  typeof window !== "undefined"
    ? window.crypto.randomUUID()
    : crypto.randomUUID();

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
      return null;
    }

    const storage = getStorage();
    const userId = getAuth()?.currentUser?.uid;
    if (!userId) {
      toast.error("Please sign in to upload an image");
      return null;
    }

    const imageRef = storageRef(
      storage,
      `avatars/${userId}/${getRandomUUID()}`
    );

    return uploadBytes(imageRef, imageToUpload)
      .then(async (snapshot) => {
        const url = await getDownloadURL(snapshot.ref);
        setUploadedUrl(url);
        return url;
      })
      .catch((error) => {
        toast.error(error.message);
        return null;
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
