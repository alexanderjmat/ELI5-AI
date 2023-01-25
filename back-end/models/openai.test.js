const OpenAI = require("./OpenAI");
const axios = require("axios");

describe("OpenAI", () => {
  describe("generateSummary", () => {
    it("returns an error when the link is invalid", async () => {
      const link = "not a valid link";
      try {
        await OpenAI.generateSummary(link);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });

  describe("generateHeadline", () => {
    it("returns an error when the title is empty or not a string", async () => {
      const title = "";
      try {
        await OpenAI.generateHeadline(title);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});