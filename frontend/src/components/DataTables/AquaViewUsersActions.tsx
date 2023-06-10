import useFirestore from "@/hooks/useFirestore";
import { LoggedUser } from "@/hooks/useLoggedUser";
import { updateDoc, doc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export type AquaViewUsersActionsProps = {
  item: Record<string, any>;
  items: Record<string, any>[];
  setItems: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  isMobileView?: boolean;
  loggedUser: LoggedUser | null | undefined;
};

const AquaViewUsersActions = ({
  item,
  items,
  setItems,
  isMobileView,
  loggedUser,
}: AquaViewUsersActionsProps) => {
  const router = useRouter();
  const firestore = useFirestore();

  const viewButtonHandler = () => {
    router.push(`/view/users/${item.id}`);
  };

  const messagesButtonHandler = () => {
    //TODO: implement AquaViewActions messages button logic here
  };

  const handleFriendChange = async (itemId: string) => {
    if (loggedUser && loggedUser.id) {
      const usersRef = doc(firestore, "users", loggedUser.id);

      let newFriendsList: string[];
      let isFriend: boolean;

      if (item.isFriend) {
        newFriendsList = loggedUser.friends.filter(
          (friendId) => friendId !== itemId
        );
        isFriend = false;
      } else {
        newFriendsList = [...loggedUser.friends, itemId];
        isFriend = true;
      }

      await updateDoc(usersRef, {
        friends: newFriendsList,
      });

      const newItems = items.map((item: Record<string, any>) => {
        if (item.id === itemId) {
          return { ...item, isFriend: isFriend };
        }
        return item;
      });
      setItems(newItems);
    }
  };

  useEffect(() => {
    if (loggedUser) {
      const newItems = items.map((item: Record<string, any>) => {
        if (item.id === loggedUser.id) {
          return { ...item, isFriend: loggedUser.friends.includes(item.id) };
        }
        return item;
      });
      setItems(newItems);
    }
  }, [loggedUser]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <td
        className={`${
          isMobileView ? "flex justify-center" : "hidden"
        } md:table-cell px-6 py-4 whitespace-nowrap text-right text-sm font-medium`}
      >
        <div
          className={`flex items-center ${isMobileView && "justify-center"}`}
        >
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
            onClick={() => handleFriendChange(item.id)}
          >
            <span className="sr-only">Add to friend</span>
            <Image
              src={item.isFriend ? "/friend-green.svg" : "/friend-basic.svg"}
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
