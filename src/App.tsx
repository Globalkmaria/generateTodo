import { ChangeEventHandler, useState } from "react";

import "./styles/reset.scss";
import "./styles/common.scss";
import "./App.scss";

import { generateTodo } from "./utils";

export interface Options {
  ignoreBlankLines: boolean;
  removeUnderscore: boolean;
}

function App() {
  const [content, setContent] = useState("");
  const [copiedState, setCopiedState] = useState(false);
  const [options, setOptions] = useState({
    ignoreBlankLines: false,
    removeUnderscore: false,
  });

  const contentTodo = content.length ? generateTodo(content, options) : "";
  const copyButtonText = copiedState ? "Copied!" : "Copy";

  const handleOptionsChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.checked,
    });
    if (copiedState) setCopiedState(false);
  };

  const handleContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
    if (copiedState) setCopiedState(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(contentTodo);
    setCopiedState(true);
  };

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1 className="title">- [ ] todo generator</h1>
          <div>
            Made by{" "}
            <a target="_blank" href="https://github.com/Globalkmaria">
              Maria
            </a>
          </div>
        </header>
        <main>
          <div className="options noselect">
            <label>
              <input
                name="ignoreBlankLines"
                type="checkbox"
                onChange={handleOptionsChange}
              />
              Ignore blank lines
            </label>
            <label>
              <input
                type="checkbox"
                name="removeUnderscore"
                onChange={handleOptionsChange}
              />
              Remove leading underscores
            </label>
          </div>
          <div className="generator">
            <textarea
              className="box textarea"
              name=""
              id="content"
              placeholder="Your content..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              onChange={handleContentChange}
              value={content}
            />
            <div className="result box">
              <pre>{contentTodo}</pre>
              <button className="copy_btn" onClick={handleCopy}>
                {copyButtonText}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
