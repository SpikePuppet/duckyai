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

export interface UserChatPrompt {
  userQuestion: string;
}

export async function interactivePrompt() {
  const openAIApiKey = process.env.OPENAI_API_KEY;
  const model = new ChatOpenAI({
    openAIApiKey,
    modelName: "gpt-3.5-turbo-0613",
    temperature: 0.1,
  });
  const { prompt } = enquirer;

  console.log(chalk.green("Hi! I'm Ducky!"));
  console.log(
    chalk.white("I'm here to help you with your command line needs!"),
  );
  console.log(chalk.white("How can I help?"));

  while (true) {
    const input: UserChatPrompt = await prompt({
      type: "input",
      name: "userQuestion",
      message: "How can I help?",
    });

    if (input.userQuestion === "exit") {
      break;
    }

    if (input.userQuestion === "") {
      continue;
    }

    const commandPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        "You are DuckyAI, a helpful AI assistant that writes shell commands for users. You are given a description of what the user wants to do, and you should output a valid shell command in response. Do not output any of the context around the command. If you do have some context, omit it entirely.",
      ),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{userInput}"),
    ]);

    const chain = new ConversationChain({
      memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
      prompt: commandPrompt,
      llm: model,
    });
    const response = await chain.call({ userInput: input.userQuestion });

    console.log(JSON.stringify(response.response));
  }
}
