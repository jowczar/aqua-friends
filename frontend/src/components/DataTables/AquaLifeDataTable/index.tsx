import React, { useState } from "react";
import Pagination from "@/components/Pagination";
import Image from "next/image";

import { Environment } from "@/enums/Environment.enum";

const itemsMock = [
  {
    id: 3,
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    id: 6,
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Not Compatible",
  },
  {
    id: 8,
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Not Compatible",
  },
  {
    id: 20,
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    id: 22,
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Not Compatible",
  },
  {
    id: 25,
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    id: 31,
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    id: 32,
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    id: 35,
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    id: 45,
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    id: 55,
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    id: 100,
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
  {
    id: 101,
    image: "",
    name: "Fish 1",
    description: "description of fish",
    size: "12-23 cm",
    environment: "Compatible",
  },
];

type AquaLifeDataTableProps = {
  columnTitles: {
    firstColumn: string;
    secondColumn: string;
    thirdColumn: string;
  };
};

const AquaLifeDataTable = ({ columnTitles }: AquaLifeDataTableProps) => {
  const [items, setItems] = useState(itemsMock);
  const [activeItemId, setActiveItemId] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 flex flex-col min-h-screen">
          <div className="overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-6 text-center xs:text-xl mdAquaView:text-base font-medium"
                  >
                    {columnTitles.firstColumn}
                  </th>
                  <th
                    scope="col"
                    className="hidden mdAquaView:table-cell px-6 py-6 text-center text-base font-medium"
                  >
                    {columnTitles.secondColumn}
                  </th>
                  <th
                    scope="col"
                    className="hidden mdAquaView:table-cell px-6 py-6 text-center text-base font-medium"
                  >
                    {columnTitles.thirdColumn}
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {currentItems.map((item) => (
                  <tr key={item.id} onClick={() => setActiveItemId(item.id)}>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="mdAquaView:hidden">
                        <div className="mdAquaView:text-left text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                        {activeItemId === item.id && (
                          <>
                            <div className="text-sm text-gray-500">
                              Description: {item.description}
                            </div>
                            <div className="text-sm text-gray-500">
                              Size: {item.size}
                            </div>
                            <div className="text-sm text-gray-500">
                              Environment: {item.environment}
                            </div>
                            <div className="flex items-center justify-center">
                              <button
                                className="rounded-lg p-4  gap-3 text-blue-500 hover:text-blue-300"
                                onClick={() => console.log("Add button")}
                              >
                                <span>Add</span>
                              </button>
                              <button
                                className="rounded-lg p-4 gap-3 text-blue-500 hover:text-blue-300"
                                onClick={() => console.log("Remove button")}
                              >
                                <span>Remove</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="hidden mdAquaView:block">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-15 w-15 hidden lg:block">
                            <Image
                              className="h-15 w-15 rounded-full"
                              src={item.image ? item.image : "man.png"}
                              alt="Default avatar"
                              height={62}
                              width={62}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500 whitespace-normal break-all">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="hidden mdAquaView:table-cell px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-500">{item.size}</div>
                    </td>
                    <td className="hidden mdAquaView:table-cell px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={` lg:px-4 xl:px-8 py-2 inline-flex  md:text-xs xl:text-sm leading-5 font-semibold rounded-full ${
                          item?.environment === Environment.COMPATIBLE
                            ? "bg-green-500 bg-opacity-25 text-green-600"
                            : "bg-red-500 bg-opacity-25 text-red-600"
                        }`}
                      >
                        {item.environment}
                      </span>
                    </td>
                    <td className="hidden mdAquaView:table-cell px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center">
                        <button
                          className="rounded-lg p-4 flex items-center gap-3  text-blue-500 hover:text-blue-300"
                          onClick={() => console.log("View button")}
                        >
                          <span>Add</span>
                        </button>

                        <button
                          className="rounded-lg p-4 flex items-center gap-3  text-blue-500 hover:text-blue-300"
                          onClick={() => console.log("View button")}
                        >
                          <span>Remove</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full flex justify-center mt-8">
              <Pagination
                totalPages={totalPages}
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

export default AquaLifeDataTable;
