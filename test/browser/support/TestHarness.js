const F2F_CRI_AUTH_CODE_ISSUED_SCHEMA = require("../support/F2F_CRI_AUTH_CODE_ISSUED_SCHEMA.json");
const F2F_CRI_END_SCHEMA = require("../support/F2F_CRI_END_SCHEMA.json");
const F2F_CRI_START_SCHEMA = require("../support/F2F_CRI_START_SCHEMA.json");
const F2F_CRI_VC_ISSUED_SCHEMA_00 = require("../support/F2F_CRI_VC_ISSUED_00_SCHEMA.json");
const F2F_CRI_VC_ISSUED_SCHEMA_01 = require("../support/F2F_CRI_VC_ISSUED_01_SCHEMA.json");
const F2F_CRI_VC_ISSUED_SCHEMA_02 = require("../support/F2F_CRI_VC_ISSUED_02_SCHEMA.json");
const F2F_CRI_VC_ISSUED_SCHEMA_03 = require("../support/F2F_CRI_VC_ISSUED_03_SCHEMA.json");
const F2F_CRI_VC_ISSUED_SCHEMA_04 = require("../support/F2F_CRI_VC_ISSUED_04_SCHEMA.json");
const F2F_CRI_VC_ISSUED_SCHEMA_05 = require("../support/F2F_CRI_VC_ISSUED_05_SCHEMA.json");
const F2F_YOTI_PDF_EMAILED_SCHEMA = require("../support/F2F_YOTI_PDF_EMAILED_SCHEMA.json");
const F2F_YOTI_RESPONSE_RECEIVED_SCHEMA = require("../support/F2F_YOTI_RESPONSE_RECEIVED_SCHEMA.json");
const F2F_YOTI_START_SCHEMA_00 = require("../support/F2F_YOTI_START_00_SCHEMA.json");
const F2F_YOTI_START_SCHEMA_01 = require("../support/F2F_YOTI_START_01_SCHEMA.json");
const F2F_YOTI_START_SCHEMA_02 = require("../support/F2F_YOTI_START_02_SCHEMA.json");
const F2F_YOTI_START_SCHEMA_03 = require("../support/F2F_YOTI_START_03_SCHEMA.json");
const F2F_YOTI_START_SCHEMA_04 = require("../support/F2F_YOTI_START_04_SCHEMA.json");
const F2F_YOTI_START_SCHEMA_05 = require("../support/F2F_YOTI_START_05_SCHEMA.json");
const F2F_CRI_SESSION_ABORTED_SCHEMA = require("../support/F2F_CRI_SESSION_ABORTED_SCHEMA.json");
const axios = require("axios");
const aws4Interceptor = require("aws4-axios").aws4Interceptor;
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const { fromNodeProviderChain } = require("@aws-sdk/credential-providers");
const { XMLParser } = require("fast-xml-parser");
const { expect } = require("chai");
const Ajv = require("ajv").default;
const AjvFormats = require("ajv-formats");
const ajv = new Ajv({ strictTuples: false });
ajv.addSchema(
  F2F_CRI_AUTH_CODE_ISSUED_SCHEMA,
  "F2F_CRI_AUTH_CODE_ISSUED_SCHEMA"
);
ajv.addSchema(F2F_CRI_END_SCHEMA, "F2F_CRI_END_SCHEMA");
ajv.addSchema(F2F_CRI_START_SCHEMA, "F2F_CRI_START_SCHEMA");
ajv.addSchema(F2F_CRI_VC_ISSUED_SCHEMA_00, "F2F_CRI_VC_ISSUED_SCHEMA_UK_DL");
ajv.addSchema(F2F_CRI_VC_ISSUED_SCHEMA_01, "F2F_CRI_VC_ISSUED_SCHEMA_UK_PP");
ajv.addSchema(
  F2F_CRI_VC_ISSUED_SCHEMA_02,
  "F2F_CRI_VC_ISSUED_SCHEMA_NON_UK_PP"
);
ajv.addSchema(F2F_CRI_VC_ISSUED_SCHEMA_03, "F2F_CRI_VC_ISSUED_SCHEMA_BRP");
ajv.addSchema(F2F_CRI_VC_ISSUED_SCHEMA_04, "F2F_CRI_VC_ISSUED_SCHEMA_EU_DL");
ajv.addSchema(
  F2F_CRI_VC_ISSUED_SCHEMA_05,
  "F2F_CRI_VC_ISSUED_SCHEMA_EEA_ID_CARD"
);
ajv.addSchema(F2F_YOTI_PDF_EMAILED_SCHEMA, "F2F_YOTI_PDF_EMAILED_SCHEMA");
ajv.addSchema(
  F2F_YOTI_RESPONSE_RECEIVED_SCHEMA,
  "F2F_YOTI_RESPONSE_RECEIVED_SCHEMA"
);
ajv.addSchema(F2F_YOTI_START_SCHEMA_00, "F2F_YOTI_START_UK_DL");
ajv.addSchema(F2F_YOTI_START_SCHEMA_01, "F2F_YOTI_START_UK_PP");
ajv.addSchema(F2F_YOTI_START_SCHEMA_02, "F2F_YOTI_START_NON_UK_PP");
ajv.addSchema(F2F_YOTI_START_SCHEMA_03, "F2F_YOTI_START_BRP");
ajv.addSchema(F2F_YOTI_START_SCHEMA_04, "F2F_YOTI_START_EU_DL");
ajv.addSchema(F2F_YOTI_START_SCHEMA_05, "F2F_YOTI_START_EEA_ID_CARD");
ajv.addSchema(F2F_CRI_SESSION_ABORTED_SCHEMA, "F2F_CRI_SESSION_ABORTED_SCHEMA");
AjvFormats(ajv);

