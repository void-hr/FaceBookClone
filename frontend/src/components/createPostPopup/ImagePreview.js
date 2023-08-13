import { useRef } from "react";
import EmojiPickerBackground from "./EmojiPickerBackground"

export default function ImagePreview({ text, user, setText, images, setImages }) {
  const imageInputRef = useRef(null);
  const handleImages = () => {

  };
  return (
    <div className="overflow_a">
      {/* <h1>img prev</h1> */}
      <EmojiPickerBackground text={text} user={user} setText={setText} type2/>
      <div className="add_pics_wrap">
        <input type="file" multiple hidden ref={imageInputRef} onChange={handleImages}/>
      {
        images && images.length ? "":
        <div className="add_pics_inside1">
          <div className="small_white_circle">
            <i className="exit_icon"></i>
          </div>
          <div className="add_col">
            <div className="add_circle">
              <i className="addPhoto_icon"></i>
            </div>
            <span>Add Photos/Videos</span>
            <span>or drag and drop</span>
          </div>
        </div>
      }
      </div>
    </div>
  )
}