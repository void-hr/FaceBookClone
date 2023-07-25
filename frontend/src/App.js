import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

const store = createStore(rootReducer, composeWithDevTools());

function App() {
	// const get=async()=>{
	//   try{
	//     const res = await fetch('http://localhost:8000')
	//   }
	//   catch{
	//     alert("problem");
	//   }
	// }

	// get();
	return (
		<div>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<Login />} exact></Route>
						<Route element={<LoggedInRoutes />}>
							<Route path="/profile" element={<Profile />} exact></Route>
							<Route path="/" element={<Home />} exact></Route>
						</Route>
						<Route element={<NotLoggedInRoutes />}>
							<Route path="/login" element={<Login />} exact></Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
