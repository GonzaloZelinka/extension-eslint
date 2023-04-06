import React, { useState } from "react";
// import { Controlled as CodeMirror } from "react-codemirror2";
import { linter, lintGutter } from "@codemirror/lint";
import CodeMirror from "@uiw/react-codemirror";
// Uses linter.mjs
import * as eslint from "eslint-linter-browserify";
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";
import { javascript, esLint } from "@codemirror/lang-javascript";
// import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { vsCodeDarkPlus } from "./theme/vs-code-dark-plus";
const config = {
  // eslint configuration
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    "no-console": "warn",
    "no-var": "error",
    "no-unused-vars": "warn",
    "prefer-const": "error",
  },
};

const App = () => {
  const [code, setCode] = useState(`console.log('Hello World');`);
  const onChange = (value: string) => {
    console.log("value ", value);
    setCode(value);
  };

  return (
    <CodeMirror
      height="400px"
      value={code}
      extensions={[
        basicSetup(),
        javascript(),
        // eslint-disable-next-line
        linter(esLint(new eslint.Linter(), config)),
        lintGutter(),
      ]}
      onChange={onChange}
      theme={vsCodeDarkPlus}
    />
  );
};

export default App;
