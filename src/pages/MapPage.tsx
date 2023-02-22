import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { FeatureGroup, Popup, Rectangle } from "react-leaflet";

import L, {
  LatLng,
  LatLngBounds,
  LatLngBoundsLiteral,
  LatLngExpression,
  LayerEvent,
  LeafletMouseEvent,
} from "leaflet";
import LeafletMap from "../components/Map/LeafletMap";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Prediction, Tree } from "../types/Tree";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import PredictionResult from "../components/Sidebar/PredictionResult";
import HistoryPredictionsID from "../components/Sidebar/HistoryPredictionsID";
import PopupCard from "../components/Map/PopupCard";
import FloatingButton from "../components/Map/FloatingButton";
import HistoryPredictions from "../components/Sidebar/HistoryPredictions";
import SidebarMain from "../components/Sidebar/SidebarMain";
import PredictedTrees from "../components/Sidebar/PredictedTrees";
import {
  deleteTree,
  getTreesHistory,
  predictImage,
  getPredictionsHistory,
} from "../libs/api";
import useToken from "../hooks/useToken";
import TreeBoxes from "../components/Map/TreeBoxes";
import { MdNewLabel } from "react-icons/md";
import RequireAuth from "../components/Auth/RequireAuth";
import LoginScreen from "./Login";

const bounds = [
  [-6.470495720018312, 107.0268509108695],
  [-6.471394035295384, 107.02594683585174],
];

