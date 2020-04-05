import React from "react";
import styled from "styled-components";
const ControlsContainer = styled.div`
  position: absolute;
  left: 10px;
  z-index: 2;
  bottom: 10px;
  user-select: none;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(53, 67, 93, 0.32);
  & div {
    text-align: center;
    cursor: pointer;
    height: 40px;
    width: 40px;
    border-bottom: 1px solid #ccc;
    & svg {
      height: 100%;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
    &:last-child {
      border: none;
    }
    &:active {
      box-shadow: 0px 0px 5px 1px #0c0c0c;
    }
  }
`;

export const Controls = ({ zoom, onZoomChange }) => {
  
  const [zoomState, setZoom] = React.useState(zoom);
  console.log("Controls load -> zoom", zoom);
  console.log("Controls load -> zoomState", zoomState);

  React.useEffect(() => {
    console.log('in use Effect', zoomState);
    onZoomChange(zoomState);
  }, [zoomState]);
  
  const zoomIn = () => {
    console.log('in Zoom IN', zoom);
    setZoom(zoomState - 0.2);
    console.log("Controls -> ZoomIn zoomState", zoomState);
    
  };

  const zoomOut = () => {
    console.log('in Zoom OUT', zoom);
    if (zoom >= 1) {
      console.log('inside if of zoomOut')
      setZoom(zoomState + 0.2);
      console.log("Controls -> ZoomOut zoomState", zoomState);
    }
  };
  return (
    <>
      <ControlsContainer>
        <div onClick={zoomIn}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20"
              stroke="#4C68C1"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 4L12 20"
              stroke="#4C68C1"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div onClick={zoomOut}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20"
              stroke="#4C68C1"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </ControlsContainer>
    </>
  );
};
