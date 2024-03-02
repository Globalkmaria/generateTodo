import './styles/reset.scss';
import './styles/common.scss';
import './App.scss';

import { throttle } from 'lodash-es';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';

import ArrowIcon from './assets/icons/down-arrow-icon.svg?react';
import { SAMPLE_CONTENT } from './const';
import { generateTodo } from './utils';

export interface Options {
  ignoreBlankLines: boolean;
  removeUnderscore: boolean;
}

function App() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [content, setContent] = useState(SAMPLE_CONTENT);
  const [copiedState, setCopiedState] = useState(false);
  const [options, setOptions] = useState({
    ignoreBlankLines: false,
    removeUnderscore: false,
  });
  const bottomRef = useRef<HTMLDivElement>(null);

  const contentTodo = content.length ? generateTodo(content, options) : '';
  const copyButtonText = copiedState ? 'Copied!' : 'Copy';

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

  function scrollToBottom() {
    bottomRef.current && bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    let lastScrollTop = document.documentElement.scrollTop;

    function handleScroll() {
      const scrollTopPosition = document.documentElement.scrollTop;

      if (bottomRef.current) {
        const bottomPosition = bottomRef.current.getBoundingClientRect().top;
        const screenBottom = window.innerHeight;

        if (bottomPosition < screenBottom) {
          setShowScrollButton(false);
          lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
          return;
        }
      }

      if (scrollTopPosition > lastScrollTop) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }

      lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
    }

    window.addEventListener('scroll', throttle(handleScroll, 300));

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1 className="title">- [ ] todo generator</h1>
          <div>
            Made by{' '}
            <a target="_blank" href="https://github.com/Globalkmaria" rel="noreferrer">
              Maria
            </a>
          </div>
        </header>
        <main>
          <div className="options noselect">
            <label>
              <input name="ignoreBlankLines" type="checkbox" onChange={handleOptionsChange} />
              Ignore blank lines
            </label>
            <label>
              <input type="checkbox" name="removeUnderscore" onChange={handleOptionsChange} />
              Remove leading underscores
            </label>
          </div>
          <div className="generator">
            <div className="box">
              <textarea
                className="textarea border"
                name=""
                wrap="off"
                id="content"
                placeholder="Your content..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                onChange={handleContentChange}
                value={content}
              />
            </div>
            <div className="result box border">
              <pre className="result-text">{contentTodo}</pre>
              <button className="copy_btn" onClick={handleCopy} type="button">
                {copyButtonText}
              </button>
            </div>
          </div>

          <button
            type="button"
            title="scroll to down"
            className={`scroll-down ${showScrollButton ? 'scroll-down--show' : ''}`}
            onClick={scrollToBottom}
          >
            <ArrowIcon />
          </button>
        </main>
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
}

export default App;
