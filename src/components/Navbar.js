import React, { useState, useEffect } from "react";
import {AppBar, Typography, Toolbar, Button} from "@material-ui/core";
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
	return (
			<div className="root">
				<AppBar position="static" className="navbar">
					<Toolbar>
						<Typography variant="h6" className="nav-logo"> <Link className="link" to="/">SCHOLASTIC | </Link></Typography>
						<Typography varirant="h6" className="nav-head">The Hunger Games Quiz</Typography>
						<Link className="link" to="/login"><Button color="inherit" className="login">Login</Button></Link>
					</Toolbar>
				</AppBar>
			</div>
	);
}

export default Navbar;