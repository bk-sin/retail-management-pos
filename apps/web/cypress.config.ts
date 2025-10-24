import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents() {},
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: false,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  port: 3001,
});
