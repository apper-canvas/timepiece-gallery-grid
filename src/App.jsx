import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { store } from "@/store";
import "@/index.css";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;