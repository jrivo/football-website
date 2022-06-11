import React from "react";
import { Root, Routes, addPrefetchExcludes } from "react-static";
import { Router } from "components/Router";
import Dynamic from "containers/Dynamic";
// import Lists from "./containers/Lists";
// import List from "./containers/List";
import CurrentMatch from "./containers/CurrentMatch";
import LastMatches from "./containers/LastMatches";
import NextMatch from "./containers/NextMatch";

import "./tailwind.min.css";

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
  return (
    <Root>
      <React.Suspense fallback={<em>Loading...</em>}>
        <Router>
          <Dynamic path="dynamic" />
          <NextMatch path="nextMatch/:teamId" />
          <CurrentMatch path="currentMatch/:matchId"/>
          <LastMatches path="lastMatches/:teamId"/>
          <Routes path="*" />
        </Router>
      </React.Suspense>
    </Root>
  );
}

export default App;
