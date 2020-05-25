import React from 'react';
import MaterialTable from "material-table";
import Loading from "../pages/Loading";
import axios from "axios";
import {
	Button, Dialog, DialogActions,
	DialogContent, DialogTitle, 
	Radio, RadioGroup,
	FormControlLabel, FormControl,
	FormLabel, Grid
} from '@material-ui/core';
import TextInput from "../components/TextInput";
import { Redirect } from 'react-router';

export default function AllQues(){

	const [open, setOpen] = React.useState(false);
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
	const [submitResponse, setSubmit] = React.useState('');
	const errorText = "This field cannot be empty";

	const [loading, setLoading] = React.useState(true);
	const columns = [
		{ field: 'qid', title: 'Q_ID', minwidth: 10 },
		{ field: 'ques', title: 'Question', minWidth: 200 }, { field: 'op1', title: 'Option1', minWidth: 50 },
		{ field: 'op2', title: 'Option2', minWidth: 50 }, { field: 'op3', title: 'Option3', minWidth: 50 },
		{ field: 'op4', title: 'Option4', minWidth: 50 }, { field: 'correct', title: 'Correct Option', minWidth: 50 },
	];
	function createData(id, q, o1, o2, o3, o4, c) {
		return { qid: id, ques: q, op1: o1, op2: o2, op3: o3, op4: o4, correct: c }
	}
	const [rows, setRows] = React.useState([]);

	const update = async(ndata, odata) => {
		console.log(ndata, odata);
		if(ndata.qid === odata.qid){

			let error = false;
			if(ndata.ques.length === 0){
				error = true;
				console.log("No errors 1");
			}
			if(ndata.op1.length === 0){
				error = true;
				console.log("No errors 2");
			}
			if(ndata.op2.length === 0){
				error = true;
				console.log("No errors 3");
			}
			if(ndata.op3.length === 0){
				error = true;
				console.log("No errors 4");
			}
			if(ndata.op4.length === 0){
				error = true;
				console.log("No errors 5");
			}
			if(ndata.correct.length === 0){
				error = true;
				console.log("No errors 6");
			}
			if(ndata.op1 === ndata.op2 || ndata.op1=== ndata.op3 || ndata.op1 === ndata.op4 || ndata.op2 === ndata.op3 || ndata.op2 === ndata.op4 || ndata.op3 === ndata.op4){
				error = true;
				console.log("No errors 7");
			}
			if(!(ndata.correct === ndata.op1 || ndata.correct === ndata.op2 || ndata.correct === ndata.op3 || ndata.correct === ndata.op4)){
				error = true;
				console.log("No errors 8");
			}
			if(!error){
				console.log("No errors");
				let token = localStorage.getItem('authToken');
				let url = `https://scholastic-quiz-app.herokuapp.com/questions/${ndata.qid}`
				let data = {
					"description" : ndata.ques,
					"correct_answer" : ndata.correct,
					"alternatives" : [
						{
							"text" : ndata.op1
						},
						{
							"text" : ndata.op2
						},
						{
							"text" : ndata.op3
						},
						{
							"text" : ndata.op4
						}
					] 
				}
				let response = null;
				try {
					await axios.put(url,data,{
						headers: {
							"auth-token" : token
						}}).then(res => {
						response = res;
					});
					if(response.status === 200) {
						getAll();
					}
				} catch(error) {
					console.log(error);
				}
			}
		}
	}

	const del = async(data) => {
		console.log(data);
		let token = localStorage.getItem('authToken');
		let url = `https://scholastic-quiz-app.herokuapp.com/questions/${data.qid}`;
		let response = null;

		try {
			await axios.delete(url, {
				headers: {
					"auth-token": token
				}
			}).then(res => {
				response = res;
			});
			console.log(response);
			if(response.status === 204){
				getAll();
			}

		} catch(error) {
			console.log(error);
		}
		setLoading(false);
		getAll();
	}
    
	const getAll = async() => {
		let token = localStorage.getItem('authToken');
		let url = `https://scholastic-quiz-app.herokuapp.com/questions`;
		let response = null;
		let i = 0;
		let data = [];
		setRows(null);
		try {
			await axios.get(url, {
				headers: {
					"auth-token": token
				}
			}).then(res => {
				response = res;
			});
			console.log(response);
			console.log(rows);
			if(response.status === 200){
				for(i = 0; i < response.data.length; i++){
					var id = response.data[i]._id;
					var ques = response.data[i].description;
					var correct = response.data[i].correct_answer;
					var o1 = response.data[i].alternatives[0].text;
					var o2 = response.data[i].alternatives[1].text;
					var o3 = response.data[i].alternatives[2].text;
					var o4 = response.data[i].alternatives[3].text;
					
					data = [...data, createData(id,ques,o1,o2,o3,o4,correct)]
				}
				setRows(data);
				console.log(rows);
			}

		} catch(error) {
			console.log(error);
		}
		setLoading(false);
	}

    React.useEffect(() => {
		getAll();
    }, []);

    return(
        loading? <Loading />
        :
        <div style={{display:'flex', justifyContent: 'center'}}>
            <MaterialTable
			 title="Questions List"
			 columns={columns}
			 data = {rows}
			 style={{width:'90%', backgroundColor: '#4d4d4d', color: '#fff'}}
			 options={{
				 headerStyle: {
					backgroundColor: '#353535',
					color: '#fff'
				 },
				 rowStyle: {
					 color: '#ccc'
				 }
			 }}
			 editable={{
				onRowUpdate: (newData, oldData) =>
				  new Promise((resolve) => {
					setTimeout(() => {
					  resolve();
					  update(newData, oldData);
					}, 600);
				  }),
				onRowDelete: (oldData) =>
				  new Promise((resolve) => {
					setTimeout(() => {
					  resolve();
					  del(oldData);
					}, 600);
				  }),
			  }}
			 />	
			

			{/* <Button variant="outlined" className="btn-red" onClick={handleClickOpen}>
				Add New Question
			</Button>

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
						<FormLabel style={{ color: '#ffa2000', paddingTop: 20 }} component="legend">Correct Option</FormLabel>
						<p style={{color: '#f44336', fontSize: 14, margin: 0}}>{valueError}</p>
						<RadioGroup aria-label="correct-choice" value={value} onChange={handleChange} >
							<FormControlLabel value="op1" control={<Radio style={{color: '#ffa2000'}} />} label="Option 1" />
							<FormControlLabel value="op2" control={<Radio style={{color: '#ffa2000'}} />} label="Option 2" />
							<FormControlLabel value="op3" control={<Radio style={{color: '#ffa2000'}} />} label="Option 3" />
							<FormControlLabel value="op4" control={<Radio style={{color: '#ffa2000'}} />} label="Option 4" />
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
			</Dialog> */}
		</div>
    )
}