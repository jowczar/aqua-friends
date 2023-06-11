import AquaViewUsersActions from "@/components/DataTables/AquaViewUsersActions";
import Image from "next/image";
import { AquaViewUserData } from "./data.logic";
import { Row } from "react-table";

export const getUsersColumns = (
  users: AquaViewUserData[],
  setUsers: React.Dispatch<React.SetStateAction<AquaViewUserData[]>>
) => {
  return [
    {
      Header: "User",
      accessor: "name",
      centerHeader: false,
      Cell: ({ row }: { row: Row<AquaViewUserData> }) => {
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
      Header: "Aquariums",
      accessor: "aquariums",
      centerHeader: true,
    },
    {
      Header: "",
      accessor: "actions",
      centerHeader: true,
      Cell: ({ row }: { row: Row<AquaViewUserData> }) => (
        <div className="flex justify-center">
          <AquaViewUsersActions
            singleUser={row.original}
            users={users}
            setUsers={setUsers}
          />
        </div>
      ),
    },
  ];
};
