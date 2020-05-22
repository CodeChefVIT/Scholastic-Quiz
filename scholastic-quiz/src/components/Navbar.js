import React, { useState, useEffect } from "react";
import {AppBar, Typography, Toolbar, Button} from "@material-ui/core";
import {Redirect, useLocation} from 'react-router';
import './Navbar.css';

function Navbar() {
	const [redirect, setRedirect] = useState(false);
	const location = useLocation().pathname;

	const handleClick = () => {
		if(location !== "/login") setRedirect(true);
	}

	return (
		redirect === true ? <Redirect push to="/login" exact/>:
			<div className="root">
				<AppBar position="static" className="navbar">
					<Toolbar>
						<Typography variant="h6" className="nav-logo"> SCHOLASTIC | </Typography>
						<Typography varirant="h6" className="nav-head">The Hunger Games Quiz</Typography>
						<Button color="inherit" className="login" onClick={() => handleClick()}>Login</Button>
					</Toolbar>
				</AppBar>
			</div>
	);
}

export default Navbar;