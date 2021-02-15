import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Line = (props) => {
  //holds the starting point of the line on the x and y coordintes
  const [x1, setX1] = useState("");
  const [x2, setX2] = useState("");
  const [y1, setY1] = useState("");
  const [y2, setY2] = useState("");
  return (
    <>
      <Form.Group>
        <Form.Label>Input the starting point on the horizontal axis</Form.Label>
        <Form.Control
          name="Line-x1"
          as="input"
          type="number"
          step="0"
          onChange={(e) => setX1(e.target.valueAsNumber)}
          className="my-2"
          placeholder={"x1"}
          key={"x1"}
          min="1"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Input the end point on the horizontal axis</Form.Label>
        <Form.Control
          name="Line-x2"
          as="input"
          type="number"
          step="0"
          onChange={(e) => setX2(e.target.valueAsNumber)}
          className="my-2"
          placeholder={"x2"}
          key={"x2"}
          min="1"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Input the starting point on the vertical axis</Form.Label>
        <Form.Control
          name="Line-y1"
          as="input"
          type="number"
          step="0"
          onChange={(e) => setY1(e.target.valueAsNumber)}
          className="my-2"
          placeholder={"y1"}
          key={"y1"}
          min="1"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Input the end point on the vertical axis</Form.Label>
        <Form.Control
          name="Line-y2"
          as="input"
          type="number"
          step="0"
          onChange={(e) => setY2(e.target.valueAsNumber)}
          className="my-2"
          placeholder={"y2"}
          key={"y2"}
          min="1"
          required
        />
      </Form.Group>

      <button
        className="btn btn-success"
        id="preview"
        onClick={(e) => {
          // check that no data is empty or 0
          if (
            [x1, x2, y1, y2].includes("") ||
            x1 <= 0 ||
            x2 <= 0 ||
            y1 <= 0 ||
            y2 <= 0
          ) {
            alert("You can't proceed, fill the necessary boxes");
            return;
          }

          //pass data to shape selection
          props.handleClick({ x1, x2, y1, y2 });
        }}
      >
        Preview
      </button>
    </>
  );
};

export default Line;
