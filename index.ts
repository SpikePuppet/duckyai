import "dotenv/config";
import { Command } from "commander";
import { interactivePrompt } from "./interactivePrompt.ts";

const program = new Command();
program
  .name("Ducky")
  .description("Ducky! Your command line rubber duck for all things terminal!")
  .version("0.1.0");

program
  .command("chat", { isDefault: true })
  .description("Chat with Ducky!")
  .action(async () => interactivePrompt());

program.parse();
