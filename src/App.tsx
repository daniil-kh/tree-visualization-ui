import React, { useState, useCallback } from "react";

import AppContainer from "./App.styled";
import Tree from "./components/tree/tree.component";
import Toolbar from "./components/toolbar/toolbar.component";

function App() {
  const [numbers, setNumbers] = useState([] as Array<number>);
  const addCallback: (n: number) => void = useCallback(
    (n: number) =>
      setNumbers((prevArray) =>
        prevArray.indexOf(n) !== -1 ? prevArray : [...prevArray, n]
      ),
    []
  );
  const deleteCallback: (n: number) => void = useCallback(
    (n: number) =>
      setNumbers((prevArray) => {
        let array = [...prevArray];
        array.splice(array.indexOf(n), 1);
        return array;
      }),
    []
  );

  return (
    <AppContainer>
      <Tree data={numbers} />
      <Toolbar
        addCallback={addCallback}
        deleteCallback={deleteCallback}
        selectTreeCallback={() => {}}
      />
    </AppContainer>
  );
}

export default App;
