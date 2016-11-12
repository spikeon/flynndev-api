import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Experience } from './experience';
@Injectable()
export class ExperienceService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private experiencesUrl = 'http://flynndev.us:44562/experiences';  // URL to web api
	constructor(private http: Http) { }
	getExperiences(): Promise<Experience[]> {
		return	this.http.get(this.experiencesUrl)
				.toPromise()
				.then(response => response.json() as Experience[])
				.catch(this.handleError);
	}
	getExperience(id: number): Promise<Experience> {
		return	this.http.get(`${this.experiencesUrl}/${id}`)
				.toPromise()
				.then(response => response.json().data as Experience)
				.catch(this.handleError);
	}
	delete(id: number): Promise<void> {
		return	this.http.delete(`${this.experiencesUrl}/${id}`, {headers: this.headers})
				.toPromise()
				.then(() => null)
				.catch(this.handleError);
	}
	create(obj): Promise<Experience> {
		return	this.http
				.post(this.experiencesUrl, JSON.stringify(obj), {headers: this.headers})
				.toPromise()
				.then(res => res.json().data)
				.catch(this.handleError);
	}
	update(experience: Experience): Promise<Experience> {
		const url = `${this.experiencesUrl}/${experience.id}`;
		return	this.http
				.put(url, JSON.stringify(experience), {headers: this.headers})
				.toPromise()
				.then(() => experience)
				.catch(this.handleError);
	}
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
