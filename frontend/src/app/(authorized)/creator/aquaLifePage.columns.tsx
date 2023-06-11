import AquaLifeActions from "@/components/DataTables/AquaLifeActions";
import { Environment } from "@/enums/Environment.enum";
import Image from "next/image";

export const getAquaLifeColumns = () => {
  return [
    {
      Header: "Product",
      accessor: "name",
      centerHeader: false,
      Cell: ({ row }: any) => {
        const item = row.original;
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-15 w-15 hidden xl:block">
              <Image
                className="h-15 w-15 rounded-full"
                src={item.image ? item.image : "man.png"}
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
                {item.description}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      Header: "Size",
      accessor: "size",
      centerHeader: true,
    },
    {
      Header: "Environment",
      accessor: "healthStatus",
      centerHeader: true,
      Cell: ({ row }: any) => (
        <span
          className={` px-2 xl:px-8 py-2 inline-flex  text-xs xl:text-sm leading-5 font-semibold rounded-full ${
            row.original?.environment === Environment.COMPATIBLE
              ? "bg-green-500 bg-opacity-25 text-green-600"
              : "bg-red-500 bg-opacity-25 text-red-600"
          }`}
        >
          {row.original.environment}
        </span>
      ),
    },
    {
      Header: "",
      accessor: "actions",
      centerHeader: false,
      Cell: ({ row }: any) => (
        <div className="flex justify-center">
          <AquaLifeActions />
        </div>
      ),
    },
  ];
};
