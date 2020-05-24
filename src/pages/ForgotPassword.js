import React, {useState, useEffect} from "react";
import { Container, Button, Typography } from "@material-ui/core";
import TextInput from '../components/TextInput';
import EmailValidator from "email-validator";
import './ForgotPassword.css';
import axios from "axios";
import Loading from "./Loading";

function ForgotPassword() {
	const [email, changeEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [emailChanged, setEmailChanged] = useState(false);

	const [password, changePassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [passwordChanged, setPasswordChanged] = useState(false);
	const [confirmPassword, setConfirmedPassword] = useState("");
	const [confirmPasswordError, setConfirmedPasswordError] = useState("");

	const [resetCode, setResetCode] = useState("");
	const [resetCodeError, setResetCodeError] = useState("");
	const [resetCodeChanged, setResetCodeChanged] = useState(false);


	const [tokenSent, setTokenSent] = useState(false);
	const [tokenCorrect, setTokenCorrect] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleEmailChange = (event) => {
		setEmailChanged(true);
		changeEmail(event.target.value);
	}

	const handlePasswordChange = (event) => {
		setPasswordChanged(true);
		changePassword(event.target.value);
	}

	const handleConfirmPasswordChange = (event) => {
		setConfirmedPassword(event.target.value);
	}

	const handleResetCodeChange = (event) => {
		setResetCodeChanged(true);
		setResetCode(event.target.value);
	}

	const mailErrorText = "Email cannot be empty!";
	const resetCodeErrorText = "Enter the reset code.";
	const passwordErrorText = "Password cannot be empty!";
	const confirmPasswordErrorText = "Does not match the password!";

	const handleReset = async (event) => {
		event.preventDefault();

		setEmailChanged(true);

		let errors = false;

		if(email.length === 0) {
			setEmailError(mailErrorText);
			errors = true;
		} else if(!EmailValidator.validate(email)) {
			setEmailError("Invalid email address!");
			errors = true;
		}

		if(!errors && emailError.length === 0) {
			setLoading(true);
			let url = `https://scholastic-quiz-app.herokuapp.com/forgot?email=${email}`

			let response = null;

			try {
				await axios.post(url).then(res => response = res);
				console.log(response);
			} catch(error) {
				console.log(error);
			}
		}
		setTokenSent(true);
		setLoading(false);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		let errors = false;

		if(confirmPassword !== password) {
			errors = true;
			setConfirmedPasswordError(confirmPasswordErrorText);
		}

		if(!errors) {
			setLoading(true);
			let url = `https://scholastic-quiz-app.herokuapp.com/resetpass?
				resetKey=${resetCode}p&newPassword=${password}`;

			let response = null;
			try {
				await axios.post(url).then(res => response = res);
				console.log(response);
			} catch(error) {
				console.log(error);
			}
		}
		setLoading(false);
	}

	useEffect(() => {
		if(email.length === 0) setEmailError(mailErrorText);
		else setEmailError("");

		if(password.length === 0) setPasswordError(passwordErrorText);
		else setPasswordError("");

		if(resetCode.length === 0) setResetCodeError(resetCodeErrorText);
		else setResetCodeError("");
	}, [email, password, resetCode]);

	if(loading) return <Loading />
	else if(!tokenSent) {
		return (
				<Container className="login-page">
					<div className="login-form">
						<Typography variant="h3" color="primary" className="login-head forgot-head">Forgot Password</Typography><br />
						<form className="form">
							<TextInput
								error={emailChanged? (emailError.length === 0? false: true): false}
								helperText={emailChanged? (emailError.length === 0? null: emailError): null}
								id="email"
								label="Email"
								type="email"
								className="form-input"
								variant="outlined"
								value={email}
								onChange={handleEmailChange}></TextInput>
						</form>
						<Button className="login-btn" onClick={handleReset}>Send mail</Button>
					</div>
				</Container>
		)
	}
	else if(tokenSent) {
		return (
			<Container className="login-page">
					<div className="login-form">
						<Typography variant="h3" color="primary" className="login-head forgot-head">Forgot Password</Typography><br />
						<form className="form">
							<TextInput
								error={resetCodeChanged? (resetCodeError.length === 0? false: true): false}
								helperText={resetCodeChanged? (resetCodeError.length === 0? null: resetCodeError): null}
								id="reset-code"
								label="Reset Code"
								type="text"
								className="form-input"
								variant="outlined"
								value={resetCode}
								onChange={handleResetCodeChange}></TextInput>
							<TextInput
								error={passwordChanged? (passwordError.length === 0? false: true): false}
								helperText={passwordChanged? (passwordError.length === 0? null: passwordError): null}
								id="password"
								label="New Password"
								type="password"
								className="form-input"
								variant="outlined"
								value={password}
								onChange={handlePasswordChange}></TextInput>
							<TextInput
								error={confirmPasswordError.length === 0? false: true}
								helperText={confirmPasswordError}
								id="confirm-password"
								label="Confirm Password"
								type="password"
								className="form-input"
								variant="outlined"
								value={confirmPassword}
								onChange={handleConfirmPasswordChange}></TextInput>
						</form>
						<Button className="login-btn" onClick={handleSubmit}>Reset Password</Button>
					</div>
				</Container>
		)
	}
}

export default ForgotPassword;