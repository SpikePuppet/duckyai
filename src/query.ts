import chalk from "chalk";
import {
  OpenAIChatCompletionMessage,
  createDuckySystemPrompt,
  createOpenAiClient,
} from "./openAiClient.ts";

export async function query(prompt: string) {
  const userPrompts: OpenAIChatCompletionMessage[] = [];

  const openAiClient = createOpenAiClient();
  const duckySystemPrompt = createDuckySystemPrompt();

  userPrompts.push({
    role: "user",
    content: prompt,
  });

  const response = await openAiClient.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages: [...duckySystemPrompt, ...userPrompts],
  });

  const command = response.data.choices[0].message?.content;
  if (command === undefined) {
    console.log(
      chalk.red(
        "I'm not quite sure how to help with that. Can you try rephrasing?",
      ),
    );
  }

  console.log(command);
}
