import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Skill } from './skill';
import { PortfolioApiHeaders } from '../headers';

@Injectable()
export class SkillService {
	private headers = PortfolioApiHeaders;
	private skillsUrl = 'http://flynndev.us:44562/skills';  // URL to web api
	constructor(private http: Http) { }
	getSkills(): Promise<Skill[]> {
		return	this.http.get(this.skillsUrl, {headers: this.headers})
				.toPromise()
				.then(response => response.json() as Skill[])
				.catch(this.handleError);
	}
	getSkill(id: number): Promise<Skill> {
		return	this.http.get(`${this.skillsUrl}/${id}`, {headers: this.headers})
				.toPromise()
				.then(response => response.json() as Skill)
				.catch(this.handleError);
	}
	delete(id: number): Promise<void> {
		return	this.http.delete(`${this.skillsUrl}/${id}`, {headers: this.headers})
				.toPromise()
				.then(() => null)
				.catch(this.handleError);
	}
	create(obj): Promise<Skill> {
		return	this.http
				.post(this.skillsUrl, JSON.stringify(obj), {headers: this.headers})
				.toPromise()
				.then(res => res.json().data)
				.catch(this.handleError);
	}
	update(skill: Skill): Promise<Skill> {
		const url = `${this.skillsUrl}/${skill.id}`;
		return	this.http
				.put(url, JSON.stringify(skill), {headers: this.headers})
				.toPromise()
				.then(() => Skill)
				.catch(this.handleError);
	}
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
