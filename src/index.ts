import "dotenv/config";
import { Command } from "commander";
import { interactivePrompt } from "./interactivePrompt.js";
import { query } from "./query.js";

const program = new Command();
program
  .name("Ducky")
  .description("Ducky! Your command line rubber duck for all things terminal!")
  .version("0.1.0");

program
  .command("chat", { isDefault: true })
  .description("Chat with Ducky!")
  .action(async () => interactivePrompt());

program
  .command("query")
  .description("Query Ducky!")
  .argument("<question>", "The query you have for Ducky!")
  .action(async (question) => query(question));

program.parse();
