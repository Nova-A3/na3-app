import type { AsyncCommandResult } from "./utils";
import { execAsync } from "./utils";
import { editFileAsync, registerCommands } from "./utils";

function replaceMetaVariable(
  variable: "VERSION",
  updateOperation: (value: string) => string
): Promise<AsyncCommandResult> {
  return editFileAsync("./src/constants/meta.ts", (content) => {
    const varRegex = new RegExp(
      `(DO_NOT_CHANGE_MANUALLY_${variable}\\s*=\\s*")(.+)(")`
    );
    const match = varRegex.exec(content);
    const varValue = match?.[2];

    return varValue
      ? content.replace(varRegex, `$1${updateOperation(varValue)}$3`)
      : content;
  });
}

function incrementMetaVersion(): Promise<AsyncCommandResult> {
  return replaceMetaVariable("VERSION", (value) => {
    const versionChunks = value.split(".");
    const incrementableChunk = versionChunks[2];

    return `${versionChunks.slice(0, 2).join(".")}.${
      parseInt(incrementableChunk) + 1
    }`;
  });
}

async function gitCommit(): Promise<AsyncCommandResult> {
  return replaceMetaVariable("VERSION", (value) => {
    void (async (): Promise<void> => {
      await execAsync(`git add . && git commit -m "v${value}"`);
    })();

    return value;
  });
}

const commands = registerCommands([
  { command: incrementMetaVersion, name: "update version" },
  { command: "yarn prettier --write src/", name: "prettier" },
  { command: "yarn eslint src/ --fix --ext .ts,.tsx", name: "eslint" },
  { command: "yarn build", name: "build" },
  { command: "firebase deploy --only hosting:novaa3", name: "deploy" },
  { command: gitCommit, name: "git commit" },
]);

void commands.run();
