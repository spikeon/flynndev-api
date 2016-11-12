import { Component, OnInit } from '@angular/core';

import { Experience } from './experience';
import { ExperienceService} from './experience.service';


@Component({
	selector: 'experiences',
	templateUrl: './experiences.component.html'
})
export class ExperiencesComponent implements OnInit {
	max: number;
	min: number;
	experiences: Experience[];

	constructor(
		private experienceService: ExperienceService,
		) { }

getExperiences(): void {
	this.min = 10000;
	this.max = 0;
	this.experienceService
		.getExperiences()
		.then( experiences => this.experiences = experiences)

		.then( () => {
			for (let i in this.experiences) {
				if (this.experiences[i].year < this.min) this.min = this.experiences[i].year;
			}
		}).then(() => {
			let today = new Date;
			for (let i in this.experiences) {
				let years = today.getFullYear() - this.experiences[i].year;
				let niceyears;
				if (years === 0) {
					years = 1;
					niceyears = "< 1 Year";
				}
				else if (years === 1) niceyears = years + " Year";
				else niceyears = years + " Years";
				this.experiences[i].years = years;
				this.experiences[i].niceyears = niceyears;
			}
			for (let e of this.experiences) {
				if (e.years > this.max) this.max = e.years;
			}
			this.max++;
		});
	}

	Math = Math;

	ngOnInit(): void {
		this.getExperiences();
	}
}
