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
	const handleChange = (event) => {
		setValue(event.target.value);
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
						InputProps={{
							style: {
								color: "#cdcdcd"
							}
						}}
						margin="dense"
						id="ques"
						label="Question"
						type="text"
						fullWidth
						variant="outlined"
					/>
					<TextInput
						InputProps={{
							style: {
								color: "#cdcdcd"
							}
						}}
						margin="dense"
						id="op1"
						label="Option 1"
						type="text"
						fullWidth
						variant="outlined"
					/>
					<TextInput
						InputProps={{
							style: {
								color: "#cdcdcd"
							}
						}}
						margin="dense"
						id="op2"
						label="Option 2"
						type="text"
						fullWidth
						variant="outlined"
					/>
					<TextInput
						InputProps={{
							style: {
								color: "#cdcdcd"
							}
						}}
						margin="dense"
						id="op3"
						label="Option 3"
						type="text"
						fullWidth
						variant="outlined"
					/>
					<TextInput
						InputProps={{
							style: {
								color: "#cdcdcd"
							}
						}}
						margin="dense"
						id="op4"
						label="Option 4"
						type="text"
						fullWidth
						variant="outlined"
					/>
					<FormControl component="fieldset">
						<FormLabel style={{ color: '#ffa400', paddingTop: 20 }} component="legend">Correct Option</FormLabel>
						<RadioGroup aria-label="correct-choice" value={value} onChange={handleChange}>
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
					<Button onClick={handleClose} className="btn-orange">
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