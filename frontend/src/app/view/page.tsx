"use client";

import Navbar from "@/components/Navbar";
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
      {/* TODO: move navbar higher */}
      <Navbar />

      <div className="my-2 px-1 md:px-20">
        <AquaViewDataTable columnTitles={columnTitles} />
      </div>
    </div>
  );
}
