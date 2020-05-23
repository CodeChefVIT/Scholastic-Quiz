import React from "react";
import Question from "../components/Question"
import { Grid, Snackbar } from '@material-ui/core'
import './Quiz.css';

function Quiz() {
	const [currentStep, setStep] = React.useState(1);
	const [submit, setsubmit] = React.useState(false);
	const [times, settimes] = React.useState(false);
	const [min, setMin] = React.useState('15');
	const [sec, setSec] = React.useState('00');

	let seconds = 900; //15 min === 900 seconds  Total time in seconds

	const handleSubmit = event => {
		setsubmit(true);
	}	
	const timesUp = () => {
		settimes(true);
	}	  
	const _next = () => {
		setStep(currentStep + 1)
	}		
	const _prev = () => {
		setStep(currentStep - 1)
	}
	const previousButton = () => {
	  if(currentStep !==1){
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
	  if(currentStep < 15){
		return (
		  <button 
			className="quiz-btn next-button" onClick={_next}>
		  <p>Next</p>
		  </button>        
		)
	  } else if(currentStep === 15){
		return (
			<button 
			  className="quiz-btn submit-button"  onClick={handleSubmit}>
			<p>Submit</p>
			</button>        
		  )
	  }
	  return null;
	}

	const tick = () => {
		var st = seconds;
		var sr = seconds;
		if(sr > 0){
			st--;
		}
		else{
			timesUp();
		}
		seconds = st;
		var m = Math.floor(st / 60);
		var s = st - (m * 60);
		if(m < 10){
			setMin("0" + m);
		} else {
			setMin(m);
		}
		if(s < 10){
			setSec("0" + s);
		} else {
			setSec(s);
		}
		
	}

	React.useEffect(() => {
		setInterval(() => tick(), 1000);
	},[])

	return (
		<div style={{display: 'flex', justifyContent: 'center', overflow: 'hidden'}}>
			<Grid container xs={12} spacing={5} style={{display: 'flex', justifyContent: 'center', paddingTop: 50, width: '100%'}}>
				<Grid item xs={10} md={8} lg={7}  style={{display: 'flex', justifyContent: 'center', paddingTop: 0, color: '#ffa400', width: '100%'}}>
					<h2 style={{margin: 0}}>Question {currentStep}</h2>
				</Grid>
				<Grid item xs={10} md={8} lg={7}  style={{display: 'flex', justifyContent: 'center', paddingTop: 0, color: 'red', width: '100%'}}>
					<p style={{ textAlign: 'center', margin: 0 }}>Time Remaining <h2 style={{margin: 0}}>{min}:{sec}</h2></p>
				</Grid>
				<Step currentStep={currentStep} />
				<Grid item xs={10} md={8} lg={7}  style={{display: 'flex', justifyContent: 'center', paddingTop: 50, width: '100%'}}>
					<Grid item xs={6} style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
						{previousButton()}
					</Grid>
					<Grid item xs={6} style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
						{nextButton()}
					</Grid>
				</Grid>
			</Grid>
			<Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center',}} open={submit} message="Submitting.." />
			<Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center',}} open={times} message="TimesUp.. Submitting.." />
			
		</div>
	)
}

export default Quiz;

function Step(props) {
	let qid = "Hello"
	//Random Question Id code
	return(
	  <Question id = {qid} />
	);
}