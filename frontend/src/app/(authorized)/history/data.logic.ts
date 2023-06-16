import {
  collection,
  getDocs,
  query,
  where,
  Firestore,
} from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { formatDate } from "@/common/helpers";

export type HistoryLogsData = {
  id: string;
  name: string;
  message: string;
  date: string | Date;
};

export type StartDate = Date | null;
export type EndDate = Date | null;

const getHistoryLogs = async (
  firestore: Firestore,
  startDate: StartDate,
  endDate: EndDate,
  userId: string
): Promise<HistoryLogsData[]> => {
  const logsRef = collection(firestore, "logs");

  let filterQuery = query(logsRef, where("user_id", "==", userId));

  if (startDate && endDate) {
    filterQuery = query(
      filterQuery,
      where("date", ">=", startDate),
      where("date", "<=", endDate)
    );
  }

  const snapshot = await getDocs(filterQuery);

  const historyLogsData = snapshot.docs.map((doc: DocumentData) => {
    const data = doc.data();
    const historyLogId = doc.id;
    const formattedDate = formatDate(data.date);

    return {
      id: historyLogId,
      name: data.service_name,
      message: data.message,
      date: formattedDate,
    };
  });

  return historyLogsData;
};

export default getHistoryLogs;
