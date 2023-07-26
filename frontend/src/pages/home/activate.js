import Header from "../../components/header";
import { useState, useRef } from "react";
import useClickOutSide from "../../helpers/clickOutside";
import LeftHome from "../../components/home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import ActivateForm from "./ActivateForm";

export default function Activate() {
	// const [visible, setVisible] = useState(true);
	// const el = useRef(null);
	// useClickOutSide(el, () => {
	// 	setVisible(false);
	// });
	const { user } = useSelector((user) => ({ ...user }));
    const [success, setSuccess] = useState("df");
    const [error, setError] = useState("");
    const [loading, setLooading] = useState(true);
	return (

		<div className="home">
            {
                success && (
                    <ActivateForm
                    type="success"
                    header="Account verification succeded"
                    text={success}
                    loading={loading}
                />
                )
            }
            {
                error && (<ActivateForm
                    type="error"
                    header="Account verification failed"
                    text={error}
                    loading={loading}
                />)
            }
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
