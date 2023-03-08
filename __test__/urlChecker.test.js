import { checkForUrl } from "../src/client/js/urlChecker";

describe("Testing the URL Checker functionality", () => {
  test("Testing the URL Checker() function", () => {
    expect(checkForUrl).toBeDefined();
  });
});
