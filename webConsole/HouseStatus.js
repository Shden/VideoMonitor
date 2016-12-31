import React, { Component } from 'react';		// eslint-disable-line no-unused-vars
import { Button } from 'react-bootstrap';		// eslint-disable-line no-unused-vars
import { PageHeader } from 'react-bootstrap';		// eslint-disable-line no-unused-vars
import { Glyphicon } from 'react-bootstrap';		// eslint-disable-line no-unused-vars
import { ButtonToolbar } from 'react-bootstrap';	// eslint-disable-line no-unused-vars
import 'whatwg-fetch';

export default class HouseStatus extends Component {

	constructor() {
		super();
		this.state = { houseStatus: '' };
	}

	render() {
		var spanStyle = {
			float: 'right'//,
			//width: 500
		};
		return (
			<PageHeader>{this.getStatusAttr().title}
				<ButtonToolbar style={spanStyle}>
					<Button bsStyle={this.getStatusAttr().btnStyle}
						onClick={() => this.toggleStatus()}
						bsSize="large">
						{this.getStatusAttr().action}
					</Button>
					<Button bsSize="large" href="/index">
						<Glyphicon glyph="refresh"/> Обновить
					</Button>
				</ButtonToolbar>
			</PageHeader>
		);
	}

	getStatusAttr() {
		switch (this.state.houseStatus) {
		case 'standby':
			return {
				title: 'Наблюдение',
				action: 'Закончить наблюдение',
				btnStyle: 'warning',
				changeTo: 'presence'
			};

		case 'presence':
			return {
				title: 'Ожидание',
				action: 'Начать наблюдение',
				btnStyle: 'danger',
				changeTo: 'standby'
			};
		default:
			return {
				title: '',
				action: '',
				btnStyle: 'primary',
				changeTo: ''
			};
		}
	}

	componentDidMount() {
		this.loadData();
	}

	loadData() {
		fetch('/configuration/houseStatus')
			.then(responce => responce.json())
			.then(json => { this.setState(json); })
			.catch(err => alert(err));
	}

	toggleStatus() {
		fetch(
			`/configuration/houseStatus/${this.getStatusAttr().changeTo}`,
			{ method: 'PUT' })
			.then(responce => responce.json())
			.then(json => { this.setState(json); })
			.catch(err => alert(err));
	}
}
