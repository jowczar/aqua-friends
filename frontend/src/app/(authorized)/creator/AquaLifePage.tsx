"use client";

import DataTable from "@/components/DataTables";
import { aquaLifeItemsMock } from "@/components/DataTables/data-mock";
import { getAquaLifeColumns } from "./aquaLifePage.columns";

//TODO: for now its using data mock, should implement data from api
const AquaLifePage = () => {
  const aquaLifeColumns = getAquaLifeColumns();
  return (
    <div className="my-10 px-5 md:px-20">
      <DataTable
        columnsData={aquaLifeColumns}
        rowsData={aquaLifeItemsMock}
        itemsPerPage={5}
      />
    </div>
  );
};

export default AquaLifePage;
