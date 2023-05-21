"use client";

import AquaDecorSummaryCard from "@/components/AquaDecorSummaryCard";
import AquaDecorDataTable from "@/components/DataTables/AquaDecorDataTable";
import { TabsProps } from "@/components/DataTables/AquaDecorDataTable/Tabs";

type AquaDecorPageProps = TabsProps;

const AquaDecorPage = ({ currentTab, setCurrentTab }: AquaDecorPageProps) => {
  return (
    <div className="my-10 px-1 md:px-20 flex">
      <div className="w-1/3 pr-4">
        <AquaDecorSummaryCard
          pump={"[pump"}
          heater={"heater"}
          light={"light"}
          plants={[
            "some plant",
            "ok its plant",
            "does it return some hp?",
            "what if no?",
          ]}
          decors={[
            "some decor",
            "next decor",
            "test decor",
            "omg what a decor",
            "is this a decor?",
          ]}
          terrains={[
            "some terrain",
            "next terrain",
            "but this terrrrrain is kinda big",
            "as all things should be",
            "man what are you saying",
            "stop being so dumb",
            "its not a balenciaga anymore, its movie about harry squatter",
          ]}
        />
      </div>
      <div className="w-2/3 pl-4 pr-20">
        <AquaDecorDataTable
          columnTitles={{
            firstColumn: "Testowy",
            secondColumn: "Drugi",
            thirdColumn: "",
          }}
          isSingleAnswer={false}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>
    </div>
  );
};

export default AquaDecorPage;
