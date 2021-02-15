/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
import React from "react";
import { mount } from "cypress-react-unit-test";
import Line from "../../components/ShapeInput/Line";
/// <reference types="Cypress" />

let data;
describe("should render the Line component", () => {
  beforeEach(() => {
    data = {};
  });
  it("should render the Line with data value set", () => {
    mount(<Line handleClick={(r) => (data = r)} />);

    cy.get("input[name=Line-x1]").as("LineX1").should("be.visible");
    cy.get("input[name=Line-x2]").as("LineX2").should("be.visible");
    cy.get("input[name=Line-y1]").as("LineY1").should("be.visible");
    cy.get("input[name=Line-y2]").as("LineY2").should("be.visible");

    cy.get("@LineX1").type(10).should("have.value", 10);
    cy.get("@LineX2").type(60).should("have.value", 60);
    cy.get("@LineY1").type(20).should("have.value", 20);
    cy.get("@LineY2").type(80).should("have.value", 80);

    cy.get("button")
      .click()
      .then(() =>
        expect(data).to.deep.equal({ x1: 10, x2: 60, y1: 20, y2: 80 })
      );
  });

  it("should not change value of data with only x1 input", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Line handleClick={(r) => (data = r)} />);

    cy.get("input[name=Line-x1]").type(40).should("have.value", 40);

    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You can't proceed, fill the necessary boxes"
        );
        expect(data).to.deep.equal({});
      });
  });

  it("should not change value of data with only x2 input", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Line handleClick={(r) => (data = r)} />);

    cy.get("input[name=Line-x2]").type(80).should("have.value", 80);

    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You can't proceed, fill the necessary boxes"
        );
        expect(data).to.deep.equal({});
      });
  });

  it("should not change value of data with only y1 input", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Line handleClick={(r) => (data = r)} />);

    cy.get("input[name=Line-y1]").type(70).should("have.value", 70);

    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You can't proceed, fill the necessary boxes"
        );
        expect(data).to.deep.equal({});
      });
  });

  it("should not change value of data with only y2 input", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Line handleClick={(r) => (data = r)} />);

    cy.get("input[name=Line-y2]").type(90).should("have.value", 90);

    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You can't proceed, fill the necessary boxes"
        );
        expect(data).to.deep.equal({});
      });
  });

  it("should not change the value of data if any input value is 0", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Line handleClick={(r) => (data = r)} />);

    cy.get("input[name=Line-x1]").as("LineX1").should("be.visible");
    cy.get("input[name=Line-x2]").as("LineX2").should("be.visible");
    cy.get("input[name=Line-y1]").as("LineY1").should("be.visible");
    cy.get("input[name=Line-y2]").as("LineY2").should("be.visible");

    cy.get("@LineX1").type(10).should("have.value", 10);
    cy.get("@LineX2").type(60).should("have.value", 60);
    cy.get("@LineY1").type(20).should("have.value", 20);
    cy.get("@LineY2").type(0).should("have.value", 0);

    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You can't proceed, fill the necessary boxes"
        );
        expect(data).to.deep.equal({});
      });
  });

  it("should not change the value of data if any input value is a non integer", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    mount(<Line handleClick={(r) => (data = r)} />);

    cy.get("input[name=Line-x1]").as("LineX1").should("be.visible");
    cy.get("input[name=Line-x2]").as("LineX2").should("be.visible");
    cy.get("input[name=Line-y1]").as("LineY1").should("be.visible");
    cy.get("input[name=Line-y2]").as("LineY2").should("be.visible");

    cy.get("@LineX1").type("made").should("not.have.value", "made");
    cy.get("@LineX2").type("in").should("not.have.value", "in");
    cy.get("@LineY1").type("lagos").should("not.have.value", "lagos");
    cy.get("@LineY2").type("-wiz").should("not.have.value", "-wiz");

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
