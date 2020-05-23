import React, { useState } from 'react';
import './RegisterPage.css';
import { Container, TextField, withStyles, Typography, Button } from "@material-ui/core";
import TextInput from "../components/TextInput";


function RegisterPage() {
	const [name, changeName] = useState("");
	const [email, changeEmail] = useState("");

	const handleNameChange = (event) => {
		changeName(event.target.value);
	}

	const handleEmailChange = (event) => {
		changeEmail(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
	}

	return (
		<Container className="login-page">
			<div className="login-form">
				<img src="hg-pin.png" className="signup-img"></img>
				<Typography variant="h3" color="primary" className="login-head signup-text">Join the force!</Typography><br />
				<form className="form">
				<TextInput
						id="name"
						label="Name"
						type="text"
						className="form-input"
						variant="outlined"
						onChange={handleNameChange}></TextInput>
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
				<Button className="login-btn" onClick={handleSubmit}>Sign Up</Button>
			</div>
		</Container>
	)
}

export default RegisterPage;