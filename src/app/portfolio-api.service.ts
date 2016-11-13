import { Http, Headers}	from '@angular/http';
import { Injectable }	from '@angular/core';

@Injectable()
export class PortfolioApiService {

	public apiUrl = "http://flynndev.us:44562";

	constructor ( public http: Http ) { }

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

}
