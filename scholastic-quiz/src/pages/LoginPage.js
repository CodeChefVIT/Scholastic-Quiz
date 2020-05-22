import React from 'react';
import './LoginPage.css';
import { Container, TextField, withStyles, withTheme } from "@material-ui/core";

const Text = withStyles({
	root: {
		'& label': {
			color: 'white',
		},
		'& label.Mui-focused': {
			color: 'orange',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'orange',
		},
		'& .MuiInputBase-input': {
			color: 'white',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
			  borderColor: 'rgba(255,255,255, 0.3)',
			  color: 'white',
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
	return (
		<Container className="login-page">
			<div className="login-form">
				<form className="form">
					<Text
						id="email"
						label="Email"
						type="email"
						className="form-input"
						variant="outlined"></Text>
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