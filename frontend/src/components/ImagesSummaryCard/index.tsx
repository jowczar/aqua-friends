import React from "react";
import Image from "next/image";

type ImagesSummaryCardProps = {
  title: string;
  data: {
    image: string;
    name: string;
    description: string;
    value: string;
  }[];
};

const ImagesSummaryCard = ({ title, data }: ImagesSummaryCardProps) => {
  const renderTooltip = (item: any) => (
    <div>
      <p>Name: {item.name}</p>
      <p>Description: {item.description}</p>
      <p>Value: {item.value}</p>
    </div>
  );

  return (
    <div className="max-w-sm mx-auto rounded-xl overflow-visible md:max-w-lg m-4 py-4 z-10">
      <div className="text-2xl font-light text-center mt-4 mb-6">{title}</div>
      <div className="md:flex flex-wrap justify-center">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative inline-block w-full px-4 mt-5 mb-10 sm:w-1/2 lg:w-1/4"
          >
            <div className="group">
              <Image
                className="h-15 w-15 rounded-full"
                src={item.image ? item.image : "man.png"}
                alt={item.name}
                height={100}
                width={100}
              />
              <div className="border-light text-body-color absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2 whitespace-nowrap rounded border bg-white py-[6px] px-4 text-sm font-semibold opacity-0 group-hover:opacity-100">
                <span className="border-light absolute -bottom-1 left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-l-sm border-b border-r bg-white"></span>
                {renderTooltip(item)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesSummaryCard;
