import { Injectable }	            from '@angular/core';
import { LoggerService }            from '../logger.service';
import { PortfolioApiService }      from '../portfolio-api.service';
import { Project, Projects }        from '../interfaces';
import { Router }                   from "@angular/router";

declare let jQuery: any;

@Injectable()
export class ProjectsService {

	projects: Array<Project> = [];
	featuredProjects: Array<Project> = [];
	fullProjectsById: Projects = {};
	currentProject:Project;

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
				for(let i in this.projects){
					if(this.projects[i].featured) this.featuredProjects.push(this.projects[i]);
				}
			},
			err		=> this.log.err('Failed to get Projects'),
			()		=> this.log.info('Projects Complete')
		);
		this.api.list('projects','all').subscribe(
			( projects:Project ) => {
				this.log.info("Got Projects Full");
				for(let i in projects) this.fullProjectsById[projects[i].id] = projects[i];
			},
			err		=> this.log.err('Failed to get Projects Full'),
			()		=> this.log.info('Projects Full Complete')
		);
	}

	open(project){
		this.log.info(`Project ${project.name} Clicked`);
		this.currentProject = this.fullProjectsById[project.id];
		this.router.navigate(['/project', project.id]);
	}

}