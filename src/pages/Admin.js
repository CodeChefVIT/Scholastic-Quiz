import React, {useEffect } from 'react';
import './Admin.css';
import {
	Button, Dialog, DialogActions,
	DialogContent, DialogTitle, 
	Radio, RadioGroup,
	FormControlLabel, FormControl,
	FormLabel, Grid, Table, TableBody,
	TableCell, TableContainer,
	TableHead, TablePagination, TableRow
} from '@material-ui/core';
import TextInput from "../components/TextInput";
import Loading from "./Loading";
import axios from "axios";
import { Redirect } from 'react-router';

function Admin() {
	const [open, setOpen] = React.useState(false);
	const [openSub, setOpenSub] = React.useState(false);
	const [value, setValue] = React.useState('none');

	const [isAdmin, setAdmin] = React.useState(true);
	const [loading, setLoading] = React.useState(true);

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
	const [submitResponse, setSubmit] = React.useState('');
	const [noSubText, setNoSub] = React.useState('');

	const [page, setPage] = React.useState(0);
  	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const columns = [
		{ id: 'name', label: 'Name', minWidth: 10 },
		{ id: 'email', label: 'E-mail', minWidth: 20 },
		{ id: 'score', label: 'Score', minWidth: 10, align: 'right' },
		{ id: 'q1', label: 'Ques1', minWidth: 20 },
		{ id: 'a1', label: 'Ans1', minWidth: 10 },
		{ id: 'q2', label: 'Ques2', minWidth: 20 },
		{ id: 'a2', label: 'Ans2', minWidth: 10 },
		{ id: 'q3', label: 'Ques3', minWidth: 20 },
		{ id: 'a3', label: 'Ans3', minWidth: 10 },
		{ id: 'q4', label: 'Ques4', minWidth: 20 },
		{ id: 'a4', label: 'Ans4', minWidth: 10 },
		{ id: 'q5', label: 'Ques5', minWidth: 20 },
		{ id: 'a5', label: 'Ans5', minWidth: 10 },
		{ id: 'q6', label: 'Ques6', minWidth: 20 },
		{ id: 'a6', label: 'Ans6', minWidth: 10 },
		{ id: 'q7', label: 'Ques7', minWidth: 20 },
		{ id: 'a7', label: 'Ans7', minWidth: 10 },
		{ id: 'q8', label: 'Ques8', minWidth: 20 },
		{ id: 'a8', label: 'Ans8', minWidth: 10 },
		{ id: 'q9', label: 'Ques9', minWidth: 20 },
		{ id: 'a9', label: 'Ans9', minWidth: 10 },
		{ id: 'q10', label: 'Ques10', minWidth: 20 },
		{ id: 'a10', label: 'Ans10', minWidth: 10 },
		{ id: 'q11', label: 'Ques11', minWidth: 20 },
		{ id: 'a11', label: 'Ans11', minWidth: 10 },
		{ id: 'q12', label: 'Ques12', minWidth: 20 },
		{ id: 'a12', label: 'Ans12', minWidth: 10 },
		{ id: 'q13', label: 'Ques13', minWidth: 20 },
		{ id: 'a13', label: 'Ans13', minWidth: 10 },
		{ id: 'q14', label: 'Ques14', minWidth: 20 },
		{ id: 'a14', label: 'Ans14', minWidth: 10 },
		{ id: 'q15', label: 'Ques15', minWidth: 20 },
		{ id: 'a15', label: 'Ans15', minWidth: 10 },
	];
	function createData(name,email,score,q1,a1,q2,a2,q3,a3,q4,a4,q5,a5,q6,a6,q7,a7,q8,a8,q9,a9,q10,a10,q11,a11,q12,a12,q13,a13,q14,a14,q15,a15) {
		return {name, email, score, q1, a1, q2, a2, q3, a3, q4, a4, q5, a5, q6, a6, q7, a7, q8, a8, q9, a9, q10, a10, q11, a11, q12, a12, q13, a13, q14, a14, q15, a15}
	}
	const [rows, setRows] = React.useState([]);
	
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const errorText = "This field cannot be empty";

	const checkAdmin = async () => {
		let token = localStorage.getItem('authToken');

		if(token == null) {
			setAdmin(false);
			setLoading(false);
			return;
		}
		let url = `https://scholastic-quiz-app.herokuapp.com/checkAuth`;
		let response = null;

		try {
			await axios.get(url, {
				headers: {
					"auth-token": token
				}
			}).then(res => {
				response = res;
			});

			setAdmin(response.data.isAdmin);
		} catch(error) {
			console.log(error);
			setAdmin(false);
		}

		setLoading(false);
	}

	// const getQ = async(qid) => {
	// 	let token = localStorage.getItem('authToken');
	// 	let url2 = `https://scholastic-quiz-app.herokuapp.com/questions/${qid}`;
	// 	let response2 = null;

	// 	try {
	// 		await axios.get(url2, {
	// 			headers: {
	// 				"auth-token": token
	// 			}
	// 		}).then(res => {
	// 			response2 = res;
	// 		});
	// 		console.log(response);
	// 		if(response2.status === 200){
	// 			var q = response.data.description
	// 			console.log(response.data.description);
	// 			return q
	// 		}

	// 	} catch(error) {
	// 		console.log(error);
	// 	}
	// }

	const getSubmissions = async () => {
		let token = localStorage.getItem('authToken');
		let subs = []
		var i,j,k;
		var q = [];
		var a = [];


		let url = `https://scholastic-quiz-app.herokuapp.com/viewSubmissions`;
		let response = null;
		// let allQues = null;
		// let url2 = `https://scholastic-quiz-app.herokuapp.com/questions`;
		// try {
		// 	await axios.get(url2, {
		// 		headers: {
		// 			"auth-token": token
		// 		}
		// 	}).then(res => {
		// 		allQues = res;
		// 	});
		// } catch(error) {
		// 	console.log(error);
		// }

		try {
			await axios.get(url, {
				headers: {
					"auth-token": token
				}
			}).then(res => {
				response = res;
			});
			if(response.status === 200){
				if(response.data.length === 0){

				}
				setLoading(true);
				for(i = 0; i < response.data.length; i++){
					var name = response.data[i].name;
					var email = response.data[i].email;
					var score = response.data[i].score;
					// for(j = 0; j < response.data[i].responses.length; j++){
					// 	for(k = 0; k < allQues.data.length; k++){
					// 		if(allQues.data[k].)
					// 	}
					// 	a[j] = response.data[i].responses[j].option;
					// }
					subs = [...subs,createData(name,email,score,q[0],a[0],q[1],a[1],q[2],a[2],q[3],a[3],q[4],a[4],q[5],a[5],q[6],a[6],q[7],a[7],q[8],a[8],q[9],a[9],q[10],a[10],q[11],a[11],q[12],a[12],q[13],a[13],q[14],a[14])];
				}
				setRows([...rows,...subs]);
				setLoading(false);
			}

		} catch(error) {
			console.log(error);
		}
	}

	useEffect(() => {
		checkAdmin();
		getSubmissions();
	}, [])

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

	const handleSubmit = async() => {
		let error = false;
		let val = "none";
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
		}else if(value === 'op1'){
			val = op1;
		}else if(value === 'op2'){
			val = op2;
		}else if(value === 'op3'){
			val = op3;
		}else if(value === 'op4'){
			val = op4;
		}
		if(!error){
				let token = localStorage.getItem('authToken');
				let url = `https://scholastic-quiz-app.herokuapp.com/questions`
				let data = {
					"description" : ques,
					"correct_answer" : val,
					"alternatives" : [
						{
							"text" : op1
						},
						{
							"text" : op2
						},
						{
							"text" : op3
						},
						{
							"text" : op4
						}
					] 
				}
				let response = null;
				try {
					await axios.post(url,data,{
						headers: {
							"auth-token" : token
						}}).then(res => {
						response = res;
					});
					if(response.status === 201) {
						setSubmit('Succesfully Submitted..')
					}else{
						setSubmit('Cannot Submit. Server error. Try later..')
					}
				} catch(error) {
					console.log(error);
				}
				setTimeout(() => {setOpen(false);}, 800);
		}
	};

	if(!isAdmin) {
		return (
			<Redirect to="/" />
		)
	} else { 
		return (
			loading? <Loading />
			:
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
						<p style={{color: '#0f0', fontSize: 14, margin: 0}}>{submitResponse}</p>
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
					<TableContainer>
							<Table stickyHeader aria-label="sticky table" >
							<TableHead>
								<TableRow>
								{columns.map((column) => (
									<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
									>
									{column.label}
									</TableCell>
								))}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
									{columns.map((column) => {
										const value = row[column.id];
										return (
										<TableCell key={column.id} align={column.align} style={{color: '#ffffff'}}>
											{column.format && typeof value === 'number' ? column.format(value) : value}
										</TableCell>
										);
									})}
									</TableRow>
								);
								})}
							</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[3, 5, 10]}
							component="div"
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							style={{color: '#ffffff'}}
						/>
						<h2>{noSubText}</h2>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} className="btn-orange">
							Close
						</Button>
					</DialogActions>
				</Dialog>

			</div>
		)
	}
}

export default Admin;