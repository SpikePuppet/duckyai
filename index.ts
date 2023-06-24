import "dotenv/config";
import { input } from "@inquirer/prompts";
import { createDuckySystemPrompt, createOpenAiClient } from "./openAiClient.ts";

// Example prompts for testing:
//  1. "How would I view my current branch and it's previous commits in a nice tree format?"
while (true) {
  const prompt = await input({
    message: "Hi I'm Ducky! What are you trying to build?",
  });

  if (prompt === "exit") {
    break;
  }

  const openAiClient = createOpenAiClient();
  const duckySystemPrompt = createDuckySystemPrompt();

  const response = await openAiClient.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      ...duckySystemPrompt,
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log(response.data);
  console.log(response.data.choices[0].message);
}
