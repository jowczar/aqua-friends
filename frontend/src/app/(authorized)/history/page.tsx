"use client";

import LogsTable from "@/components/DataTables/LogsTable";

export default function History() {
  return (
    <div>
      <div className="my-10 px-1 md:px-60">
        <LogsTable />
      </div>
    </div>
  );
}
