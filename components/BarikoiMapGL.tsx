"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Map, FullscreenControl, GeolocateControl, NavigationControl, ScaleControl, Marker, useControl } from 'react-bkoi-gl';
import { GeoJsonLayer, ScatterplotLayer } from '@deck.gl/layers' // Import DeckGL Layer
import { MapboxOverlay } from '@deck.gl/mapbox' // Import Mapbox Overlay

// Import Styles
import "react-bkoi-gl/styles"
import MapControlButton from './MapControlButton';
import { TbHexagon3D } from 'react-icons/tb';
import DrawControl from './DrawControl';
import SwitchButton from './MapillaryComponents/SwitchButton';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setImgId, setScatterData, setSingleMapillaryData } from '@/redux/reducers/mapReducer';
import MapillaryLayer from './MapillaryComponents/MapillaryLayer';
import MapillaryViewer from './MapillaryComponents/MapillaryViewer';
import MapLayer from './MapLayer';

// Create DeckGL Overlay
const DeckGLOverlay = (props: any) => {
  const overlay = useControl(() => new MapboxOverlay(props))
  overlay.setProps(props)
  return null
}

type BarikoiMapGLProps = {
  geolocateControl: boolean;
  fullScreenControl: boolean;
  navigationControl: boolean;
  scaleControl: boolean;
}

