const isBrowser = typeof window !== "undefined";

const OAUTH_PROVIDER_KEY = "careerbytes.oauth.provider";
const OAUTH_PROFILE_PENDING_KEY = "careerbytes.oauth.profilePending";

export const setOAuthProvider = (provider) => {
  if (!isBrowser || !provider) return;
  window.localStorage.setItem(OAUTH_PROVIDER_KEY, provider);
};

export const getOAuthProvider = () =>
  isBrowser ? window.localStorage.getItem(OAUTH_PROVIDER_KEY) || "" : "";

export const setOAuthProfilePending = (provider = "") => {
  if (!isBrowser) return;
  if (provider) setOAuthProvider(provider);
  window.localStorage.setItem(OAUTH_PROFILE_PENDING_KEY, "true");
};

export const isOAuthProfilePending = () =>
  isBrowser ? window.localStorage.getItem(OAUTH_PROFILE_PENDING_KEY) === "true" : false;

export const clearOAuthProfileState = () => {
  if (!isBrowser) return;
  window.localStorage.removeItem(OAUTH_PROVIDER_KEY);
  window.localStorage.removeItem(OAUTH_PROFILE_PENDING_KEY);
};
