/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
import React from "react";
import { mount } from "@cypress/react";
import ShapeSelection from "../../components/ShapeInput/ShapeSelection";

let data;
describe("tests for the ShapeSelection component", () => {
  beforeEach(() => {
    data = {};
  });

  it("should render the shape selection component with square shape", () => {
    mount(<ShapeSelection setData={(r) => (data = r)} />);

    cy.get("select[name=shape]").as("shapeSelector").should("be.visible");
    cy.get("@shapeSelector").select(["square"]);
    cy.get("input[name=rectangle-length]").type(40);
    cy.get("button")
      .click()
      .then(() => {
        expect(data).to.be.deep.equal({ shape: "square", length: 40 });
      });

    cy.get("input[name=rectangle-length]").should("have.length", 0);
  });

  it("should render the shape selection component with rectangle shape", () => {
    mount(<ShapeSelection setData={(r) => (data = r)} />);

    cy.get("select[name=shape]").as("shapeSelector").should("be.visible");
    cy.get("@shapeSelector").select(["rectangle"]);
    cy.get("input[name=rectangle-width]").type(40);
    cy.get("input[name=rectangle-height]").type(80);
    cy.get("button")
      .click()
      .then(() => {
        expect(data).to.be.deep.equal({
          shape: "rectangle",
          width: 40,
          height: 80,
        });
      });

    cy.get("input[name=rectangle-width]").should("have.length", 0);
    cy.get("input[name=rectangle-height]").should("have.length", 0);
  });

  it("should render the shape selection component with circle shape", () => {
    mount(<ShapeSelection setData={(r) => (data = r)} />);

    cy.get("select[name=shape]").as("shapeSelector").should("be.visible");
    cy.get("@shapeSelector").select(["circle"]);
    cy.get("input[name=circle]").type(50);
    cy.get("button")
      .click()
      .then(() => {
        expect(data).to.be.deep.equal({ shape: "circle", radi: 50 });
      });

    cy.get("input[name=circle]").should("have.length", 0);
  });

  it("should render the shape selection component with ellipse shape", () => {
    mount(<ShapeSelection setData={(r) => (data = r)} />);

    cy.get("select[name=shape]").as("shapeSelector").should("be.visible");
    cy.get("@shapeSelector").select(["ellipse"]);
    cy.get("input[name=EllipseY]").type(70);
    cy.get("input[name=EllipseX]").type(20);
    cy.get("button")
      .click()
      .then(() => {
        expect(data).to.be.deep.equal({ shape: "ellipse", ry: 70, rx: 20 });
      });

    cy.get("input[name=EllipseY]").should("have.length", 0);
    cy.get("input[name=EllipseX]").should("have.length", 0);
  });

  it("should render the shape selection component with line shape", () => {
    mount(<ShapeSelection setData={(r) => (data = r)} />);

    cy.get("select[name=shape]").as("shapeSelector").should("be.visible");
    cy.get("@shapeSelector").select(["line"]);
    cy.get("input[name=Line-x1]").type(10);
    cy.get("input[name=Line-x2]").type(100);
    cy.get("input[name=Line-y1]").type(20);
    cy.get("input[name=Line-y2]").type(150);
    cy.get("button")
      .click()
      .then(() => {
        expect(data).to.be.deep.equal({
          shape: "line",
          x1: 10,
          x2: 100,
          y1: 20,
          y2: 150,
        });
      });

    cy.get("input[name=Line-x1]").should("have.length", 0);
    cy.get("input[name=Line-x2]").should("have.length", 0);
    cy.get("input[name=Line-y1]").should("have.length", 0);
    cy.get("input[name=Line-y2]").should("have.length", 0);
  });
});
