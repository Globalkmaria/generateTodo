import { ChangeEventHandler, useState } from "react";

import "./styles/reset.scss";
import "./styles/common.scss";
import "./App.scss";

import { generateTodo } from "./utils";

function App() {
  const [content, setContent] = useState("");

  const handleContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const contentTodo = generateTodo(content);

  const handleCopy = () => navigator.clipboard.writeText(contentTodo);

  return (
    <div className="app">
      <header>
        <h1 className="title">- [ ] content todo generator</h1>
        <div>
          Made by{" "}
          <a target="_blank" href="https://github.com/Globalkmaria">
            Maria
          </a>
        </div>
      </header>
      <main>
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
            Copy
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
