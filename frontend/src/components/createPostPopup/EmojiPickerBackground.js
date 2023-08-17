import { useState, useEffect, useRef } from "react";
import "./style.css";

import Picker from "emoji-picker-react";
export default function EmojiPickerBackground({
	text,
	user,
	setText,
	type2,
	background,
	setBackground,
}) {
	const [picker, setPicker] = useState(false);
	const [showBackground, setShowBackground] = useState(false);

	const [cursorPosition, setCursorPosition] = useState(0);
	const textRef = useRef(null);
	const bgRef = useRef(null);

	useEffect(() => {
		textRef.current.selectionStart = cursorPosition;
	}, [cursorPosition]);

	const handleEmoji = (e) => {
		const ref = textRef.current;
		ref.focus();

		const start = text.substring(0, ref.selectionStart);
		const end = text.substring(ref.selectionStart);
		const newText = start + e.emoji + end;

		setCursorPosition(start.length + e.emoji.length);
		setText(newText);
	};

	const postBackgrounds = [
		"../../../images/postBackgrounds/1.jpg",
		"../../../images/postBackgrounds/2.jpg",
		"../../../images/postBackgrounds/3.jpg",
		"../../../images/postBackgrounds/4.jpg",
		"../../../images/postBackgrounds/5.jpg",
		"../../../images/postBackgrounds/6.jpg",
		"../../../images/postBackgrounds/7.jpg",
		"../../../images/postBackgrounds/8.jpg",
		"../../../images/postBackgrounds/9.jpg",
	];

	const backgroundHandler = (i) => {
		bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
		setBackground(postBackgrounds[i]);
		bgRef.current.classList.add("bgHandler");
	};
	const removeBackground = (i) => {
		bgRef.current.style.backgroundImage = "";
		setBackground("");
		bgRef.current.classList.remove("bgHandler");
	};
	return (
		<div className={type2 ? "images_input" : ""}>
			<div className={!type2 ? "flex_center" : ""} ref={bgRef}>
				<textarea
					maxLength="250"
					className={`post_input ${type2 ? "input2" : ""}`}
					placeholder={`What's on you mind, ${user?.first_name}`}
					onChange={(e) => setText(e.target.value)}
					value={text}
					ref={textRef}
					style={{
						paddingTop: `${
							background
								? Math.abs(textRef.current.value.length * 0.1 - 30)
								: "0"
						}%`,
					}}></textarea>
			</div>
			{/* changed a && b => a ? b : c since className was having false as a value */}
			<div className={!type2 ? "post_emojis_wrap" : ""}>
				{picker && (
					<div
						className={`comment_emoji_picker ${
							type2 ? "movepicker2" : "rlmove"
						}rlmove`}>
						<Picker onEmojiClick={handleEmoji} />
					</div>
				)}
				{!type2 && (
					<img
						src="../../../icons/colorful.png"
						alt=""
						onClick={() => {
							setShowBackground((prev) => !prev);
						}}
					/>
				)}
				{!type2 && showBackground && (
					<div className="post_backgrounds">
						<div
							className="no_bg"
							onClick={() => {
								removeBackground();
							}}></div>
						{postBackgrounds.map((bg, i) => (
							<img
								src={bg}
								key={i}
								alt=""
								onClick={() => {
									backgroundHandler(i);
								}}
							/>
						))}
					</div>
				)}
				<i
					className={`emoji_icon_large ${type2 && "moveleft"}`}
					onClick={() => {
						setPicker((prev) => !prev);
					}}></i>
			</div>
		</div>
	);
}
