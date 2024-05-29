await import("./src/env.mjs");
import withBundleAnalyzer from "@next/bundle-analyzer";

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

/** @type {import('next').NextConfig} */
const enhancedConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(config);

export default enhancedConfig;
