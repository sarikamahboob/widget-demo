/* eslint-disable @typescript-eslint/ban-ts-comment */
import { setImgId } from "@/redux/reducers/mapReducer";
import { useAppDispatch } from "@/redux/store";
import { Viewer } from "mapillary-js";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle, AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";

const MapillaryViewer = ({ imageId, accessToken , onMapillaryData}:any) => {
  const dispatch = useAppDispatch()
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (containerRef.current && imageId) {
      const viewer = new Viewer({
        container: containerRef.current,
        accessToken: accessToken,
        imageId: imageId,
        component: { cover: false }, // Disable the cover component
      });

      const onImage = (event: { image: { id: any; }; })=>{
        const imageId = event.image.id;
        dispatch(setImgId(imageId))
      };
        viewer.on('image', onImage);

      return () => {
        viewer.remove();
      };
    }
  }, [imageId, accessToken]);

  const toggleFullscreen = () => {
    const element:any = containerRef.current;

    if (!isFullscreen) {
      // Enter fullscreen
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        // Firefox
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        // IE/Edge
        element.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
        // @ts-ignore
      } else if (document.mozCancelFullScreen) {
        // Firefox
        // @ts-ignore
        document.mozCancelFullScreen();
        // @ts-ignore
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, and Opera
        // @ts-ignore
        document.webkitExitFullscreen();
        // @ts-ignore
      } else if (document.msExitFullscreen) {
        // IE/Edge
        // @ts-ignore
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change event
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "black", 
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          overflow: 'hidden',
        }}
        className={ isFullscreen ? "mapIllaryImage" : ""}
      />
      <div style={{ width: '100%',}} >
        <div
          onClick={onMapillaryData}
          style={{
            color: 'white',
            fontSize: '32px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.47)',
            width: 'fit-content',
            margin: '10px',
            zIndex: 999999,
            top: 0,
            position: 'absolute',
            display: 'inline-block',
          }}
        >
          <AiOutlineCloseCircle />
        </div>
        <div
          onClick={toggleFullscreen}
          style={{
            color: 'white',
            fontSize: '32px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.47)',
            width: 'fit-content',
            margin: '10px',
            zIndex: 999999,
            right: 0,
            position: 'absolute',
            display: 'inline-block',
            top: '0px'
          }}
        >
          {isFullscreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
        </div>
      </div>
    </div>
  );
};

export default MapillaryViewer;
