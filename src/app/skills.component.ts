import { Component, OnInit } from '@angular/core';

import { Skill } from './skill';
import { SkillService } from './skill.service';


@Component({
	selector: 'skills',
	templateUrl: './skills.component.html'
})
export class SkillsComponent implements OnInit {
	max: number;
	min: number;
	experiences: Skill[];

	constructor(
		private skillService: SkillService,
		) { }

getSkills(): void {
	this.min = 10000;
	this.max = 0;
	this.skillService
		.getExperiences()
		.then( skills => this.skills = skills)

		.then( () => {
			for (let i in this.skills) {
				if (this.skills[i].year < this.min) this.min = this.skills[i].year;
			}
		}).then(() => {
			let today = new Date;
			for (let i in this.skills) {
				let years = today.getFullYear() - this.skills[i].year;
				let niceyears;
				if (years === 0) {
					years = 1;
					niceyears = "< 1 Year";
				}
				else if (years === 1) niceyears = years + " Year";
				else niceyears = years + " Years";
				this.skills[i].years = years;
				this.skills[i].niceyears = niceyears;
			}
			for (let e of this.skills) {
				if (e.years > this.max) this.max = e.years;
			}
			this.max++;
		});
	}

	Math = Math;

	ngOnInit(): void {
		this.getSkills();
	}
}
