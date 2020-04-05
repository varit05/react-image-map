import * as React from "react";

const ReactPanZoom = () => {
  // In strict null checking setting default props doesn't seem to work. Hence the non-null assertion.
  // :crossedfingers: it shouldn't be deprecated. Or the very least support defaultProps semantics as proposed
  // in this PR: https://github.com/Microsoft/TypeScript/issues/23812
  // let defaultProps = {
  //   enablePan: true,
  //   onPan: () => undefined,
  //   onReset: () => undefined,
  //   pandx: 0,
  //   pandy: 0,
  //   zoom: 0,
  //   rotation: 0,
  // };
  // let panWrapper;
  // let panContainer;

  const getInitialState = props => {
    const { pandx, pandy, zoom } = this.props;
    const defaultDragData = {
      dx: pandx,
      dy: pandy,
      x: 0,
      y: 0
    };
    return {
      comesFromDragging: false,
      dragData: defaultDragData,
      dragging: false,
      matrixData: [
        zoom,
        0,
        0,
        zoom,
        pandx,
        pandy // [zoom, skew, skew, zoom, dx, dy]
      ],
      mouseDown: false
    };
  };

  const state = getInitialState();

  componentWillReceiveProps = nextProps => {
    const { matrixData } = state;
    if (matrixData[0] !== nextProps.zoom) {
      const newMatrixData = [...state.matrixData];
      newMatrixData[0] = nextProps.zoom || newMatrixData[0];
      newMatrixData[3] = nextProps.zoom || newMatrixData[3];
      this.setState({
        matrixData: newMatrixData
      });
    }
  };

  const reset = () => {
    const matrixData = [0.4, 0, 0, 0.4, 0, 0];
    this.setState({ matrixData });
    if (this.props.onReset) {
      this.props.onReset(0, 0, 1);
    }
  };

  const onClick = e => {
    if (state.comesFromDragging) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  const onTouchStart = e => {
    const { pageX, pageY } = e.touches[0];
    this.panStart(pageX, pageY, e);
  };

  const onTouchEnd = e => {
    this.onMouseUp(e);
  };

  const onTouchMove = e => {
    this.updateMousePosition(e.touches[0].pageX, e.touches[0].pageY);
  };

  const onMouseDown = e => {
    this.panStart(e.pageX, e.pageY, e);
  };
  const panStart = (pageX, pageY, event) => {
    if (!this.props.enablePan) {
      return;
    }

    const { matrixData } = state;
    const offsetX = matrixData[4];
    const offsetY = matrixData[5];
    const newDragData = {
      dx: offsetX,
      dy: offsetY,
      x: pageX,
      y: pageY
    };
    this.setState({
      dragData: newDragData,
      mouseDown: true
    });
    if (this.panWrapper) {
      this.panWrapper.style.cursor = "move";
    }
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();
  };

  const onMouseUp = e => {
    this.panEnd(e);
  };
  const panEnd = e => {
    this.setState({
      comesFromDragging: state.dragging,
      dragging: false,
      mouseDown: false
    });
    if (this.panWrapper) {
      this.panWrapper.style.cursor = "";
    }
    if (this.props.onPan) {
      this.props.onPan(state.matrixData[4], state.matrixData[5]);
    }
  };

  const onMouseMove = e => {
    updateMousePosition(e.pageX, e.pageY);
  };
  const updateMousePosition = (pageX, pageY) => {
    if (!state.mouseDown) return;

    const matrixData = getNewMatrixData(pageX, pageY);
    this.setState({
      dragging: true,
      matrixData
    });
    if (this.panContainer) {
      this.panContainer.style.transform = `matrix(${this.state.matrixData.toString()})`;
    }
  };

  const getNewMatrixData = (x, y) => {
    const { dragData, matrixData } = this.state;
    const deltaX = dragData.x - x;
    const deltaY = dragData.y - y;
    matrixData[4] = dragData.dx - deltaX;
    matrixData[5] = dragData.dy - deltaY;
    return matrixData;
  };

  return (
    <div
      className={`pan-container ${this.props.className || ""}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseMove={onMouseMove}
      onClick={onClick}
      style={{
        height: this.props.height,
        userSelect: "none",
        width: this.props.width
      }}
      ref={ref => (this.panWrapper = ref)}
    >
      <div
        ref={ref => (ref ? (this.panContainer = ref) : null)}
        style={{
          transform: `matrix(${state.matrixData.toString()})`
        }}
      >
        {this.props.children}
      </div>
    </div>
  );
};
