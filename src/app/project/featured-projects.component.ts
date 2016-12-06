import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

import {ProjectsService}        from "./project.service";

declare var jQuery: any;

@Component({
	selector: 'featured-projects',
	templateUrl: './projects.component.html'
})
export class FeaturedProjectsComponent implements OnInit {


	constructor(
		public api: PortfolioApiService,
		public log: LoggerService,
	    public projects: ProjectsService
	) { }


	ngOnInit(): void { }

}
