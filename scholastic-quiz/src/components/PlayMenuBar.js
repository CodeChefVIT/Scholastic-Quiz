import React, {useState} from "react";
import {Grid, Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import './PlayMenuBar.css';

function PlayMenuBar() {
	const [isLoggedIn, setLoggedIn] = useState(true);

	if(!isLoggedIn) {
		return (
			<Grid container spacing={0}>
				<Grid item xs={12} md={6} className="not-logged-menu">
					<Typography variant="h4" className="login-msg">You are not logged in!</Typography>
					<Typography variant="h6" className="login-msg">Login/Signup to continue!</Typography>
					<div className="button-bar">
						<Link to="/login" className="link">
							<Button size="large" className="action-button login-button">Login</Button>
						</Link>
						<Link to="/register" className="link">
							<Button size="large" className="action-button signup-button">SignUp</Button>
						</Link>
					</div>
				</Grid>
			</Grid>
		);
	} else if(isLoggedIn) {
		return (
			<Grid container spacing={0}>
				<Grid item xs={12} md={6}>
					<div className="play-menu">
						<Link to="/quiz" className="link">
							<Button size="large" className="quiz-button"><p class="button-text">Start Quiz</p></Button>
						</Link>
						<Typography variant="h6" className="onetime-warning">NOTE: You can only take the quiz ones!</Typography>
					</div>
				</Grid>
			</Grid>
		);
	}
}

export default PlayMenuBar;