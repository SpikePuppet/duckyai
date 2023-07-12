#!/usr/bin/env node
import "dotenv/config";
import { Command } from "commander";
import { interactivePrompt } from "./src/interactivePrompt.js";
import { query } from "./src/query.js";
import { configureDucky } from "./src/configure.js";

const program = new Command();
program
  .name("Ducky")
  .description("Ducky! Your command line rubber duck for all things terminal!")
  .version("0.2.0");

program
  .command("configure")
  .description("Configure Ducky!")
  .action(async () => {
    await configureDucky().catch(console.error);
  });

program
  .command("chat", { isDefault: true })
  .description("Chat with Ducky!")
  .action(async () => interactivePrompt().catch(console.error));

program
  .command("query")
  .description("Query Ducky!")
  .argument("<question>", "The query you have for Ducky!")
  .action(async (question) => query(question).catch(console.error));

program.parse();
