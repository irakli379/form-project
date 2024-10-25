import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { UsersProvider, queryClient } from "./contexts/UsersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UsersProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UsersProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
