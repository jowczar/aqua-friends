"use client";

import DataTable from "@/components/DataTables";
import { aquaLifeItemsMock } from "@/components/DataTables/data-mock";

const aquaLifeColumns = ["Product", "Size", "Environment"];

//TODO: for now its using data mock, should implement data from api
const AquaLifePage = () => {
  return (
    <div className="my-10 px-1 md:px-20">
      <DataTable
        columns={aquaLifeColumns}
        data={aquaLifeItemsMock}
        itemsPerPage={5}
        allowImages={true}
        allowAquaLifeActions
      />
    </div>
  );
};

export default AquaLifePage;
