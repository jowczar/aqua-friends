import React, { useState } from "react";
import Pagination from "../../Pagination";
import Image from "next/image";
import { HealthStatus } from "@/enums/HealthStatus.enum";

const logsMock = [
  {
    id: 1,
    text: "something happened",
    otherText: "some other text",
  },
  {
    id: 1,
    text: "something happened",
    otherText: "some other text",
  },
  {
    id: 1,
    text: "something happened",
    otherText: "some other text",
  },
  {
    id: 1,
    text: "something happened",
    otherText: "some other text",
  },
  {
    id: 1,
    text: "something happened",
    otherText: "some other text",
  },
  {
    id: 1,
    text: "something happened",
    otherText: "some other text",
  },
  {
    id: 1,
    text: "something happened",
    otherText: "some other text",
  },
];

const LogsTable = () => {
  const [logs, setLogs] = useState(logsMock);

  const [currentPage, setCurrentPage] = useState(1);

  const elementsPerPage = 20;

  const indexOfLastUser = currentPage * elementsPerPage;
  const indexOfFirstUser = indexOfLastUser - elementsPerPage;
  const currentLogs = logs.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(logs.length / elementsPerPage);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 flex flex-col min-h-screen">
          <div className="overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-00">
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-6 text-center text-base font-medium"
                  >
                    Data or maybe not
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-6 text-center text-base font-medium"
                  >
                    Something good texts
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-6 text-center text-base font-medium"
                  >
                    Some other text
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-6 text-center text-base font-medium"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {currentLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-6 whitespace-nowrap text-center">
                      <div className="">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {log.text}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-500">
                        {log.otherText}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-500">
                        {log.otherText}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-500">
                        {log.otherText}
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

export default LogsTable;
