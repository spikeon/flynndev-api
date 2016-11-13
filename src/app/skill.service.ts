import 'rxjs/add/operator/toPromise';
import { Injectable }    		from '@angular/core';
import { Headers, Http } 		from '@angular/http';

import { Skill } 				from './skill';
import { PortfolioApiHeaders }	from '../headers';
import { Config }				from '../config';

@Injectable()
export class SkillService {
	private headers = PortfolioApiHeaders;

	constructor(private http: Http) { }
	getSkills(): Promise<Skill[]> {
		return	this.http.get(Config.url('skills'), {headers: this.headers})
				.toPromise()
				.then(response => response.json() as Skill[])
				.catch(this.handleError);
	}
	getSkill(id: number): Promise<Skill> {
		return	this.http.get(Config.url('skills', id))
				.toPromise()
				.then(response => response.json() as Skill)
				.catch(this.handleError);
	}
	delete(id: number): Promise<void> {
		return	this.http.delete(Config.url('skills', id), {headers: this.headers})
				.toPromise()
				.then(() => null)
				.catch(this.handleError);
	}
	create(obj): Promise<Skill> {
		return	this.http
				.post(Config.url('skills'), JSON.stringify(obj), {headers: this.headers})
				.toPromise()
				.then(res => res.json())
				.catch(this.handleError);
	}
	update(skill: Skill): Promise<Skill> {

		return	this.http
				.put(Config.url('skills', skill.id), JSON.stringify(skill), {headers: this.headers})
				.toPromise()
				.then(() => skill)
				.catch(this.handleError);
	}
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
