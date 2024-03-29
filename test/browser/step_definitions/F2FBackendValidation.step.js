const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const TestHarness = require("../support/TestHarness");
Given(
  /^I have retrieved the sessionTable data for my F2F session$/,
  { timeout: 2 * 50000 },
  async function () {
    await new Promise((r) => setTimeout(r, 10000));

    const testHarness = new TestHarness();
    const authCodeDetails = await testHarness.getSessionByAuthCode(
      this.authCode
    );
    expect(authCodeDetails.authorizationCode).to.equal(this.authCode);
    this.sessionId = authCodeDetails.sessionId;
    const session = await testHarness.getSession(this.sessionId);
    this.authSessionState = session.authSessionState;
  }
);

Then(
  /^session details are correctly stored in DB$/,
  { timeout: 2 * 50000 },
  async function () {
    expect(this.sessionId).to.not.be.null;
    expect(this.authSessionState).to.equal("F2F_AUTH_CODE_ISSUED");
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
    // Strength Score
    expect(decodedBody.vc.evidence[0].strengthScore).to.equal(3);
    // Validity Score
    expect(decodedBody.vc.evidence[0].validityScore).to.equal(2);
    // Verification Score
    expect(decodedBody.vc.evidence[0].verificationScore).to.equal(3);
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
