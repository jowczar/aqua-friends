import Image from "next/image";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import useFirestore from "@/hooks/useFirestore";
import { useUserWithDetails } from "@/hooks/useUserWithDetails";
import { AquaViewUserData } from "@/app/(authorized)/view/data.logic";
import useUserWithRole from "@/hooks/useUserWithRole";

export type AquaViewUsersActionsProps = {
  singleUser: AquaViewUserData;
  users: AquaViewUserData[];
  setUsers: React.Dispatch<React.SetStateAction<AquaViewUserData[]>>;
};

const AquaViewUsersActions = ({
  singleUser,
  users,
  setUsers,
}: AquaViewUsersActionsProps) => {
  const router = useRouter();
  const firestore = useFirestore();

  const { user } = useUserWithRole();

  const loggedUserWithDetails = useUserWithDetails(firestore, user?.uid);

  const viewButtonHandler = () => {
    router.push(`/view/users/${singleUser.id}`);
  };

  const messagesButtonHandler = () => {
    //TODO: implement AquaViewActions messages button logic here
  };

  const handleFriendChange = async (itemId: string) => {
    const usersRef = doc(firestore, "users", loggedUserWithDetails.id);

    let newFriendsList: string[];
    let isFriend: boolean;

    if (singleUser.isFriend) {
      newFriendsList = loggedUserWithDetails.friends.filter(
        (friendId) => friendId !== itemId
      );
      isFriend = false;
    } else {
      newFriendsList = [...loggedUserWithDetails.friends, itemId];
      isFriend = true;
    }

    await updateDoc(usersRef, {
      friends: newFriendsList,
    });

    const newItems = users.map((item) => {
      if (item.id === itemId) {
        return { ...item, isFriend: isFriend };
      }
      return item;
    });

    setUsers(newItems);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <td
        className={`md:table-cell px-6 py-4 whitespace-nowrap text-right text-sm font-medium`}
      >
        <div className={`flex items-center`}>
          <button
            className="rounded-lg p-4 flex items-center gap-3  text-blue-500 hover:text-blue-300"
            onClick={() => viewButtonHandler()}
          >
            <span>View</span>
          </button>
          <button
            type="button"
            className="rounded-full flex w-8 h-8 group items-center justify-center focus:outline-none"
            onClick={() => messagesButtonHandler()}
          >
            <span className="sr-only">View messages</span>
            <Image
              src="/chat.svg"
              alt="chat"
              className="group-hover:scale-110 transition flex-none"
              height={16}
              width={18}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className="rounded-full flex h-8 w-8 group items-center justify-center focus:outline-none"
            onClick={() => handleFriendChange(singleUser.id)}
          >
            <span className="sr-only">Add to friend</span>
            <Image
              src={
                singleUser.isFriend ? "/friend-green.svg" : "/friend-basic.svg"
              }
              alt="friend"
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

export default AquaViewUsersActions;
