"use client";

import AquaDecorSummaryCard from "@/components/AquaDecorSummaryCard";

const AquaSummaryPage = () => {
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
    </div>
  );
};

export default AquaSummaryPage;
