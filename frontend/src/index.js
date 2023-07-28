import React from "react";
import "./index.css";
import "./styles/icons/icons.css";
import App from "./App";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
const store = createStore(rootReducer, composeWithDevTools());
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
