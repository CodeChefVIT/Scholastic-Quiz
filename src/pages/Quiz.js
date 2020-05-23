import React from "react";
import Question from "../components/Question"
import { Grid } from '@material-ui/core'
import './Quiz.css';

function Quiz() {
	const [currentStep, setStep] = React.useState(1); 
	const handleSubmit = event => {
		event.preventDefault()
		alert(`Submitting`)
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

	return (
		<div style={{display: 'flex', justifyContent: 'center', overflow: 'hidden'}}>
			<Grid container xs={12} spacing={5} style={{display: 'flex', justifyContent: 'center', paddingTop: 50, width: '100%'}}>
				<Grid item xs={10} md={8} lg={7} spacing={5} style={{display: 'flex', justifyContent: 'center', paddingTop: 0, color: '#ffa400', width: '100%'}}>
					<h2>Question {currentStep}</h2>
				</Grid>
				<Step currentStep={currentStep} />
				<Grid item xs={10} md={8} lg={7} spacing={5} style={{display: 'flex', justifyContent: 'center', paddingTop: 50, width: '100%'}}>
					<Grid item xs={6} style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
						{previousButton()}
					</Grid>
					<Grid item xs={6}style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
						{nextButton()}
					</Grid>
				</Grid>
			</Grid>
			
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