export default function Story({ story }) {
	return (
		<div className="story">
			<img src={story.image} alt="" className="story_img" />
			<div className="story_profile_pic">
				<img src={story.profile_picture} alt="" className="" />
			</div>
			<div className="story_profile_name">{story.proifle.name}</div>
		</div>
	);
}
