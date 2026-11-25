export const setAPIConfig = ({
  app,
  baseUrl,
  sessionPath,
  authorizationPath,
  proxyUrl,
  postOfficeProxyUrl,
}) => {
  app.set("API.BASE_URL", baseUrl);
  app.set("API.PATHS.SESSION", sessionPath);
  app.set("API.PATHS.AUTHORIZATION", authorizationPath);
  app.set("PROXY_API.BASE_URL", proxyUrl);
  app.set("PROXY_API.PATHS.POST_OFFICE", postOfficeProxyUrl);
};

export const setProxyAPIConfig = ({ app, postOfficeProxyUrl }) => {
  app.set("PROXY_API.PATHS.POST_OFFICE", postOfficeProxyUrl);
};

export const setOAuthPaths = ({ app, entryPointPath }) => {
  app.set("APP.PATHS.ENTRYPOINT", entryPointPath);
};
