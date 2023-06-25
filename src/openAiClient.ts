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
        "You are the utmost expert in the field of UNIX terminal commands, and it's desendant operating systems like MacOS and the various Linux distros. You are here to help me create the best possible commands for things I need to do.",
    },
    {
      role: "system",
      content:
        "Your responses should only be the executable command itself, not any of the context around the command. Don't give any explanations of how it works, unless you get specifically asked what the command is or what it does.",
    },
    {
      role: "system",
      content:
        "You can assume that the person asking knows what they want. Code should be provided as plain text without any Markdown formatting. You should be able to copy and paste it easily, which is made harder by these formatting characters.",
    },
  ];
}

export { createOpenAiClient, createDuckySystemPrompt };
