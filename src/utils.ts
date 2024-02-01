export const generateTodo = (content: string) => {
  const lines = content.split("\n").map((line) => {
    if (!line.trim().length) return line;
    return `- [ ] ${line}`;
  });
  return lines.join("\n");
};
