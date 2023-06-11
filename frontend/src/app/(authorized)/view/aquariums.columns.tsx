import AquaViewAquariumsActions from "@/components/DataTables/AquaViewAquariumsActions";
import { HealthStatus } from "@/enums/HealthStatus.enum";
import Image from "next/image";
import { AquaViewAquariumDataProps } from "./page";
import { Row } from "react-table";

export const getAquariumsColumns = (
  aquariums: AquaViewAquariumDataProps[],
  setAquariums: React.Dispatch<
    React.SetStateAction<AquaViewAquariumDataProps[]>
  >
) => {
  return [
    {
      Header: "Owner",
      accessor: "name",
      centerHeader: false,
      Cell: ({ row }: { row: Row<AquaViewAquariumDataProps> }) => {
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-15 w-15 hidden xl:block">
              <Image
                className="h-15 w-15 rounded-full"
                src={row.original.avatar ? row.original.avatar : "man.png"}
                alt="Default avatar"
                height={62}
                width={62}
              />
            </div>
            <div className="text-left ml-4">
              <div className="text-xs lg:text-sm font-medium text-gray-900 md:break-all">
                {row.original.name}
              </div>
              <div className="text-xs lg:text-sm text-gray-500 whitespace-normal md:break-all">
                {row.original.email}
              </div>
            </div>
          </div>
        );
      },
    },

    {
      Header: "Aquarium Title",
      accessor: "aquariumTitle",
      centerHeader: true,
    },
    {
      Header: "Aquarium Size",
      accessor: "aquariumSize",
      centerHeader: true,
    },
    {
      Header: "Health Status",
      accessor: "healthStatus",
      centerHeader: true,
      Cell: ({ row }: { row: Row<AquaViewAquariumDataProps> }) => (
        <span
          className={`px-4 xl:px-8 py-2 inline-flex text-xs xl:text-sm leading-5 font-semibold rounded-full ${
            row.original?.healthStatus === HealthStatus.GOOD
              ? "bg-green-500 bg-opacity-25 text-green-600"
              : " bg-red-500 bg-opacity-25 text-red-600"
          }`}
        >
          {row.original.healthStatus}
        </span>
      ),
    },
    {
      Header: "",
      accessor: "actions",
      centerHeader: false,
      Cell: ({ row }: { row: Row<AquaViewAquariumDataProps> }) => (
        <div className="flex justify-center">
          <AquaViewAquariumsActions<AquaViewAquariumDataProps>
            singleAquarium={row.original}
            aquariums={aquariums}
            setAquariums={setAquariums}
          />
        </div>
      ),
    },
  ];
};
