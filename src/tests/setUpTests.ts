import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

import mockServer from "./mockServer";

// configure({ asyncUtilTimeout: 3000 });

// Establish API mocking before all tests.
beforeAll(() => {
  mockServer.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  mockServer.resetHandlers();
  cleanup();
});

// Clean up after the tests are finished.
afterAll(() => {
  mockServer.close();
});

// window matchMedia
window.matchMedia =
  window.matchMedia ||
  ((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return false;
      },
    };
  });

window.fetch = global.fetch;

Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: () => {
      return "";
    },
  }),
});
