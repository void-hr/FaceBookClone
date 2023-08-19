import { Link } from "react-router-dom";
import "./style.css";
import Moment from "react-moment";
import { Dots, Public } from "../../svg";
export default function Posts({ post }) {
	console.log(post.user.picture);
	return (
		<div className="post" key={post._id}>
			<div className="post_header">
				{/* Check video 91 3:30 duration   */}
				{/* inside database (post )user have type objectID we can further populate to get further details inside user object */}
				{/* mongoDB  */}
				<Link
					to={`/profile/${post.user.username}`}
					className="post_header_left">
					<img src={post.user.picture} alt="" />
					<div className="header_col">
						<div className="post_profile_name">
							{post.user.first_name} {post.user.last_name}
							<div className="updated_p">
								{post.type == "ProfilePicture" &&
									`updated ${
										post.user.gender === "male" ? "his" : "her"
									} profile picture`}

								{post.type == "cover" &&
									`updated ${
										post.user.gender === "male" ? "his" : "her"
									} cover picture`}
							</div>
						</div>
						<div className="post_profile_privacy_date">
							<Moment fromNow interval={30}>
								{post.createdAt}
							</Moment>
							<Public color="#828387" />
						</div>
					</div>
				</Link>
				<div className="post_header_right hover1">
					<Dots color="#828387" />
				</div>
			</div>
			{post.background ? (
				<div
					className="post_bg"
					style={{ backgroundImage: `url(${post.background})` }}>
					<div className="post_bg_text">{post.text}</div>
				</div>
			) : (
				<>
					<div className="posttext">{post.text}</div>
					{post.images && post.images.length && (
						<div
							className={
								post.images.length === 1
									? "grid_1"
									: post.images.length === 2
									? "grid_2"
									: post.images.length === 3
									? "grid_3"
									: post.images.length === 4
									? "grid_4"
									: post.images.length >= 5 && "grid_5"
							}>
							{post.images.slice(0, 5).map((image, i) => (
								<img src={image.url} key={i} alt="" className={`img-${i}`} />
							))}
							{post.images.length > 5 && (
								<div className="more_pics_shadow">+{post.image.length - 5}</div>
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
}
