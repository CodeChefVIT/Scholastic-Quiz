import React, {useContext, useState} from "react";
import {Grid, Button, Typography, Dialog, DialogTitle} from "@material-ui/core";
import {Link} from "react-router-dom";
import './PlayMenuBar.css';
import InfoContext from '../context/InfoContext';

function PlayMenuBar() {
	const {isLoggedIn, isAdmin} = useContext(InfoContext);

	const[modalOpen, setModalOpen] = useState(false);

	const onCloseHandle = () => {
		setModalOpen(false);
	}

	const handleClick = () => {
		setModalOpen(true);
	}

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
			<div>
				<Grid container spacing={0}>
					<Grid item xs={12} md={6}>
						<div className="play-menu">
							{isAdmin? <Link to="/admin" className="link">
								<Button size="small" className="admin-btn">Admin Panel</Button>
							</Link>: null}<br />
							<Button size="large" className="quiz-button" onClick={handleClick}><p className="button-text">Start Quiz</p></Button>
							<Typography variant="h6" className="onetime-warning">NOTE: You can only take the quiz once!</Typography>
						</div>
					</Grid>
				</Grid>
				<Dialog open={modalOpen} onClose={onCloseHandle} aria-labelledby="form-dialog-title"
					PaperProps={{ style: { backgroundColor: '#2d2d2d', color: '#cfcfcf', minWidth: '50%' } }}
					style={{width: '100%'}}>
					<DialogTitle><p className="modal-head">Important Information</p></DialogTitle>
					<div className="modal-info">
						<Typography variant="h6" className="modal-text">1) You will be given 20 minutes for the whole quiz.</Typography>
						<Typography variant="h6" className="modal-text bold">2) After starting the quiz, please do not refresh or close the website.
												You won't be able to give the quiz again!</Typography>
						<Typography variant="h6" className="modal-text">3) This quiz can be given only once.</Typography>
						<Typography variant="h6" className="modal-text">4) You will get 15 MCQs, with only one correct option.</Typography>
						<Typography variant="h6" className="modal-text">5) After submitting the quiz, you will be able to see your marks.</Typography>
						<Typography variant="h5" className="modal-text bold">6) IMPORTANT: IF YOU LEAVE THE QUIZ PAGE WITHOUT HITTING THE SUBMIT BUTTON,
												YOUR ATTEMP WILL NOT COUNT AND YOU WILL NOT BE ABLE TO TAKE THE QUIZ AGAIN!!!</Typography>
						<Link to="/quiz" className="link">
							<Button className="quiz-modal-btn">Let's Go!</Button>
						</Link>
					</div>
				</Dialog>
			</div>
		);
	}
}

export default PlayMenuBar;