const BarikoiMapGL = ({geolocateControl, fullScreenControl, navigationControl, scaleControl}: BarikoiMapGLProps) => {
  const BARIKOI_API_KEY = process.env.NEXT_PUBLIC_BKOI_API_KEY
  const mapStyle = `https://map.barikoi.com/styles/osm-liberty/style.json?key=${BARIKOI_API_KEY}`
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const [events, logEvents] = useState({});
  const [is3DMode, setIs3DMode] = useState(false);
  const [features, setFeatures] = useState({});

  const mapillaryData = useAppSelector((state) => state?.map?.mapillaryData ?? null);
  const singleMapillaryData = useAppSelector((state) => state?.map?.singleMapillaryData ?? null);
  const imgId = useAppSelector((state) => state?.map?.imgId ?? null);
  const scatterData = useAppSelector((state) => state?.map?.scatterData ?? null);
  const mapLayer = useAppSelector((state) => state?.map?.mapLayer ?? null);
  console.log({mapLayer})

  const initialViewState = {
    longitude: 90.36402,
    latitude: 23.823731,
    minZoom: 4,
    maxZoom: 30,
    zoom: 13,
    bearing: 0,
    pitch: is3DMode ? 60 : 0,
    antialias: true
  }

  const [marker, setMarker] = useState({
    latitude: initialViewState.latitude,
    longitude: initialViewState.longitude
  });

  useEffect(() => {
    if (imgId) {
      fetch(
        `https://graph.mapillary.com/${imgId}?access_token=MLY|9965372463534997|6cee240fad8e5571016e52cd3f24d7f8&fields=computed_geometry`
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch(setScatterData(data.computed_geometry?.coordinates));
        })
        .catch((error) => console.error(error));
    }
  }, [imgId]);
  useEffect(() => {
    if (imgId) {
      fetch(
        `https://graph.mapillary.com/${imgId}?access_token=MLY|9965372463534997|6cee240fad8e5571016e52cd3f24d7f8&fields=computed_geometry`
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch(setScatterData(data.computed_geometry?.coordinates));
        })
        .catch((error) => console.error(error));
    }
  }, [imgId]);

  const modifiedScatterData = [{ coordinates: scatterData }];

  const layers = new GeoJsonLayer({
    id: 'GeoJsonLayer',
    data: "https://raw.githubusercontent.com/faiazhossain/dhaka-geojson/main/dhaka-geojson.geojson",
    stroked: false,
    filled: true,
    pointType: 'circle+text',
    pickable: true,
    lineWidthScale: 3,
    lineWidthMaxPixels: 5,
    lineWidthMinPixels: 1,
    getFillColor: [160, 160, 180, 200],
    wireframe: true,
    opacity: 0.6, 
    zIndex: 100
  });

  console.log({modifiedScatterData})

  const layers2 =  new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: modifiedScatterData,
    pickable: true,
    opacity: 1,
    stroked: true,
    filled: true,
    radiusScale: 20,
    radiusMinPixels: 1,
    radiusMaxPixels: 8,
    lineWidthMaxPixels: 1,
    getPosition: (d) => d.coordinates,
    getRadius: (d) => Math.sqrt(d.exits),
    getFillColor: (d) => [255, 140, 0],
    getLineColor: (d) => [0, 0, 0],
  })

  // On marker drag
  const onMarkerDrag = useCallback((event: any) => {
    logEvents(_events => ({..._events, onDrag: event.lngLat}));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    });
  }, []);

  // On marker drag start
  const onMarkerDragStart = useCallback((event: any) => {
    logEvents(_events => ({..._events, onDragStart: event.lngLat}));
  }, []);  


  // On marker drag end
  const onMarkerDragEnd = useCallback((event: any) => {
    logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
  }, []);


  // On click 3D mode
  const handleToggle3DMode = () => {
    setIs3DMode(!is3DMode);
    const map: any = mapRef.current;
    if (map) {
      map.setPitch(is3DMode ? 0 : 60);
    }
  }

  // On draw polygon update
  const onUpdate = useCallback((e:any) => {
    setFeatures(currFeatures => {
      const newFeatures:any = {...currFeatures};
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  // On draw polygon delete
  const onDelete = useCallback((e:any) => {
    setFeatures(currFeatures => {
      const newFeatures:any = {...currFeatures};
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  // Mapillary
  const mapillaryImageId = useAppSelector((state) => state.map.mapillaryImageId);
  const dispatch = useAppDispatch();
  const handleClick = (e:any) => {
    console.log({ e });
    e.preventDefault();
    console.log()
    if (mapillaryImageId) {
      // Navigate to the specific Mapillary image
      dispatch(setSingleMapillaryData(mapillaryImageId));
      dispatch(setImgId(null));
    } else if (mapillaryData) {
      // Query for mapillary features
      const mapillaryFeatures = e.target.queryRenderedFeatures(e.point, {
        layers: ['mapillary-images'], // Specify the layers you want to query
      });
      console.log({ mapillaryFeatures });
      // Check if there are mapillary features and the first feature has an "id" property
      if (mapillaryFeatures.length > 0 && mapillaryFeatures[0]?.properties?.id) {
        // Dispatch actions if the conditions are met
        dispatch(setSingleMapillaryData(mapillaryFeatures[0]?.properties?.id));
        dispatch(setImgId(null));
      }
    }
  };

  useEffect(()=> {
    if (mapillaryImageId) {
      dispatch(setSingleMapillaryData(mapillaryImageId));
      dispatch(setImgId(null));
    }
  },[mapillaryImageId])

  const handleMapillaryData = () => {
    dispatch(setSingleMapillaryData(null));
  };

  

  return (
    <div
      ref={mapContainer} style={containerStyles}
    >
      <Map
        ref={mapRef}
        mapStyle={mapLayer || mapStyle}
        style={{ width: "100%", height: "100%" }}
        initialViewState={initialViewState}
        doubleClickZoom={false}
        dragRotate={false}
        attributionControl={false}
        onClick={handleClick}
        cursor='pointer'
      >
        <DeckGLOverlay layers={[layers, layers2]} />
        <Marker 
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
          style={{ zIndex: 1111 }}
        >
          <img src="./approve.svg" style={{ width: '30px', height: '30px' }} /> 
        </Marker>
        {
          geolocateControl && <GeolocateControl position="top-right" />
        }
        {
          fullScreenControl && <FullscreenControl position="top-right" />
        }
        {
          navigationControl && <NavigationControl position="top-right" />
        }
        {
          scaleControl && <ScaleControl position="bottom-right" />
        }
        <div
          style={window.screen.width > 450 ? { ...Style } : { ...StyleMobile }}
        >
          <MapControlButton
            title={is3DMode ? "Switch to 2D" : "Switch to 3D"}
            onClick={handleToggle3DMode}
            icon={<TbHexagon3D color="#333333" />}
            isActive={is3DMode}
          />
          <DrawControl
            position="top-right"
            displayControlsDefault={false}
            controls={{
              polygon: true,
              trash: true
            }}
            // defaultMode="draw_polygon"
            onCreate={onUpdate}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          <SwitchButton  id={setSingleMapillaryData}></SwitchButton>
        </div>
        <MapillaryLayer
          mapillaryData={mapillaryData}
          singleMapillaryData={singleMapillaryData}
          handleMapillaryData={handleMapillaryData}
        />
      </Map>
      {singleMapillaryData && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            width: "300px",
            height: "200px", 
            zIndex: 1000,
            backgroundColor: "white",
            border: "1px solid #ccc",
          }}
        >
          <MapillaryViewer
            imageId={singleMapillaryData}
            accessToken="MLY|9965372463534997|6cee240fad8e5571016e52cd3f24d7f8"
            onMapillaryData={handleMapillaryData}
          />
        </div>
      )}
      <MapLayer></MapLayer>
    </div>
  )
}

// JSX Styles
const containerStyles = {
  width: "100%",
  height: "100vh",
  minHeight: "400px",
  overflow: "hidden",
}

const Style = {
  position: 'absolute' as const,
  top: 252,
  right: 10,
  background: 'none',
  zIndex: 9999,
};
const StyleMobile = {
  position: 'absolute' as const,
  display: 'flex',
  alignItems: 'center',
  bottom: 80,
  left: 150,
  background: 'none',
  // zIndex: 9999,
};

export default BarikoiMapGL