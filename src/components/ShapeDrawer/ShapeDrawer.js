import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import RenderShapeElement from "./RenderShapeElement";
import "./ShapeDrawer.css";

// component that handles the drawing of each shape
// if edit edit mode, shows inputs to select fill, stroke and strokeWidth for each shape
const ShapeDrawer = (props) => {
  const [stroke, setStroke] = useState("#33c");
  const [fill, setFill] = useState("transparent");
  const [strokeWidth, setStrokeWidth] = useState(4);

  const { showEdits = false, saveShape = () => {} } = props;

  // captures stroke, fill and strokeWidth props from parentthe App component
  useEffect(() => {
    if (props.data?.stroke) setStroke(props.data.stroke);
    if (props.data?.strokeWidth) setStrokeWidth(props.data.strokeWidth);

    // wait till the shape has been drawn before filling the shape.
    if (props.data?.fill) {
      setTimeout(() => {
        setFill(props.data.fill);
      }, 2000);
    }
  }, [props.data]);

  // View Logic
  return (
    <>
      <svg
        style={{
          minHeight: "200",
          stroke,
          fill,
          strokeWidth,
        }}
      >
        <RenderShapeElement data={props.data} />
      </svg>
      {/*  show edit buttons in edit mode */}
      {showEdits && (
        <>
          <Form.Group className="my-2">
            <Form.Row>
              <Col xs="6">
                <Form.Label>Select fill color</Form.Label>
                <Form.Control
                  name="fill"
                  type="color"
                  onChange={(e) => setFill(e.target.value)}
                  value={fill}
                />
              </Col>
              <Col xs="6">
                <Form.Label>Select stroke color</Form.Label>
                <Form.Control
                  type="color"
                  name="stroke"
                  value={stroke}
                  onChange={(e) => setStroke(e.target.value)}
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Row>
              <Col xs="6">
                <Form.Label>Select Stroke Width</Form.Label>
                <Form.Control
                  name="strokeWidth"
                  type="range"
                  // min={state.strokeWidth}
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(e.target.value)}
                />
              </Col>
              <Col xs="6" className="my-3 px-4">
                <Form.Label>Save shape</Form.Label>
                <br />
                <button
                  className="btn btn-primary px-5"
                  id="save-shape"
                  onClick={(e) => {
                    const dataToSave = {
                      ...props.data,
                      stroke,
                      fill,
                      strokeWidth,
                    };

                    // pass the shape meta data to the app component
                    saveShape(dataToSave);
                  }}
                >
                  Save
                </button>
              </Col>
            </Form.Row>
          </Form.Group>
        </>
      )}
    </>
  );
};

export default ShapeDrawer;