module.exports = class TestHarness {
  constructor() {
    this.HARNESS_API_INSTANCE = axios.create({
      baseURL: process.env["TEST_HARNESS_URL"],
    });
    const customCredentialsProvider = {
      getCredentials: fromNodeProviderChain({
        timeout: 1000,
        maxRetries: 0,
      }),
    };
    const awsSigv4Interceptor = aws4Interceptor({
      options: {
        region: "eu-west-2",
        service: "execute-api",
      },
      credentials: customCredentialsProvider,
    });

    this.HARNESS_API_INSTANCE.interceptors.request.use(awsSigv4Interceptor);
  }

  async getSession(sessionId) {
    try {
      const getItemResponse = await this.HARNESS_API_INSTANCE.get(
        "/getRecordBySessionId/" +
        process.env["SESSION_TABLE"] +
        "/" +
        sessionId
      );
      return unmarshall(getItemResponse.data.Item);
    } catch (error) {
      return error;
    }
  }

  async getSessionByAuthCode(authCode) {
    try {
      const getItemResponse = await this.HARNESS_API_INSTANCE.get(
        "/getSessionByAuthCode/" + process.env["SESSION_TABLE"] + "/" + authCode
      );
      return unmarshall(getItemResponse.data.Items[0]);
    } catch (error) {
      return error;
    }
  }

  async getSessionByState(state) {
    try {
      const getItemResponse = await this.HARNESS_API_INSTANCE.get(
        "/getSessionByState/" + process.env["SESSION_TABLE"] + "/" + state
      );
      return unmarshall(getItemResponse.data.Items[0]);
    } catch (error) {
      return error;
    }
  }

  async getDequeuedSqsMessage(prefix) {
    const listObjectsResponse = await this.HARNESS_API_INSTANCE.get(
      "/bucket/",
      {
        params: {
          prefix: "ipv-core/" + prefix,
        },
      }
    );
    const xmlParser = new XMLParser();
    const listObjectsParsedResponse = xmlParser.parse(listObjectsResponse.data);
    if (!listObjectsParsedResponse?.ListBucketResult?.Contents) {
      return undefined;
    }
    let key;
    if (Array.isArray(listObjectsParsedResponse?.ListBucketResult?.Contents)) {
      key = listObjectsParsedResponse.ListBucketResult.Contents.at(-1).Key;
    } else {
      key = listObjectsParsedResponse.ListBucketResult.Contents.Key;
    }

    const getObjectResponse = await this.HARNESS_API_INSTANCE.get(
      "/object/" + key,
      {}
    );
    return getObjectResponse.data;
  }

  async getSqsEventList(folder, prefix, txmaEventSize) {
    let keys;
    let keyList;
    let i;
    do {
      const listObjectsResponse = await this.HARNESS_API_INSTANCE.get(
        "/bucket/",
        {
          params: {
            prefix: folder + prefix,
          },
        }
      );
      const xmlParser = new XMLParser();
      const listObjectsParsedResponse = xmlParser.parse(
        listObjectsResponse.data
      );
      if (!listObjectsParsedResponse?.ListBucketResult?.Contents) {
        return undefined;
      }
      keys = listObjectsParsedResponse?.ListBucketResult?.Contents;
      console.log(listObjectsParsedResponse?.ListBucketResult?.Contents);
      keyList = [];
      for (i = 0; i < keys.length; i++) {
        keyList.push(
          listObjectsParsedResponse?.ListBucketResult?.Contents.at(i).Key
        );
      }
    } while (keys.length < txmaEventSize);
    return keyList;
  }

  async getTxMAEventData(keyList) {
    let obj = {};
    let i;

    for (i = 0; i < keyList.length; i++) {
      const txmaEventBody = await this.HARNESS_API_INSTANCE.get(
        "/object/" + keyList[i],
        {}
      );
      const eventName = txmaEventBody.data.event_name;
      obj[eventName] = txmaEventBody.data;
    }
    return obj;
  }

  async validateTxMAEventData(allTxmaEventBodies, eventName, schemaName) {
    const currentEventBody = allTxmaEventBodies[eventName];

    if (currentEventBody?.event_name) {
      try {
        const validate = ajv.getSchema(schemaName);
        if (validate) {
          expect(validate(currentEventBody)).to.be.true;
        } else {
          throw new Error(`Could not find schema ${schemaName}`);
        }
      } catch (error) {
        console.error(`Error validating ${eventName} event`, error);
        throw error;
      }
    } else {
      throw new Error(
        `No event found in the test harness for ${eventName} event`
      );
    }
  }

  async checkVerifiableCredentialValue(
    decodedBody,
    yotiMockIdId,
    expecedValue,
    vcAttribute
  ) {
    try {
      expect(decodedBody.vc.evidence[0][vcAttribute]).to.equal(expecedValue);
    } catch (error) {
      console.log(
        `Error validating ${vcAttribute} for yotiMockId: ${yotiMockIdId}`,
        error
      );
      return error;
    }
  }
};
