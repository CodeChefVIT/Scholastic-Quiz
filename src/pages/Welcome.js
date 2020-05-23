import React, { useState } from 'react';
import {Container, Grid, Hidden, Button} from '@material-ui/core';
import './Welcome.css';
import PlayMenuBar from '../components/PlayMenuBar';

function Welcome() {
	return (
		<Container className="welcome-page">
			<div className="welcome-screen">
				<Grid container spacing={0}>
					<Grid item xs={12} md={6} className="heading-section">
						<img src="quiz-head.png" className="quiz-image" alt=""></img>
					</Grid>
					<Hidden smDown>
						<Grid item xs={12} md={6} className="pin-section">
							<img src="hg-pin.png" className="pin-image" alt=""></img>
						</Grid>
					</Hidden>
				</Grid>
				<PlayMenuBar />

			</div>
		</Container>
	)
}

export default Welcome;