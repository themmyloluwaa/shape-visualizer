/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
import React from "react";
import { mount } from "@cypress/react";
import Rectangle from "../../components/ShapeInput/Rectangle";
/// <reference types="Cypress" />

let data;
describe("test for the Rectangle Component", () => {
  beforeEach(() => {
    data = {};
  });
  it("should render the rectangle", () => {
    mount(<Rectangle handleClick={(r) => (data = r)} />);

    cy.get("input[name=rectangle-width]")
      .as("rectangleWidth")
      .should("be.visible");

    cy.get("input[name=rectangle-height]")
      .as("rectangleHeight")
      .should("be.visible");

    cy.get("@rectangleWidth").type(50).should("have.value", 50);
    cy.get("@rectangleHeight").type(30).should("have.value", 30);

    cy.get("button")
      .click()
      .then(() => expect(data).to.deep.equal({ width: 50, height: 30 }));
  });

  it("should not change the value of data with just the width input", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Rectangle handleClick={(r) => (data = r)} />);

    cy.get("input[name=rectangle-width]").type(60).should("have.value", 60);

    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You can't proceed, fill the necessary boxes"
        );

        expect(data).to.deep.equal({});
      });
  });

  it("should not change the value of data with just the height input", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Rectangle handleClick={(r) => (data = r)} />);

    cy.get("input[name=rectangle-height]").type(100).should("have.value", 100);

    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You can't proceed, fill the necessary boxes"
        );

        expect(data).to.deep.equal({});
      });
  });

  it("should not change the value of data with non negative input to width and height", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Rectangle handleClick={(r) => (data = r)} />);

    cy.get("input[name=rectangle-width]")
      .as("rectangleWidth")
      .should("be.visible");

    cy.get("input[name=rectangle-height]")
      .as("rectangleHeight")
      .should("be.visible");

    cy.get("@rectangleWidth").type("dog").should("not.have.value", "dog");
    cy.get("@rectangleHeight").type("cat").should("not.have.value", "cat");

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
