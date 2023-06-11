"use client";

import DataTable from "@/components/DataTables";
import useFirestore from "@/hooks/useFirestore";

import { forwardRef, useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getLogs, { EndDate, LogsData, StartDate } from "./data.logic";
import { getHistoryColumns } from "./history.columns";

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

export default function History() {
  const firestore = useFirestore();

  const [dateRange, setDateRange] = useState<DateRange>([null, null]);
  const [startDate, endDate] = dateRange;
  const [logs, setLogs] = useState<LogsData[]>([]);

  const handleLogs = useCallback(async () => {
    const logsData = await getLogs(firestore, startDate, endDate);
    setLogs(logsData);
  }, [firestore, startDate, endDate]);

  useEffect(() => {
    handleLogs();
  }, [startDate, endDate, handleLogs]);

  const historyColumns = getHistoryColumns();

  return (
    <div>
      <div className="my-10 px-5 md:px-20">
        <div className="w-64 mb-4">
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
          columnsData={historyColumns}
          rowsData={logs}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
}
