"use client"

import { useControl } from 'react-bkoi-gl'; // Import the Barikoi React GL package
import MapboxDraw from '@mapbox/mapbox-gl-draw'; // Import Mapbox Draw
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css' // Import Mapbox Draw CSS

export default function DrawControl(props:any ) {
  useControl(
    //@ts-ignore
    () => new MapboxDraw(props),
    ({ map }) => {
      map.on('draw.create', props.onCreate);
      map.on('draw.update', props.onUpdate);
      map.on('draw.delete', props.onDelete);
    },
    ({ map }) => {
      map.off('draw.create', props.onCreate);
      map.off('draw.update', props.onUpdate);
      map.off('draw.delete', props.onDelete);
    },
    {
      position: props.position
    }
  );

  return null;
}

DrawControl.defaultProps = {
  onCreate: () => { },
  onUpdate: () => { },
  onDelete: () => { }
};