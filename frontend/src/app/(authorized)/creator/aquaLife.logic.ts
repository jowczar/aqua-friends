import {
  DocumentData,
  Firestore,
  collection,
  getDocs,
} from "firebase/firestore";
import { Fish } from "./AquaLifePage";

export const getFishData = async (
  firestore: Firestore,
  setFishes: React.Dispatch<React.SetStateAction<Fish[]>>,
  isFreshWater: boolean
) => {
  const collectionName = isFreshWater ? "freshwater_fish" : "saltwater_fish";
  const querySnapshot = await getDocs(collection(firestore, collectionName));

  const fishDataPromises = querySnapshot.docs.map((doc: DocumentData) => {
    const data = doc.data();

    const fishId = doc.id;

    return {
      fishId,
      image: data.image,
      name: data.name,
      requirements: {
        maxKh: data.requirements.max_kh,
        maxPh: data.requirements.max_ph,
        maxTemp: data.requirements.max_temp,
        minKh: data.requirements.min_kh,
        minPh: data.requirements.min_ph,
        minTemp: data.requirements.min_temp,
        minimumTankSize: data.requirements.minimum_tank_size,
        water: data.requirements.water,
      },
      species: data.species,
    };
  });

  const fishData = await Promise.all(fishDataPromises);

  setFishes(fishData);
};
