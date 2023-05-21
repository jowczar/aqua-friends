import React, { useState } from "react";
import Pagination from "../../Pagination";
import Image from "next/image";
import { HealthStatus } from "@/enums/HealthStatus.enum";

const usersMock = [
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Musharof Chowdhury",
    email: "musharos@example.com",
    aquariumTitle: "Multidisciplinary Web Entrepreneur",
    healthStatus: "Good",
    aquariumSize: "2m^3",
    isLiked: false,
  },
  {
    avatar: "",
    name: "Nenifer Lofess",
    email: "loffes.cooper@example.com",
    aquariumTitle: "Regional Paradigm Technician",
    healthStatus: "Good",
    aquariumSize: "3m^3",
    isLiked: false,
  },
  {
    avatar: "",
    name: "Jhon Smith",
    email: "jhon.smith@example.com",
    aquariumTitle: "Lead Implementation Liaison",
    healthStatus: "Bad",
    aquariumSize: "4m^3",
    isLiked: true,
  },
  {
    avatar: "",
    name: "Suliym Info",
    email: "suliym.info@example.com",
    aquariumTitle: "Applications Engineer",
    healthStatus: "Bad",
    aquariumSize: "5m^3",
    isLiked: false,
  },
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: true,
  },
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: true,
  },
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    avatar: "",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
];

const AquaViewDataTable = ({ columnTitles }: any) => {
  const [users, setUsers] = useState(usersMock);

  const switchLikeStatus = (index: number) => {
    const newUsers = [...users];
    newUsers[index].isLiked = !newUsers[index]?.isLiked;
    setUsers(newUsers);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 flex flex-col min-h-screen">
          <div className="overflow-hidden  sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-6 text-left text-base font-medium"
                  >
                    {columnTitles.firstColumn}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-6 text-center text-base font-medium"
                  >
                    {columnTitles.secondColumn}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-6 text-center text-base font-medium"
                  >
                    {columnTitles.thirdColumn}
                  </th>
                  {columnTitles.fourthColumn && (
                    <th
                      scope="col"
                      className="px-6 py-6 text-center text-base font-medium"
                    >
                      {columnTitles.fourthColumn}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {currentUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-15 w-15">
                          <Image
                            className="h-15 w-15 rounded-full"
                            src={user.avatar ? user.avatar : "man.png"}
                            alt="Default avatar"
                            height={62}
                            width={62}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-500">
                        {user.aquariumTitle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`px-8 py-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                          user?.healthStatus === HealthStatus.GOOD
                            ? "bg-green-500 bg-opacity-25 text-green-600"
                            : "px-9 bg-red-500 bg-opacity-25 text-red-600"
                        }`}
                      >
                        {user.healthStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {user.aquariumSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center">
                        <button
                          className="rounded-lg p-4 flex items-center gap-3  text-blue-500 hover:text-blue-300"
                          onClick={() => console.log("View button")}
                        >
                          <span>View</span>
                        </button>
                        <button
                          type="button"
                          className="rounded-full hidden sm:flex w-8 h-8 group items-center justify-center focus:outline-none"
                        >
                          <span className="sr-only">View messages</span>
                          <Image
                            src="chat.svg"
                            alt="chat"
                            className="group-hover:scale-110 transition flex-none"
                            height={16}
                            width={18}
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          type="button"
                          className="rounded-full hidden sm:flex h-8 w-8 group items-center justify-center focus:outline-none"
                          onClick={() => switchLikeStatus(index)}
                        >
                          <span className="sr-only">View favorites</span>
                          <Image
                            src={user.isLiked ? "heart-red.svg" : "heart.svg"}
                            alt="heart"
                            className="group-hover:scale-110 transition flex-none"
                            height={16}
                            width={18}
                            aria-hidden="true"
                          />
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

export default AquaViewDataTable;
