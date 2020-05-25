import React, { useState, useEffect } from "react";
import Question from "../components/Question"
import { Grid, Snackbar, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import './Quiz.css';
import Loading from "./Loading";
import axios from "axios";
import {Redirect} from "react-router-dom";

function Quiz() {
	const [currentStep, setStep] = useState(1);
	const [times, settimes] = useState(false);
	const [min, setMin] = useState('20');
	const [sec, setSec] = useState('00');

	const [loading, setLoading] = useState(true);
	const [allQuestions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentAns, setCurrentAns] = useState(null);

	const [allChosenAns, setAllAns] = useState(null);
	const [redirect, setRedirect] = useState(false);

	const [testCompleted, setTestCompleted] = useState(false);
	const [resultData, setResultData] = useState(null);

	let seconds = 1200; //20 min === 1200 seconds  Total time in seconds

	const submitQuiz = async () => {
		setLoading(true);
		let url = `https://scholastic-quiz-app.herokuapp.com/answer`;
		let token = localStorage.getItem('authToken');

		if(token === null) {
			setRedirect(true);
		}

		let data = {
			"questions": allChosenAns,
		}

		try {
			await axios.put(url, data, {
				headers: {
					"auth-token": token,
				}
			}).then(res => {
				console.log(res);
				setResultData(res);
			});
		} catch(error) {
			console.log(error);
		}
		setLoading(false);
		setTestCompleted(true);
	}

	const handleSubmit = (event) => {
		submitQuiz();
	}
	const timesUp = () => {
		submitQuiz();
	}
	const _next = () => {
		let currQues = currentQuestion + 1;
		setStep(currentStep + 1)
		setCurrentQuestion(currentQuestion + 1);
		setCurrentAns(allChosenAns[currQues].option);
	}
	const _prev = () => {
		let currQues = currentQuestion - 1;
		setStep(currentStep - 1);
		setCurrentQuestion(currentQuestion - 1);
		setCurrentAns(allChosenAns[currQues].option);
	}
	const previousButton = () => {
		if (currentStep !== 1) {
			return (
				<button
					className="quiz-btn prev-button" onClick={_prev}>
					<p>Previous</p>
				</button>
			)
		}
		return null;
	}

	const nextButton = () => {
		if (currentStep < 15) {
			return (
				<button
					className="quiz-btn next-button" onClick={_next}>
					<p>Next</p>
				</button>
			)
		} else if (currentStep === 15) {
			return (
				<button
					className="quiz-btn submit-button" onClick={handleSubmit}>
					<p>Submit</p>
				</button>
			)
		}
		return null;
	}

	const tick = () => {
		var st = seconds;
		var sr = seconds;
		if (sr > 0) {
			st--;
		}
		else {
			timesUp();
		}
		seconds = st;
		var m = Math.floor(st / 60);
		var s = st - (m * 60);
		if (m < 10) {
			setMin("0" + m);
		} else {
			setMin(m);
		}
		if (s < 10) {
			setSec("0" + s);
		} else {
			setSec(s);
		}

	}

	const handleOptionChange = (event) => {
		setCurrentAns(event.target.value);
		
		let newState = allChosenAns;
		newState[currentQuestion].option = event.target.value;

		setAllAns(newState);
	}

	const getQuestions = async () => {
		let token = localStorage.getItem('authToken');
		let url = `https://scholastic-quiz-app.herokuapp.com/questionsFifteen`;

		let questionsData = [];
		let answerData = [];

		try {
			await axios.get(url, {
				headers: {
					"auth-token": token
				}
			}).then(res => {
				res.data.map((question) => {
					let questionObj = {
						q_id: question._id,
						text: question.description,
						options: question.alternatives,
					}
					questionsData.push(questionObj);

					let ansObj = {
						q_id: question._id,
						option: null,
					}

					answerData.push(ansObj);
				})
			});
			
			setQuestions(questionsData);
			setAllAns(answerData);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}

	useEffect(() => {
		let token = localStorage.getItem('authToken');
		if(token === null) {
			setRedirect(true);
		}
		getQuestions();
		setInterval(() => tick(), 1000);
	}, [])

	if(redirect) {
		return (
			<Redirect to="/" />
		)
	}
	else if(testCompleted) {
		return (
			<Redirect to="/marks"/>
		)
	} 
	else {
		return (
			loading ? <Loading />
				:
				<div className="quiz-page">
					<Grid container xs={12} spacing={5} className="quiz-container">
						<Grid item xs={10} md={8} lg={7} className="q-count" >
							<h2 style={{ margin: 0 }}>Question {currentStep}</h2>
						</Grid>
						<Grid item xs={10} md={8} lg={7} className="timer">
							<p>Time Remaining <h2>{min}:{sec}</h2></p>
						</Grid>
						<Grid item xs={10} md={8} lg={7} style={{ margin: 0, padding: '2%', backgroundColor: '#111', borderBottom: '5px solid #222', minHeight: '50vh' }}>
							<FormControl style={{ margin: 'auto', width: "100%" }} component="fieldset">
								<FormLabel className="label" component="legend">{allQuestions[currentQuestion].text}</FormLabel>
								<RadioGroup aria-label="correct-choice" value={currentAns} onChange={handleOptionChange}>
									{allQuestions[currentQuestion].options.map((option) => {
										return (
											<FormControlLabel key={option._id} value={option.text} control={<Radio className="radio" />} label={option.text} style={{ margin: 0 }} />
										)
									})}
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item xs={10} md={8} lg={7} className="button" >
							<Grid item xs={6} className="button">
								{previousButton()}
							</Grid>
							<Grid item xs={6} className="button">
								{nextButton()}
							</Grid>
						</Grid>
					</Grid>
				</div>
		)
	}
}

export default Quiz;