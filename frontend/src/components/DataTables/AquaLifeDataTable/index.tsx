import React, { useState } from "react";
import Pagination from "@/components/Pagination";
import Image from "next/image";

import { Environment } from "@/enums/Environment.enum";

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

type AquaLifeDataTableProps = {
  columnTitles: {
    firstColumn: string;
    secondColumn: string;
    thirdColumn: string;
  };
};

const AquaLifeDataTable = ({ columnTitles }: AquaLifeDataTableProps) => {
  const [items, setItems] = useState(itemsMock);

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
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-15 w-15">
                          <Image
                            className="rounded-full"
                            src={item.image ? item.image : "default_fish.png"}
                            alt="Default image"
                            height={62}
                            width={124}
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

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{item.size}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-8 py-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                          item?.environment === Environment.COMPATIBLE
                            ? "px-11 bg-green-500 bg-opacity-25 text-green-600"
                            : "bg-red-500 bg-opacity-25 text-red-600"
                        }`}
                      >
                        {item.environment}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
            <div className="fixed bottom-9 w-1/2 mb-3 z-10 left-1/4 flex justify-center">
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
