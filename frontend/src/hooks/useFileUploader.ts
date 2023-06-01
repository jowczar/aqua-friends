import { FileUploaderContext } from "@/context/FileUploaderProvider";
import { useContext } from "react";

const useFileUploader = () => {
  const fileUploader = useContext(FileUploaderContext);
  if (!fileUploader) {
    throw new Error(
      "When using `useFileUploader`, the page must be wrapped in `FileUploaderProvider`."
    );
  }
  return fileUploader;
};

export default useFileUploader;
