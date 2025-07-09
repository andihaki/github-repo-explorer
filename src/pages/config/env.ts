export const CONFIG = {
  NODE_ENV: import.meta.env.NODE_ENV ?? process.env.NODE_ENV,
  GITHUB_TOKEN:
    import.meta.env.VITE_GITHUB_TOKEN ?? process.env.VITE_GITHUB_TOKEN,
};
