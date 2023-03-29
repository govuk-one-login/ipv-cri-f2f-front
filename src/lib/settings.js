module.exports = {
  setAPIConfig: ({ app, baseUrl, sessionPath, authorizationPath, postOfficeProxyUrl }) => {
    app.set("API.BASE_URL", baseUrl);
    app.set("API.PATHS.SESSION", sessionPath);
    app.set("API.PATHS.AUTHORIZATION", authorizationPath);
    app.set("API.POST_OFFICE_PROXYURL", postOfficeProxyUrl);
  },

  setOAuthPaths: ({ app, entryPointPath }) => {
    app.set("APP.PATHS.ENTRYPOINT", entryPointPath);
  },
};
