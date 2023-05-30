import Image from "next/image";

export type AquaViewActionsProps = {
  item: Record<string, any>;
  items: Record<string, any>[];
  setItems: any;
  isMobileView?: boolean;
};

const AquaViewActions = ({
  item,
  items,
  setItems,
  isMobileView,
}: AquaViewActionsProps) => {
  const viewButtonHandler = () => {
    //TODO: implement AquaViewActions view button logic here
  };

  const messagesButtonHandler = () => {
    //TODO: implement AquaViewActions messages button logic here
  };

  const likeButtonHandler = (itemId: number) => {
    const newItems = items.map((item: Record<string, any>) => {
      if (item.id === itemId) {
        return { ...item, isLiked: !item.isLiked };
      }
      return item;
    });

    setItems(newItems);
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
              src="chat.svg"
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
            onClick={() => likeButtonHandler(item.id)}
          >
            <span className="sr-only">View favorites</span>
            <Image
              src={item.isLiked ? "heart-red.svg" : "heart.svg"}
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

export default AquaViewActions;
