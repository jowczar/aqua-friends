"use client";

import LogsTable from "@/components/DataTables/LogsTable";

export default function History() {
  return (
    <div>
      <div className="my-10 px-1 md:px-20 lg:px-40 xl:px-60 sm:px-0">
        <LogsTable />
      </div>
    </div>
  );
}
