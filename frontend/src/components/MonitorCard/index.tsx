import { HexColor } from "@/common/types";
import Chart from "../Chart";
import classNames from "classnames";

export type MonitorCardProps = {
    parameter: string;
    currentValue: number | null;
    changePercentage: number | null;
    color: HexColor;
    currentValueDate: string | null; // TODO: change to date & parse, if needed, depends on backend
    history: number[]; // TODO: change to array of objects with date and value, if needed, depends on backend
    // TODO: adjust this component data
    // we might as well calculate the change percentage on the frontend as pop(), up to backend/db structure
    // for now I only styled this component
}; 

const getChangeSymbol = (changePercentage: number) => {
    if (changePercentage > 0) return '↑';
    if (changePercentage < 0) return '↓';
    return '–';
}

const getChangeClass = (changePercentage: number) => {
    if (changePercentage > 0) return 'text-green-500';
    if (changePercentage < 0) return 'text-red-500';
    return 'text-gray-400';
}

const getChangeText = (changePercentage: number) => {
    const changeSymbol = getChangeSymbol(changePercentage);
    if (changePercentage === 0) return '0,00%';
    return `${changePercentage}% ${changeSymbol}`; 
}

const MonitorCard = ({ parameter, currentValue, changePercentage, currentValueDate, history, color }: MonitorCardProps) => {
    if (currentValue === null || changePercentage === null || currentValueDate === null) {
        return (
            <div className="flex flex-col gap-10 items-center justify-center w-full shadow-sm rounded-md bg-white p-7">
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-base font-medium">{parameter}</h3>
                    <h6 className="text-sm font-light text-gray-500">{currentValueDate}</h6>
                </div>
                <div className="grow w-full flex items-center justify-center text-2xl font-light text-gray-400">
                    No data
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-5 items-center justify-center w-full h-full aspect-square shadow-sm rounded-md bg-white">
            <div className="flex flex-col items-center justify-center p-7 flex-none">
                <h3 className="text-sm lg:text-base font-medium text-center">{parameter}</h3>
                <h6 className="text-xs lg:text-sm font-light text-gray-500">{currentValueDate}</h6>
            </div>
            <div className="w-full flex-1 h-3/4">
                <div className="flex flex-row gap-1 mx-7 items-end flex-none">
                    <span className="text-2xl font-bold">{currentValue}</span>
                    <span className={classNames(
                        getChangeClass(changePercentage), 
                        "text-sm font-medium"
                    )}>
                        {getChangeText(changePercentage)}
                    </span>
                </div>

                <Chart color={color} data={history} />
            </div>
        </div>
    );
};

export default MonitorCard;