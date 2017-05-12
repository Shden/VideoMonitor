import React, { Component } from 'react';		// eslint-disable-line no-unused-vars
import { Image } from 'react-bootstrap';		// eslint-disable-line no-unused-vars
import { Button } from 'react-bootstrap';		// eslint-disable-line no-unused-vars
import { ButtonToolbar } from 'react-bootstrap';	// eslint-disable-line no-unused-vars
import { Alert } from 'react-bootstrap';		// eslint-disable-line no-unused-vars
import { Glyphicon } from 'react-bootstrap';		// eslint-disable-line no-unused-vars
import HouseStatus from './HouseStatus';		// eslint-disable-line no-unused-vars

import 'whatwg-fetch';

export default class AlertsList extends Component {

	constructor() {
		super();
		this.state = { alerts: [] };
	}

	render() {

		var divStyle = {
			width: 276,
			float: 'left'
		};

		var alerts = this.state.alerts.map(alert => {
			var startDate = new Date(alert.start);
			return (
				<div style={divStyle}>
					<a href={alert.fileURL + '.mp4'}>
						<Image src={alert.fileURL + '.jpg'} thumbnail/>
					</a>
					<p>
						Время: {startDate.toLocaleString()}<br/>
						Камера: {alert.cam}
					</p>
					<ButtonToolbar>
						<Button bsStyle="primary" bsSize="small"
							href={alert.fileURL + '.mp4'}>
							Просмотр
						</Button>
						<Button bsStyle="danger" bsSize="small"
							onClick={() => this.deleteVideo(alert.fileURL)}>
							Удалить
						</Button>
					</ButtonToolbar>
				</div>
			);
		});

		return (
			<div>
				<HouseStatus/>
				{this.getDescription()}
				{alerts}
			</div>
		);
		//return React.createElement('div', null, ...alerts);
	}

	getDescription() {
		if (this.state.alerts.length > 0)
			return (
				<Alert bsStyle="warning">
					<p><Glyphicon glyph="glyphicon glyphicon-exclamation-sign"/>
					&nbsp;За время наблюдения обнаружено
					инцидентов: <b>{this.state.alerts.length}</b>.
					</p>
				</Alert>
			);
		else {
			return (
				<Alert bsStyle="success">
					<p><Glyphicon glyph="glyphicon glyphicon-ok"/>
					&nbsp;Инциденты не обнаружены.</p>
				</Alert>
			);
		}
	}

	componentDidMount() {
		this.loadData();
	}

	deleteVideo(videoURL) {

		this.setState(
			{ alerts: this.state.alerts.filter((alert) => {
				return alert.fileURL !== videoURL;
			})});

		fetch(videoURL, { method: 'DELETE' })
			.catch(err => alert(err));
	}

	loadData() {
		fetch('/alerts/getList', { credentials: 'same-origin' })
			.then(responce => responce.json())
			.then(json => { this.setState({ alerts: json }); })
			.catch(err => alert(err));
	}
}
