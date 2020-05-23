import React, { useState, useEffect, useContext } from 'react';
import './LoginPage.css';
import { Container, Typography, Button } from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {Link} from "react-router-dom";
import TextInput from "../components/TextInput";
import * as EmailValidator from 'email-validator';
import InfoContext from '../context/InfoContext';
import axios from "axios";


function LoginPage() {
	const [email, changeEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [emailChanged, setEmailChanged] = useState(false);
	const [password, changePassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [passwordChanged, setPasswordChanged] = useState(false);
	const [didLogin, setDidLogin] = useState(false);

	const {isLoggedIn, setLoggedIn, changeName} = useContext(InfoContext);

	const mailErrorText = "Email cannot be empty";
	const passwordErrorText = "Password cannot be empty";
	
	const handleEmailChange = (event) => {
		setEmailChanged(true);
		changeEmail(event.target.value);
	}

	const handlePasswordChange = (event) => {
		setPasswordChanged(true);
		changePassword(event.target.value);
	}

	useEffect(() => {
		if(email.length === 0) setEmailError(mailErrorText);
		else setEmailError("");

		if(password.length === 0) setPasswordError(passwordErrorText);
		else setPasswordError("");
	}, [email, password]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setEmailChanged(true);
		setPasswordChanged(true);

		let errors = false;

		if(email.length === 0) {
			setEmailError(mailErrorText);
			errors = true;
		} else if(!EmailValidator.validate(email)) {
			setEmailError("Invalid email address!");
			errors = true;
		}
		if(password.length === 0) {
			setPasswordError(passwordErrorText);
			errors = true;
		} else if(password.length < 8) {
			setPasswordError("Minimum length of password must be 8.");
			errors = true;
		}

		if(!errors && emailError.length === 0 && passwordError.length === 0) {
			let url = `https://scholastic-quiz-app.herokuapp.com/api/user/login?
						email=${email}&password=${password}`;
			
			let response = null;
			try {
				await axios.post(url).then(res => {
					response = res;
				});

				if(response.status === 200) {
					console.log(response);
					changeName(response.data.name);
					setLoggedIn(true);
					setDidLogin(true);
				}
			} catch(error) {
				console.log(error);
			}
		}
	}

	return (
		<Container className="login-page">
			<div className="login-form">
				<Typography variant="h3" color="primary" className="login-head">Login Now!</Typography><br />
				{didLogin === true? <Alert severity="success" color="warning">Succesfully Logged In!</Alert>: null}
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
					<br />
					<TextInput
						error={passwordChanged? (passwordError.length === 0? false: true): false}
						helperText={passwordChanged? (passwordError.length === 0? null: passwordError): null}
						id="password"
						type="password"
						label="Password"
						className="form-input"
						variant="outlined"
						value={password}
						onChange={handlePasswordChange}></TextInput>
				</form>
				<Button className="login-btn" onClick={handleSubmit}>Login</Button>
				<Link to="/register" className="link register-link">Don't have an account? Join the rebellion now!</Link>
			</div>
		</Container>
	)
}

export default LoginPage;