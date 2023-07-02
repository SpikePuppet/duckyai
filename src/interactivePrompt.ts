import chalk from "chalk";
import enquirer from "enquirer";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { SystemMessagePromptTemplate } from "langchain/prompts";
import { BufferMemory } from "langchain/memory";
import { UserChatPrompt } from "./types";

export async function interactivePrompt() {
  const openAIApiKey = process.env.OPENAI_API_KEY;
  const model = new ChatOpenAI({
    openAIApiKey,
    modelName: "gpt-3.5-turbo-0613",
    temperature: 0.1,
  });
  const commandPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "You are DuckyAI, a helpful AI assistant that writes shell commands for users. You are given a description of what the user wants to do, and you should output a valid shell command in response. Do not output any of the context around the command. If you do have some context, omit it entirely. If the users question doesn't have anything to do with UNIX shell commands, you should tell the user you can't answer the question. Do so in a friendly tone. If a user asks you about the conversation your having, you can reference previous answers. If someone pastes in a UNIX shell command, you can explain how it works.",
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{userInput}"),
  ]);

  const chain = new ConversationChain({
    memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
    prompt: commandPrompt,
    llm: model,
  });
  const { prompt } = enquirer;

  console.log(chalk.green("Hi! I'm Ducky!"));
  console.log("");
  console.log(
    chalk.white("I'm here to help you with your command line needs!"),
  );
  console.log("");

  while (true) {
    const input: UserChatPrompt = await prompt({
      type: "input",
      name: "userQuestion",
      message: "How can I help?",
    });
    console.log("");

    if (input.userQuestion === "exit") {
      break;
    }

    if (input.userQuestion === "") {
      continue;
    }

    const response = await chain.call({ userInput: input.userQuestion });

    console.log(chalk.green("Answer"));
    console.log(response.response);
    console.log("");
  }
}
