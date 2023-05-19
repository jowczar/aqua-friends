import React, { useState } from "react";
import Tabs from "./Tabs";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";

const itemsMock = [
  {
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Not Compatible",
  },
  {
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Not Compatible",
  },
  {
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Not Compatible",
  },
  {
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
];

type AquaDecorDataTableProps = {
  columnTitles: {
    firstColumn: string;
    secondColumn: string;
    thirdColumn: string;
  };
  isSingleAnswer: boolean;
  currentTab: any;
  setCurrentTab: any;
};

const AquaDecorDataTable = ({
  columnTitles,
  isSingleAnswer,
  currentTab,
  setCurrentTab,
}: AquaDecorDataTableProps) => {
  const [items, setItems] = useState(itemsMock);

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
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {columnTitles.firstColumn}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {columnTitles.secondColumn}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {columnTitles.thirdColumn}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap"></td>
                      <td className="px-6 py-4 whitespace-nowrap"></td>
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
