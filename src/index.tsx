import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { OrderProvider } from "./hooks/contextOrder";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <OrderProvider>
      {/* <BrowserRouter basename="front_end_delivery"> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </OrderProvider>
  </React.StrictMode>
);
