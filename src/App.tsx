import React from "react";

import Tree from "./components/tree/tree.component";

function App() {
  return (
    <div
      className="App"
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tree />
    </div>
  );
}

export default App;
