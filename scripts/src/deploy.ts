import type { AsyncCommandResult } from "./utils";
import { execAsync } from "./utils";
import { editFileAsync, registerCommands } from "./utils";

function replaceMetaVariable(
  variable: "ENVIRONMENT" | "VERSION",
  updateOperation: (value: string) => string
): Promise<AsyncCommandResult> {
  return editFileAsync("./src/constants/meta.ts", (content) => {
    const varRegex = new RegExp(
      `(DO_NOT_CHANGE_MANUALLY_${variable}\\s*=\\s*")(.+)(")`
    );
    const match = varRegex.exec(content);
    const varValue = match?.[2];

    if (varValue) {
      return content.replace(varRegex, `$1${updateOperation(varValue)}$3`);
    }
    return content;
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

function setMetaEnvironment(
  environment: "development" | "production"
): Promise<AsyncCommandResult> {
  return replaceMetaVariable("ENVIRONMENT", () => environment);
}

async function prepareMetaForDeployment(): Promise<AsyncCommandResult> {
  const setEnvResult = await setMetaEnvironment("production");
  if (setEnvResult.error) {
    return setEnvResult;
  } else {
    const incrementVersionResult = await incrementMetaVersion();
    return incrementVersionResult;
  }
}

async function gitPush(): Promise<AsyncCommandResult> {
  return replaceMetaVariable("VERSION", (value) => {
    void (async (): Promise<void> => {
      await execAsync(`git add . && git commit -m "v${value}"`);
    })();
    return value;
  });
}

function resetMetaForDevelopment(): Promise<AsyncCommandResult> {
  return setMetaEnvironment("development");
}

const commands = registerCommands([
  { command: prepareMetaForDeployment, name: "preparing meta" },
  { command: "yarn prettier --write src/", name: "prettier" },
  { command: "yarn eslint src/ --fix --ext .ts,.tsx", name: "eslint" },
  { command: "yarn build", name: "build" },
  { command: "firebase deploy --only hosting:novaa3", name: "deploy" },
  { command: gitPush, name: "git push" },
  { command: resetMetaForDevelopment, name: "resetting meta" },
]);

void commands.run();
