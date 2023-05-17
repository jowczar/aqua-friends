"use client";

import Navbar from "@/components/Navbar";
import DataTable from "@/components/DataTable";

export default function View() {
  return (
    <div>
      {/* TODO: move navbar higher */}
      <Navbar />

      <div className="my-2 px-1 md:px-20">
        <DataTable />
      </div>
    </div>
  );
}
