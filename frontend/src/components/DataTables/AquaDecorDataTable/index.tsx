import React, { useState } from "react";
import Tabs from "./Tabs";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import Image from "next/image";

type AquaDecorDataTableProps = {
  columnTitle: string;
  isSingleAnswer: boolean;
  currentTab: any;
  setCurrentTab: any;
  items: any[];
};

const AquaDecorDataTable = ({
  columnTitle,
  isSingleAnswer,
  currentTab,
  setCurrentTab,
  items,
}: AquaDecorDataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto">
      <div className="flex justify-between w-full mb-2">
        <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <Search />
      </div>
      <div className="bg-white rounded-xl shadow-sm mt-4 pb-2 w-full">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-gray-200">
                <thead className="mt-3">
                  <tr>
                    <th
                      scope="col"
                      className="px-8 pt-6 pb-3 text-left text-lg font-medium text-gray-600 "
                    >
                      {columnTitle}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-15 w-15">
                            <Image
                              className="rounded-full"
                              src={item.image ? item.image : "default_fish.png"}
                              alt="Default image"
                              height={70}
                              width={80}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {isSingleAnswer ? (
                          <input type="radio" name="item" />
                        ) : (
                          <button onClick={() => console.log("Add item")}>
                            Add
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AquaDecorDataTable;
