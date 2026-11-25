import F2F_CRI_AUTH_CODE_ISSUED_SCHEMA from "./F2F_CRI_AUTH_CODE_ISSUED_SCHEMA.json" with { type: "json" };
import F2F_CRI_END_SCHEMA from "./F2F_CRI_END_SCHEMA.json" with { type: "json" };
import F2F_CRI_START_SCHEMA from "./F2F_CRI_START_SCHEMA.json" with { type: "json" };
import F2F_CRI_VC_ISSUED_SCHEMA_00 from "./F2F_CRI_VC_ISSUED_00_SCHEMA.json" with { type: "json" };
import F2F_CRI_VC_ISSUED_SCHEMA_01 from "./F2F_CRI_VC_ISSUED_01_SCHEMA.json" with { type: "json" };
import F2F_CRI_VC_ISSUED_SCHEMA_02 from "./F2F_CRI_VC_ISSUED_02_SCHEMA.json" with { type: "json" };
import F2F_CRI_VC_ISSUED_SCHEMA_04 from "./F2F_CRI_VC_ISSUED_04_SCHEMA.json" with { type: "json" };
import F2F_CRI_VC_ISSUED_SCHEMA_05 from "./F2F_CRI_VC_ISSUED_05_SCHEMA.json" with { type: "json" };
import F2F_YOTI_PDF_EMAILED_SCHEMA from "./F2F_YOTI_PDF_EMAILED_SCHEMA.json" with { type: "json" };
import F2F_YOTI_RESPONSE_RECEIVED_SCHEMA from "./F2F_YOTI_RESPONSE_RECEIVED_SCHEMA.json" with { type: "json" };
import F2F_YOTI_START_SCHEMA_00 from "./F2F_YOTI_START_00_SCHEMA.json" with { type: "json" };
import F2F_YOTI_START_SCHEMA_01 from "./F2F_YOTI_START_01_SCHEMA.json" with { type: "json" };
import F2F_YOTI_START_SCHEMA_02 from "./F2F_YOTI_START_02_SCHEMA.json" with { type: "json" };
import F2F_YOTI_START_SCHEMA_04 from "./F2F_YOTI_START_04_SCHEMA.json" with { type: "json" };
import F2F_YOTI_START_SCHEMA_05 from "./F2F_YOTI_START_05_SCHEMA.json" with { type: "json" };
import F2F_CRI_SESSION_ABORTED_SCHEMA from "./F2F_CRI_SESSION_ABORTED_SCHEMA.json" with { type: "json" };
import axios from "axios";
import aws4Axios from "aws4-axios";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { XMLParser } from "fast-xml-parser";
import { expect } from "chai";
import Ajv from "ajv";
import AjvFormats from "ajv-formats";

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
ajv.addSchema(F2F_YOTI_START_SCHEMA_04, "F2F_YOTI_START_EU_DL");
ajv.addSchema(F2F_YOTI_START_SCHEMA_05, "F2F_YOTI_START_EEA_ID_CARD");
ajv.addSchema(F2F_CRI_SESSION_ABORTED_SCHEMA, "F2F_CRI_SESSION_ABORTED_SCHEMA");
AjvFormats(ajv);

const { aws4Interceptor } = aws4Axios;

export class TestHarness {
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
      var validate;
      try {
        validate = ajv.getSchema(schemaName);
        if (validate) {
          const isValid = validate(currentEventBody);
          expect(isValid).to.be.true;
        } else {
          throw new Error(`Could not find schema ${schemaName}`);
        }
      } catch (error) {
        console.error(`Error validating ${eventName} event`, error);
        console.error(`Errors:`, validate.errors);

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
