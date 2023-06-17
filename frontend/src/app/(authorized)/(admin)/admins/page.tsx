"use client";

import DataTable from "@/components/DataTables";
import useFirestore from "@/hooks/useFirestore";
import { Dialog } from "@headlessui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import Form from "./form";

type AddAdminModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const AddAdminModal = ({ isOpen, setIsOpen }: AddAdminModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      id="addAdminModal"
      className="fixed z-50 left-0 top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="max-h-full">
        <Dialog.Panel className="w-full max-w-lg rounded bg-white p-6">
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
              <Image
                src="/close.svg"
                alt="exit"
                className="w-5 h-5"
                width={40}
                height={40}
              />
            </button>
          </div>
          <Dialog.Description className="text-sm text-gray-500">
            Administrators can manage all aspects of the app, including adding
            and removing other administrators.
          </Dialog.Description>
          <Form onSubmit={() => setIsOpen(false)} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

type Admin = {
  username: string;
  email: string;
  admin: boolean;
};

// TODO: this route is not protected from non-admins users
export default function Admins() {
  const [isOpen, setIsOpen] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const columns = [
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "E-mail",
      accessor: "email",
    },
  ];
  const firestore = useFirestore();

  const fetchAdmins = async () => {
    const q = query(collection(firestore, "users"), where("admin", "==", true));
    await getDocs(q).then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data() as Admin);
      setAdmins(data);
    });
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="my-10 px-5 lg:px-20">
      <AddAdminModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <button
        className="self-end bg-primary rounded px-4 py-2 text-white text-sm cursor-pointer transition w-fit hover:bg-[#2644a8] active:bg-[#2644a8]"
        onClick={() => setIsOpen(true)}
      >
        Add new admin
      </button>
      <DataTable columnsData={columns} rowsData={admins} itemsPerPage={10} />
    </div>
  );
}
