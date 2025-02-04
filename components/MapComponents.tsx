"use client"

import { BarikoiMapProvider } from 'barikoi-map-widget'
import React from 'react'
import BarikoiAutocompleteComponent from './BarikoiAutocompleteComponent'
import BarikoiMapComponent from './BarikoiMapComponent'
import BarikoiMapGL from './BarikoiMapGL'

const MapComponents = ({ widget, bkoiGL }: { widget: boolean, bkoiGL: boolean }) => {
  return (
    <div className="flex gap-4">
      {
        widget && (
          <div className="w-full">
            <BarikoiMapProvider>
              <div className="fullContainer">
                <BarikoiAutocompleteComponent />
                <BarikoiMapComponent />
              </div>
            </BarikoiMapProvider>
          </div>
        )
      }
      
      {
        bkoiGL && (
          <div className="w-full">
            <BarikoiMapGL 
              geolocateControl={true} 
              fullScreenControl={true} 
              navigationControl={true} 
              scaleControl={true} 
            />
          </div>
        )
      }
    </div>
  )
}

export default MapComponents