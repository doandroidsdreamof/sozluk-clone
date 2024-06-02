//! Skip Husky install in production and CI
if (process.env.NODE_ENV === "production" || process.env.CI === "true") {
  process.exit(0);
}
if (process.env.NODE_ENV !== "production") {
  const husky = (await import("husky")).default;
  console.log(husky());
}
