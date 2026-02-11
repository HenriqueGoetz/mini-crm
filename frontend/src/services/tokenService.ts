export const TOKEN_STORAGE_KEY = "mini-crm-authentication-token";

export const tokenService = {
  get() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  set(token: string) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },

  remove() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },
};
