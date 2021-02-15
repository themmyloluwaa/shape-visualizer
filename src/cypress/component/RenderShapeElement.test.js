/* eslint-disable no-undef */

import React from "react";
import { mount } from "@cypress/react";
import RenderShapeElement from "../../components/ShapeDrawer/RenderShapeElement";

describe("tests to check if the correct shape renders", () => {
  it("should render a circle", () => {
    const circleProps = {
      shape: "circle",
      radi: 40,
    };
    mount(
      <svg width="500" height="500">
        <RenderShapeElement data={circleProps} />
      </svg>
    );

    cy.get("circle.draw-shape").should("be.visible");
    cy.get("circle.draw-shape").should("have.attr", "r", circleProps.radi);
  });

  it("should render an ellipse", () => {
    const ellipseProps = {
      shape: "ellipse",
      ry: 20,
      rx: 50,
    };

    mount(
      <svg width="500" height="500">
        <RenderShapeElement data={ellipseProps} />
      </svg>
    );

    cy.get("ellipse.draw-shape").should("be.visible");
    cy.get("ellipse.draw-shape").should("have.attr", "ry", ellipseProps.ry);
    cy.get("ellipse.draw-shape").should("have.attr", "rx", ellipseProps.rx);
  });

  it("should render a line", () => {
    const lineProps = {
      shape: "line",
      x1: 10,
      x2: 50,
      y1: 20,
      y2: 60,
    };

    mount(
      <svg width="500" height="500">
        <RenderShapeElement data={lineProps} />
      </svg>
    );

    cy.get("line.draw-line").should("be.visible");
    cy.get("line.draw-line").should("have.attr", "x1", lineProps.x1);
    cy.get("line.draw-line").should("have.attr", "x2", lineProps.x2);
    cy.get("line.draw-line").should("have.attr", "y1", lineProps.y1);
    cy.get("line.draw-line").should("have.attr", "y2", lineProps.y2);
  });

  it("should render a square", () => {
    const squareProps = {
      shape: "square",
      length: 100,
    };

    mount(
      <svg width="500" height="500">
        <RenderShapeElement data={squareProps} />
      </svg>
    );

    cy.get("rect.draw-shape").should("be.visible");
    cy.get("rect.draw-shape").should("have.attr", "width", squareProps.length);
    cy.get("rect.draw-shape").should("have.attr", "height", squareProps.length);
  });

  it("should render a rectangle", () => {
    const rectangleProps = {
      shape: "rectangle",
      width: 100,
      height: 60,
    };

    mount(
      <svg width="500" height="500">
        <RenderShapeElement data={rectangleProps} />
      </svg>
    );

    cy.get("rect.draw-shape").should("be.visible");
    cy.get("rect.draw-shape").should(
      "have.attr",
      "width",
      rectangleProps.width
    );
    cy.get("rect.draw-shape").should(
      "have.attr",
      "height",
      rectangleProps.height
    );
  });

  it("should return null", () => {
    mount(
      <svg width="500" height="500">
        <RenderShapeElement />
      </svg>
    );

    cy.get("svg").children().should("have.length", 0);
  });

  it("should return null for non supported shape", () => {
    mount(
      <svg width="500" height="500">
        <RenderShapeElement data={{ shape: "rhombus" }} />
      </svg>
    );

    cy.get("svg").children().should("have.length", 0);
  });
});
