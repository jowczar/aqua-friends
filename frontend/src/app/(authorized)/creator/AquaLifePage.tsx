"use client";

import AquaLifeDataTable from "@/components/DataTables/AquaLifeDataTable";

const AquaLifePage = () => {
  const columnTitles = {
    firstColumn: "Product",
    secondColumn: "Size",
    thirdColumn: "Environment",
  };

  return (
    <div className="my-10 px-1 md:px-20">
      <AquaLifeDataTable columnTitles={columnTitles} />
    </div>
  );
};

export default AquaLifePage;
