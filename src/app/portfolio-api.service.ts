import { Http, Headers}	from '@angular/http';
import { Injectable, OnInit }	from '@angular/core';

declare var jQuery: any;

@Injectable()
export class PortfolioApiService implements OnInit {
	public token;
	public user;
	public loginerror;
	public loginmessage;
	public registererror;
	public registermessage;
	public apiUrl = "http://flynndev.us:44562";

	constructor ( public http: Http ) { }

	ngOnInit () {
		this.resetAlerts();
		this.loadStorage();
	};

	resetAlerts() {
		this.loginerror = "";
		this.loginmessage = "";
		this.registererror = "";
		this.registermessage = "";
	}

	hasUser() { return this.token ? true : false; };

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
			err => {
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
		this.resetAlerts();
	}

	register ( event, name, username, password ) {
		event.preventDefault();
		this.resetAlerts();
		this._post( { name, username, password }, 'auth', 'register')
			.subscribe(
				data => {
					jQuery('#registerModal').modal('hide');
					jQuery('#loginModal').modal('show');
					this.loginmessage = "Register Successfull";
					console.log('Register Successfull')
				},
				err => {
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

	getUser(globaly = true) {
		let token = JSON.parse(localStorage.getItem('user'));
		if (globaly) this.token = token;
		return token;
	}

	setToken(token) {
		this.token = token;
		localStorage.setItem('token', token);
	}

	getToken(globaly = true) {
		let token = localStorage.getItem('token');
		if (globaly) this.token = token;
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
					console.log('Login Successfull')
				},
				err => {
					console.log('Login Failed');
					this.loginerror = "Login Failed";
				},
				() => {
					console.log('Login Complete')
				}
			);

	}


}
