import { useRef, useState } from "react";
import "./style.css";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";

export default function CreatePostPopup({ user }) {
	const [showPrev, setShowPrev] = useState(true);
	const [text, setText] = useState();
	const [picker, setPicker] = useState(false);
	const [cursorPosition, setCursorPosition] = useState();
	const [images, setImages] = useState([]);
	console.log("images", images);
	const textRef = useRef(null);
	return (
		<div className="blur">
			<div className="postBox">
				<div className="box_header">
					<div className="small_circle">
						<i className="exit_icon"></i>
					</div>
					<span>Create Post</span>
				</div>
				<div className="box_profile">
					<img src={user?.picture} alt="" className="box_profile_img" />
					<div className="box_col">
						<div className="box_profile_name">
							{user?.first_name} {user?.last_name}
						</div>
						<div className="box_privacy">
							<img src="../../icons/public.png" alt="" />
							<span>Public</span>
							<i className="arrowDown_icon"></i>
						</div>
					</div>
				</div>
				{/* <div className="flex_center">
                <textarea 
                 maxLength="100"
                 className="post_input"
                 placeholder={`What's on you mind, ${user?.first_name}`}
                 onChange = {(e)=> setText(e.target.value)}
                 value={text}
                 ref={textRef}
                >
                </textarea>
                
            </div> */}
				{!showPrev ? (
					<>
						<EmojiPickerBackground
							text={text}
							user={user}
							setText={setText}
							showPrev={showPrev}
							images={images}
							setImages={setImages}
						/>
					</>
				) : (
					<ImagePreview setImages={setImages} images={images} />
				)}

				<AddToYourPost />
				<button className="post_submit">Post</button>
			</div>
		</div>
	);
}
