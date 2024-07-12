const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const TestHarness = require("../support/TestHarness");

const vcResponseData = require("../support/vcValidationData.json");

Given(
  "I have retrieved the sessionTable data for my F2F session using {string}",
  { timeout: 2 * 50000 },
  async function (queryField) {
    await new Promise((r) => setTimeout(r, 10000));
    const testHarness = new TestHarness();
    let sessionData;
    if (queryField === "authCode") {
      sessionData = await testHarness.getSessionByAuthCode(this.authCode);
    } else if (queryField === "state") {
      sessionData = await testHarness.getSessionByState(this.state);
    } else {
      throw new Error(`Invalid query field: ${queryField}`);
    }
    this.sessionId = sessionData.sessionId;
    const session = await testHarness.getSession(this.sessionId);
    this.authSessionState = session.authSessionState;
  }
);

Then(
  "the authSessionState is correctly recorded as {string}",
  { timeout: 2 * 50000 },
  async function (authSessionState) {
    expect(this.sessionId).to.not.be.null;
    expect(this.authSessionState).to.equal(authSessionState);
  }
);

When(
  /^I sent the request to the callback endpoint$/,
  { timeout: 2 * 50000 },
  async function () {
    const testHarness = new TestHarness();
    const f2fSession = await testHarness.getSession(this.sessionId);
    this.yotiSessionId = f2fSession.yotiSessionId;
    this.subject = f2fSession.subject;
    console.log(this.yotiSessionId);
    const axios = require("axios");
    const postRequest = await axios.post(
      `${process.env.API_BASE_URL}/callback`,
      {
        session_id: this.yotiSessionId,
        topic: "session_completion",
      }
    );
    console.log(postRequest.status);
  }
);

Then(
  /^the Verifiable Credential is stored as expected$/,
  { timeout: 2 * 50000 },
  async function () {
    const testHarness = new TestHarness();
    let sqsMessage;
    do {
      sqsMessage = await testHarness.getDequeuedSqsMessage(this.subject);
    } while (!sqsMessage);
    const jwtToken =
      sqsMessage["https://vocab.account.gov.uk/v1/credentialJWT"][0];
    const rawBody = jwtToken.split(".")[1];
    const decodedBody = JSON.parse(
      Buffer.from(rawBody.replace(/\W/g, ""), "base64url").toString()
    );
    const yotiMockIdId = this.yotiSessionId.substr(
      this.yotiSessionId.length - 4
    );
    // Strength Score
    const expectedStrengthScore =
      vcResponseData[`s${yotiMockIdId}`]["strengthScore"];
    testHarness.checkVerifiableCredentialValue(
      decodedBody,
      yotiMockIdId,
      expectedStrengthScore,
      "strengthScore"
    );
    // Validity Score
    const epxectedValidityScore =
      vcResponseData[`s${yotiMockIdId}`]["validityScore"];
    testHarness.checkVerifiableCredentialValue(
      decodedBody,
      yotiMockIdId,
      epxectedValidityScore,
      "validityScore"
    );
    // Verification Score
    const epxectedVerificationScore =
      vcResponseData[`s${yotiMockIdId}`]["verificationScore"];
    testHarness.checkVerifiableCredentialValue(
      decodedBody,
      yotiMockIdId,
      epxectedVerificationScore,
      "verificationScore"
    );
  }
);

Then(
  /^all TxMA events are recorded as expected$/,
  { timeout: 2 * 50000 },
  async function () {
    const testHarness = new TestHarness();
    let sqsMessage;
    do {
      sqsMessage = await testHarness.getSqsEventList(
        "txma/",
        this.sessionId,
        7
      );
    } while (!sqsMessage);

    testHarness.validateTxMAEventData(sqsMessage);
  }
);

When(
  "I get {int} TxMA events from Test Harness",
  { timeout: 2 * 50000 },
  async function (txmaEventCount) {
    const testHarness = new TestHarness();
    let sqsMessage;
    do {
      sqsMessage = await testHarness.getSqsEventList(
        "txma/",
        this.sessionId,
        txmaEventCount
      );
    } while (!sqsMessage);

    this.allTxmaEventBodies = await testHarness.getTxMAEventData(sqsMessage);
  }
);

Then(
  "the {string} event matches the {string} Schema",
  { timeout: 2 * 50000 },
  async function (eventName, schemaName) {
    const testHarness = new TestHarness();
    await testHarness.validateTxMAEventData(
      this.allTxmaEventBodies,
      eventName,
      schemaName
    );
  }
);
