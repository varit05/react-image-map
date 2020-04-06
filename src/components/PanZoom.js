import React, { useState } from "react";

export const PanZoom = props => {
  let panWrapper;
  let panContainer;
  const { pandx, pandy, zoom } = props;
  const defaultDragData = {
    dx: pandx || 0,
    dy: pandy || 0,
    x: 0,
    y: 0
  };

  const defaultMatrixData = [zoom, 0, 0, zoom, pandx || 0, pandy || 0];

  const [comesFromDragging, setFromDragging] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [dragData, setDragData] = useState(defaultDragData);
  const [matrixData, setMatrixData] = useState(defaultMatrixData);

  const onClick = e => {
    if (comesFromDragging) {
      return;
    }

    if (props.onClick) {
      props.onClick(e);
    }
  };

  const onTouchStart = e => {
    const { pageX, pageY } = e.touches[0];
    panStart(pageX, pageY, e);
  };

  const onTouchEnd = e => {
    this.onMouseUp(e);
  };

  const onTouchMove = e => {
    this.updateMousePosition(e.touches[0].pageX, e.touches[0].pageY);
  };

  const onMouseDown = e => {
    panStart(e.pageX, e.pageY, e);
  };
  const panStart = (pageX, pageY, event) => {
    if (!props.enablePan) {
      return;
    }

    const offsetX = matrixData[4];
    const offsetY = matrixData[5];
    const newDragData = {
      dx: offsetX,
      dy: offsetY,
      x: pageX,
      y: pageY
    };
    setDragData(newDragData);
    setMouseDown(true);
    if (panWrapper) {
      panWrapper.style.cursor = "move";
    }
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();
  };

  const onMouseUp = e => {
    panEnd(e);
  };
  const panEnd = e => {
    setFromDragging(dragging);
    setDragging(false);
    setMouseDown(false);
    if (panWrapper) {
      panWrapper.style.cursor = "";
    }
    if (props.onPan) {
      props.onPan(matrixData[4], matrixData[5]);
    }
  };

  const onMouseMove = e => {
    updateMousePosition(e.pageX, e.pageY);
  };

  const updateMousePosition = (pageX, pageY) => {
    if (!mouseDown) return;

    const matrixData = getNewMatrixData(pageX, pageY);
    setDragging(true);
    setMatrixData(matrixData);

    if (panContainer) {
      panContainer.style.transform = `matrix(${matrixData.toString()})`;
    }
  };

  const getNewMatrixData = (x, y) => {
    const deltaX = dragData.x - x;
    const deltaY = dragData.y - y;
    matrixData[4] = dragData.dx - deltaX;
    matrixData[5] = dragData.dy - deltaY;
    return matrixData;
  };

  return (
    <div
      className={`${props.className || ""}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseMove={onMouseMove}
      onClick={onClick}
      style={{
        height: props.height,
        userSelect: "none",
        width: props.width
      }}
      ref={ref => (panWrapper = ref)}
    >
      <div
        ref={ref => (ref ? (panContainer = ref) : null)}
        style={{
          transform: `matrix(${matrixData.toString()})`
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
