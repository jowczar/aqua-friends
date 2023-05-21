"use client";

import MonitorCard, { MonitorCardProps } from "@/components/MonitorCard";
import Search from "@/components/Search";

export default function Monitor() {
    // TODO: get this data from backend
    const data = [
        264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
    ];
    const sensors: MonitorCardProps[] = [
        {
            parameter: 'NO2 – Nitrogen dioxide',
            currentValue: 1.368,
            changePercentage: +0.43,
            currentValueDate: 'Now',
            history: data,
            color: '#D4F5EC'
        },
        {
            parameter: 'NO3 – Nitrate',
            currentValue: 795,
            changePercentage: -1.39,
            currentValueDate: 'Now',
            history: data,
            color: '#FDEDE0'
        },
        {
            parameter: 'GH – Water hardness',
            currentValue: 785,
            changePercentage: +0.39,
            currentValueDate: 'Now',
            history: data,
            color: '#DBE1F7'
        },
        {
            parameter: 'KH – Carbonate hardness',
            currentValue: 1.368,
            changePercentage: +0.43,
            currentValueDate: 'Now',
            history: data,
            color: '#D4F5EC'
        },
        {
            parameter: 'ph – Acidity',
            currentValue: 795,
            changePercentage: -1.39,
            currentValueDate: 'Now',
            history: data,
            color: '#FDEDE0'
        }
    ]
    // ================

    return (
        <div className="my-10 px-4 md:px-20">
            <div className="flex flex-col md:flex-row mb-4 gap-5">
                <Search />
                <div className="flex w-full items-center justify-center text-sm text-primary font-light bg-gray-50 border border-gray-300 rounded-lg p-2.5">
                    {/* TODO: Idk what this does but it's fast to style so I add it here anyway */}
                    Active: Aquarium one by Jan Kowalski
                </div>
            </div>
            <div className="grid md:grid-flow-col grid-rows-2 lg:grid-rows-1 auto-cols-fr gap-4 overflow-x-auto overflow-y-hidden">
                {sensors.map((sensor, index) => (
                    <div className="flex-1" key={`sensor_${index}`}>
                        <MonitorCard 
                            parameter={sensor.parameter} 
                            currentValue={sensor.currentValue} 
                            history={sensor.history} 
                            changePercentage={sensor.changePercentage}
                            currentValueDate={sensor.currentValueDate}
                            color={sensor.color}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}