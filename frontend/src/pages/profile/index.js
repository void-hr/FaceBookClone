import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducer";
import axios from "axios";
import Header from "../../components/header";
import "./style.css";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PplYouMayKnow from "./PplYouMayKnow";
import CreatePost from "../../components/createPost";
import GridPosts from "./GridPosts";
import Post from "../../components/posts";
import Photos from "./Photos";
import Friends from "./Friends";
export default function Profile({ setVisible }) {
	const { username } = useParams();
	const { user } = useSelector((state) => ({ ...state }));

	var userName = username === undefined ? user.username : username;
	const navigate = useNavigate();

	const [{ loading, erorr, profile }, dispatch] = useReducer(profileReducer, {
		loading: false,
		profile: {},
		error: "",
	});

	useEffect(() => {
		getProfile();
	}, [userName]);

	var visitor = userName === user.username ? false : true;

	const getProfile = async () => {
		try {
			dispatch({
				type: "PROFILE_REQUEST",
			});
			const { data } = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			if (data.ok === false) {
				navigate("/profile");
			} else {
				dispatch({
					type: "PROFILE_SUCCESS",
					payload: data,
				});
			}
		} catch (error) {
			dispatch({
				type: "PROFILE_ERROR",
				payload: error.response.data.message,
			});
		}
	};
	console.log(profile);
	return (
		<div className="profile">
			<Header page="profile" />
			<div className="profile_top">
				<div className="profile_container">
					<Cover cover={profile.cover} visitor={visitor} />
					<ProfilePictureInfos profile={profile} visitor={visitor} />
					<ProfileMenu />
				</div>
			</div>
			<div className="profile_bottom">
				<div className="profile_container">
					<div className="bottom_container">
						<PplYouMayKnow />
						<div className="profile_grid">
							<div className="profile_left">
								<Photos username={userName} token={user.token} />
								<Friends friends={profile.friends} />
								<div className="relative_fb_copyright">
									<Link to="/">Privacy</Link>
									<span>. </span>
									<Link to="/">Terms</Link>
									<span>. </span>
									<Link to="/">Advertising</Link>
									<span>. </span>
									<Link to="/">
										Ad Choices <i className="ad_choices_icon"></i>
									</Link>
									<span>. </span>
									<Link to="/"></Link>Cookies<span>. </span>
									<Link to="/"></Link>More<span>. </span>
									<br />
									<Link to="/"></Link>More<span>. </span>
									<br />© Meta 2023
								</div>
							</div>
							<div className="profile_right">
								{!visitor && (
									<CreatePost
										user={user}
										profile={profile}
										setVisible={setVisible}
									/>
								)}

								<GridPosts />
								<div className="posts">
									{/* his way was profile.posts && pprofile.posts.length && profile.posts.map and so on */}
									{profile.posts && profile.posts.length ? (
										profile.posts.map((post) => (
											<Post
												post={post}
												user={user}
												key={post._id}
												profile={profile}
											/>
										))
									) : (
										<div className="no_posts">No post available</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
