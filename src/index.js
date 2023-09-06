import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { JawadAuthControllerProvider } from "./context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new QueryClient();
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <JawadAuthControllerProvider>
          <App />
        </JawadAuthControllerProvider>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
