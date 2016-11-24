import { Http, Headers}	from '@angular/http';
import { Injectable }	from '@angular/core';

declare let jQuery: any;

@Injectable()
export class PortfolioApiService {
	public token;
	public user;
	public loginerror;
	public loginmessage;
	public registererror;
	public registermessage;
	public apiUrl = "http://flynndev.us:44562";

	constructor ( public http: Http ) {
		this.resetAlerts();
		this.loadStorage();
	}

	resetAlerts() {
		this.loginerror = "";
		this.loginmessage = "";
		this.registererror = "";
		this.registermessage = "";
	}

	hasUser() { return !!this.token; };
	isAdmin() { return this.user.admin === 1; }
	url (...segments) {
		let url = this.apiUrl;
		for (let segment of segments) url += `/${segment}`;
		return url;
	};

	getHeaders (){
		return new Headers({
			'Content-Type': 'application/json',
			'x-access-token' : this.token
		});
	}

	_get (...segments) {
		return this.http.get(
			this.url(...segments),
			{ headers: this.getHeaders() })
			.map(response => response.json());
	}

	_post (data = {}, ...segments) {
		console.log(this.url(...segments));
		return this.http.post(
			this.url(...segments),
			JSON.stringify(data),
			{headers: this.getHeaders()})
			.map(response => response.json());
	}

	_put (data = {}, ...segments) {
		return this.http.put(
			this.url(...segments),
			JSON.stringify(data),
			{headers: this.getHeaders()})
			.map(response => response.json());
	}

	_delete (...segments) {
		return	this.http.delete(
			this.url(...segments),
			{ headers: this.getHeaders() });
	}


	get 	( type, id ) 			{ return this._get(type, id); }
	list 	( type ) 				{ return this._get(type); }
	add 	( type, data = {} ) 	{ return this._post(data, type); }
	del	    ( type, id ) 			{ return this._delete(type, id); }
	update	( type, object ) 		{ return this._put(object, type); }

	loadStorage() {
		this.getToken();
		this.getUser();
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
					this.flushUser();
				}
			},
			() => {
				console.log('Token Check Failed');
				this.flushUser();
			},
			() => {
				console.log('Token Check Complete')
			}
		);
	}

	flushUser() {
		this.token = "";
		this.user = {};
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	}

	logout(event) {
		event.preventDefault();
		this.flushUser();
		this.resetAlerts();
	}

	register ( event, name, username, password ) {
		event.preventDefault();
		this.resetAlerts();
		this._post( { name, username, password }, 'auth', 'register')
			.subscribe(
				() => {
					jQuery('#registerModal').modal('hide');
					jQuery('#loginModal').modal('show');
					this.loginmessage = "Register Successful";
					console.log('Register Successful')
				},
				() => {
					console.log('Register Failed');
					this.registererror = "Register Failed";
				},
				() => {
					console.log('Register Complete');
				}
			);
	}

	setUser(user) {
		this.user = user;
		localStorage.setItem('user', JSON.stringify(user));
	}

	getUser(globally = true) {
		let user = JSON.parse(localStorage.getItem('user'));
		if (globally) this.user = user;
		return user;
	}

	setToken(token) {
		this.token = token;
		localStorage.setItem('token', token);
	}

	getToken(globally = true) {
		let token = localStorage.getItem('token');
		if (globally) this.token = token;
		return token;
	}

	login (event, username, password) {
		event.preventDefault();
		this.resetAlerts();
		this._post( {username, password}, 'auth' )
			.subscribe(
				data => {
					this.setUser(data.user);
					this.setToken(data.token);
					jQuery('#loginModal').modal('hide');
					console.log('Login Successful');
				},
				() => {
					console.log('Login Failed');
					this.loginerror = "Login Failed";
				},
				() => {
					console.log('Login Complete')
				}
			);

	}
}
