import useFirestore from "@/hooks/useFirestore";
import { LoggedUser, useLoggedUser } from "@/hooks/useLoggedUser";

import { updateDoc, doc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../Modal";

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
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    confirmHandler: async () => {},
  });

  const viewButtonHandler = () => {
    router.push(`/view/users/${item.id}`);
  };

  const messagesButtonHandler = () => {
    //TODO: implement AquaViewActions messages button logic here
  };

  const addToFriendButtonHandler = async (itemId: string) => {
    setIsLoading(true);
    const prevItems = [...items]; // kopia poprzedniego stanu
    const newItems = items.map((item: Record<string, any>) => {
      if (item.id === itemId) {
        return { ...item, isFriend: true };
      }
      return item;
    });
    setItems(newItems);

    if (loggedUser && loggedUser.id) {
      let newFriendsList: string[] = [...loggedUser.friends, itemId];

      const usersRef = doc(firestore, "users", loggedUser.id);
      try {
        await updateDoc(usersRef, {
          friends: newFriendsList,
        });
      } catch (error) {
        console.error(error);
        setItems(prevItems); // Przywrócenie poprzedniego stanu w razie błędu
      }
    }

    setIsLoading(false);
  };

  const removeFriendButtonHandler = async (itemId: string) => {
    setIsLoading(true);
    const prevItems = [...items]; // kopia poprzedniego stanu
    const newItems = items.map((item: Record<string, any>) => {
      if (item.id === itemId) {
        return { ...item, isFriend: false };
      }
      return item;
    });
    setItems(newItems);

    if (loggedUser && loggedUser.id) {
      let newFriendsList: string[] = loggedUser.friends.filter(
        (friendId) => friendId !== itemId
      );

      const usersRef = doc(firestore, "users", loggedUser.id);
      try {
        await updateDoc(usersRef, {
          friends: newFriendsList,
        });
      } catch (error) {
        console.error(error);
        setItems(prevItems); // Przywrócenie poprzedniego stanu w razie błędu
      }
    }

    setIsLoading(false);
  };

  const friendButtonHandler = () => {
    if (!isLoading) {
      if (item.isFriend) {
        setModalContent({
          title: "Usuń znajomego",
          message: "Czy na pewno chcesz usunąć tego użytkownika ze znajomych?",
          confirmHandler: async () => {
            await removeFriendButtonHandler(item.id);
            setShowModal(false);
          },
        });
      } else {
        setModalContent({
          title: "Dodaj znajomego",
          message: "Czy na pewno chcesz dodać tego użytkownika do znajomych?",
          confirmHandler: async () => {
            await addToFriendButtonHandler(item.id);
            setShowModal(false);
          },
        });
      }
      setShowModal(true);
    }
  };

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
            onClick={friendButtonHandler}
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

          {showModal && (
            <Modal
              title={modalContent.title}
              message={modalContent.message}
              cancelButtonText="Nie"
              detailsButtonText="Tak"
              onCancelClick={() => setShowModal(false)}
              onDetailsClick={modalContent.confirmHandler}
            />
          )}
        </div>
      </td>
    </div>
  );
};

export default AquaViewUsersActions;
