import { Component, OnInit }	from '@angular/core';
import { Headers, Http } 		from '@angular/http';

import { PortfolioApiService } 	from './portfolio-api.service';

declare var jQuery: any;


@Component({
	selector: 'my-app',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

		public token;
		public user;
		public error;

		constructor( public api: PortfolioApiService ) {}

		ngOnInit() {
			this.loadStorage();
		}

		loadStorage() {
			this.token = localStorage.getItem('token');
			this.user = JSON.parse(localStorage.getItem('user'));
			this.error = "";
			this.checkToken();
		}

		checkToken() {
			if (!this.token) return;
			this.api._get('auth', 'check')
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
			this.api._post({username, password}, 'auth')
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
