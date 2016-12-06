import { Component, OnInit } 	from '@angular/core';
import { PortfolioApiService }	from '../portfolio-api.service';
import { LoggerService }        from '../logger.service';
import { ProjectsService }      from "./project.service";


@Component({
	selector: 'projects',
	templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

	constructor(
		public api: PortfolioApiService,
		public log: LoggerService,
	    public projects: ProjectsService
	) { }

	ngOnInit(): void { }

}
