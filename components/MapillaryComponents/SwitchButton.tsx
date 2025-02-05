import React, { useState } from "react";
import { Tooltip } from "antd";
import { useAppDispatch } from "@/redux/store";
import {
  setImgId,
  setMapillaryData,
  setScatterData,
  setSingleMapillaryData,
} from "@/redux/reducers/mapReducer";
import { FaStreetView } from "react-icons/fa";

const SwitchButton: React.FC<{ id: (value: null) => void }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(true);

  const onChange = () => {
    if (checked) {
      dispatch(setMapillaryData(true));
      setChecked(false);
    } else {
      dispatch(setMapillaryData(false));
      dispatch(setImgId(null));
      dispatch(setSingleMapillaryData(null));
      id(null);
      setChecked(true);
      dispatch(setScatterData(null));
    }
  };

  // The rest of your component code
  return (
    <div //NOSONAR
      onClick={onChange}
      className="streetView"
      style={{
        cursor: "pointer",
        color: checked ? "#333333" : "#070F2B",
        fontSize: checked ? 20 : 20,
      }}
    >
      {/* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px; */}
      <Tooltip
        placement={window.screen.width > 450 ? "left" : "top"}
        title="Street View"
        color="rgba(0, 0, 0, .8)"
      >
        <div
          className={checked ? "streetViewIcon" : "streetViewIconChecked"}
          style={{
            background: checked ? "#FFFFFF" : "#82CD47",
            display: "flex",
            justifyContent: "center",
            borderRadius: "6px",
            padding: "4px 5px",
            boxShadow:
              "rgba(60, 64, 67, 0.1) 0px 0px 0px 2px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          }}
        >
          <FaStreetView></FaStreetView>
        </div>
      </Tooltip>
      {/* </Popover> */}
    </div>
  );
};

export default SwitchButton;
