import AquaViewUsersActions from "@/components/DataTables/AquaViewUsersActions";
import Image from "next/image";
import { AquaViewUserData } from "./data.logic";

export const useUsersColumns = (
  users: AquaViewUserData[],
  setUsers: React.Dispatch<React.SetStateAction<AquaViewUserData[]>>
) => {
  return [
    {
      Header: "User",
      accessor: "name",
      Cell: ({ row }: any) => {
        const item = row.original;
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-15 w-15 hidden xl:block">
              <Image
                className="h-15 w-15 rounded-full"
                src={item.avatar ? item.avatar : "man.png"}
                alt="Default avatar"
                height={62}
                width={62}
              />
            </div>
            <div className="text-left ml-4">
              <div className="text-xs lg:text-sm font-medium text-gray-900 md:break-all">
                {item.name}
              </div>
              <div className="text-xs lg:text-sm text-gray-500 whitespace-normal md:break-all">
                {item.email}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      Header: "Aquariums",
      accessor: "aquariums",
    },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
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
