/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
import React from "react";
import { mount } from "@cypress/react";
import ShapeDrawer from "../../components/ShapeDrawer/ShapeDrawer";
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;

describe("tests for the shape drawer component", () => {
  it("should render the shape drawer component with fill of rgb(255, 0, 0))", () => {
    const aShape = {
      shape: "circle",
      radi: 40,
    };
    mount(<ShapeDrawer data={aShape} showEdits={true} />);

    cy.get('input[name="fill"]')
      .then(($fill) => {
        // get the DOM node
        const fill = $fill[0];
        console.log(fill);
        // set the value manually
        nativeInputValueSetter.call(fill, "#ff0000");
        // now dispatch the event
        fill.dispatchEvent(
          new Event("change", { value: "#ff0000", bubbles: true })
        );
      })
      .then(() => {
        cy.get("svg > circle.draw-shape").should(
          "have.css",
          "fill",
          "rgb(255, 0, 0)"
        );
      });
  });

  it("should render the shape drawer component with stroke of rgb(255, 240, 0)", () => {
    const aShape = {
      shape: "circle",
      radi: 40,
    };
    mount(<ShapeDrawer data={aShape} showEdits={true} />);

    cy.get('input[name="stroke"]')
      .then(($stroke) => {
        // get the DOM node
        const stroke = $stroke[0];
        console.log(stroke);
        // set the value manually
        nativeInputValueSetter.call(stroke, "#fff000");
        // now dispatch the event
        stroke.dispatchEvent(
          new Event("change", { value: "#fff000", bubbles: true })
        );
      })
      .then(() => {
        cy.get("svg > circle.draw-shape").should(
          "have.css",
          "stroke",
          "rgb(255, 240, 0)"
        );
      });
  });

  it("should render the shape drawer component with stroke width of 15px", () => {
    const aShape = {
      shape: "circle",
      radi: 40,
    };
    mount(<ShapeDrawer data={aShape} showEdits={true} />);

    cy.get('input[type="range"]')
      .then(($range) => {
        // get the DOM node
        const range = $range[0];
        // set the value manually
        nativeInputValueSetter.call(range, 15);
        // now dispatch the event
        range.dispatchEvent(new Event("change", { value: 15, bubbles: true }));
      })
      .then(() => {
        cy.get("svg > circle.draw-shape").should(
          "have.css",
          "stroke-width",
          "15px"
        );
      });
  });

  it("should save the edited shape", () => {
    const aShape = {
      shape: "circle",
      radi: 40,
    };
    const arrayOfShapes = [
      { ...aShape, fill: "#ff0", stroke: "pink", strokeWidth: 10 },
      {
        shape: "ellipse",
        rx: 20,
        ry: 30,
        fill: "#f00",
        stroke: "green",
        strokeWidth: 12,
      },
    ];
    mount(
      <ShapeDrawer
        data={aShape}
        showEdits={true}
        saveShape={(e) => {
          arrayOfShapes.push(e);
        }}
      />
    );

    cy.get('input[name="fill"]').then(($fill) => {
      // get the DOM node
      const fill = $fill[0];
      console.log(fill);
      // set the value manually
      nativeInputValueSetter.call(fill, "#ff0000");
      // now dispatch the event
      fill.dispatchEvent(
        new Event("change", { value: "#ff0000", bubbles: true })
      );
    });

    cy.get('input[name="stroke"]').then(($stroke) => {
      // get the DOM node
      const stroke = $stroke[0];
      console.log(stroke);
      // set the value manually
      nativeInputValueSetter.call(stroke, "#fff000");
      // now dispatch the event
      stroke.dispatchEvent(
        new Event("change", { value: "#fff000", bubbles: true })
      );
    });

    cy.get('input[type="range"]').then(($range) => {
      // get the DOM node
      const range = $range[0];
      // set the value manually
      nativeInputValueSetter.call(range, 15);
      // now dispatch the event
      range.dispatchEvent(new Event("change", { value: 15, bubbles: true }));
    });

    cy.get("button.btn.btn-primary")
      .click()
      .then(() => {
        expect(arrayOfShapes).to.have.length(3);
      });
  });

  it("should show shape with default data", () => {
    const aShape = {
      shape: "ellipse",
      rx: 20,
      ry: 30,
      fill: "#ff0000",
      stroke: "#fff000",
      strokeWidth: 12,
    };

    mount(<ShapeDrawer data={aShape} showEdits={true} />);

    cy.get("ellipse.draw-shape").should("be.visible");
    cy.get("ellipse.draw-shape").should("have.attr", "ry", aShape.ry);
    cy.get("ellipse.draw-shape").should("have.attr", "rx", aShape.rx);
    cy.get("ellipse.draw-shape").should("have.css", "fill", "rgb(255, 0, 0)");

    cy.get("ellipse.draw-shape").should(
      "have.css",
      "stroke",
      "rgb(255, 240, 0)"
    );

    cy.get("ellipse.draw-shape").should("have.css", "stroke-width", "12px");
  });
});
