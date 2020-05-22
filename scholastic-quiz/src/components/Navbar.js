import React from "react";
import {AppBar, Typography, Toolbar} from "@material-ui/core";
import styles from './Navbar.css';

function Navbar() {
	return (
		<AppBar position="static" className="navbar">
			<Toolbar>
				<Typography variant="h6">SCHOLASTIC</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;