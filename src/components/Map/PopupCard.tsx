import React, { SyntheticEvent } from "react";
import { Tree } from "../../types/Tree";

type PopupCardProps = {
  tree: Tree;
  setDeleteTreeID: React.Dispatch<React.SetStateAction<number | null>>;
  setEditTreeID: React.Dispatch<React.SetStateAction<number | null>>;
};

const PopupCard: React.FC<PopupCardProps> = ({
  tree,
  setDeleteTreeID,
  setEditTreeID,
}) => {
  const onDeleteClick = (e: SyntheticEvent) => {
    setDeleteTreeID(tree?.tree_id);
  };

  const onEditClick = (e: SyntheticEvent) => {
    setEditTreeID(tree.tree_id);
  };
  return (
    <>
      <div className="text-md my-2 ml-1 mr-3 w-full rounded-md">
        <table className="mt-2 table-auto">
          <tbody>
            <tr>
              <td>ID</td>
              <td className="pl-3">{tree?.tree_id}</td>
            </tr>
            <tr>
              <td>Latitude</td>
              <td className="pl-3">{tree?.lat}</td>
            </tr>
            <tr>
              <td>Longitude</td>
              <td className="pl-3">{tree?.long}</td>
            </tr>
            <tr>
              <td>Confidence</td>
              <td className="pl-3">{tree?.confidence}</td>
            </tr>
            <tr>
              <td>Predicted at</td>
              <td className="pl-3">{tree?.created_at}</td>
            </tr>
          </tbody>
        </table>
        <hr className="my-2 w-full bg-red-500 text-2xl" />
        <div className="relative flex justify-end py-2 px-2">
          <button
            className="mx-2 rounded-md border-2 border-black bg-green-400 py-2 px-4"
            onClick={onEditClick}
          >
            Edit
          </button>
          <button
            className="rounded-md border-2 border-black bg-red-400 py-2 px-4"
            onClick={onDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default PopupCard;
