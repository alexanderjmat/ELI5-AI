const { Configuration, OpenAIApi } = require("openai")


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

class OpenAI {
    static async generateSummary(link) {
        try {
            const summary = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `Create an approximately 150 word summary of the article linked below. Include the most relevant information from the article, and be sure to write the summary in a style that is digestible and easy to read for a mainstream audience. Use friendly, exciting, informative, and inclusive language.
                         Link to article: ${link}`,
                temperature: 0.6,
                max_tokens: 350
            })
            const cleanedSummary = summary.data.choices[0].text.replace(/\n+| {2,}/g, ' ').replace(/^\\"|\\"$/g, '').replace(/\\/g, '').trim()
            return cleanedSummary;

        } catch (e) {
            console.error(`Sorry, your summarization was not completed due to the following error: ${e}`)
        }
    }

    static async generateHeadline(title) {
        try {
            const headline = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `Revise the title below by creating an eye-catching headline that will appeal to a wide audience. Use exciting and inclusive language. 
                        Title: ${title}`,
                temperature: 0.6,
                max_tokens: 75
            })
            let cleanedHeadline = headline.data.choices[0].text.slice(1, -1).replace(/\n+| {2,}/g, ' ').trim();
            if (cleanedHeadline[0] == `"` || cleanedHeadline[0] == `'`) {
                cleanedHeadline = cleanedHeadline.slice(1, cleanedHeadline.length)
            }
            return cleanedHeadline
        } catch (e) {
            console.error(`Sorry, your headline was not generated due to the following error: ${e}`)

        }
    }
}

module.exports = OpenAI;