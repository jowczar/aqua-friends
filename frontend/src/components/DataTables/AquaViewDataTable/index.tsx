import React, { useState } from "react";
import Pagination from "../../Pagination";
import Image from "next/image";
import { HealthStatus } from "@/enums/HealthStatus.enum";

const usersMock = [
  {
    id: 3,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Musharof Chowdhury",
    email: "musharos@example.com",
    aquariumTitle: "Multidisciplinary Web Entrepreneur",
    healthStatus: "Good",
    aquariumSize: "2m^3",
    isLiked: false,
  },
  {
    id: 5,
    avatar: "",
    name: "Nenifer Lofess",
    email: "loffes.cooper@example.com",
    aquariumTitle: "Regional Paradigm Technician",
    healthStatus: "Good",
    aquariumSize: "3m^3",
    isLiked: false,
  },
  {
    id: 7,
    avatar: "",
    name: "Jhon Smith",
    email: "jhon.smith@example.com",
    aquariumTitle: "Lead Implementation Liaison",
    healthStatus: "Bad",
    aquariumSize: "4m^3",
    isLiked: true,
  },
  {
    id: 8,
    avatar: "",
    name: "Suliym Info",
    email: "suliym.info@example.com",
    aquariumTitle: "Applications Engineer",
    healthStatus: "Bad",
    aquariumSize: "5m^3",
    isLiked: false,
  },
  {
    id: 9,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 11,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: true,
  },
  {
    id: 10,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: true,
  },
  {
    id: 12,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 13,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 14,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 18,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 16,
    avatar: "",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 20,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 88,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 89,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 91,
    avatar: "",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 92,
    avatar: "",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 93,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 95,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 96,
    avatar: "",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 98,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 99,
    avatar: "https://i.ibb.co/1T0bCkC/man.png",
    name: "Lorem Ipsumiński",
    email: "lorem.ipsum@example.com",
    aquariumTitle: "Lorem Ipsum Guy",
    healthStatus: "Good",
    aquariumSize: "6m^3",
    isLiked: false,
  },
  {
    id: 101,
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
  const [activeUserId, setActiveUserId] = useState<number>(0);

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
          <div className="overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-00">
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="hidden mdAquaView:table-cell px-6 py-6 text-left text-base font-medium"
                  >
                    {columnTitles.firstColumn}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-6 text-center xs:text-xl mdAquaView:text-base font-medium"
                  >
                    {columnTitles.secondColumn}
                  </th>
                  <th
                    scope="col"
                    className="hidden mdAquaView:table-cell px-6 py-6 text-center text-base font-medium"
                  >
                    {columnTitles.thirdColumn}
                  </th>
                  {columnTitles.fourthColumn && (
                    <th
                      scope="col"
                      className="hidden mdAquaView:table-cell px-6 py-6 text-center text-base font-medium"
                    >
                      {columnTitles.fourthColumn}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentUsers.map((user, index) => (
                  <tr key={user.id} onClick={() => setActiveUserId(user.id)}>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="mdAquaView:hidden">
                        <div className="text-sm font-medium text-gray-900">
                          {user.aquariumTitle}
                        </div>
                        {activeUserId === user.id && (
                          <>
                            <div className="text-sm text-gray-500">
                              Owner: {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Email: {user.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              Aquarium size: {user.aquariumSize}
                            </div>
                            <div className="text-sm text-gray-500">
                              Health status: {user.healthStatus}
                            </div>
                            <div className="flex items-center justify-center">
                              <button
                                className="rounded-lg p-4  gap-3 text-blue-500 hover:text-blue-300"
                                //TODO: implement view button logic
                                onClick={() => {}}
                              >
                                <span>View</span>
                              </button>
                              <button
                                type="button"
                                className="rounded-full  sm:flex w-8 h-8 group items-center justify-center focus:outline-none"
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
                                className="rounded-full sm:flex h-8 w-8 group items-center justify-center focus:outline-none"
                                onClick={() => switchLikeStatus(index)}
                              >
                                <span className="sr-only">View favorites</span>
                                <Image
                                  src={
                                    user.isLiked ? "heart-red.svg" : "heart.svg"
                                  }
                                  alt="heart"
                                  className="group-hover:scale-110 transition flex-none"
                                  height={16}
                                  width={18}
                                  aria-hidden="true"
                                />
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
                              src={user.avatar ? user.avatar : "man.png"}
                              alt="Default avatar"
                              height={62}
                              width={62}
                            />
                          </div>
                          <div className="text-left ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 whitespace-normal break-all">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="hidden mdAquaView:table-cell px-6 py-4 whitespace-normal text-sm text-gray-500 text-center break-all">
                      {user.aquariumTitle}
                    </td>

                    <td className="hidden mdAquaView:table-cell px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`px-8 py-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                          user?.healthStatus === HealthStatus.GOOD
                            ? "bg-green-500 bg-opacity-25 text-green-600"
                            : " bg-red-500 bg-opacity-25 text-red-600"
                        }`}
                      >
                        {user.healthStatus}
                      </span>
                    </td>

                    <td className="hidden mdAquaView:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {user.aquariumSize}
                    </td>
                    <td className="hidden mdAquaView:table-cell px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center">
                        <button
                          className="rounded-lg p-4 flex items-center gap-3  text-blue-500 hover:text-blue-300"
                          //TODO: implement view logic
                          onClick={() => {}}
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
