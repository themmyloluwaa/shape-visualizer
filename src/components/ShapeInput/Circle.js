import React, { useState } from "react";
import { Form } from "react-bootstrap";
const Circle = (props) => {
  const [radi, setRadi] = useState(""); //state to hold radi selected
  return (
    <Form.Group>
      <Form.Label>Input the radius of the circle</Form.Label>
      <Form.Control
        name="circle"
        as="input"
        type="number"
        step="0"
        min="1"
        onChange={(e) => setRadi(e.target.valueAsNumber)}
        className="my-3"
        placeholder={"radi"}
        key={"circle"}
        required
      />

      <button
        className="btn btn-success"
        id="preview"
        onClick={(e) => {
          // check if input is 0
          if (radi <= 0) {
            alert("You can't proceed, fill the necessary box");
            return;
          }
          //pass value to ShaoeSelection
          props.handleClick({ radi });
        }}
      >
        Preview
      </button>
    </Form.Group>
  );
};

export default Circle;
