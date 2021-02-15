/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
import React from "react";
import { mount } from "cypress-react-unit-test";
import Rectangle from "../../components/ShapeInput/Rectangle";
/// <reference types="Cypress" />

let data;
describe("test for the Square component", () => {
  beforeEach(() => {
    data = {};
  });

  it("should render the square component", () => {
    mount(<Rectangle handleClick={(r) => (data = r)} isSquare={true} />);

    cy.get("input[name=rectangle-length]")
      .as("rectangleLength")
      .should("be.visible");

    cy.get("input[name=rectangle-width]").should("have.length", 0);

    cy.get("input[name=rectangle-height]").should("have.length", 0);

    cy.get("@rectangleLength").type(100).should("have.value", 100);

    cy.get("button")
      .click()
      .then(() => expect(data).to.deep.equal({ length: 100 }));
  });

  it("should not change the value of y with no input or 0 passed to length", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Rectangle handleClick={(r) => (data = r)} isSquare={true} />);

    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You can't proceed, fill the necessary box"
        );

        expect(data).to.deep.equal({});
      });

    cy.get("input[name=rectangle-length]")
      .as("rectangleLength")
      .type(0)
      .should("have.value", 0);

    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You can't proceed, fill the necessary box"
        );

        expect(data).to.deep.equal({});
      });
  });

  it("should not change the value of data with input value of carpe diem", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Rectangle handleClick={(r) => (data = r)} isSquare={true} />);

    cy.get("input[name=rectangle-length]")
      .type("carpe diem")
      .should("not.have.value", "carpe diem");

    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You can't proceed, fill the necessary box"
        );

        expect(data).to.deep.equal({});
      });
  });
});
