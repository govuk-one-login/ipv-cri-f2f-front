const commonLogger = require("@govuk-one-login/di-ipv-cri-common-express/src/bootstrap/lib/logger");

const levels = ["debug", "info", "warn", "error"];

const normaliseForHmpo = (logger) => {
  const wrappedLogger = Object.create(logger);

  for (const level of levels) {
    wrappedLogger[level] = (...args) => {
      if (
        args[0] &&
        typeof args[0] === "object" &&
        typeof args[1] === "string"
      ) {
        return logger[level](args[1], args[0]);
      }

      return logger[level](...args);
    };
  }

  return wrappedLogger;
};

const get = (...args) => {
  const logger = commonLogger.get(...args);
  if (process.env.USE_PINO_LOGGER === "true") {
    return logger;
  }

  return normaliseForHmpo(logger);
};

module.exports = {
  ...commonLogger,
  get,
};
