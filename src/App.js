import React from "react";
import { Editor, DocumentSetting, Loader } from "./components/index";

const App = () => {
  return (
    <div>
      <DocumentSetting />
      <Editor />
      <Loader />
    </div>
  );
};

export default App;
