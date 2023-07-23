await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["mhacpecjbneicomunzyb.supabase.co"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
