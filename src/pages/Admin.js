import React from 'react';
import './Admin.css'
import {
	Button, Dialog, DialogActions,
	DialogContent, DialogTitle, 
	Radio, RadioGroup,
	FormControlLabel, FormControl,
	FormLabel, Grid
} from '@material-ui/core';
import TextInput from "../components/TextInput";

function Admin() {
	const [open, setOpen] = React.useState(false);
	const [openSub, setOpenSub] = React.useState(false);
	const [value, setValue] = React.useState('none');
	const [valueError, setValueError] = React.useState('');
	const [ques, setQues] = React.useState('');
	const [quesError, setQuesError] = React.useState('');
	const [op1, setOp1] = React.useState('');
	const [op1Error, setOp1Error] = React.useState('');
	const [op2, setOp2] = React.useState('');
	const [op2Error, setOp2Error] = React.useState('');
	const [op3, setOp3] = React.useState('');
	const [op3Error, setOp3Error] = React.useState('');
	const [op4, setOp4] = React.useState('');
	const [op4Error, setOp4Error] = React.useState('');

	const errorText = "This field cannot be empty";

	const handleChange = (event) => {
		setValue(event.target.value);
		setValueError('');
	};
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClickOpenSub = () => {
		setOpenSub(true);
	};
	const handleClose = () => {
		setOpen(false);
		setOpenSub(false);
	};

	const handleQchange = (event) => {
		var s = event.target.value;
		setQues(s);
		if(s.length === 0){
			setQuesError(errorText);
		}else{
			setQuesError('');
		}
	};
	const handle1change = (event) => {
		var s = event.target.value;
		setOp1(s);
		if(s.length === 0){
			setOp1Error(errorText);
		}else{
			setOp1Error('');
		}
	};
	const handle2change = (event) => {
		var s = event.target.value;
		setOp2(s);
		if(s.length === 0){
			setOp2Error(errorText);
		}else{
			setOp2Error('');
		}
	};
	const handle3change = (event) => {
		var s = event.target.value;
		setOp3(s);
		if(s.length === 0){
			setOp3Error(errorText);
		}else{
			setOp3Error('');
		}
	};
	const handle4change = (event) => {
		var s = event.target.value;
		setOp4(s);
		if(s.length === 0){
			setOp4Error(errorText);
		}else{
			setOp4Error('');
		}
	};

	const handleSubmit = () => {
		let error = false;
		if(ques.length === 0){
			setQuesError(errorText);
			error = true;
		}
		if(op1.length === 0){
			setOp1Error(errorText);
			error = true;
		}
		if(op2.length === 0){
			setOp2Error(errorText);
			error = true;
		}
		if(op3.length === 0){
			setOp3Error(errorText);
			error = true;
		}
		if(op4.length === 0){
			setOp4Error(errorText);
			error = true;
		}
		if(value === 'none'){
			setValueError(errorText);
			error = true;
		}
		if(!error){
			//Submit question
			setOpen(false);
		}
	};

	return (
		<div className="bg">
			<div>
				<h2 style={{ textAlign: 'center', marginTop: 0, textShadow: '0 0 15px #000' }}>Welcome to Admin Portal</h2>
			</div>
			<div style={{ display: 'flex', height: 'calc(100vh - 116px)', justifyContent: 'center', alignItems: 'center' }}>
				<Grid container spacing={3} style={{ width: '90%' }}>
					<Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Button variant="outlined" className="btn-red" onClick={handleClickOpen}>
							Add new question
						</Button>
					</Grid>
					<Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Button variant="outlined" className="btn-blue" onClick={handleClickOpenSub}>
							Show Submissions
						</Button>
					</Grid>
				</Grid>


			</div>
			<Dialog PaperProps={{ style: { backgroundColor: '#2d2d2d', color: '#cfcfcf' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add Question</DialogTitle>
				<DialogContent>
					<TextInput
						autoFocus
						error={quesError.length === 0? false: true}
						helperText={quesError.length === 0? null: quesError}
						margin="dense"
						id="ques"
						label="Question"
						type="text"
						fullWidth
						variant="outlined"
						value={ques}
						onChange={handleQchange}
					/>
					<TextInput
						error={op1Error.length === 0? false: true}
						helperText={op1Error.length === 0? null: op1Error}
						margin="dense"
						id="op1"
						label="Option 1"
						type="text"
						fullWidth
						variant="outlined"
						onChange={handle1change}
					/>
					<TextInput
						error={op2Error.length === 0? false: true}
						helperText={op2Error.length === 0? null: op2Error}
						margin="dense"
						id="op2"
						label="Option 2"
						type="text"
						fullWidth
						variant="outlined"
						onChange={handle2change}
					/>
					<TextInput
						error={op3Error.length === 0? false: true}
						helperText={op3Error.length === 0? null: op3Error}
						margin="dense"
						id="op3"
						label="Option 3"
						type="text"
						fullWidth
						variant="outlined"
						onChange={handle3change}
					/>
					<TextInput
						error={op4Error.length === 0? false: true}
						helperText={op4Error.length === 0? null: op4Error}
						margin="dense"
						id="op4"
						label="Option 4"
						type="text"
						fullWidth
						variant="outlined"
						onChange={handle4change}
					/>
					<FormControl component="fieldset">
						<FormLabel style={{ color: '#ffa400', paddingTop: 20 }} component="legend">Correct Option</FormLabel>
						<p style={{color: '#f44336', fontSize: 14, margin: 0}}>{valueError}</p>
						<RadioGroup aria-label="correct-choice" value={value} onChange={handleChange} >
							<FormControlLabel value="op1" control={<Radio style={{color: '#ffa400'}} />} label="Option 1" />
							<FormControlLabel value="op2" control={<Radio style={{color: '#ffa400'}} />} label="Option 2" />
							<FormControlLabel value="op3" control={<Radio style={{color: '#ffa400'}} />} label="Option 3" />
							<FormControlLabel value="op4" control={<Radio style={{color: '#ffa400'}} />} label="Option 4" />
						</RadioGroup>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} className="btn-orange">
						Cancel
				</Button>
					<Button onClick={handleSubmit} className="btn-orange">
						Submit
				</Button>
				</DialogActions>
			</Dialog>
			<Dialog PaperProps={{ style: { backgroundColor: '#2d2d2d', color: '#cfcfcf', minWidth: '60%' } }} open={openSub} onClose={handleClose} aria-labelledby="sub-dialog-title">
				<DialogTitle id="sub-dialog-title">Submissions</DialogTitle>
				<DialogContent>
					<h2>No submissions yet...</h2>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}  className="btn-orange">
						Cancel
					</Button>
					<Button onClick={handleClose} className="btn-orange">
						Submit
					</Button>
				</DialogActions>
			</Dialog>

		</div>
	)
}

export default Admin;