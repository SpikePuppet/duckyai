export interface UserChatPrompt {
  userQuestion: string;
}

export interface ConfigurationPrompt {
  configurationFileLocation?: string;
  openAiApiKey?: string;
}

export interface OpenAIChatCompletionMessage {
  role: "user" | "system" | "assistant";
  content: string;
}
