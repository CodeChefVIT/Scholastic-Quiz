import React, { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { Redirect } from "react-router";
import Loading from "./Loading";
import axios from "axios";

function MarksPage(props) {
	const [loading, setLoading] = useState(true);
	const [marks, setMarks] = useState(null);

	const [redirect, setRedirect] = useState(false);

	const getData = async () => {
		let token = localStorage.getItem('authToken');
		let url = `https://scholastic-quiz-app.herokuapp.com/checkAuth`;

		if (token === null) {
			setRedirect(true);
			return;
		}

		let response = null;

		try {
			await axios.get(url, {
				headers: {
					"auth-token": token
				}
			}).then(res => {
				console.log(res);
				if (res.data.testStarted === false) {
					console.log("HI");
					setRedirect(true);
					return;
				} else {
					setMarks(res.data.score);
				}
			})
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}


	useEffect(() => {
		getData();
	}, [])

	if (redirect) {
		return (
			<Redirect to="/"></Redirect>
		)
	}
	else if (loading) {
		return (
			<Loading />
		)
	}
	else {
		return (
			<Container>
				<Typography variant="h3">Marks Page</Typography>
				<Typography varaint="h6">Your marks are: {marks}</Typography>
			</Container>
		)
	}
}

export default MarksPage;