const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class OpenAI {
  static async generateSummary(link) {
    try {
      const summary = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Create an approximately 150 word summary of the article linked below. Include the most relevant information from the article, and be sure to write the summary in a style that is digestible and easy to read for a mainstream audience. Use friendly, exciting, informative, and inclusive language. Make sure that there are no spelling or grammar mistakes in the summary.
                         Link to article: ${link}`,
        temperature: 0.6,
        max_tokens: 350,
      });
      const cleanedSummary = summary.data.choices[0].text.replace(/[^\w\s\.\?,!'":;]/gi, '');
      return cleanedSummary;
    } catch (e) {
      console.error(
        `Sorry, your summarization was not completed due to the following error: ${e}`
      );
    }
  }

  static async generateHeadline(title) {
    try {
      const headline = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Revise the title below by creating an eye-catching headline that will appeal to a wide audience. Use exciting and inclusive language. Make sure that the headline is properly capitalized and punctuated. The first character in the headline should ALWAYS be capitalized.
                        Title: ${title}`,
        temperature: 0.6,
        max_tokens: 75,
      });
      const cleanedHeadline = headline.data.choices[0].text.replace(/[^\w\s\.\?,!'";:]/gi, '');
      return cleanedHeadline;
    } catch (e) {
      console.error(
        `Sorry, your headline was not generated due to the following error: ${e}`
      );
    }
  }

  static async generateOverview(titles) {
    try {
      const overview = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Create an approximately 150 word overview of this week's newsletter based on the array of headlines below. Do not simply list the events from the headlines, but use some of the most relevant information to construct an interesting, eyegrabbing summary. It's OK to leave out information. In fact, you should not include all the information. Just include what you judge to be the most exciting information in the overview. Use friendly, exciting, informative, and inclusive language. Make sure that there are no spelling or grammar mistakes in the summary.
                         Array of headlines: ${titles}`,
        temperature: 0.6,
        max_tokens: 350,
      });
      const cleanedOverview = overview.data.choices[0].text.replace(/[^\w\s\.\?,!'";:]/gi, '');
      return cleanedOverview;
    } catch (e) {
      console.error(
        `Sorry, your overview was not completed due to the following error: ${e}`
      );
    }
  }
}

module.exports = OpenAI;
