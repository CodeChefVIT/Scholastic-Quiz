import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { Container, TextField, withStyles, Typography, Button } from "@material-ui/core";
import {Link} from "react-router-dom";
import TextInput from "../components/TextInput";
import * as EmailValidator from 'email-validator';


function LoginPage() {
	const [email, changeEmail] = useState(" ");
	const [emailError, setEmailError] = useState("");
	const [password, changePassword] = useState(" ");
	const [passwordError, setPasswordError] = useState("");

	const mailErrorText = "Email cannot be empty";
	const passwordErrorText = "Password cannot be empty";
	
	const handleEmailChange = (event) => {
		changeEmail(event.target.value);
	}

	const handlePasswordChange = (event) => {
		changePassword(event.target.value);
	}

	useEffect(() => {
		if(email.length === 0) setEmailError(mailErrorText);
		else setEmailError("");

		if(password.length === 0) setPasswordError(passwordErrorText);
		else setPasswordError("");
	}, [email, password]);

	const handleSubmit = (event) => {
		event.preventDefault();
		let errors = false;

		if(email === " ") {
			setEmailError(mailErrorText);
			errors = true;
		} else if(!EmailValidator.validate(email)) {
			setEmailError("Invalid email address!");
			errors = true;
		}
		if(password === " ") {
			setPasswordError(passwordErrorText);
			errors = true;
		}

		if(!errors && emailError.length === 0 && passwordError.length === 0) {
			alert("Logging in!");
		}
	}

	return (
		<Container className="login-page">
			<div className="login-form">
				<Typography variant="h3" color="primary" className="login-head">Login Now!</Typography><br />
				<form className="form">
					<TextInput
						error={emailError.length === 0? false: true}
						helperText={emailError}
						id="email"
						label="Email"
						type="email"
						className="form-input"
						variant="outlined"
						onChange={handleEmailChange}></TextInput>
					<br />
					<TextInput
						error={passwordError.length===0? false: true}
						helperText={passwordError}
						id="password"
						type="password"
						label="Password"
						className="form-input"
						variant="outlined"
						onChange={handlePasswordChange}></TextInput>
				</form>
				<Button className="login-btn" onClick={handleSubmit}>Login</Button>
				<Link to="/register" className="link register-link">Don't have an account? Join the rebellion now!</Link>
			</div>
		</Container>
	)
}

export default LoginPage;