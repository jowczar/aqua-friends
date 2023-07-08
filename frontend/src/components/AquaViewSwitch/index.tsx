import { useState } from "react";

const AquaViewSwitch = ({ setIsUsersView }: any) => {
  const handleUsersSelected = () => {
    setIsUsersSelected(true);
    setIsUsersView(true);
    setIsAquariumsSelected(false);
  };

  const handleAquariumsSelected = () => {
    setIsUsersSelected(false);
    setIsUsersView(false);
    setIsAquariumsSelected(true);
  };

  const [isUsersSelected, setIsUsersSelected] = useState(true);
  const [isAquariumsSelected, setIsAquariumsSelected] = useState(false);

  return (
    <label
      htmlFor="themeSwitcherOne"
      className={`themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-between rounded-md bg-white p-1 w-full`}
    >
      <span
        className={`text-body-color bg-gray flex items-center rounded py-2 text-xs md:text-sm font-medium w-full justify-center ${
          isUsersSelected ? "text-sky-500" : "text-body-color"
        }`}
        onClick={handleUsersSelected}
      >
        Users
      </span>
      <span
        className={`text-body-color flex items-center  rounded py-2  text-xs md:text-sm font-medium w-full justify-center ${
          isAquariumsSelected ? "text-sky-500" : "text-body-color"
        }`}
        onClick={handleAquariumsSelected}
      >
        Aquariums
      </span>
    </label>
  );
};

export default AquaViewSwitch;
