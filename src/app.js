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
const { setGTM } = require("di-ipv-cri-common-express/src/lib/settings");
const { getGTM } = require("di-ipv-cri-common-express/src/lib/locals");
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
  consoleLevel: 'debug',
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

const helmetConfig = require("di-ipv-cri-common-express/src/lib/helmet");

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
  views: [
    path.resolve(
      path.dirname(require.resolve("di-ipv-cri-common-express")),
      "components"
    ),
    "views",
  ],
  translation: {
    allowedLangs: ["en"],
    fallbackLang: ["en"],
    cookie: { name: "lng" },
  },
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
  id: APP.ANALYTICS.ID,
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
  // logger.get().error("Error caught by Express handler - redirecting to Callback with server_error", {err});
  // next(err);

	console.log('Error caught by Express handler - redirecting to Callback with server_error', {err});
  // logger.get().error("Error caught by Express handler - redirecting to Callback with server_error", {err});
	// console.log('req.session', req.session);
	// const REDIRECT_URI = req.session?.authParams?.redirect_uri;
	// console.log('REDIRECT_URI', REDIRECT_URI);
	// if (REDIRECT_URI) {
	// 	console.log("CALLING_NEXT");
	// 	next(err);
	// } else {
	// 	console.log("CALLING_NEWDONE");
	// 	res.redirect(APP.PATHS.ERROR)
	// }
});

router.use(commonExpress.lib.errorHandling.redirectAsErrorToCallback);