const MapPage = () => {
  // Navigasi ke login kalo belum login
  const [token, setToken] = useToken();
  const navigate = useNavigate();

  // if (!token) {
  //   return (
  //     <>
  //       <Routes>
  //         <Route path="/login" element={<LoginScreen />} />
  //         <Route path="*" element={<Navigate to="/login" />} />
  //       </Routes>
  //     </>
  //   );
  // }

  const mapRef = useRef<L.Map>(null);
  const fgRef = useRef<L.FeatureGroup>(null);

  // Liat history dari predicted tree
  const [showPredictedTree, setShowPredictedTree] = useState<boolean>(false);
  const [mapLoading, setMapLoading] = useState<boolean>(false);
  const [trees, setTrees] = useState<Tree[] | null>(null);
  const [allTrees, setAllTrees] = useState<Tree[] | null>(null);
  const [predictedTrees, setPredictedTrees] = useState<Tree[] | null>(null);

  const [totalTrees, setTotalTrees] = useState<number>();
  const rectRefs = useRef<Map<number, L.Rectangle> | null>(null);
  const predictedRectRefs = useRef<Map<number, L.Rectangle> | null>(null);

  // Rectangle untuk predict
  const [rectangleMouse, setRectangleMouse] = useState<LatLngBounds | null>(
    null
  );
  const [rectangleCenter, setRectangleCenter] = useState<LatLng>();
  const [predictRectangleBounds, setPredictRectangleBounds] =
    useState<LatLngBounds>();
  const [mouseMoveEvent, setMouseMoveEvent] = useState<boolean>(false);
  const mouseRectRef = useRef<L.Rectangle>(null);
  const [predictPopup, setPredictPopup] = useState<LatLngExpression>();

  // Rectangle untuk add
  const [rectAddCenter, setRectAddCenter] = useState<LatLng>();

  const [closeSidebar, setCloseSidebar] = useState<boolean>(true);

  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);

  const [drawTree, setDrawTree] = useState<boolean>(false);

  const [showTrees, setShowTrees] = useState<boolean>(false);
  const [showPredictedTrees, setShowPredictedTrees] = useState<boolean>(false);

  // Edit box tree
  const [editTreeID, setEditTreeID] = useState<number | null>(null);

  // Delete box tree
  const [deleteTreeID, setDeleteTreeID] = useState<number | null>(null);

  // Media query
  // const { isXs } = useBreakpoints();

  const onSelectArea = (e: SyntheticEvent) => {
    if (rectangleCenter) {
      setRectangleCenter(undefined);
    }

    if (mapRef.current) {
      mapRef.current.on("mousemove", (e: LeafletMouseEvent) => {
        setPredictPopup(undefined);
        setMouseMoveEvent(true);
        setRectangleMouse(e.latlng.toBounds(100));
      });

      mapRef.current.on("click", (e: LeafletMouseEvent) => {
        setMouseMoveEvent(false);
      });
    }
  };

  const onCreated = (e: LayerEvent) => {
    const layer = e.layer as L.Rectangle;
    console.log(layer.getCenter());
  };

  const drawSomething = (e: SyntheticEvent) => {
    e.preventDefault();
    if (mapRef.current) {
      const map = mapRef.current as L.DrawMap;

      const rect = new L.Draw.Rectangle(map, {
        // @ts-ignore
        showArea: false,
      });

      map.on(L.Draw.Event.CREATED, (e: LayerEvent) => {
        if (fgRef.current) {
          const drawnItems = fgRef.current.getLayers();
          if (drawnItems.length > 1) {
            drawnItems.forEach((layer, index) => {
              if (index > 0) return;
              fgRef.current?.removeLayer(layer);
            });
          }

          const type = e.type;
          const layer = e.layer as L.Rectangle;

          layer.on("click", () => console.log(layer.getCenter()));

          fgRef.current.addLayer(layer);

          const center = layer.getCenter();

          setRectAddCenter(center);
        }
      });

      rect.enable();
    }
  };

  const apiCall = () => {
    // Kalau button Show Predicted Tree dan
    if (showPredictedTree === false) {
      setShowPredictedTree(true);

      setMapLoading(true);
      getTreesHistory().then((tree) => {
        setAllTrees(tree);
        setTrees(allTrees);
        setTotalTrees(tree?.length);
      });

      setMapLoading(false);
      setShowTrees(true);
    } else if (showPredictedTree === true) {
      setMapLoading(true);
      setShowPredictedTree(false);
      setShowTrees(false);
      setMapLoading(false);
    }
  };

  const onDeleteFunction = (id: number) => {
    deleteTree(id).then((response) => {
      console.log(response);
      if (!response.ok) {
        console.log(response.json());
        return;
      }

      const treeToDelete = trees?.findIndex(
        (tree) => tree.tree_id === id
      ) as number;
      console.log(treeToDelete);
      if (trees) {
        const newTrees = [...trees];
        newTrees.splice(treeToDelete, 1);
        setTrees(newTrees);
        rectRefs?.current?.delete(id);
        console.log(newTrees);
      }
    });
  };

  const [predicted, setPredicted] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<Prediction | undefined>();
  const [predictions, setPredictions] = useState<Prediction[] | undefined>();

  const onPredictConfirmed = async (e: SyntheticEvent) => {
    e.preventDefault();
    setMapLoading(true);
    setCloseSidebar(true);

    if (trees) {
      setTrees(null);
      setShowTrees(false);
    }

    if (predicted === true) {
      setPrediction(undefined);
    }

    const lat = rectangleCenter?.lat as number;
    const long = rectangleCenter?.lng as number;
    const neBounds = predictRectangleBounds?.getNorthEast() as LatLng;
    const swBounds = predictRectangleBounds?.getSouthWest() as LatLng;

    predictImage(lat, long, neBounds, swBounds)
      .then((data) => {
        setPrediction(data);
        setPredicted(true);

        if (allTrees) {
          // Append predicted trees to trees state
          const new_trees = [...allTrees, ...data.trees];
          setAllTrees(new_trees);
          setPredictedTrees(data.trees);
          setTrees(data.trees);
        }
        setShowTrees(true);
        setMapLoading(false);
        setPredictPopup(undefined);
        navigate("/predict");
      })
      .then(() => {
        setCloseSidebar(false);
        setRectangleMouse(null);
        setRectangleCenter(undefined);
      })
      .catch((e) => {
        console.log(e);
      });
    // setRectangleMouse(null);
    // setRectangleCenter(undefined);
  };

  // const onStopShowMore = (e: DraggableEvent, data: DraggableData) => {
  //   if (data.y < -100) {
  //     alert("Test");
  //   }
  // };

  // const []
  const onPredictCanceled = (e: SyntheticEvent) => {
    setRectangleCenter(undefined);
    setRectangleMouse(null);
    setPredictPopup(undefined);
  };

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      if (!mouseMoveEvent) {
        if (mouseRectRef.current) {
          setRectangleCenter(mouseRectRef.current?.getCenter());

          const lat = mouseRectRef.current.getCenter().lat + 0.00045;
          const long = mouseRectRef.current.getCenter().lng;

          const center = [lat, long] as LatLngExpression;
          setPredictPopup(center);
          setPredictRectangleBounds(mouseRectRef.current.getBounds());
          console.log(mouseRectRef.current?.getBounds());

          map.off("mousemove");
          map.off("click");
        }
      }
    }
  }, [mapRef, mouseMoveEvent, mouseRectRef]);

  useEffect(() => {
    getTreesHistory().then((tree) => {
      setAllTrees(tree);
      setTrees(tree);
      console.log(trees);
      setTotalTrees(tree?.length);
    });
  }, []);

  useEffect(() => {
    getPredictionsHistory().then((preds) => {
      setPredictions(preds);
    });
  }, []);

  const location = useLocation();
  const [isPredictionsRoute, setIsPredictionsRoute] = useState(false);
  useEffect(() => {
    if (deleteTreeID) {
      console.log("useeffect deletetree", deleteTreeID);
      onDeleteFunction(deleteTreeID);
      console.log("rectLength", rectRefs.current?.size);
      const myRect = rectRefs?.current?.get(deleteTreeID);
      myRect?.closePopup();
    }
  }, [deleteTreeID]);

  useEffect(() => {
    const permittedLocations = ["/", "/predict"];
    setIsPredictionsRoute(permittedLocations.includes(location.pathname));
  }, [location]);

  return (
    <>
      <MapContext.Provider
        value={{
          totalTrees: totalTrees,
          trees: trees,
          setTotalTrees: setTotalTrees,
          predictedTrees: predictedTrees,
        }}
      >
        <div className="flex">
          <div
            className={`flex z-30 overflow-x-hidden h-screen bg-gray-700 ease-in-out duration-300 rounded-r-2xl ${
              !closeSidebar ? "w-[41%]" : "w-0"
            }`}
          >
            <div className="flex flex-col container items-start w-full">
              <Outlet />
            </div>
          </div>
          <div
            className="z-30 my-auto bg-gray-500 py-3 pl-2 pr-2 rounded-r-md cursor-pointer"
            onClick={() => {
              setCloseSidebar(!closeSidebar);
            }}
          >
            {!closeSidebar ? (
              <AiOutlineArrowLeft className="text-white" />
            ) : (
              <AiOutlineArrowRight className="text-white" />
            )}
          </div>

          <div className="flex fixed bottom-0 right-0 z-20 mr-5 sm:mb-14 md:mb-10 mb-12 float-right flex-col">
            <FloatingButton onClick={drawSomething} text="Add Tree" />
            <FloatingButton text="Predict Image" onClick={onSelectArea} />
            <FloatingButton
              className={`${
                showPredictedTree
                  ? "bg-green-400"
                  : "bg-white hover:bg-gray-300"
              }`}
              onClick={apiCall}
              mapLoading={mapLoading}
              text="Show Predicted Trees"
            />
          </div>

          {/* {isXs ? <ShowMore onStop={onStopShowMore} /> : null} */}
          {/* <Draggable
          defaultClassName="fixed z-30 bottom-0 left-0"
          axis="y"
          defaultPosition={{ x: 0, y: 400 }}
          bounds={{
            // top: 0,
            bottom: 900,
            left: 0,
            right: 0,
          }}
          // grid={[25, 25]}
        >
          <div className="flex flex-col z-20 bottom-0 left-0 w-screen h-auto">
            <div className="flex h-11 bg-white justify-center items-center">
              <AiOutlineMinus />
            </div>
            <div className="h-screen bg-white overflow-auto"></div>
          </div>
          {/* <div className="flex flex-col fixed z-30 bottom-0 left-0 bg-white w-full h-11">
          <div className="flex justify-center items-center  text-gray-500">
            <AiOutlineMinus />
          </div> */}
          {/* <div className="h-screen bg-white">asd</div>
        </div> */}
          {/* </Draggable> */}

          {mapLoading ? (
            <div className="absolute top-0 left-0 bottom-0 right-0 z-10 opacity-50 bg-black cursor-wait"></div>
          ) : null}
          <LeafletMap mapRef={mapRef}>
            {predictions && predicted
              ? predictions.map((pred) => {
                  if (!pred.nw_bounds && !pred.se_bounds) return;
                  return (
                    <Rectangle
                      color="green"
                      bounds={
                        [
                          pred.nw_bounds,
                          pred.se_bounds,
                        ] as L.LatLngBoundsExpression
                      }
                    />
                  );
                })
              : null}
            {predicted && prediction ? (
              <Rectangle
                color="red"
                bounds={
                  [
                    prediction.nw_bounds,
                    prediction.se_bounds,
                  ] as L.LatLngBoundsExpression
                }
              />
            ) : null}
            {trees && showTrees ? (
              <TreeBoxes
                rectRefs={rectRefs}
                setDeleteTreeID={setDeleteTreeID}
                setEditTreeID={setEditTreeID}
                trees={trees}
              />
            ) : null}
            {/* {predictedTrees && showPredictedTrees ? (
              <TreeBoxes
                rectRefs={rectRefs}
                setDeleteTreeID={setDeleteTreeID}
                setEditTreeID={setEditTreeID}
                trees={predictedTrees}
              />
            ) : null} */}

            {rectangleMouse ? (
              <Rectangle ref={mouseRectRef} bounds={rectangleMouse}>
                {rectangleCenter ? (
                  <Popup>
                    Lat: {rectangleCenter.lat}
                    <br />
                    Long: {rectangleCenter?.lng}
                  </Popup>
                ) : null}
              </Rectangle>
            ) : null}
            <FeatureGroup ref={fgRef}></FeatureGroup>
            {predictPopup ? (
              <Popup
                closeOnClick={false}
                closeButton={false}
                autoClose={false}
                position={predictPopup}
              >
                <div>
                  <div className="w-full rounded-md text-xl my-2 ml-1 mr-3">
                    Are you sure?
                  </div>
                  <div className="flex justify-end py-2 px-2 relative">
                    <button
                      className="py-2 px-4 mx-2 bg-green-400 rounded-md border-2 border-black"
                      onClick={onPredictConfirmed}
                    >
                      Yes
                    </button>
                    <button
                      className="py-2 px-4 bg-red-400 rounded-md border-2 border-black"
                      onClick={onPredictCanceled}
                    >
                      No
                    </button>
                  </div>
                </div>
              </Popup>
            ) : null}
          </LeafletMap>
        </div>
      </MapContext.Provider>
    </>
  );
};

export default MapPage;

export type MapContextProps = {
  totalTrees: number | undefined;
  trees: Tree[] | null;
  predictedTrees: Tree[] | null;
  setTotalTrees: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const MapContext = React.createContext<MapContextProps | null>(null);
