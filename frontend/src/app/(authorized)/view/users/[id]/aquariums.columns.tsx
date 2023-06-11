import AquaViewAquariumsActions from "@/components/DataTables/AquaViewAquariumsActions";
import { HealthStatus } from "@/enums/HealthStatus.enum";

import { UserAquariumDataProps } from "./page";
import { Row } from "react-table";

export const getAquariumsColumns = (
  aquariums: UserAquariumDataProps[],
  setAquariums: React.Dispatch<React.SetStateAction<UserAquariumDataProps[]>>
) => {
  return [
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
      Cell: ({ row }: { row: Row<UserAquariumDataProps> }) => (
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
      Cell: ({ row }: { row: Row<UserAquariumDataProps> }) => (
        <div className="flex justify-center">
          <AquaViewAquariumsActions<UserAquariumDataProps>
            singleAquarium={row.original}
            aquariums={aquariums}
            setAquariums={setAquariums}
          />
        </div>
      ),
    },
  ];
};
