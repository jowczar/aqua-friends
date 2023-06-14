import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HealthStatus } from "@/enums/HealthStatus.enum";
import Pagination from "../Pagination";
import AquaViewActions from "./AquaViewActions";
import AquaLifeActions from "./AquaLifeActions";
import { Environment } from "@/enums/Environment.enum";
import { paginationDataHandler } from "./helpers";

type DataTableProps = {
  columns: string[];
  data: Record<string, any>[];
  itemsPerPage: number;
  allowAquaViewActions?: boolean;
  allowAquaLifeActions?: boolean;
  allowImages: boolean;
};

type ItemEntries = [
  key: string,
  value: any //TODO: what type of type should be here?
];

const excludedKeys = [
  "id",
  "image",
  "avatar",
  "name",
  "description",
  "email",
  "healthStatus",
  "environment",
  "isLiked",
];

const excludedKeysMobile = [
  "id",
  "image",
  "avatar",
  "isLiked",
  "name",
  "description",
  "email",
];

const DataTable = ({
  data,
  columns,
  itemsPerPage,
  allowAquaViewActions,
  allowAquaLifeActions,
  allowImages,
}: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<Record<string, any>[]>([]);
  const [activeElementId, setActiveElementId] = useState<number>(0);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const paginationData = paginationDataHandler(
    items,
    itemsPerPage,
    currentPage
  );

  const healthStatus = (item: Record<string, any>) => {
    return (
      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-center">
        <span
          className={`px-4 xl:px-8 py-2 inline-flex text-xs xl:text-sm leading-5 font-semibold rounded-full ${
            item?.healthStatus === HealthStatus.GOOD
              ? "bg-green-500 bg-opacity-25 text-green-600"
              : " bg-red-500 bg-opacity-25 text-red-600"
          }`}
        >
          {item.healthStatus}
        </span>
      </td>
    );
  };

  const environment = (item: Record<string, any>) => {
    return (
      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-center">
        <span
          className={` px-2 xl:px-8 py-2 inline-flex  text-xs xl:text-sm leading-5 font-semibold rounded-full ${
            item?.environment === Environment.COMPATIBLE
              ? "bg-green-500 bg-opacity-25 text-green-600"
              : "bg-red-500 bg-opacity-25 text-red-600"
          }`}
        >
          {item.environment}
        </span>
      </td>
    );
  };

  const firstColumnData = (item: Record<string, any>) => {
    const imageUrl = item?.image || item?.avatar;

    const secondText = item?.description || item?.email;

    return (
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="">
          <div className="cursor-pointer md:flex md:items-center md:cursor-default">
            {allowImages && (
              <div className="flex-shrink-0 h-15 w-15 hidden xl:block">
                <Image
                  className="h-15 w-15 rounded-full"
                  src={imageUrl ? imageUrl : "/man.png"}
                  alt="Default avatar"
                  height={62}
                  width={62}
                />
              </div>
            )}
            <div className="text-center md:text-left ml-4">
              <div className="text-xs lg:text-sm font-medium text-gray-900 md:break-all">
                {item.name}
              </div>
              {secondText && (
                <div className="text-xs lg:text-sm text-gray-500 whitespace-normal md:break-all">
                  {secondText}
                </div>
              )}
              {activeElementId === item.id && (
                <div className="flex flex-col md:hidden">
                  {Object.entries(item).map(([key, value]: ItemEntries) => {
                    //TODO: Im nots sure if it is the best way to do this, but has no idea for now
                    if (!excludedKeysMobile.includes(key)) {
                      return (
                        <>
                          <td className="table-cell md:hidden px-4 py-2 whitespace-normal text-sm text-gray-500 text-center ">
                            {value}
                          </td>
                        </>
                      );
                    }
                  })}

                  {allowAquaLifeActions && <AquaLifeActions isMobileView />}
                  {allowAquaViewActions && (
                    <AquaViewActions
                      item={item}
                      items={items}
                      setItems={setItems}
                      isMobileView={true}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </td>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 flex flex-col">
          <div className="overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-00">
              <thead className="">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className={`px-6 py-6 ${
                        index === 0
                          ? "text-center text-xl md:text-left md:text-base"
                          : "text-center hidden md:table-cell"
                      } text-base font-medium`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginationData.currentItems.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() =>
                      setActiveElementId(
                        activeElementId === item.id ? null : item.id
                      )
                    }
                  >
                    {firstColumnData(item)}

                    {Object.entries(item).map(([key, value]: ItemEntries) => {
                      //TODO: Im nots sure if it is the best way to do this, but has no idea for now
                      if (!excludedKeys.includes(key)) {
                        return (
                          <>
                            <td className="hidden md:table-cell xl:px-6 py-4 whitespace-normal text-xs lg:text-sm text-gray-500 text-center md:break-all">
                              {value}
                            </td>
                          </>
                        );
                      }
                    })}

                    {item.hasOwnProperty("healthStatus") && healthStatus(item)}
                    {item.hasOwnProperty("environment") && environment(item)}

                    {allowAquaLifeActions && <AquaLifeActions />}
                    {allowAquaViewActions && (
                      <AquaViewActions
                        item={item}
                        items={items}
                        setItems={setItems}
                      />
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="w-full flex justify-center mt-8">
              <Pagination
                totalPages={paginationData.totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
