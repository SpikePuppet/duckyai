import { Configuration, OpenAIApi } from "openai";
import { OpenAIChatCompletionMessage } from "./types";

function createOpenAiClient() {
  const openAiApiKey = process.env.OPENAI_API_KEY;
  const configuration = new Configuration({
    apiKey: openAiApiKey,
  });

  return new OpenAIApi(configuration);
}

function createDuckySystemPrompt(): OpenAIChatCompletionMessage[] {
  return [
    {
      role: "system",
      content:
        "You are DuckyAI, a helpful AI assistant that writes shell commands for users. You are given a description of what the user wants to do, and you should output a valid shell command in response.",
    },
  ];
}

export { createOpenAiClient, createDuckySystemPrompt };
