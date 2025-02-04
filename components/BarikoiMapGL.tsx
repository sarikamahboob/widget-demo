"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Map, FullscreenControl, GeolocateControl, NavigationControl, ScaleControl, Marker, useControl } from 'react-bkoi-gl';
import { GeoJsonLayer } from '@deck.gl/layers' // Import DeckGL Layer
import { MapboxOverlay } from '@deck.gl/mapbox' // Import Mapbox Overlay

// Import Styles
import "react-bkoi-gl/styles"
import MapControlButton from './MapControlButton';
import { TbHexagon3D } from 'react-icons/tb';
import DrawControl from './DrawControl';

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
  const BARIKOI_API_KEY = 'bkoi_83d9e819b6e1532612d485a65af861c5a9696798352f9bc0be8d9a2430a9f9f6'
  const mapStyle = `https://map.barikoi.com/styles/osm-liberty/style.json?key=${BARIKOI_API_KEY}`
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const [events, logEvents] = useState({});
  const [is3DMode, setIs3DMode] = useState(false);
  const [features, setFeatures] = useState({});

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

  return (
    <div
      ref={mapContainer} style={containerStyles}
    >
      <Map
        ref={mapRef}
        mapStyle={mapStyle}
        style={{ width: "100%", height: "100%" }}
        initialViewState={initialViewState}
        doubleClickZoom={false}
        dragRotate={false}
        attributionControl={false}
      >
        <DeckGLOverlay layers={[layers]} />
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
        </div>
      </Map>
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