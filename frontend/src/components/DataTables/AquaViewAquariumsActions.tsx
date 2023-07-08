import Image from "next/image";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import useFirestore from "@/hooks/useFirestore";
import { useUserWithDetails } from "@/hooks/useUserWithDetails";

import useUserWithRole from "@/hooks/useUserWithRole";

interface BasicAquariumProps {
  id: string;
  isLiked: boolean;
}

export type AquariumActionsProps<T extends BasicAquariumProps> = {
  singleAquarium: T;
  aquariums: T[];
  setAquariums: React.Dispatch<React.SetStateAction<T[]>>;
};

const AquaViewAquariumsActions = <T extends BasicAquariumProps>({
  singleAquarium,
  aquariums,
  setAquariums,
}: AquariumActionsProps<T>) => {
  const router = useRouter();
  const firestore = useFirestore();

  const { user } = useUserWithRole();

  const loggedInUserWithDetails = useUserWithDetails(firestore, user?.uid);

  const viewButtonHandler = () => {
    router.push(`/view/aquariums/${singleAquarium.id}`);
  };

  const handleFavoriteChange = async (aquariumId: string) => {
    const usersRef = doc(firestore, "users", loggedInUserWithDetails.id);

    let newFavoriteList: string[];
    let isFavorite: boolean;

    if (singleAquarium.isLiked) {
      newFavoriteList = loggedInUserWithDetails.fav_aquariums.filter(
        (favId) => favId !== aquariumId
      );
      isFavorite = false;
    } else {
      newFavoriteList = [...loggedInUserWithDetails.fav_aquariums, aquariumId];
      isFavorite = true;
    }

    await updateDoc(usersRef, {
      fav_aquariums: newFavoriteList,
    });

    const newAquariumList = aquariums.map((aquarium) => {
      if (aquarium.id === aquariumId) {
        return { ...aquarium, isLiked: isFavorite };
      }
      return aquarium;
    });

    setAquariums(newAquariumList);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <td
        className={`md:table-cell px-6 py-4 whitespace-nowrap text-right text-sm font-medium`}
      >
        <div className={`flex items-center`}>
          <button
            className="rounded-lg p-4 flex items-center gap-3  text-blue-500 hover:text-blue-300"
            onClick={viewButtonHandler}
          >
            <span>View</span>
          </button>
          <button
            type="button"
            className="rounded-full flex h-8 w-8 group items-center justify-center focus:outline-none"
            onClick={() => handleFavoriteChange(singleAquarium.id)}
          >
            <span className="sr-only">Add to favorites</span>
            <Image
              src={singleAquarium.isLiked ? "/heart-red.svg" : "/heart.svg"}
              alt="heart"
              className="group-hover:scale-110 transition flex-none"
              height={16}
              width={18}
              aria-hidden="true"
            />
          </button>
        </div>
      </td>
    </div>
  );
};

export default AquaViewAquariumsActions;
