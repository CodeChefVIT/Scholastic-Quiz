import React, { useContext } from "react";
import {AppBar, Typography, Toolbar, Button} from "@material-ui/core";
import { Link } from 'react-router-dom';
import './Navbar.css';
import InfoContext from '../context/InfoContext';

function Navbar() {
	const {isLoggedIn, setLoggedIn, name} = useContext(InfoContext);

	const handleLogout = () => {
		localStorage.clear();
		setLoggedIn(false);
	}

	return (
			<div className="root">
				<AppBar position="static" className="navbar">
					<Toolbar>
						<Typography variant="h6" className="nav-logo"> <Link className="link" to="/">SCHOLASTIC | </Link></Typography>
						<Typography varirant="h6" className="nav-head">The Hunger Games Quiz</Typography>
						{isLoggedIn === false?
							<Link className="link" to="/login"><Button color="inherit" className="login">Login</Button></Link>
							:
							<Typography variant="h6" className="nav-user">Welcome, {name}</Typography>
							
						}
						{isLoggedIn? <Button className="logout-btn" onClick={handleLogout}>Logout</Button>: null}
					</Toolbar>
				</AppBar>
			</div>
	);
}

export default Navbar;