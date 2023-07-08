import useFirestore from "@/hooks/useFirestore";
import { useUserWithDetails } from "@/hooks/useUserWithDetails";
import useUserWithRole from "@/hooks/useUserWithRole";
import { AquariumDataProps } from "../view/page";
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { getAndMapAquariumData } from "../view/data.logic";
import { useRouter } from "next/navigation";
import { HealthStatus } from "@/enums/HealthStatus.enum";

const Aquarium = ({ aquarium, onClick }) => {
    console.log({aquarium})
    return (
      <div className="flex flex-col bg-white shadow px-4 py-4 rounded gap-2 cursor-pointer hover:bg-slate-50" onClick={onClick}>
        <div className="flex flex-row gap-4 justify-between items-center">
            <h1 className="font-bold">{aquarium.aquariumTitle}</h1>
            <span
            className={`px-4 py-1 inline-flex text-xs xl:text-sm font-semibold rounded-full ${
                aquarium.healthStatus === HealthStatus.GOOD
                ? "bg-green-500 bg-opacity-25 text-green-600"
                : " bg-red-500 bg-opacity-25 text-red-600"
            }`}
            >{aquarium.healthStatus}</span>
        </div>
        <p className="text-gray-500 text-sm">{aquarium.aquariumSize}</p>
        <div className="flex flex-row gap-5">
            {aquarium.aquariumData?.fishes?.map((fish) => (
                <div className="flex flex-col px-4 py-4 rounded items-center gap-2">
                    <img src={fish.image} alt="fish" className="w-20 h-20 rounded-full" />
                    <h1 className="font-medium text-sm">{fish.amount}x {fish.name}</h1>
                </div>
            ))}
        </div>
      </div>
    );
  };

const UserDashboard = () => {
    const firestore = useFirestore();
    const { user } = useUserWithRole();
    const loggedInUserWithDetails = useUserWithDetails(firestore, user?.uid);
    const [aquariums, setAquariums] = useState<AquariumDataProps[]>([]);
    const router = useRouter();

    const getAquariums = useCallback(async () => {
        const aquariumsRef = collection(firestore, "aquariums");
    
        const q = query(aquariumsRef, where("user_id", "==", user?.uid));
        const snapshot = await getDocs(q);
    
        const aquariumsData = await Promise.all(
          snapshot.docs.map(async (document: DocumentData) => {
            const data = document.data();
            const aquariumId = document.id;
            const userId = data.user_id;
    
            return getAndMapAquariumData(
              firestore,
              data,
              userId,
              aquariumId,
              loggedInUserWithDetails
            );
          })
        );
    
        console.log({ aquariumsData });
        setAquariums(aquariumsData);
      }, [firestore, loggedInUserWithDetails]);
    
    useEffect(() => {
        getAquariums();
    }, [getAquariums]);

    if (aquariums.length === 0) {
        return (
            <div className="flex flex-col w-full items-center justify-center py-20">
                <div className="text-gray-500 mb-4 mt-4">You have no fish... yet</div>
                <img width="200px" src="https://teachsimplecom.s3.us-east-2.amazonaws.com/images/fish-bowl-and-fish-clip-art/image-1629378358567-1.jpg" />
                <button
                    className="mt-6 bg-primary rounded px-4 py-2 text-white text-sm cursor-pointer transition w-fit hover:bg-[#2644a8] active:bg-[#2644a8]"
                    onClick={() => {
                        router.push("/creator");
                    }}
                >
                    Add your first aquarium
                </button>
            </div>
        )
    }

    return (
        <div className="grid px-20 w-full py-20 gap-4 max-w-[1024px] m-auto">
            {aquariums.map((aquarium) => (
                <Aquarium aquarium={aquarium} onClick={() => router.push('/view/aquariums/' + aquarium.id)} />
            ))}
        </div>
    )
}

export default UserDashboard;
