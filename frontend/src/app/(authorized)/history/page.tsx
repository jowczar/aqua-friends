"use client";

import DataTable from "@/components/DataTables";
import { logsMock } from "@/components/DataTables/data-mock";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const historyColumns = ["Service name", "Log data", "Date"];

type StartDate = Date | null;
type EndDate = Date | null;

type DateRange = [StartDate, EndDate];

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <button
      className="bg-blue-500 text-white rounded p-2 cursor-pointer"
      onClick={onClick}
      ref={ref}
    >
      {value || "Select date range"}
    </button>
  )
);

//TODO: for now its using data mock, should implement data from api
export default function History() {
  const [dateRange, setDateRange] = useState<DateRange>([null, null]);
  const [startDate, endDate] = dateRange;

  console.log("startDate, endDate", startDate, endDate);

  return (
    <div>
      <div className="my-10 px-5 md:px-20">
        <div className="w-64">
          <DatePicker
            dateFormat={"dd.MM.yyyy"}
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(data: DateRange) => {
              setDateRange(data);
            }}
            isClearable={true}
            customInput={<CustomInput />}
          />
        </div>

        <DataTable
          columns={historyColumns}
          data={logsMock}
          itemsPerPage={10}
          allowImages={false}
        />
      </div>
    </div>
  );
}
