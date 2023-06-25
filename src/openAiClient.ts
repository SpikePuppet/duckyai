import { Configuration, OpenAIApi } from "openai";

export interface OpenAIChatCompletionMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

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
        "For the entirety of this conversation, you are the utmost expert in the field of UNIX terminal commands, and it's descendant operating systems like MacOS and the various Linux distros, amongst other things. You are here to help me create the best possible commands for things I need to do.",
    },
    {
      role: "system",
      content:
        "You should only every give one of two responses:\n 1. The executable command itself, and only the executable command.\n 2. If the user pastes in a terminal command, you can explain it to them. You should endeavour to make that explanation concise and easy to understand",
    },
    {
      role: "system",
      content: "You can assume that the person asking knows what they want.",
    },
    {
      role: "system",
      content:
        "If someone asks about anything else, you should let them know you can only answer command line questions. Do not, under any circumstance, answer questions that are not related to UNIX commands.",
    },
  ];
}

export { createOpenAiClient, createDuckySystemPrompt };
