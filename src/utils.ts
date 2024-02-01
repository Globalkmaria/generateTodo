import { Options } from "./App";

export const generateTodo = (content: string, options: Options) => {
  const lines = content.split("\n").map((line) => {
    if (options.ignoreBlankLines && !line.trim().length) return line;

    if (options.removeUnderscore && line.startsWith("_")) {
      line = line.replace(/^[_]+/g, "");
    }

    return `- [ ] ${line}`;
  });
  return lines.join("\n");
};
