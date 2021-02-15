/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
/// <reference types="Cypress" />

import React from "react";
import { mount } from "@cypress/react";
import App from "../../App";

const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;

describe("it should render", () => {
  beforeEach(() => {
    mount(<App />);
  });
  it("the component should be rendered", () => {
    cy.contains("Shape Drawer App").should("be.visible");
  });

  it("should select a shape and pass it to the shape draw component", () => {
    cy.get("select[name=shape]").as("shapeSelector").should("be.visible");
    cy.get("@shapeSelector").select(["square"]);
    cy.get("input[name=rectangle-length]").type(40);
    cy.get("button").click();

    cy.contains("Select fill color").should("be.visible");
    cy.contains("Select stroke color").should("be.visible");
    cy.contains("Select Stroke Width").should("be.visible");
    cy.contains("Save shape").should("be.visible");

    cy.get("rect.draw-shape").as("sqaureComponent").should("be.visible");
    cy.get("@sqaureComponent").should("have.attr", "width", 40);
    cy.get("@sqaureComponent").should("have.attr", "height", 40);
  });

  it("should change the fill, stroke and stroke-width color of the selected shape", () => {
    const expectedSquareProps = {
      shape: "square",
      length: 80,
      stroke: "#f2f0ff",
      fill: "#e2ef00",
      strokeWidth: "10",
    };

    cy.get("select[name=shape]").as("shapeSelector").should("be.visible");
    cy.get("@shapeSelector").select(["square"]);
    cy.get("input[name=rectangle-length]").type(80);
    cy.get("button").click();

    cy.contains("Select fill color").should("be.visible");
    cy.contains("Select stroke color").should("be.visible");
    cy.contains("Select Stroke Width").should("be.visible");
    cy.contains("Save shape").should("be.visible");

    cy.get('input[name="fill"]')
      .then(($fill) => {
        // get the DOM node
        const fill = $fill[0];
        console.log(fill);
        // set the value manually
        nativeInputValueSetter.call(fill, "#e2ef00");
        // now dispatch the event
        fill.dispatchEvent(
          new Event("change", { value: "#e2ef00", bubbles: true })
        );
      })
      .then(() => {
        cy.get("svg > rect.draw-shape")
          .as("aSqaure")
          .should("have.css", "fill", "rgb(226, 239, 0)");
      });

    cy.get('input[name="stroke"]')
      .then(($stroke) => {
        // get the DOM node
        const stroke = $stroke[0];
        console.log(stroke);
        // set the value manually
        nativeInputValueSetter.call(stroke, "#f2f0ff");
        // now dispatch the event
        stroke.dispatchEvent(
          new Event("change", { value: "#f2f0ff", bubbles: true })
        );
      })
      .then(() => {
        cy.get("@aSqaure").should("have.css", "stroke", "rgb(242, 240, 255)");
      });

    cy.get('input[type="range"]')
      .then(($range) => {
        // get the DOM node
        const range = $range[0];
        // set the value manually
        nativeInputValueSetter.call(range, 10);
        // now dispatch the event
        range.dispatchEvent(new Event("change", { value: 10, bubbles: true }));
      })
      .then(() => {
        cy.get("@aSqaure").should("have.css", "stroke-width", "10px");
      });

    cy.get("button").click();
    cy.get("@aSqaure").should("have.attr", "width", expectedSquareProps.length);
    cy.get("@aSqaure").should(
      "have.attr",
      "height",
      expectedSquareProps.length
    );
    cy.get("@aSqaure").should("have.css", "fill", "rgb(226, 239, 0)");
    cy.get("@aSqaure").should("have.css", "stroke", "rgb(242, 240, 255)");

    cy.get("@aSqaure").should("have.css", "stroke-width", "10px");
  });

  it("deletes the selected shape", () => {
    cy.get("select[name=shape]").as("shapeSelector").should("be.visible");
    cy.get("@shapeSelector").select(["square"]);
    cy.get("input[name=rectangle-length]").type(40);
    cy.get("#preview").as("previewButton").click();
    cy.get("#save-shape").as("saveShape").click();

    cy.get("@shapeSelector").should("be.visible");
    cy.get("@shapeSelector").select(["circle"]);
    cy.get("input[name=circle]").type(100);
    cy.get("@previewButton").click();
    cy.get("@saveShape").click();

    cy.get("@shapeSelector").should("be.visible");
    cy.get("@shapeSelector").select(["ellipse"]);
    cy.get("input[name=EllipseX]").type(10);
    cy.get("input[name=EllipseY]").type(80);
    cy.get("@previewButton").click();
    cy.get("@saveShape").click();

    cy.get("#delete-one").first().click();

    cy.get("svg").should("have.length", 2);
  });

  it("deletes all the shapes", () => {
    cy.get("select[name=shape]").as("shapeSelector").should("be.visible");
    cy.get("@shapeSelector").select(["square"]);
    cy.get("input[name=rectangle-length]").type(40);
    cy.get("#preview").as("previewButton").click();
    cy.get("#save-shape").as("saveShape").click();

    cy.get("@shapeSelector").should("be.visible");
    cy.get("@shapeSelector").select(["circle"]);
    cy.get("input[name=circle]").type(100);
    cy.get("@previewButton").click();
    cy.get("@saveShape").click();

    cy.get("@shapeSelector").should("be.visible");
    cy.get("@shapeSelector").select(["ellipse"]);
    cy.get("input[name=EllipseX]").type(10);
    cy.get("input[name=EllipseY]").type(80);
    cy.get("@previewButton").click();
    cy.get("@saveShape").click();

    cy.get("#delete-all").first().click();

    cy.get("svg").should("have.length", 0);
  });
});
