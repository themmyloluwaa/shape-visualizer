import React, { useState } from "react";
import { Form } from "react-bootstrap";
import shapes from "../../utils/shapes";

const renderInputBox = (state, stateSetter) => {
  //dynamically choses the shape input field based on shape selected by customer
  if (state.length !== 0) {
    const shapeSelected = shapes[state];
    return shapeSelected.field({ handleClick: stateSetter });
  }
};

const ShapeSelection = (props) => {
  // stores the shape selection
  const [state, setState] = useState("");

  // passes the shape selected to the parent App component
  const handleInputSubmit = (submitedData) => {
    props.setData({
      shape: state,
      ...submitedData,
    });

    setState("");
  };

  // View Logic
  return (
    <Form>
      <Form.Group>
        <Form.Label className="my-3 px-4">
          <h4>Shape Selector</h4>
        </Form.Label>
        <Form.Control
          as="select"
          name="shape"
          onChange={(e) => setState(e.target.value)}
          value={state}
        >
          <option>Please select a shape</option>
          <option value="circle">Cirlce</option>
          <option value="ellipse">Ellipse</option>
          <option value="square">Square</option>
          <option value="rectangle">Rectangle</option>
          <option value="line">Line</option>
        </Form.Control>
      </Form.Group>

      {/* passes the shape and submit handler  */}
      {renderInputBox(state, handleInputSubmit)}
    </Form>
  );
};

export default ShapeSelection;
