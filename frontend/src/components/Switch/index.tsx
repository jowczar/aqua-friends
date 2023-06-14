import { useState } from "react";

type AquaViewSwitchProps = {
  firstText: string;
  secondText: string;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
};

const Switch = ({ firstText, secondText, setView }: AquaViewSwitchProps) => {
  const handleFirstElementSelected = () => {
    setIsFirstElementSelected(true);
    setView(true);
    setIsSecondElementSelected(false);
  };

  const handleSecondElementSelected = () => {
    setIsFirstElementSelected(false);
    setView(false);
    setIsSecondElementSelected(true);
  };

  const [isFirstElementSelected, setIsFirstElementSelected] = useState(true);
  const [isSecondElementSelected, setIsSecondElementSelected] = useState(false);

  return (
    <label
      htmlFor="themeSwitcherOne"
      className={`themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-between rounded-md bg-white p-1 w-full`}
    >
      <span
        className={`text-body-color bg-gray flex items-center rounded py-2 text-xs md:text-sm font-medium w-full justify-center ${
          isFirstElementSelected ? "text-sky-500" : "text-body-color"
        }`}
        onClick={handleFirstElementSelected}
      >
        {firstText}
      </span>
      <span
        className={`text-body-color flex items-center  rounded py-2  text-xs md:text-sm font-medium w-full justify-center ${
          isSecondElementSelected ? "text-sky-500" : "text-body-color"
        }`}
        onClick={handleSecondElementSelected}
      >
        {secondText}
      </span>
    </label>
  );
};

export default Switch;
