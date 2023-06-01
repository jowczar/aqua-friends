"use client";

import DataTable from "@/components/DataTables";
import { logsMock } from "@/components/DataTables/data-mock";

const historyColumns = ["Service name", "Log data", "Date"];

//TODO: for now its using data mock, should implement data from api
export default function History() {
  return (
    <div>
      <div className="my-10 px-5 md:px-20">
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
