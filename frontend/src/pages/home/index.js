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
import Posts from "../../components/posts";
import { useEffect, useRef, useState } from "react";

export default function Home({ setVisible, posts }) {
	// const [visible, setVisible] = useState(true);
	// const el = useRef(null);
	// useClickOutSide(el, () => {
	// 	setVisible(false);
	// });
	const { user } = useSelector((user) => ({ ...user }));
	const middle = useRef(null);
	const [height, setHeight] = useState();
	useEffect(() => {
		setHeight(middle.current.clientHeight);
	}, []);

	console.log(height);
	return (
		<div className="home" style={{ height: `${height + 150}px` }}>
			<Header page="home" />
			<LeftHome user={user} />
			<div className="home_middle" ref={middle}>
				<Stories />
				<SendVerification user={user} />
				<CreatePost user={user} setVisible={setVisible} />
				{posts.map((post) => (
					<Posts key={post._id} post={post} user={user} />
				))}
			</div>
			{/* {visible && <div className="card" ref={el}></div>} */}
			<RightHome user={user} />
		</div>
	);
}
