import Header from "../../components/header";
import { useState, useRef } from "react";
import useClickOutSide from "../../helpers/clickOutside";

export default function Home() {
	const [visible, setVisible] = useState(true);
	const el = useRef(null);
	useClickOutSide(el, () => {
		setVisible(false);
	});
	return (
		<div>
			<Header />
			{visible && <div className="card" ref={el}></div>}
		</div>
	);
}
