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
      <div className="w-full rounded-md text-md my-2 ml-1 mr-3">
        <table className="table-auto mt-2">
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
        <hr className="w-full my-2 text-2xl bg-red-500" />
        <div className="flex justify-end py-2 px-2 relative">
          <button
            className="py-2 px-4 mx-2 bg-green-400 rounded-md border-2 border-black"
            onClick={onEditClick}
          >
            Edit
          </button>
          <button
            className="py-2 px-4 bg-red-400 rounded-md border-2 border-black"
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
