import { Component } 	from '@angular/core';
import { PortfolioApiService }	from '../portfolio-api.service';
import { LoggerService }        from '../logger.service';
import { ProjectsService }      from "./projects.service";


@Component({
	selector: 'projects',
	templateUrl: './projects.component.html'
})
export class ProjectsComponent {

	constructor(
		public api: PortfolioApiService,
		public log: LoggerService,
	    public projects: ProjectsService
	) { }

}
