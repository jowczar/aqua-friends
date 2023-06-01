"use client";

import DataTable from "@/components/DataTables";
import { usersMock } from "@/components/DataTables/data-mock";

const aquaViewColumns = [
  "Owner",
  "Aquarium Title",
  "Aquarium Size",
  "Health Status",
];

//TODO: for now its using data mock, should implement data from api
export default function View() {
  return (
    <div>
      <div className="my-10 px-5 lg:px-20">
        <DataTable
          data={usersMock}
          columns={aquaViewColumns}
          itemsPerPage={10}
          allowAquaViewActions
          allowImages={true}
        />
      </div>
    </div>
  );
}
