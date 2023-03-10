import React, { SyntheticEvent, useState } from "react";
import { updateTreeByID } from "../../libs/api";

type CellBoxProps = {
  value: string | undefined;
  inputType: React.HTMLInputTypeAttribute;
  id: number;
  valueToUpdate: string;
};

type mode = "read" | "edit";

const CellBox: React.FC<CellBoxProps> = ({
  value,
  inputType,
  id,
  valueToUpdate,
}) => {
  const [localMode, setLocalMode] = useState<mode>("read");
  const [localValue, setLocalValue] = useState(value ?? "");

  const onSave = (e: SyntheticEvent) => {
    updateTreeByID(id, {
      [valueToUpdate]: localValue,
    }).then(() => {
      setLocalMode("read");
    });
  };

  if (localMode === "edit") {
    const handleSaveClick = () => {
      setLocalMode("read");
    };
    return (
      <>
        <input
          className="border-2 border-black bg-white"
          type={inputType}
          value={localValue}
          onChange={(e) => {
            setLocalValue(
              e.target.value
              //   new Intl.DateTimeFormat("id-ID").format(new Date(e.target.value))
            );
            console.log(e.target.value);
          }}
        />
        <div
          className="ml-2 cursor-pointer rounded-md border-2 border-black bg-green-400 py-1 px-2"
          onClick={onSave}
        >
          Save
        </div>
      </>
    );
  }

  return (
    <>
      <input
        type="text"
        className="bg-white"
        disabled
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value);
        }}
      />
      <div
        className="ml-2 cursor-pointer rounded-md border-2 border-black bg-green-400 py-1 px-2"
        onClick={() => setLocalMode("edit")}
      >
        Edit
      </div>
    </>
  );
};

export default CellBox;
