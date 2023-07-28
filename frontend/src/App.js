import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/activate";

function App() {
	const { user } = useSelector((state) => ({ ...state }));
	console.log(user)
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
			<Routes>
				<Route element={<LoggedInRoutes />}>
					<Route path="/profile" element={<Profile />} exact></Route>
					<Route path="/" element={<Home />} exact></Route>
					<Route path="/activate/:token" element={<Activate />} exact></Route>

				</Route>

				<Route element={<NotLoggedInRoutes />}>
					<Route path="/login" element={<Login />} exact></Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
