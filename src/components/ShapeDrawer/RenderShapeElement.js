import React from "react";

// handles the rendering of each svg shape based on the shape selected
const RenderShapeElement = ({ data }) => {
  if (!data?.shape) return null;
  switch (data.shape) {
    case "circle":
      return <circle cx="150" cy="100" r={data.radi} className="draw-shape" />;
    case "ellipse":
      return (
        <ellipse
          className="draw-shape"
          ry={data.ry}
          rx={data.rx}
          cx="150"
          cy="100"
        />
      );
    case "line":
      return (
        <line
          className="draw-line"
          x1={data.x1}
          y1={data.y1}
          x2={data.x2}
          y2={data.y2}
        />
      );
    case "rectangle":
    case "square":
      return (
        <rect
          className="draw-shape"
          x="100"
          y="50"
          width={data?.width ?? data.length}
          height={data?.height ?? data.length}
        />
      );
    default:
      console.log("unsupported shape");
      return null;
  }
};

export default RenderShapeElement;
