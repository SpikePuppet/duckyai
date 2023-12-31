import clipboard from "clipboardy";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  AIChatMessage,
  HumanChatMessage,
  SystemChatMessage,
} from "langchain/schema";
import { loadDuckyConfig } from "./configure.js";

export async function query(prompt: string) {
  const config = loadDuckyConfig();
  const model = new ChatOpenAI({
    openAIApiKey: config.OPEN_AI_API_KEY,
    modelName: "gpt-3.5-turbo-0613",
    temperature: 0.1,
  });
  const response: AIChatMessage = await model.call([
    new SystemChatMessage(
      "You are DuckyAI, a helpful AI assistant that writes shell commands for users. You are given a description of what the user wants to do, and you should output a valid shell command in response. Do not output any of the context around the command. If you do have some context, omit it entirely.",
    ),
    new HumanChatMessage(prompt),
  ]);
  console.log(response.text);
  clipboard.writeSync(response.text);
}
