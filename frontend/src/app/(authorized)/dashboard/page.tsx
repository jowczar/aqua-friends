"use client";

import DashboardCard from "@/components/DashboardCard";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8 my-10 mx-auto px-4 md:px-20 max-w-6xl">
            <DashboardCard link="/view" title="Aqua View&Share&Match" text="Search for other aquariums, add them to Your favourites and contact other owners" icon="search.svg" />
            <DashboardCard link="/creator" title="Aqua Creator" text="Aquarium creator where You can customize Your desired aquarium size, set up decorations and add some fishes" icon="layers.svg" />
            <DashboardCard link="/monitor" title="Aqua Monitor" text="Here You can check health status of Your Aquarium" icon="dashboard.svg" />
            <DashboardCard link="/history" title="Aqua History" text="Check historical monitors and health checks of Your Aquariums" icon="reload.svg" />
        </div>
    );
}
