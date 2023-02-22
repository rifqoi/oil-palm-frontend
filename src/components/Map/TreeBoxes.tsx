import React from "react";
import { Popup, Rectangle } from "react-leaflet";
import { Tree } from "../../types/Tree";

import L from "leaflet";
import PopupCard from "./PopupCard";

type TreeBoxesProps = {
  trees: Tree[];
  rectRefs: React.MutableRefObject<Map<number, L.Rectangle> | null>;
  setDeleteTreeID: React.Dispatch<React.SetStateAction<number | null>>;
  setEditTreeID: React.Dispatch<React.SetStateAction<number | null>>;
};

const TreeBoxes: React.FC<TreeBoxesProps> = ({
  trees,
  rectRefs,
  setEditTreeID,
  setDeleteTreeID,
}) => {
  const getRectMap = () => {
    if (!rectRefs.current) {
      rectRefs.current = new Map();
    }

    return rectRefs.current;
  };

  return (
    <>
      {trees?.map((tree, id) => {
        return (
          <Rectangle
            key={`tree-${id}`}
            ref={(props) => {
              const map = getRectMap();
              if (props) {
                map.set(tree.tree_id, props);
              } else {
                map.delete(tree.tree_id);
              }
            }}
            bounds={[
              tree.nw_bounds as L.LatLngTuple,
              tree.se_bounds as L.LatLngTuple,
            ]}
          >
            <Popup>
              <PopupCard
                tree={tree}
                setEditTreeID={setEditTreeID}
                setDeleteTreeID={setDeleteTreeID}
              />
            </Popup>
          </Rectangle>
        );
      })}
    </>
  );
};

export default TreeBoxes;
