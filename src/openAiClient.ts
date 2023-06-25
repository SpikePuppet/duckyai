import { Configuration, OpenAIApi } from "openai";

export interface OpenAIChatCompletionMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

function createOpenAiClient() {
  const openAiApiKey = process.env.OPENAI_API_KEY;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  return new OpenAIApi(configuration);
}

function createDuckySystemPrompt(): OpenAIChatCompletionMessage[] {
  return [
    {
      role: "system",
      content:
        "You are the utmost expert in the field of UNIX terminal commands, and yor are here to help me create the best possible commands for things I need to do.",
    },
    {
      role: "system",
      content:
        "Your responses should only be the command itself, not any of the context around the command. You can assume that the person asking knows what they want.",
    },
    {
      role: "system",
      content:
        "Ensure that in all of your responses, you only show the command itself. Do not wrap it in code blocks, don't wrap it in quotes, etc. Output it as if the user is going to directly copy and paste it.",
    },
  ];
}

export { createOpenAiClient, createDuckySystemPrompt };
