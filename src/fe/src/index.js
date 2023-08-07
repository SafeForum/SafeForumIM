import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import client from "./apolloClient";
import { AuthContextProvider } from "./context/authContext";
import { ApolloProvider } from "@apollo/client";
import { DashContextProvider } from "./context/dashContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <DashContextProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
    </DashContextProvider>
  </AuthContextProvider>
);
