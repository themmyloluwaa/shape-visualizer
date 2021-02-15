/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
import React from "react";
import { mount } from "cypress-react-unit-test";
import Ellipse from "../../components/ShapeInput/Ellipse";
/// <reference types="Cypress" />
let data;
describe("tests for the behaviour of the ellipse component", () => {
  beforeEach(() => {
    data = {};
  });
  it("should render the Ellipse component", () => {
    mount(<Ellipse handleClick={(r) => (data = r)} />);

    cy.contains("Input the x radi of the Eclipse")
      .as("ellipseX")
      .next()
      .type(30);

    cy.contains("Input the y radi of the Eclipse")
      .as("ellipseY")
      .next()
      .type(60);

    cy.get("button")
      .click()
      .then(() => expect(data).to.deep.equal({ rx: 30, ry: 60 }));
  });

  it("should not change the value of data", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Ellipse handleClick={(r) => (data = r)} />);

    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You can't proceed, fill the necessary boxes"
        );
        expect(data).to.deep.equal({});
      });
  });

  it("should not change the value of data with only ry input change", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Ellipse handleClick={(r) => (data = r)} />);

    cy.contains("Input the y radi of the Eclipse")
      .as("ellipseY")
      .next()
      .type(60);

    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You can't proceed, fill the necessary boxes"
        );
        expect(data).to.deep.equal({});
      });
  });

  it("should not change the value of data with only rx input change", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Ellipse handleClick={(r) => (data = r)} />);

    cy.contains("Input the x radi of the Eclipse")
      .as("ellipseX")
      .next()
      .type(20);

    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You can't proceed, fill the necessary boxes"
        );
        expect(data).to.deep.equal({});
      });
  });
});
