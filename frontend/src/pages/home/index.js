import Header from "../../components/header";
// import { useState, useRef } from "react";
// import useClickOutSide from "../../helpers/clickOutside";
import LeftHome from "../../components/home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import SendVerification from "../../components/sendVerification";

export default function Home({ setVisible, posts }) {
	// const [visible, setVisible] = useState(true);
	// const el = useRef(null);
	// useClickOutSide(el, () => {
	// 	setVisible(false);
	// });
	const { user } = useSelector((user) => ({ ...user }));
	// console.log(user.token);
	return (
		<div className="home">
			<Header />
			<LeftHome user={user} />
			<div className="home_middle">
				<Stories />
				<SendVerification user={user} />
				<CreatePost user={user} setVisible={setVisible} />
				{posts.map((post) => (
					<div className="post" key={post._id}>
						{post._id}
					</div>
				))}
			</div>
			{/* {visible && <div className="card" ref={el}></div>} */}
			<RightHome user={user} />
		</div>
	);
}
