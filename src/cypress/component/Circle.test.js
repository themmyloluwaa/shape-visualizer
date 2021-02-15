/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
import React from "react";
import { mount } from "cypress-react-unit-test";
import Circle from "../../components/ShapeInput/Circle";
/// <reference types="Cypress" />
let data;
describe("tests for the Circle component", () => {
  beforeEach(() => {
    data = {};
  });
  it("should render the circle input", () => {
    mount(<Circle handleClick={(r) => (data = r)} />);

    cy.get("input[name=circle]").as("circleInput").should("be.visible");

    cy.get("@circleInput").type(30);

    cy.get("@circleInput")
      .next()
      .click()
      .then(() => expect(data).to.deep.equal({ radi: 30 }));
  });

  it("should popup the alert window and not change the value of data", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Circle handleClick={(r) => (data = r)} />);

    cy.get("input[name=circle]").as("circleInput").should("be.visible");

    cy.get("@circleInput").type("de").should("not.have.value", "de");

    cy.get("@circleInput")
      .next()
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You can't proceed, fill the necessary box"
        );
        expect(data).to.not.deep.equal({ radi: "de" });
      });
  });
});
