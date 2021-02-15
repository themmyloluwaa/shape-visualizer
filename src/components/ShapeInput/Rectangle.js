import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Rectangle = (props) => {
  //holds the width and height for rectangle
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  //holds the length for square
  const [length, setLength] = useState("");

  // destructure isSquare prop which has a default value of false

  const { isSquare = false } = props;
  return (
    <>
      <Form.Group>
        <Form.Label>
          Input the {isSquare ? "length" : "width"} of the{" "}
          {isSquare ? "sqare" : "rectangle"}
        </Form.Label>
        <Form.Control
          name={`rectangle-${isSquare ? "length" : "width"}`}
          as="input"
          type="number"
          step="0"
          onChange={(e) =>
            isSquare
              ? setLength(e.target.valueAsNumber)
              : setWidth(e.target.valueAsNumber)
          }
          className="my-3"
          min="1"
          placeholder={isSquare ? "length" : "width"}
          key={isSquare ? "length" : "width"}
          required
        />
      </Form.Group>

      <Form.Group>
        {!isSquare && (
          <>
            <Form.Label>Input the height of the rectangle</Form.Label>
            <Form.Control
              name="rectangle-height"
              as="input"
              type="number"
              step="0"
              onChange={(e) => setHeight(e.target.valueAsNumber)}
              className="my-3"
              placeholder={"height"}
              min="1"
              key={"height"}
              required
            />
          </>
        )}

        <button
          className="btn btn-success"
          id="preview"
          onClick={(e) => {
            // if shape is a square
            if (isSquare) {
              if (length === "" || length <= 0) {
                // check that data us not empty or 0
                alert("You can't proceed, fill the necessary box");
                return;
              } else {
                //pass data to shape selection and return
                return props.handleClick({ length });
              }
            }

            // else check that values are not empty for rectangle
            if ([width, height].includes("") || width <= 0 || height <= 0) {
              alert("You can't proceed, fill the necessary boxes");
              return;
            }
            // pass data to shape selection
            props.handleClick({ width, height });
          }}
        >
          Preview
        </button>
      </Form.Group>
    </>
  );
};

export default Rectangle;
