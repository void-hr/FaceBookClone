import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
export default function ChangePassword({
	password,
	setPassword,
	conf_password,
	setConf_password,
	error,
}) {
	return (
		<div className="reset_form" style={{ height: "320px" }}>
			<div className="reset_form_header">Change Password</div>
			<div className="reset_form_text">Pick a strong password</div>
			<Formik
				enableReinitialize
				initialValues={{
					password,
					conf_password,
				}}>
				{(formik) => (
					<Form>
						<LoginInput
							type="text"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							placeholder="New Password"
						/>
						<LoginInput
							type="text"
							name="conf_password"
							onChange={(e) => setConf_password(e.target.value)}
							placeholder="Confirm New Password"
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
