"use client";

import MonitorCard, { MonitorCardProps } from "@/components/MonitorCard";
import Navbar from "@/components/Navbar";

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
        <div>
            {/* TODO: move navbar higher */}
            <Navbar />
            {/*  mx-auto max-w-7xl */}
            <div className="my-10 px-4 md:px-20">
                {/* items-stretch */}
                <div className="flex flex-row gap-6 overflow-x-auto h-full w-full">
                    {sensors.map((sensor, index) => (
                        // aspect-square 
                        <div className="flex-1 aspect-square" key={`sensor_${index}`}>
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
        </div>
    );
}
