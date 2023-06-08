"use client";

import DataTable from "@/components/DataTables";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

type AddAdminModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clip-rule="evenodd"
    ></path>
  </svg>
);
const AddAdminModal = ({ isOpen, setIsOpen }: AddAdminModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      id="addAdminModal"
      className="fixed z-50 left-0 top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="max-h-full">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white p-4">
          <div className="flex flex-row justify-between items-center">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Add new admin
            </Dialog.Title>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="addAdminModal"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

// TODO: this route is not protected from non-admins users
export default function Admins() {
  const [isOpen, setIsOpen] = useState(false);
  const columns = ["Name", "Email"];

  const adminsMock = [
    {
      name: "John Doe",
      email: "john@doe.pl",
    },
    {
      name: "John Doe",
      email: "john@doe.pl",
    },
  ];

  return (
    <div className="my-10 px-5 lg:px-20">
      <AddAdminModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <button
        className="self-end bg-primary rounded px-4 py-2 text-white text-sm cursor-pointer transition w-fit hover:bg-[#2644a8] active:bg-[#2644a8]"
        onClick={() => setIsOpen(true)}
      >
        Add new admin
      </button>
      <DataTable
        data={adminsMock}
        columns={columns}
        itemsPerPage={10}
        allowImages={true}
      />
    </div>
  );
}
