import dayjs from "dayjs";

import type { AsyncCommandResult } from "./utils";
import { execAsync } from "./utils";
import { editFileAsync, registerCommands } from "./utils";

function replaceMetaVariable(
  variable: "VERSION_TIMESTAMP" | "VERSION",
  updateOperation: (value: string) => string
): Promise<AsyncCommandResult> {
  return editFileAsync("./src/constants/meta.ts", (content) => {
    const varRegex = new RegExp(`(APP_${variable}\\s*=\\s*")(.+)(")`);
    const match = varRegex.exec(content);
    const varValue = match?.[2];

    return varValue
      ? content.replace(varRegex, `$1${updateOperation(varValue)}$3`)
      : content;
  });
}

async function updateMetaVersionTimestamp(): Promise<AsyncCommandResult> {
  return replaceMetaVariable("VERSION_TIMESTAMP", () => dayjs().format());
}

async function incrementMetaVersion(): Promise<AsyncCommandResult> {
  return replaceMetaVariable("VERSION", (value) => {
    const versionChunks = value.split(".");
    const incrementableChunk = versionChunks[2];

    return `${versionChunks.slice(0, 2).join(".")}.${
      parseInt(incrementableChunk) + 1
    }`;
  });
}

async function gitCommitPush(): Promise<AsyncCommandResult> {
  return replaceMetaVariable("VERSION", (value) => {
    void (async (): Promise<void> => {
      await execAsync(`git add . && git commit -m "v${value}" && git push`);
    })();

    return value;
  });
}

const commands = registerCommands([
  { command: updateMetaVersionTimestamp, name: "update version timestamp" },
  { command: "yarn prettier --write src/", name: "prettier" },
  { command: "yarn eslint src/ --fix --ext .ts,.tsx", name: "eslint" },
  { command: "yarn build", name: "build" },
  { command: "firebase deploy --only hosting:novaa3", name: "deploy" },
  { command: gitCommitPush, name: "git push" },
  { command: incrementMetaVersion, name: "update version" },
]);

void commands.run();
