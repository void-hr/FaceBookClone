import { useState, useEffect, useRef } from "react";
import "./style.css";
import React from "react";
import Picker from "emoji-picker-react";
export default function EmojiPickerBackground({ text, user, setText, type2 }) {
	const [picker, setPicker] = useState(false);
	const [cursorPosition, setCursorPosition] = useState(0);
	const textRef = useRef(null);

	useEffect(() => {
		textRef.selectionEnd = cursorPosition;
	}, [cursorPosition]);

	const handleEmoji = (e) => {
		const ref = textRef;
		ref.current.focus();
		const start = text.substring(0, ref.selectionStart);
		const end = text.substring(ref.selectionStart);
		const newText = start + e.emoji + end;
		setText(newText);
		setCursorPosition(start.length + e.emoji.length);
	};
	return (
		<div className={type2 ? "images_input" : ""}>
			<div className={!type2 ? "flex_center" : ""}>
				<textarea
					maxLength="100"
					className={`post_input ${type2 ? "input2" : ""}`}
					placeholder={`What's on you mind, ${user?.first_name}`}
					onChange={(e) => setText(e.target.value)}
					value={text}
					ref={textRef}></textarea>
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
				{!type2 && <img src="../../../icons/colorful.png" alt="" />}
				<i
					className={`emoji_icon_large ${type2 && "moveleft"}`}
					onClick={() => {
						setPicker((prev) => !prev);
					}}></i>
			</div>
		</div>
	);
}
