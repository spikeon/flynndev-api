import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }               from '../logger.service';

@Component({
	selector: 'skills',
	templateUrl: './skills.component.html'
})
export class SkillsComponent implements OnInit {
	max: number;
	min: number;
	skills = [];
	Math = Math;

	constructor(
		public api: PortfolioApiService,
	    public log: LoggerService
		) { }

	processSkills() {

		// Reset Values
		this.min = 10000;
		this.max = 0;

		let today = new Date;

		// Get smallest year
		for (let skill of this.skills) if (skill.year < this.min) this.min = skill.year;

		// Process Years and display format for years
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

		// Get largest number of years
		for (let e of this.skills) {
			if (e.years > this.max) this.max = e.years;
		}

		// Ensure that no progress bar is 100% full
		this.max++;

	}

	getSkills() {

		this.api.list('skills')
		.subscribe(
			skills	=> {
				this.skills = skills;
				this.processSkills();
			},
			err		=> this.log.err('Failed to get skills'),
			()		=> this.log.info('Skills Complete')
		);

	}

	ngOnInit(): void {
		this.getSkills();
	}
}
