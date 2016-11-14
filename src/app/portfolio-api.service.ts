import { Http, Headers}	from '@angular/http';
import { Injectable, OnInit }	from '@angular/core';

declare var jQuery: any;

@Injectable()
export class PortfolioApiService {
	public token;
	public user;
	public error;
	public message;
	public apiUrl = "http://flynndev.us:44562";

	constructor ( public http: Http ) {
		this.loadStorage();
	}

	hasUser () { return this.token ? true : false; }

	url (...segments) {
		let url = this.apiUrl;
		for (let segment of segments) url += `/${segment}`;
		return url;
	};

	public headers = new Headers({
		'Content-Type': 'application/json',
		'x-access-token' : localStorage.getItem('token')
	});

	_get (...segments) {
		return this.http.get(
			this.url(...segments),
			{ headers: this.headers })
			.map(response => response.json());
	}

	_post (data = {}, ...segments) {
		console.log(this.url(...segments));
		return this.http.post(
			this.url(...segments),
			JSON.stringify(data),
			{headers: this.headers})
			.map(response => response.json());
	}

	_put (data = {}, ...segments) {
		return this.http.put(
			this.url(...segments),
			JSON.stringify(data),
			{headers: this.headers})
			.map(response => response.json());
	}

	_delete (...segments) {
		return	this.http.delete(
			this.url(...segments),
			{headers: this.headers});
	}


	get 	( type, id ) 			{ return this._get(type, id); }

	list 	( type ) 				{ return this._get(type); }

	add 	( type, data = {} ) 	{ return this._post(data, type); }

	delete	( type, id ) 			{ return this._delete(type, id); }

	update	( type, object ) 		{ return this._put(object, type); }




	loadStorage() {
		this.token = localStorage.getItem('token');
		this.user = JSON.parse(localStorage.getItem('user'));
		this.error = "";
		this.message = "";
		this.checkToken();
	}

	checkToken() {
		if (!this.token) return;
		this._get('auth', 'check')
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
		this.message = "";
		this.user = {};

		localStorage.removeItem('token');
		localStorage.removeItem('user');
	}

	register ( event, name, username, password ) {
		event.preventDefault();
		this.error = "";
		this.message = "";
		this._post( { name, username, password }, 'auth', 'register')
			.subscribe(
				data => {
					jQuery('#registerModal').modal('hide');
					jQuery('#loginModal').modal('show');
					this.message = "Register Successfull";
					console.log('Register Successfull')
				},
				err => {
					console.log('Register Failed');
					this.error = "Register Failed";
				},
				() => {
					console.log('Register Complete');
				}
			);
	}

	login (event, username, password) {
		event.preventDefault();
		this.error = "";
		this._post( {username, password}, 'auth' )
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
					console.log(err);
					this.error = "Login Failed";
				},
				() => {
					console.log('Login Complete')
				}
			);

	}


}
