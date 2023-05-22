"use client";

import AquaViewDataTable from "@/components/DataTables/AquaViewDataTable";

const columnTitles = {
  firstColumn: "Owner",
  secondColumn: "Aquarium Title",
  thirdColumn: "Health Status",
  fourthColumn: "Aquarium Size",
};

export default function View() {
  return (
    <div>
      <div className="my-10 px-1 md:px-20 lg:px-40 xl:px-60 sm:px-40">
        <AquaViewDataTable columnTitles={columnTitles} />
      </div>
    </div>
  );
}
