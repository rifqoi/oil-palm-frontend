import React from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

type ShowMoreProps = {
  onStop: DraggableEventHandler;
};

const ShowMore: React.FC<ShowMoreProps> = ({ onStop }) => {
  return (
    <Draggable
      axis="y"
      defaultPosition={{ x: 0, y: 0 }}
      onStop={onStop}
      bounds={{
        top: -400,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      grid={[25, 25]}
    >
      <div className="fixed bottom-0 z-30 flex h-11 w-full items-center justify-start bg-white">
        <div className="ml-3 flex items-center justify-center text-gray-500">
          <MdOutlineKeyboardArrowUp className="mr-2" />
          <span className="">Tap to show more</span>
        </div>
        <div className="absolute top-10 h-screen w-screen bg-white"></div>
      </div>
    </Draggable>
  );
};

export default ShowMore;
