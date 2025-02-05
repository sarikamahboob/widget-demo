import { Layer, Source } from "react-bkoi-gl";

const MapillaryLayer = ({
  mapillaryData,
  singleMapillaryData,
  handleMapillaryData,
}:any) => {
  return (
    <div style={{display:'absolute'}}>
      {mapillaryData && (
        <Source
          type="vector"
          tiles={[
            "https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=MLY|9965372463534997|6cee240fad8e5571016e52cd3f24d7f8",
          ]}
          minzoom={6}
          maxzoom={14}
        >
          <Layer
            id="mapillary-sequences"
            type="line"
            source="mapillary"
            source-layer="sequence"
            paint={{
              "line-color": "#05CB63",
              "line-width": 1,
            }}
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
          />
          <Layer
            id="mapillary-images"
            type="circle"
            source="mapillary"
            source-layer="image"
            paint={{
              "circle-color": "#05CB63",
              "circle-radius": 5,
            }}
          />
        </Source>
      )}
    </div>
  );
};

export default MapillaryLayer;
