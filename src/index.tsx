import "animate.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./App.css";
import "./index.css";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import ReactGA from "react-ga4";

const TRACKING_ID = "G-KNRG61Q4SZ"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <RouterProvider router={App} />
        <ToastContainer />
      </Provider>
    </React.Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
