import { useEffect, useReducer, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/activate";
import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import axios from "axios";

function reducer(state, action) {
	switch (action.type) {
		case "POSTS_REQUEST":
			return { ...state, loading: true, error: "" };
		case "POSTS_SUCCESS":
			return { ...state, loading: false, posts: action.payload, error: "" };
		case "POSTS_ERROR":
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
}
function App() {
	const [visible, setVisible] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	// console.log(user);
	// const get=async()=>{
	//   try{
	//     const res = await fetch('http://localhost:8000')
	//   }
	//   catch{
	//     alert("problem");
	//   }
	// }
	// get();
	const [{ loading, erorr, posts }, dispatch] = useReducer(reducer, {
		loading: false,
		posts: [],
		error: "",
	});
	useEffect(() => {
		getAllPosts();
	}, []);
	const getAllPosts = async () => {
		try {
			dispatch({
				type: "POSTS_REQUEST",
			});
			const { data } = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			dispatch({
				type: "POSTS_SUCCESS",
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: "POSTS_ERROR",
				payload: error.response.data.message,
			});
		}
	};

	console.log(posts);

	return (
		<div>
			{visible && <CreatePostPopup user={user} setVisible={setVisible} />}
			<Routes>
				<Route element={<LoggedInRoutes />}>
					<Route path="/profile" element={<Profile />} exact></Route>
					<Route
						path="/"
						element={<Home setVisible={setVisible} posts={posts} />}
						exact></Route>
					<Route path="/activate/:token" element={<Activate />} exact></Route>
				</Route>

				<Route element={<NotLoggedInRoutes />}>
					<Route path="/login" element={<Login />} exact></Route>
				</Route>
				<Route path="/reset" element={<Reset />} />
			</Routes>
		</div>
	);
}

export default App;
