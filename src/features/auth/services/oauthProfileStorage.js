const isBrowser = typeof window !== "undefined";
const OAUTH_PROFILE_OVERRIDES_KEY = "careerbytes.oauth.profileOverrides";

const getProfileKey = (user = {}) => {
  if (user?.id || user?.id === 0) return `id:${user.id}`;
  if (user?.email) return `email:${String(user.email).toLowerCase()}`;

  return "";
};

const readOverrides = () => {
  if (!isBrowser) return {};

  try {
    const savedOverrides = window.localStorage.getItem(
      OAUTH_PROFILE_OVERRIDES_KEY
    );

    return savedOverrides ? JSON.parse(savedOverrides) : {};
  } catch {
    window.localStorage.removeItem(OAUTH_PROFILE_OVERRIDES_KEY);
    return {};
  }
};

const writeOverrides = (overrides) => {
  if (!isBrowser) return;
  window.localStorage.setItem(
    OAUTH_PROFILE_OVERRIDES_KEY,
    JSON.stringify(overrides)
  );
};

export const getOAuthProfileOverride = (user) => {
  const profileKey = getProfileKey(user);
  if (!profileKey) return {};

  return readOverrides()[profileKey] || {};
};

export const setOAuthProfileOverride = (user, profile) => {
  const profileKey = getProfileKey(user);
  if (!profileKey) return;

  const overrides = readOverrides();
  overrides[profileKey] = {
    ...overrides[profileKey],
    ...profile,
    updatedAt: new Date().toISOString(),
  };

  writeOverrides(overrides);
};
