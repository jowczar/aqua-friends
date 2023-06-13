import { CurrentTab } from "@/components/Tabs";
import { TabEnum } from "@/enums/Tab.enum";
import {
  AquaItem,
  Decor,
  Heater,
  Light,
  Plant,
  Pump,
  Terrain,
} from "./AquaDecorPage";
import { Firestore, doc, getDoc } from "firebase/firestore";
import { transformObjectKeysToCamelCase } from "@/common/helpers";

export const getDecorTableData = async <T extends AquaItem>(
  firestore: Firestore,
  setItems: React.Dispatch<React.SetStateAction<T[]>>,
  documentName: string
) => {
  const docRef = await doc(firestore, "equipment", documentName);

  const docSnapshot = await getDoc(docRef);

  let mappedData = (await docSnapshot.data()?.list) as T[];

  mappedData = mappedData.map((item) =>
    transformObjectKeysToCamelCase(item)
  ) as T[];

  setItems(mappedData);
};

export const switchDecorTableData = (
  currentTab: CurrentTab,
  pumps: Pump[],
  heaters: Heater[],
  lights: Light[],
  plants: Plant[],
  decors: Decor[],
  terrains: Terrain[]
) => {
  let items: AquaItem[] = [];
  let isSingleAnswer = true;

  switch (currentTab.tabName) {
    case TabEnum.PUMP:
      items = pumps;
      break;
    case TabEnum.HEATER:
      items = heaters;
      break;
    case TabEnum.LIGHT:
      items = lights;
      break;
    case TabEnum.DECORS:
      items = decors;
      isSingleAnswer = false;
      break;
    case TabEnum.PLANTS:
      items = plants;
      isSingleAnswer = false;
      break;
    case TabEnum.TERRAINS:
      items = terrains;
      isSingleAnswer = false;
      break;
    default:
      break;
  }

  return { items, isSingleAnswer };
};
