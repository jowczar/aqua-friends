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
  formType: "compability" | "add"
};

const AddFishModal = ({ isOpen, setIsOpen, formType }: AddFishModalProps) => {
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
              Add new fish
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
          {formType === "add" && (
            <>
              <Dialog.Description className="text-sm text-gray-500">
                Add new fish. Don't forget to adjust compability later!
              </Dialog.Description>
              <Form onSubmit={() => setIsOpen(false)} />
            </>
          )}
          {formType === "compability" && (
            <>
              <Dialog.Description className="text-sm text-gray-500">
                Change compability of fishes. Available values are: C – caution, Y - no problems, N – don't match
              </Dialog.Description>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

// TODO: this route is not protected from non-admins users
export default function Fishes() {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState("compability");
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
      <AddFishModal isOpen={isOpen} setIsOpen={setIsOpen} formType={formType} />
      <button
        className="self-end bg-primary rounded px-4 py-2 text-white text-sm cursor-pointer transition w-fit hover:bg-[#2644a8] active:bg-[#2644a8]"
        onClick={() => {
          setFormType("add");
          setIsOpen(true);
        }}
      >
        Add new fish
      </button>
      <button
        className="self-end border ml-4 border-primary rounded px-4 py-2 text-black text-sm cursor-pointer transition w-fit hover:border-[#2644a8] hover:bg-slate-200 active:bg-slate-200 active:border-[#2644a8]"
        onClick={() => {
          setFormType("compability"); 
          setIsOpen(true);
        }}
      >
        Change compability rules
      </button>
      <DataTable columnsData={columns} rowsData={fishes} itemsPerPage={10} />
    </div>
  );
}
