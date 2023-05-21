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
      <div className="my-10 px-1 md:px-60">
        <AquaViewDataTable columnTitles={columnTitles} />
      </div>
    </div>
  );
}
