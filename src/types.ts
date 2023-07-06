export interface UserChatPrompt {
  userQuestion: string;
}

export interface ConfigurationPrompt {
  openAiApiKey?: string;
  logChat: string;
}

export interface OpenAIChatCompletionMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

export interface ConfigurationOptions {
  OPEN_AI_API_KEY: string;
  LOG_CHAT: boolean;
}
