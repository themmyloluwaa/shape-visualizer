import React from "react";
import Circle from "../components/ShapeInput/Circle";
import Ellipse from "../components/ShapeInput/Ellipse";
import Rectangle from "../components/ShapeInput/Rectangle";
import Line from "../components/ShapeInput/Line";

// dynamically get the shape selected from the user
const shapes = {
  circle: {
    field: (props) => <Circle {...props} />,
  },
  ellipse: {
    field: (props) => <Ellipse {...props} />,
  },
  square: {
    field: (props) => <Rectangle {...props} isSquare={true} />,
  },
  rectangle: {
    field: (props) => <Rectangle {...props} />,
  },
  line: {
    field: (props) => <Line {...props} />,
  },
};

export default shapes;
