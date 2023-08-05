import { Formik, Form } from "formik";
import { Link, Navigate } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ChangePassword({
	password,
	email,
	setPassword,
	conf_password,
	setConf_password,
	error,
	setLoading,
	setVisible,
	setError,
}) {

	const navigate = useNavigate();
	const handelChangePassword = async() => {
		try{
			setLoading(true);
			await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {email, password});
			setError("");
			navigate("/");
		}catch(error){
			setError(error.data.message);
			setLoading(false);
		}
	}
	const validatePassword = Yup.object({
		password: Yup.string()
			.required(
				"Enter a combination of at least six numbers, letters and punctuation marks(such as ! and &)"
			)
			.min(6, "Password must be atleast 6 characters")
			.max(36, "Password can't be more than 36 characters"),

		conf_password: Yup.string()
			.required("Confirm your password")
			.oneOf([Yup.ref("password")], "Password must match."),
	});
	return (
		<div className="reset_form" style={{ height: "320px" }}>
			<div className="reset_form_header">Change Password</div>
			<div className="reset_form_text">Pick a strong password</div>
			<Formik
				enableReinitialize
				initialValues={{
					password,
					conf_password,
				}}
				onSubmit={()=>handelChangePassword()}
				validationSchema={validatePassword}>
				{(formik) => (
					<Form>
						<LoginInput
							type="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							placeholder="New Password"
						/>
						<LoginInput
							type="password"
							name="conf_password"
							onChange={(e) => setConf_password(e.target.value)}
							placeholder="Confirm New Password"
							bottom
						/>
						{error && <div className="error_text">{error}</div>}
						<div className="reset_form_btns">
							<Link to="/login" className="gray_btn">
								Cancel
							</Link>
							<button type="submit" className="blue_btn">
								Continue
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
