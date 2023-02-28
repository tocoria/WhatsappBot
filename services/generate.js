import { Configuration, OpenAIApi } from "openai";
import "dotenv/config.js";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const responseAi = async(text) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(text),
    temperature: 0.6,
    max_tokens: 500

  });
  return completion
}

function generatePrompt(text) {
  return `Answer as if we were chatting as friends
Me: ${text}
You:`;
}
