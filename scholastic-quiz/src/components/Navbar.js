import React from "react";
import {AppBar, Typography, Toolbar, Button} from "@material-ui/core";
import styles from './Navbar.css';

function Navbar() {
	return (
		<div className="root">
			<AppBar position="static" className="navbar">
				<Toolbar>
					<Typography variant="h6" className="nav-logo"> SCHOLASTIC | </Typography>
					<Typography varirant="h6" className="nav-head">The Hunger Games Quiz</Typography>
					<Button color="inherit" className="login">Login</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Navbar;