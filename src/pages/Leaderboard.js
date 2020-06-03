import React from "react";
import { Typography, Container } from "@material-ui/core";
import './Leaderboard.css';
import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";

function Leaderboard() {

	const columns = [
		{ field: 'name', title: 'Name'},
		{ field: 'reg', title: 'Reg. No.'},
		{ field: 'email', title: 'Email'}
	];
	const [rows, setRows] = React.useState([
		{
			name: "Shambhavi Singh",
			email: "shambhavi.singh2019@vitstudent.ac.in",
			reg: "19BCE0749"
		},
		{
			name: "Shivam Singhal",
			email: "shivamsinghal494@gmail.com",
			reg: "External"
		},
		{
			name: "Mahima Sharma",
			email: "mahimasharma051998@gmail.com",
			reg: "External"
		},
		{
			name: "Swayam Aggarwal",
			email: "swayamagarwal2114@gmail.com",
			reg: "External"
		},{
			name: "Aarthi",
			email: "aarthi0403@gmail.com",
			reg: "15MIS1010"
		}
	]);

	return (
		<div className="error-section">
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant="h3" style={{color: 'orange', marginBottom: '5%'}}>Leaderboard</Typography>
					{/* <Typography variant="h4" style={{color: 'white'}}>Evaluating Leaderboard</Typography> */}
				</Grid>
				<Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
					<div className="table">
					<MaterialTable
						columns={columns}
						data={rows}
						style={{ height: '100%', backgroundColor: '#2d2d2d', color: '#cfcfcf' }}
						options={{
							headerStyle: {
								backgroundColor: 'orange',
								fontWeight: 'bolder',
								color: 'white'
							},
							rowStyle: {
								color: 'orange', 
								fontWeight: 'bold'
							},
							paging: false,
							toolbar: false,
							sorting: false,
						}}
					/>	
					</div>
					
				</Grid>
			</Grid>
			
		</div>
	)
}

export default Leaderboard;