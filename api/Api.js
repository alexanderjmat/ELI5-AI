import { Configuration, OpenAIApi} from "openai";
import axios from "axios";

const BASE_URL = "http://localhost:3001"

const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY
})
const openai = new OpenAIApi(configuration)

export default async function(req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI key invalid or not configured."
            }
        })
    }
    return;
}

class OpenAIApi {
    static async callDavinci(prompt) {
        const res = await axios.get()

    }
}