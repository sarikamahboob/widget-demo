import React, { useState } from "react";
import { Image } from "antd";
import { useAppDispatch } from "@/redux/store";
import { setMapLayer } from "@/redux/reducers/mapReducer";
import { FloatButton } from "antd";
import { FaLayerGroup } from "react-icons/fa";

const MapLayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const BKOI_API_KEY = process.env.NEXT_PUBLIC_BKOI_API_KEY

  const [mapStyleLayer, setMapStyleLayer]: any = useState(1);

  const mapStyles = {
    default: {
      id: 1,
      url: `https://map.barikoi.com/styles/planet_barikoi_v2/style.json?key=${BKOI_API_KEY}`
    },
    dark: {
      id: 2, 
      url: `https://map.barikoi.com/styles/barikoi-dark/style.json?key=${BKOI_API_KEY}`
    },
    bangla: {
      id: 3,
      url: `https://map.barikoi.com/styles/barikoi-bangla/style.json?key=${BKOI_API_KEY}`
    },
    travel: {
      id: 4,
      url: `https://travel.map.barikoi.com/styles/barikoi/style.json?key=${BKOI_API_KEY}`
    },
    satellite: {
      id: 5,
      url: `https://api.maptiler.com/maps/dfa2a215-243b-4b69-87ef-ce275b09249c/style.json?key=ASrfqapsZfy4BRFJJdVy`
    },
    green: {
      id: 6,
      url: `https://tiles.barikoimaps.dev/styles/barkoi_green/style.json`
    }
  };

  const selectMapLayer = (style: keyof typeof mapStyles) => {
    setMapStyleLayer(mapStyles[style].id);
    dispatch(setMapLayer(mapStyles[style].url));
  };
  
  return (
    // <div style={containerStyle}>
    <div>
      <FloatButton.Group
        trigger="click"
        style={{ position: "absolute", right: 10, zIndex: 9999 }}
        shape="square"
        icon={<FaLayerGroup style={{ color: "white" }} />}
      >
        {Object.entries(mapStyles).map(([style, {id, url}]) => (
          <FloatButton
            key={id}
            onClick={() => selectMapLayer(style as keyof typeof mapStyles)} 
            tooltip={`${style.charAt(0).toUpperCase() + style.slice(1)} Map`}
            icon={
              <Image
                className={
                  mapStyleLayer === id
                    ? "activeButton _border_radius_5"
                    : "_border_radius_5"
                }
                src={`/${style}_map.png`.toLowerCase()}
                alt={`${style}_map_image`}
                preview={false}
              />
            }
          />
        ))}
      </FloatButton.Group>
    </div>
  );
};

export default MapLayer;

// jsx styles
const containerStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 20,
  right: 10,
  height: 50,
  padding: 48,
  textAlign: "center",
  background: "none",
  zIndex: 9999,
};
