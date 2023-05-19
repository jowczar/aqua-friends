import React from "react";

interface SummaryProps {
  aquariumDimensions: AquariumDimensions;
  chosenItems: Array<Item>;
  aquariumName: string;
  setAquariumName: (name: string) => void;
}

interface AquariumDimensions {
  length: number;
  width: number;
  height: number;
}

interface Item {
  name: string;
  description: string;
  image: string;
  size: string;
  environment: string;
}

const Summary: React.FC<SummaryProps> = ({
  aquariumDimensions,
  chosenItems,
  aquariumName,
  setAquariumName,
}) => {
  return (
    <div className="p-6">
      <h2 className="text-lg leading-6 font-medium text-gray-900">
        Aquarium Summary
      </h2>
      <input
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="Enter Aquarium Name"
        value={aquariumName}
        onChange={(e) => setAquariumName(e.target.value)}
      />

      <div className="mt-6 flex flex-row justify-between">
        <div className="bg-white shadow sm:rounded-lg flex-1 mr-2">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Aquarium Dimensions
            </h3>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
              <li>Length: {aquariumDimensions.length}</li>
              <li>Width: {aquariumDimensions.width}</li>
              <li>Height: {aquariumDimensions.height}</li>
            </ul>
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg flex-1 ml-2">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Chosen Items
            </h3>
            {chosenItems.map((item, index) => (
              <div key={index} className="mt-2 bg-gray-100 rounded-lg p-3">
                <h4 className="text-md leading-5 font-medium text-gray-900">
                  {item.name}
                </h4>
                <div className="text-sm text-gray-500">{item.description}</div>
                <div className="text-sm text-gray-500">{item.size}</div>
                <div className="text-sm text-gray-500">{item.environment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
