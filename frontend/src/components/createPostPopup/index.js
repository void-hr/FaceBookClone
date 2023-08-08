import { useState, useEffect, useRef } from "react";
import Picker from "emoji-picker-react";
import "./style.css";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";

export default function CreatePostPopup({ user }) {
    const [text, setText] = useState("");
    const [showPrev, setShowPrev] = useState(false);
    const [picker, setPicker] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);
    const textRef = useRef(null);
    useEffect(()=>{
        textRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    const handleEmoji = (e) => {
        const ref = textRef.current;
        ref.focus();
        const start = text.substring(0, ref.selectionStart);
        const end = text.substring(ref.selectionStart);
        const newText = start + e.emoji + end;
        setText(newText);
        setCursorPosition(start.length + e.emoji.length);
    }
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
                <img src={user?.picture} alt="" className="box_profile_img"/>
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
            <div className="flex_center">
                <textarea 
                 maxLength="100"
                 className="post_input"
                 placeholder={`What's on you mind, ${user?.first_name}`}
                 onChange = {(e)=> setText(e.target.value)}
                 value={text}
                 ref={textRef}
                >
                </textarea>
                
            </div>
            {showPrev && 
                <div className="flex_center">
                    <textarea 
                    maxLength="100"
                    className="post_input"
                    placeholder={`What's on you mind, ${user?.first_name}`}
                    onChange = {(e)=> setText(e.target.value)}
                    value={text}
                    >
                    </textarea>

                </div>
            }
            <EmojiPickerBackground 
                picker={picker} 
                handleEmoji={handleEmoji}
                setPicker={setPicker}
            />

            <AddToYourPost/>
            <button className="post_submit">Post</button>

        </div>
    </div>
  )
}