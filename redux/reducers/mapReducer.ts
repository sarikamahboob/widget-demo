import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popupInfoOnHover: {},
  mapillaryData: false,
  singleMapillaryData: null,
  imgId: null,
  scatterData: null,
  drawPolgonData: [],
  singleHoldingId: null,
  singleHoldingDetails: {},
  selectedHoldingZoneDetails: null,
  isMapillaryShowImage: false,
  mapillaryImageId: null,
  mapLayer: `https://map.barikoi.com/styles/planet_barikoi_v2/style.json?key=${process.env.NEXT_PUBLIC_BKOI_API_KEY}`,
}

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setPopupInfoOnHover: (state, action) => {
      state.popupInfoOnHover = action.payload
    },
    setMapillaryData: (state, action) => {
      state.mapillaryData = action.payload;
    },
    setSingleMapillaryData: (state, action) => {
      state.singleMapillaryData = action.payload;
    },
    setImgId: (state, action) => {
      state.imgId = action.payload;
    },
    setScatterData: (state, action) => {
      state.scatterData = action.payload;
    },
    setDrawPolgonData: (state, action) => {
      state.drawPolgonData = action.payload;
    },
    setSingleHoldingId: (state, action) => {
      state.singleHoldingId = action.payload;
    },
    setSingleHoldingDetails: (state, action) => {
      state.singleHoldingDetails = action.payload;
    },
    setSelectedHoldingZoneDetails: (state, action) => {
      state.selectedHoldingZoneDetails = action.payload;
    },
    setIsMapillaryShowImage: (state, action) => {
      state.isMapillaryShowImage = action.payload;
    },
    setMapillaryImageId: (state, action) => {
      state.mapillaryImageId = action.payload;
    },
    setMapLayer: (state, action) => {
      state.mapLayer = action.payload;
    },
  }
})

export const { setPopupInfoOnHover, setMapillaryData,setSingleMapillaryData, setImgId,  setScatterData, setDrawPolgonData, setSingleHoldingId, setSingleHoldingDetails, setSelectedHoldingZoneDetails, setIsMapillaryShowImage, setMapillaryImageId, setMapLayer} = mapSlice.actions
export default mapSlice.reducer
