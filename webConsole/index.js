// import 'normalize.css/normalize.css';
// import './styles/main.less';
import React from 'react';					// eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';	// eslint-disable-line no-unused-vars

import AlertsList from './AlertsList';				// eslint-disable-line no-unused-vars
import { Navbar, Nav, NavItem } from 'react-bootstrap';		// eslint-disable-line no-unused-vars
import { PageHeader } from 'react-bootstrap';			// eslint-disable-line no-unused-vars
import { Grid, Row, Col } from 'react-bootstrap';		// eslint-disable-line no-unused-vars

const App = React.createClass({
	render() {
		return (
			<div>
				<Navbar inverse>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#">Видеомонитор</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<NavItem eventKey={1} href="/index">Журнал</NavItem>
							<NavItem eventKey={2} href="/about">О программе</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<Grid>
					<Row>
						<Col xs={12} md={12}>
							{this.props.children}
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
});

const About = React.createClass({
	render() {
		return (
			<div>
				<PageHeader>About</PageHeader>
				<p>Home surveillance console for Harbor.</p>
				<p>Build 0.3.</p>
				<p>Date 09-06-2017.</p>
				<p>Contact <a href="mailto:denis.afanassiev@gmail.com">denis.afanassiev@gmail.com</a></p>
			</div>
		);
	}
});

render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="about" component={About} />
			<Route path="index" component={AlertsList} />
		</Route>
	</Router>
	), document.getElementById('app')
);
