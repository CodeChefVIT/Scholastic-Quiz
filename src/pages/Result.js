import React from "react";
import { Typography, Container } from "@material-ui/core";
import './ErrorPage.css';

function ErrorPage() {
	return (
		<div className="error-section">
			<Container>
				<Typography variant="h2" className="error-msg"> Result Page..</Typography>
			</Container>
		</div>
	)
}

export default ErrorPage;