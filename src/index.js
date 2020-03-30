import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyles from "./style/GlobalStyles";
import ContextProvider from "./store/ContextProvider";
ReactDOM.render(
   <ContextProvider>
      {/* <React.StrictMode> */}
      <GlobalStyles />
      <App />
      {/* </React.StrictMode> */}
   </ContextProvider>,
   document.getElementById("root")
);
