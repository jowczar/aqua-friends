import React from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

type ImageSummaryCardData = {
  image: string;
  name: string;
  description: string;
  value: string;
};

type ImagesSummaryCardProps = {
  title: string;
  data: ImageSummaryCardData[];
};

const ImagesSummaryCard = ({ title, data }: ImagesSummaryCardProps) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const renderTooltip = (item: ImageSummaryCardData) => (
    <div>
      <p>Name: {item.name}</p>
      <p>Description: {item.description}</p>
      <p>Value: {item.value}</p>
    </div>
  );

  return (
    <div className="mx-auto rounded-xl overflow-visible m-4 z-10">
      <div className="text-xl md:text-2xl font-light text-center mt-4 mb-6">
        {title}
      </div>
      <div className="flex flex-wrap flex-row justify-center">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative inline-block flex-row px-4 mt-5 mb-10"
          >
            <div className="group">
              <Image
                className="h-15 w-15 rounded-full md:h-15 md:w-15"
                src={item.image ? item.image : "/man.png"}
                alt={item.name}
                height={isMobile ? 90 : 105}
                width={isMobile ? 90 : 105}
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
