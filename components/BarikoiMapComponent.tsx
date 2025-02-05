import { BarikoiMap, useAutocomplete, useMap } from 'barikoi-map-widget';
import { useEffect, useRef, useState } from 'react';
import MapControlButton from './MapControlButton';
import { TbHexagon3D } from 'react-icons/tb';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'; // Import the CSS for styling
import { useControl } from 'react-bkoi-gl';
import DrawControl from './DrawControl';

const BarikoiMapComponent = () => {
  const BARIKOI_API_KEY = process.env.NEXT_PUBLIC_BKOI_API_KEY; 
  const { selectedPlace } = useAutocomplete();
  const { setCenterPoint } = useMap();

  useEffect(() => {
    setCenterPoint({
      lat: selectedPlace?.latitude,
      lng: selectedPlace?.longitude,
    });
  }, [selectedPlace]);

  const initialViewState = {
    longitude: 90.36402,
    latitude: 23.823731,
    minZoom: 4,
    maxZoom: 30,
    zoom: 16,
    pitch: 0,
  };

  return (
    <div className="custom-map-wrapper">
      <BarikoiMap
        apiKey={BARIKOI_API_KEY}
        initialViewState={initialViewState}
        controls={{
          marker: {
            enabled: true,
            url:'./approve.svg'
          },
          geolocate: { enabled: true, position: 'top-right' },
          fullscreen: { enabled: true, position: 'top-right' },
          navigation: { enabled: true, position: 'top-right' },
          scale: { enabled: false, position: 'bottom-right' }
        }}
        // mapStyle="barikoi-dark"
        className={{
          container: 'map-container',
        }}
      />
    </div>
  );
};
export default BarikoiMapComponent;

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