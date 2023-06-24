import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";
import * as readline from "readline";
import { input } from "@inquirer/prompts";

// Example prompts for testing:
//  1. "How would I view my current branch and it's previous commits in a nice tree format?";
const prompt = await input({
  message: "Hi I'm Ducky! What are you trying to build?",
});

const openAiResponse = async () => {
  const openAiApiKey = process.env.OPENAI_API_KEY;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log(process.env.OPENAI_API_KEY);
  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
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
        content: "Only show the command itself.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response;
};

openAiResponse()
  .then((response) => {
    console.log(response.data);
    console.log(response.data.choices[0].message);
  })
  .catch((error) => {
    console.log(error);
    //console.log("There was an error");
  });
