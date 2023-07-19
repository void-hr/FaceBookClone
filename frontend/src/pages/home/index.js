import Header from "../../components/header";
import { useState, useRef } from "react";
import useClickOutSide from "../../helpers/clickOutside";
import LeftHome from "../../components/home/left";
import { useSelector } from "react-redux";

export default function Home() {
	// const [visible, setVisible] = useState(true);
	// const el = useRef(null);
	// useClickOutSide(el, () => {
	// 	setVisible(false);
	// });
	const {user} = useSelector((user)=>({...user})); 
	return (
		<div>
			<Header />
			<LeftHome user={user}/>
			{/* {visible && <div className="card" ref={el}></div>} */}
		</div>
	);
}
