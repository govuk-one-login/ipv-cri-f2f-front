require("express");
require("express-async-errors");

const path = require("path");
const session = require("express-session");
const AWS = require("aws-sdk");
const DynamoDBStore = require("connect-dynamodb")(session);
const wizard = require('hmpo-form-wizard');
const logger = require("hmpo-logger")

const commonExpress = require("di-ipv-cri-common-express");

const setHeaders = commonExpress.lib.headers;
const setScenarioHeaders = commonExpress.lib.scenarioHeaders;
const setAxiosDefaults = commonExpress.lib.axios;

const { setAPIConfig, setOAuthPaths } = require("./lib/settings");
const { setGTM, getGTM } = require("./lib/locals");
const { setI18n } = require("di-ipv-cri-common-express/src/lib/i18next");

const {
  API,
  APP,
  PORT,
  SESSION_SECRET,
  SESSION_TABLE_NAME,
  SESSION_TTL,
  PROXY_API,
} = require("./lib/config");

const { setup } = require("hmpo-app");

const loggerConfig = {
  console: true,
  consoleLevel: process.env.LOG_LEVEL || "warn",
  consoleJSON: true,
  app: false,
};

AWS.config.update({
  region: "eu-west-2",
});
const dynamodb = new AWS.DynamoDB();

const dynamoDBSessionStore = new DynamoDBStore({
  client: dynamodb,
  table: SESSION_TABLE_NAME,
});

const sessionConfig = {
  cookieName: "service_session",
  secret: SESSION_SECRET,
  cookieOptions: { maxAge: SESSION_TTL },
  ...(SESSION_TABLE_NAME && { sessionStore: dynamoDBSessionStore }),
};

const helmetConfig = require("./lib/helmet.js");

const { app, router } = setup({
  config: { APP_ROOT: __dirname },
  port: PORT,
  logs: loggerConfig,
  session: sessionConfig,
  helmet: helmetConfig,
  redis: SESSION_TABLE_NAME ? false : commonExpress.lib.redis(),
  urls: {
    public: "/public",
  },
  publicDirs: ["../dist/public"],
  translation: {
    allowedLangs: ["cy"],
    fallbackLang: ["cy"],
    cookie: { name: "lng" },
  },
  views: [
    path.resolve(
      path.dirname(require.resolve("di-ipv-cri-common-express")),
      "components"
    ),
    "views",
  ],
  middlewareSetupFn: (app) => {
    app.use(setHeaders);
  },
  dev: true,
});

// setting trust proxy since this runs behind an AWS ALB
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 'loopback, linklocal, uniquelocal');

const steps = require("./app/f2f/steps");
const fields = require("./app/f2f/fields");

setI18n({
  router,
  config: {
    secure: true,
    cookieDomain: APP.ANALYTICS.DOMAIN,
  },
});

app.get("nunjucks").addGlobal("getContext", function () {
  return {
    keys: Object.keys(this.ctx),
    ctx: this.ctx.ctx,
  };
});

setAPIConfig({
  app,
  baseUrl: API.BASE_URL,
  sessionPath: API.PATHS.SESSION,
  authorizationPath: API.PATHS.AUTHORIZATION,
  proxyUrl: PROXY_API.BASE_URL,
  postOfficeProxyUrl: PROXY_API.PATHS.POST_OFFICE
});

setOAuthPaths({ app, entryPointPath: APP.PATHS.F2F});

setGTM({
  app,
  ga4ContainerId: APP.ANALYTICS.GTM_ID_GA4,
  uaContainerId: APP.ANALYTICS.GTM_ID_UA,
  isGa4Enabled: APP.ANALYTICS.GA4_ENABLED,
  analyticsCookieDomain: APP.ANALYTICS.DOMAIN,
});


router.use(getGTM);

router.use(setScenarioHeaders);
router.use(setAxiosDefaults);

router.use("/oauth2", commonExpress.routes.oauth2);

const wizardOptions = {
  name: "cri-f2f-front",
  journeyName: "f2f",
  templatePath: "f2f",
};

router.use(wizard(steps, fields, wizardOptions));

router.use((err, req, res, next) => {
  logger.get().error("Error caught by Express handler - redirecting to Callback with server_error", {err});
	const REDIRECT_URI = req.session?.authParams?.redirect_uri;
	if (REDIRECT_URI) {
		next(err);
		router.use(commonExpress.lib.errorHandling.redirectAsErrorToCallback);
	} else {
		res.redirect(APP.PATHS.ERROR)
	}
});
