"use client";

import { formatDate } from "@/common/helpers";
import DataTable from "@/components/DataTables";
import { FirestoreContext } from "@/context/FirebaseProvider";
import { collection, getDocs } from "firebase/firestore";

import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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

type LogsData = {
  id: string;
  name: string;
  message: string;
  date: string | Date;
};

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
  const firestore = useContext(FirestoreContext);
  const [dateRange, setDateRange] = useState<DateRange>([null, null]);
  const [startDate, endDate] = dateRange;
  const [logs, setLogs] = useState<LogsData[]>([]);

  const getLogs = useCallback(async () => {
    if (!firestore) return;

    const logsRef = collection(firestore, "logs");
    const snapshot = await getDocs(logsRef);

    const logsData = snapshot.docs.map((doc: any) => {
      const data = doc.data();
      const id = doc.id;
      const formattedDate = formatDate(data.date);

      return {
        id,
        name: data.service_name,
        message: data.message,
        date: formattedDate,
      };
    });

    setLogs(logsData);
  }, []);

  useEffect(() => {
    getLogs();
  }, []);

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
          data={logs}
          itemsPerPage={10}
          allowImages={false}
        />
      </div>
    </div>
  );
}
