import { Injectable }	            from '@angular/core';
import { LoggerService }            from '../logger.service';
import { PortfolioApiService }      from '../portfolio-api.service';
import { Project }                  from '../interfaces';
import {Router}                     from "@angular/router";

declare let jQuery: any;

@Injectable()
export class ProjectsService {

	projects: Array<Project> = [];

	constructor (
		public api: PortfolioApiService,
		public log: LoggerService,
		private router: Router) {
		this.init();
	}

	init():void{
		this.api.list('projects').subscribe(
			projects	=> {
				this.log.info("Got Projects");
				this.projects = projects as Array<Project>;
			},
			err		=> this.log.err('Failed to get Projects'),
			()		=> this.log.info('Projects Complete')
		);
	}

	open(project){
		this.log.info(`Project ${project.name} Clicked`);
		this.router.navigate(['/project', project.id])
	}

}