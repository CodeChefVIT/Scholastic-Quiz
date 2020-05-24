import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Welcome from './pages/Welcome';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Admin from './pages/Admin';
import Quiz from './pages/Quiz';
import ErrorPage from './pages/ErrorPage';
import AdminRegister from './pages/AdminRegister';
import InfoContext from './context/InfoContext';

function App() {
	const [authToken, setAuthToken] = useState(null);
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [name, changeName] = useState(null);
	const [isAdmin, setAdmin] = useState(false);

	useEffect(() => {
		const userLoggedIn = localStorage.getItem('userLoggedIn');
		if(userLoggedIn === null) {
			localStorage.setItem('userLoggedIn', false);
		} else {
			if(userLoggedIn === "true") {
				const localName = localStorage.getItem('name');
				setLoggedIn(true);
				changeName(localName);
			}
		}

		//TODO: validate authToken if a user is admin, name, email, etc and set these.
	}, []);

	let info = {
		name:name,
		changeName: changeName,
		authToken: authToken,
		setAuthToken: setAuthToken,
		isLoggedIn: isLoggedIn,
		setLoggedIn: setLoggedIn,
		isAdmin: isAdmin,
		setAdmin: setAdmin,
	}
 
	return (
		<InfoContext.Provider value={info}>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/">
						<Welcome />
					</Route>
					<Route exact path="/register">
						<RegisterPage />
					</Route>
					<Route exact path="/admin">
						<Admin />
					</Route>
					<Route exact path="/quiz">
						<Quiz />
					</Route>
					<Route exact path="/adminRegister">
						<AdminRegister />
					</Route>
					<Route exact path="/login">
						<LoginPage />
					</Route>
					<Route path='*'>
						<ErrorPage />
					</Route>
				</Switch>
			</Router>
		</InfoContext.Provider>
	);

}

export default App;
