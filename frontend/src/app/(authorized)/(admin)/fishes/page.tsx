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
import RuleGrid from "@/components/RuleGrid";
import classNames from "classnames";

type AddFishModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  formType: "compatibility" | "add"
};

const initialRules = [
  {
    key: "Bass",
    rules: {
      Salmon: "y",
      Trout: "n",
      Bass: "y",
      Catfish: "n",
      Walleye: "n",
    },
  },
  {
    key: "Salmon",
    rules: {
      Salmon: "y",
      Trout: "n",
      Bass: "n",
      Catfish: "n",
      Walleye: "n",
    },
  },
  {
    key: "Trout",
    rules: {
      Salmon: "n",
      Trout: "y",
      Bass: "n",
      Catfish: "n",
      Walleye: "n",
    },
  },
  {
    key: "Catfish",
    rules: {
      Salmon: "n",
      Trout: "n",
      Bass: "n",
      Catfish: "y",
      Walleye: "n",
    },
  },
  {
    key: "Walleye",
    rules: {
      Salmon: "n",
      Trout: "n",
      Bass: "n",
      Catfish: "n",
      Walleye: "y",
    },
  },
];

const options = ["y", "n", "c"];

const AddFishModal = ({ isOpen, setIsOpen, formType, rules, onRuleChange }: AddFishModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      id="addFishModal"
      className="fixed z-50 left-0 top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="max-h-full">
        <Dialog.Panel className="w-full md:min-w-[540px] max-w-lg rounded bg-white p-6">
          <div className="flex flex-row justify-between items-center">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              {formType === "add" ? "Add new fish" : "Change fish compatibility"}
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
                Add new fish. Don't forget to adjust compatibility later!
              </Dialog.Description>
              <Form onSubmit={() => setIsOpen(false)} />
            </>
          )}
          {formType === "compatibility" && (
            <>
              <Dialog.Description className="text-sm text-gray-500">
                Available values are: <br /><b>C</b> – can match with caution,<br /> <b>Y</b> - no problems, <br /><b>N</b> – don't match<br />
              </Dialog.Description>
              <div className="flex flex-col gap-2 items-center mt-10">
                <RuleGrid rules={rules} options={options} onChange={onRuleChange} />
                  <button
                    onClick={() => {}}
                    type="submit"
                    className={classNames(
                      "bg-primary rounded px-4 py-2 mt-4   text-white text-xs cursor-pointer transition w-full",
                      "hover:bg-[#2644a8] active:bg-[#2644a8]",
                    )}
                  >
                    Save new rules
                  </button>
              </div>
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
  const [formType, setFormType] = useState("compatibility");
  const [fishes, setFishes] = useState<Fish[]>([]);
  const [rules, setRules] = useState(initialRules);
  const columns = [
    {
      Header: "Image",
      accessor: "image",
      centerHeader: false,
      Cell: props => (
        <Image src={props.row.original.image || "/no-equipment.png"} width={40} height={40} alt={props.name} className="w-12 h-12 rounded-full"></Image>
      )
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
      <AddFishModal isOpen={isOpen} setIsOpen={setIsOpen} formType={formType} rules={rules} onRuleChange={setRules} />
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
          setFormType("compatibility"); 
          setIsOpen(true);
        }}
      >
        Change compatibility rules
      </button>
      <DataTable columnsData={columns} rowsData={fishes} itemsPerPage={10} />
    </div>
  );
}
