import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { PortfolioApiHeaders } from '../headers';

import { Config }				from '../config';

declare var jQuery: any;


@Component({
	selector: 'my-app',
	templateUrl: './app.component.html'
})
export class AppComponent {

		public token;
		public user;
		public error;

		constructor( public http: Http) {
			this.token = localStorage.getItem('token');
			this.user = JSON.parse(localStorage.getItem('user'));
			this.error = "";
			this.checkToken();
		}

		private headers = PortfolioApiHeaders;

		checkToken() {
			if (!this.token) return;
			this.http.get(Config.url('auth','check'), { headers: this.headers })
			.map(response => response.json())
			.subscribe(
				data => {
					if (data.result) console.log("Token Still Valid");
					else {
						console.log("Token Invalid");
						this.token = "";
					}
				},
				err => {
					console.log('Token Check Failed');
					this.token = "";
				},
				() => {
					console.log('Token Check Complete')
				}
			);
		}

		logout(event) {
			event.preventDefault();
			this.token = "";
			this.user = {};

			localStorage.removeItem('token');
			localStorage.removeItem('user');
		}

		login (event, username, password) {

			event.preventDefault();

			this.error = "";

			this.http.post(
				Config.url('auth'),
				JSON.stringify({username, password}),
				{headers: this.headers})
				.map(response => response.json())
				.subscribe(
					data => {
						this.user = data.user;
						this.token = data.token;
						localStorage.setItem('token', this.token);
						localStorage.setItem('user', JSON.stringify(this.user));
						jQuery('#loginModal').modal('hide');
						console.log('Login Successfull')

					},
					err => {
						console.log('Login Failed');
						this.error = "Login Failed";
					},
					() => {
						console.log('Login Complete')
					}
				);

		}

}
