import React, { useState } from "react";
import { Form } from "react-bootstrap";
const Eclipse = (props) => {
  //state to hold rx input
  const [rx, setRX] = useState("");
  //state to hold ry input
  const [ry, setRY] = useState("");
  return (
    <>
      <Form.Group>
        <Form.Label>Input the x radi of the Eclipse</Form.Label>
        <Form.Control
          name="EllipseX"
          as="input"
          type="number"
          step="0"
          min="1"
          onChange={(e) => setRX(e.target.valueAsNumber)}
          className="my-3"
          placeholder={"rx"}
          required
          key={"rx"}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Input the y radi of the Eclipse</Form.Label>
        <Form.Control
          name="EllipseY"
          as="input"
          type="number"
          step="0"
          min="1"
          onChange={(e) => setRY(e.target.valueAsNumber)}
          className="my-3"
          placeholder={"ry"}
          key={"ry"}
          required
        />

        <button
          className="btn btn-success"
          id="preview"
          onClick={(e) => {
            //check that 0 was not inputed
            if (rx.length <= 0 || ry.length <= 0) {
              alert("You can't proceed, fill the necessary boxes");
              return;
            }
            //pass data to shape selection
            props.handleClick({ rx, ry });
          }}
        >
          Preview
        </button>
      </Form.Group>
    </>
  );
};

export default Eclipse;
