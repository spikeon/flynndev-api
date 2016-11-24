import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
	selector: 'projects',
	templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
	projects = [];

	constructor(
		public api: PortfolioApiService,
		public log: LoggerService,
		private router: Router,
	) { }

	list() {

		this.api.list('projects')
			.subscribe(
				projects	=> {
					this.projects = projects;
				},
				err		=> this.log.err('Failed to get projects'),
				()		=> this.log.info('Projects Complete')
			);

	}

	open(project){
		this.log.info(`Project ${project.name} Clicked`);
		this.router.navigate(['/project', project.id])
	}

	ngOnInit(): void {
		this.list();
	}
}
