import Header from "../../components/header";
import { useState, useRef } from "react";
import useClickOutSide from "../../helpers/clickOutside";
import LeftHome from "../../components/home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";

export default function Home() {
	// const [visible, setVisible] = useState(true);
	// const el = useRef(null);
	// useClickOutSide(el, () => {
	// 	setVisible(false);
	// });
	const { user } = useSelector((user) => ({ ...user }));
	return (
		<div className="home">
			<Header />
			<LeftHome user={user} />
			<div className="home_middle">
				<Stories />
				<CreatePost user={user} />
			</div>
			{/* {visible && <div className="card" ref={el}></div>} */}
			<RightHome user={user} />
		</div>
	);
}
