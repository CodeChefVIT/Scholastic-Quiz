import React, { useState } from 'react';
import './LoginPage.css';
import { Container, Typography, Button } from "@material-ui/core";
import {Link} from "react-router-dom";
import TextInput from "../components/TextInput";


function LoginPage() {
	const [, changeEmail] = useState("");

	const handleEmailChange = (event) => {
		changeEmail(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
	}

	return (
		<Container className="login-page">
			<div className="login-form">
				<Typography variant="h3" color="primary" className="login-head">Login Now!</Typography><br />
				<form className="form">
					<TextInput
						id="email"
						label="Email"
						type="email"
						className="form-input"
						variant="outlined"
						onChange={handleEmailChange}></TextInput>
					<br />
					<TextInput
						id="password"
						type="password"
						label="Password"
						className="form-input"
						variant="outlined"></TextInput>
				</form>
				<Button className="login-btn" onClick={handleSubmit}>Login</Button>
				<Link to="/register" className="link register-link">Don't have an account? Join the rebellion now!</Link>
			</div>
		</Container>
	)
}

export default LoginPage;