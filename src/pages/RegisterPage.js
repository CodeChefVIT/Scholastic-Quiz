import React, { useState, useEffect } from 'react';
import './RegisterPage.css';
import { Container, Typography, Button } from "@material-ui/core";
import TextInput from "../components/TextInput";
import * as EmailValidator from "email-validator";


function RegisterPage() {
	const [name, changeName] = useState(" ");
	const [nameError, setNameError] = useState("");
	const [email, changeEmail] = useState(" ");
	const [emailError, setEmailError] = useState("");
	const [password, changePassword] = useState(" ");
	const [passwordError, setPasswordError] = useState("");

	const emptyText = (type) =>  `${type} cannot be empty`;

	const handleNameChange = (event) => {
		changeName(event.target.value);
	}

	const handleEmailChange = (event) => {
		changeEmail(event.target.value);
	}

	const handlePasswordChange = (event) => {
		changePassword(event.target.value);
	}

	useEffect(() => {
		if(name.length === 0) setNameError(emptyText("Name"));
		else setNameError("");

		if(email.length === 0) setEmailError(emptyText("Email"));
		else setEmailError("");

		if(password.length === 0) setPasswordError(emptyText("Password"));
		else setPasswordError("");

	}, [name, email, password]);

	const handleSubmit = (event) => {
		event.preventDefault();
		let errors = false;

		if(name === " ") {
			setEmailError(emptyText("Name"));
			errors = true;
		}

		if(email === " ") {
			setEmailError(emptyText("Email"));
			errors = true;
		} else if(!EmailValidator.validate(email)) {
			setEmailError("Invalid email address!");
			errors = true;
		}
		if(password === " ") {
			setPasswordError(emptyText("Password"));
			errors = true;
		}

		if(!errors && emailError.length === 0 && passwordError.length === 0) {
			alert("Signing up!");
		}
	}

	return (
		<Container className="login-page">
			<div className="login-form">
				<img src="hg-pin.png" className="signup-img" alt="Mokingjay Pin"></img>
				<Typography variant="h3" color="primary" className="login-head signup-text">Join the force!</Typography><br />
				<form className="form">
					<TextInput
						error={nameError.length === 0? false: true}
						helperText={nameError}
						id="name"
						label="Name"
						type="text"
						className="form-input"
						variant="outlined"
						onChange={handleNameChange}></TextInput>
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
						error={passwordError.length === 0? false: true}
						helperText={passwordError}
						id="password"
						type="password"
						label="Password"
						className="form-input"
						variant="outlined"
						onChange={handlePasswordChange}></TextInput>
				</form>
				<Button className="login-btn" onClick={handleSubmit}>Sign Up</Button>
			</div>
		</Container>
	)
}

export default RegisterPage;