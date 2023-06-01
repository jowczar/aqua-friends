export type AquaLifeActionsProps = {
  isMobileView?: boolean;
};

const AquaLifeActions = ({ isMobileView }: AquaLifeActionsProps) => {
  const addButtonHandler = () => {
    //TODO: implement AquaLifeActions add button logic here
  };

  const removeButtonHandler = () => {
    //TODO: implement AquaLifeActions remove button logic here
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <td
        className={`${
          isMobileView ? "flex justify-center" : "hidden"
        } md:table-cell px-6 py-4 whitespace-nowrap text-right text-sm font-medium`}
      >
        <div className="flex items-center">
          <button
            className="rounded-lg p-4 flex items-center gap-3  text-blue-500 hover:text-blue-300"
            onClick={() => addButtonHandler()}
          >
            <span>Add</span>
          </button>

          <button
            className="rounded-lg p-4 flex items-center gap-3 text-blue-500 hover:text-blue-300"
            onClick={() => removeButtonHandler()}
          >
            <span>Remove</span>
          </button>
        </div>
      </td>
    </div>
  );
};

export default AquaLifeActions;
