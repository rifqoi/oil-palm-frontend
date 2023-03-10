import React, { SyntheticEvent, useState } from "react";
import { Tree } from "../../types/Tree";
import CellBox from "./CellBox";

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

  const [showEditPopup, setShowEditPopup] = useState<boolean>(true);

  return (
    <>
      <div className="text-md my-2">
        <table className="mt-2 table-auto">
          <tbody>
            <tr>
              <td className="whitespace-nowrap">ID</td>
              <td className="pl-3">{tree?.tree_id}</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">Latitude</td>
              <td className="pl-3">{tree?.lat}</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">Longitude</td>
              <td className="pl-3">{tree?.long}</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">Status</td>
              <td className="flex justify-between pl-3">
                <CellBox
                  value={tree.status}
                  inputType="text"
                  id={tree.tree_id}
                  valueToUpdate="status"
                />
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">Tanggal Penanaman</td>
              <td className="flex justify-between pl-3">
                <CellBox
                  value={tree.planting_date?.split("T")[0]}
                  inputType="date"
                  id={tree.tree_id}
                  valueToUpdate="planting_date"
                />
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">Pemupukan Terakhir</td>
              <td className="flex justify-between pl-3">
                <CellBox
                  value={tree.pemupukan_terakhir?.split("T")[0]}
                  inputType="date"
                  id={tree.tree_id}
                  valueToUpdate="pemupukan_terakhir"
                />
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">Tanggal Prediksi</td>
              <td className="pl-3">
                <input
                  className="bg-white"
                  type="text"
                  value={tree.created_at.split("T")[0]}
                  disabled
                />
              </td>
            </tr>
          </tbody>
        </table>
        <hr className="my-2  bg-red-500 text-2xl" />
        <div className="relative flex justify-end py-2">
          <button
            className="mx-2 rounded-md border-2 border-black bg-green-400 py-2 px-4"
            onClick={() => {
              setShowEditPopup(false);
            }}
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
