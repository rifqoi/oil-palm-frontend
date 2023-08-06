import * as L from "leaflet";

// https://stackoverflow.com/questions/67460092/need-proper-way-to-render-jsx-component-inside-leaflet-popup-when-using-geojson
type PopupConfirmationType = {
  onConfirmed: () => void;
  onCancelled: () => void;
};

const PopupConfirmation = ({
  onConfirmed,
  onCancelled,
}: PopupConfirmationType) => {
  const container = L.DomUtil.create("div");

  const confirmationText = L.DomUtil.create(
    "div",
    "my-2 ml-1 mr-3 w-full rounded-md text-xl",
    container
  );

  confirmationText.innerHTML = "Are you sure?";

  const divButton = L.DomUtil.create(
    "div",
    "relative flex justify-end py-2 px-2"
  );

  const confirmationButton = L.DomUtil.create(
    "button",
    "mx-2 rounded-md border-2 border-black bg-green-400 py-2 px-4",
    divButton
  );

  confirmationButton.addEventListener("click", () => {
    onConfirmed();
  });
  confirmationButton.innerHTML = "Yes";

  const cancelledButton = L.DomUtil.create(
    "button",
    "rounded-md border-2 border-black bg-red-400 py-2 px-4",
    divButton
  );
  cancelledButton.addEventListener("click", () => {
    onCancelled();
  });
  cancelledButton.innerHTML = "No";

  container.appendChild(divButton);

  return container;
  //   return (
  //     <div>
  //       <div className="my-2 ml-1 mr-3 w-full rounded-md text-xl">
  //         Are you sure?
  //       </div>
  //       <div className="relative flex justify-end py-2 px-2">
  //         <button
  //           className="mx-2 rounded-md border-2 border-black bg-green-400 py-2 px-4"
  //           onClick={() => {
  //             console.log("Yes");
  //           }}
  //         >
  //           Yes
  //         </button>
  //         <button
  //           className="rounded-md border-2 border-black bg-red-400 py-2 px-4"
  //           //   onClick={onCancelled}
  //         >
  //           No
  //         </button>
  //       </div>
  //     </div>
  //   );
};

export default PopupConfirmation;
