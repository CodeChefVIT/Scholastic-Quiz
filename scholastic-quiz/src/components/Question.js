import React from "react";
import {FormControl, RadioGroup, Radio, FormControlLabel, FormLabel, Grid } from '@material-ui/core'

function Question(props) {
    const [value, setValue] = React.useState('none');
	const handleChange = (event) => {
		setValue(event.target.value);
	};
	return (
        <Grid item xs={10} md={8} lg={7} style={{margin: 0, padding: '2%', backgroundColor: '#111', borderBottom: '5px solid #222', minHeight: '50vh'}}>
            <FormControl style={{margin: 'auto', width:"100%"}} component="fieldset">
                <FormLabel style={{padding: 10, color: '#ffa500',  width: 'calc(100% - 20px)', borderBottom: '2px solid #ffa500'}} component="legend">{props.id}</FormLabel>
                <RadioGroup aria-label="correct-choice" value={value} onChange={handleChange}>
                    <FormControlLabel value="op1" control={<Radio style={{color: '#ffa500', height: '8vh'}} />} label="Option 1" style={{margin: 0}} />
                    <FormControlLabel value="op2" control={<Radio style={{color: '#ffa500', height: '8vh'}} />} label="Option 2" style={{margin: 0}} />
                    <FormControlLabel value="op3" control={<Radio style={{color: '#ffa500', height: '8vh'}} />} label="Option 3" style={{margin: 0}} />
                    <FormControlLabel value="op4" control={<Radio style={{color: '#ffa500', height: '8vh'}} />} label="Option 4" style={{margin: 0}} />
                </RadioGroup>
            </FormControl>
        </Grid>
	)
}

export default Question;