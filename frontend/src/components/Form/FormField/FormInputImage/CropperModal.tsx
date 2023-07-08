import { Cropper, ReactCropperElement } from "react-cropper";
import { useRef } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";

import "cropperjs/dist/cropper.css";

type CropperModalProps = {
  image: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (canvas: HTMLCanvasElement) => void;
};

const CropperModal = ({
  image,
  isOpen,
  setIsOpen,
  onSubmit,
}: CropperModalProps) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    onSubmit(cropper.getCroppedCanvas());
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-50 left-0 top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <Dialog.Panel className="w-full max-w-lg rounded bg-white p-6">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row justify-between items-center w-full">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Crop image
            </Dialog.Title>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src="/close.svg"
                width={40}
                height={40}
                className="w-5 h-5"
                alt="exit"
              />
            </button>
          </div>
          <div className="w-full h-full">
            <Cropper
              src={image}
              style={{ height: 400, width: "100%" }}
              initialAspectRatio={1}
              guides={false}
              ref={cropperRef}
            />
          </div>
          <button
            type="button"
            className="bg-primary mt-4 rounded px-4 py-2 text-white text-xs cursor-pointer transition w-full hover:bg-[#2644a8] active:bg-[#2644a8]"
            onClick={onCrop}
          >
            Crop image and update avatar
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default CropperModal;
