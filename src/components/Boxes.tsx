import { LatLngTuple } from "leaflet"
import React, { FC, MutableRefObject, useEffect, useRef, useState } from "react"
import { Popup } from "react-leaflet"
import { Rectangle } from "react-leaflet"
import { deleteTree } from "../libs/api"
import { Tree } from "../types/ApiCall"
import TreeCard from "./TreeCard"

const Boxes: FC<{
    trees: Tree[]
    setTrees: React.Dispatch<React.SetStateAction<Tree[] | null>>
    rectRefs: MutableRefObject<Map<number, L.Rectangle> | null>
    popupRefs: MutableRefObject<Map<number, L.Popup> | null>
    setDeleteTreeID: React.Dispatch<React.SetStateAction<number | null>>
}> = ({ trees, setTrees, rectRefs, popupRefs, setDeleteTreeID }) => {
    const getRectMap = () => {
        if (!rectRefs.current) {
            rectRefs.current = new Map()
        }

        return rectRefs.current
    }

    const getPopupMap = () => {
        if (!popupRefs.current) {
            popupRefs.current = new Map()
        }
        return popupRefs.current
    }

    return (
        <>
            {trees?.map((tree, id) => {
                return (
                    <Rectangle
                        key={`tree-${id}`}
                        ref={(props) => {
                            const map = getRectMap()
                            if (props) {
                                map.set(tree.tree_id, props)
                            } else {
                                map.delete(tree.tree_id)
                            }
                        }}
                        bounds={[
                            tree.nw_bounds as LatLngTuple,
                            tree.se_bounds as LatLngTuple,
                        ]}
                    >
                        <Popup
                            ref={(props) => {
                                const map = getPopupMap()
                                if (props) {
                                    map?.set(tree.tree_id, props)
                                } else {
                                    map?.delete(tree.tree_id)
                                }
                            }}
                        >
                            <TreeCard
                                id={tree.tree_id}
                                confidence={tree.confidence}
                                lat={tree.lat}
                                long={tree.long}
                                predicted_at={tree.created_at}
                                setDeleteTreeID={setDeleteTreeID}
                            />
                        </Popup>
                    </Rectangle>
                )
            })}
        </>
    )
}

export default Boxes
