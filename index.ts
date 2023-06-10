import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "davinci",
  prompt:
    "This is a test request, could you tell me what kind of model you are?",
  temperature: 0,
});

console.log(response.data);
