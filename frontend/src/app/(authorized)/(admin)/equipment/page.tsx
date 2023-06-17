"use client";

import DataTable from "@/components/DataTables";
import useFirestore from "@/hooks/useFirestore";
import { Dialog } from "@headlessui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import Form from "./form";
import { Fish } from "../../creator/AquaLifePage";
import { getFishData } from "../../creator/aquaLife.logic";

type AddFishModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const AddFishModal = ({ isOpen, setIsOpen }: AddFishModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      id="addFishModal"
      className="fixed z-50 left-0 top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="max-h-full">
        <Dialog.Panel className="w-full max-w-lg rounded bg-white p-6">
          <div className="flex flex-row justify-between items-center">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Add new equipment
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
              Add new equipment.
            </Dialog.Description>
            <Form onSubmit={() => setIsOpen(false)} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

// TODO: this route is not protected from non-admins users
export default function Fishes() {
  const [isOpen, setIsOpen] = useState(false);
  const [fishes, setFishes] = useState<Fish[]>([]);
  const columns = [
    {
      Header: "Image",
      accessor: "image",
      centerHeader: true,
    },
    {
      Header: "Name",
      accessor: "name",
      centerHeader: true,
    },
    {
      Header: "Species",
      accessor: "species",
      centerHeader: true,
    },
    {
      Header: "Type of water",
      accessor: "requirements.water",
      centerHeader: true,
    }
  ];
  const firestore = useFirestore();

  const fetchFishes = async () => {
    const fishes = getFishData(firestore, setFishes, true);
  
    // getFishData
    // const q = query(collection(firestore, "users"), where("admin", "==", true));
    // await getDocs(q).then((snapshot) => {
    //   const data = snapshot.docs.map((doc) => doc.data() as Fish);
    //   // setAdmins(data);
    // });
  };

  useEffect(() => {
    fetchFishes();
  }, []);

  return (
    <div className="my-10 px-5 lg:px-20">
      <AddFishModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <button
        className="self-end bg-primary rounded px-4 py-2 text-white text-sm cursor-pointer transition w-fit hover:bg-[#2644a8] active:bg-[#2644a8]"
        onClick={() => setIsOpen(true)}
      >
        Add new equipment
      </button>
      <DataTable columnsData={columns} rowsData={fishes} itemsPerPage={10} />
    </div>
  );
}
