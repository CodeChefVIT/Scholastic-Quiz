import React, { useState } from 'react';
import {Container, Grid, Hidden, Button} from '@material-ui/core';
import './Welcome.css';
import PlayMenuBar from '../components/PlayMenuBar';

function Welcome() {
	const [isLoggedIn, setLoggedIn] = useState(false);

	return (
		<Container>
			<div className="welcome-screen">
				<Grid container spacing={3}>
					<Grid item xs={12} md={6} className="heading-section">
						<img src="quiz-head.png" className="quiz-image"></img>
					</Grid>
					<Hidden smDown>
						<Grid item xs={12} md={6} className="pin-section">
							<img src="hg-pin.png" className="pin-image"></img>
						</Grid>
					</Hidden>
				</Grid>
				<PlayMenuBar />
				
			</div>
		</Container>
	)
}

export default Welcome;