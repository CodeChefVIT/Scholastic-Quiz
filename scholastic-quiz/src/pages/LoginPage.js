import React, { useState } from 'react';
import './LoginPage.css';
import { Container, TextField, withStyles, Typography, Button } from "@material-ui/core";

const Text = withStyles({
	root: {
		'& label': {
			color: 'rgba(0,0,0, 0.7)',
		},
		'& label.Mui-focused': {
			color: 'orange',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'orange',
		},
		'& .MuiInputBase-input': {
			color: 'black',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
			  borderColor: 'rgba(0,0,0, 0.3)',
			  color: 'black',
			},
			'&:hover fieldset': {
			  borderColor: 'orange',
			},
			'&.Mui-focused fieldset': {
			  borderColor: 'orange',
			},
		  },
	}
})(TextField);

function LoginPage() {
	const [email, changeEmail] = useState("");

	const handleEmailChange = (event) => {
		changeEmail(event.target.value);
	}

	return (
		<Container className="login-page">
			<div className="login-form">
				<Typography variant="h3" color="primary" className="login-head">Login Now!</Typography><br />
				<form className="form">
					<Text
						id="email"
						label="Email"
						type="email"
						className="form-input"
						variant="outlined"
						onChange={handleEmailChange}></Text>
					<br />
					<Text
						id="password"
						type="password"
						label="Password"
						className="form-input"
						variant="outlined"></Text>
				</form>
			</div>
		</Container>
	)
}

export default LoginPage;