import React from 'react';
import {
	Table, TableBody,
	TableCell, TableContainer,
	TableHead, TablePagination, TableRow
} from '@material-ui/core';
import Loading from "../pages/Loading";
import axios from "axios";
export default function SubTable(){

	const [loading, setLoading] = React.useState(true);
    const [noSubText, setNoSub] = React.useState('');
	const [page, setPage] = React.useState(0);
  	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const columns = [
		{ id: 'name', label: 'Name', minWidth: 100 }, { id: 'email', label: 'E-mail', minWidth: 200 },
		{ id: 'score', label: 'Score', minWidth: 10, align: 'right' },
		{ id: 'q1', label: 'Ques1', minWidth: 200 }, { id: 'a1', label: 'Ans1', minWidth: 50 },
		{ id: 'q2', label: 'Ques2', minWidth: 200 }, { id: 'a2', label: 'Ans2', minWidth: 50 },
		{ id: 'q3', label: 'Ques3', minWidth: 200 }, { id: 'a3', label: 'Ans3', minWidth: 50 },
		{ id: 'q4', label: 'Ques4', minWidth: 200 }, { id: 'a4', label: 'Ans4', minWidth: 50 },
		{ id: 'q5', label: 'Ques5', minWidth: 200 }, { id: 'a5', label: 'Ans5', minWidth: 50 },
		{ id: 'q6', label: 'Ques6', minWidth: 200 }, { id: 'a6', label: 'Ans6', minWidth: 50 },
		{ id: 'q7', label: 'Ques7', minWidth: 200 }, { id: 'a7', label: 'Ans7', minWidth: 50 },
		{ id: 'q8', label: 'Ques8', minWidth: 200 }, { id: 'a8', label: 'Ans8', minWidth: 50 },
		{ id: 'q9', label: 'Ques9', minWidth: 200 }, { id: 'a9', label: 'Ans9', minWidth: 50 },
		{ id: 'q10', label: 'Ques10', minWidth: 200 }, { id: 'a10', label: 'Ans10', minWidth: 50 },
		{ id: 'q11', label: 'Ques11', minWidth: 200 }, { id: 'a11', label: 'Ans11', minWidth: 50 },
		{ id: 'q12', label: 'Ques12', minWidth: 200 }, { id: 'a12', label: 'Ans12', minWidth: 50 },
		{ id: 'q13', label: 'Ques13', minWidth: 200 }, { id: 'a13', label: 'Ans13', minWidth: 50 },
		{ id: 'q14', label: 'Ques14', minWidth: 200 }, { id: 'a14', label: 'Ans14', minWidth: 50 },
		{ id: 'q15', label: 'Ques15', minWidth: 200 }, { id: 'a15', label: 'Ans15', minWidth: 50 },
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
    
    const getSubmissions = async () => {
		let token = localStorage.getItem('authToken');
		let subs = []
		var i,j,k;
		var q = [];
		var a = [];


		let url = `https://scholastic-quiz-app.herokuapp.com/viewSubmissions`;
		let response = null;

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
					setNoSub('No Submissions yet...');
				}
				setLoading(true);
				for(i = 0; i < response.data.length; i++){
					var name = response.data[i].name;
					var email = response.data[i].email;
					var score = response.data[i].score;
					for(j = 0, k = 0; j < response.data[i].responses.length; j++, k++){
						q[j] = response.data[i].responses[j].questionText;
						a[j] = response.data[i].responses[j].selectedOption;
					}
					for(; k < 15; k++){
						q[k] = "Not Assigned";
						a[k] = "N.A.";
					}
					subs = [...subs,createData(name,email,score,q[0],a[0],q[1],a[1],q[2],a[2],q[3],a[3],q[4],a[4],q[5],a[5],q[6],a[6],q[7],a[7],q[8],a[8],q[9],a[9],q[10],a[10],q[11],a[11],q[12],a[12],q[13],a[13],q[14],a[14])];
				}
				setRows([...rows,...subs]);
				setLoading(false);
			}

		} catch(error) {
			console.log(error);
		}
	}

    React.useEffect(() => {
		getSubmissions();
    }, []);

    return(
        loading? <Loading />
        :
        <div>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table" size="small" >
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
		</div>
    )
}