import React, { useState } from "react";

const Modal = ({
  title,
  message,
  cancelButtonText,
  detailsButtonText,
  onCancelClick,
  onDetailsClick,
}: any) => {
  return (
    <>
      <div className="fixed top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-20 px-4 py-5 ">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px]"
        >
          <h3 className="text-dark pb-2 text-xl font-bold sm:text-2xl">
            {title}
          </h3>
          <span className="bg-primary mx-auto mb-6 inline-block h-1 w-[90px] rounded"></span>
          <p className="text-body-color mb-10 text-base leading-relaxed">
            {message}
          </p>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-1/2 px-3">
              <button
                onClick={() => {
                  onCancelClick && onCancelClick();
                }}
                className="text-dark block w-full rounded-lg border border-[#E9EDF9] p-3 text-center text-base font-medium transition hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                {cancelButtonText}
              </button>
            </div>
            <div className="w-1/2 px-3">
              <button
                onClick={onDetailsClick}
                className="bg-primary border-primary block w-full rounded-lg border p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90"
              >
                {detailsButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
