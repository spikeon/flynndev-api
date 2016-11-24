import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

import { ActivatedRoute } from '@angular/router';

declare let fs: any;
declare let jQuery: any;

@Component({
	selector: 'project',
	templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
	sub;
	project = {};

	constructor(
		public api: PortfolioApiService,
		public log: LoggerService,
	    public route: ActivatedRoute
	) { }

	ngOnInit() {
		// Subscribe to route params
		this.sub = this.route.params.subscribe(params => {

			let id = params['id'];

			// Retrieve Pet with Id route param
			this.api.get('projects', id).subscribe(
				project => {
					this.project = project;
				},
				err => this.log.err('Failed to get Project'),
				() => this.log.info('Project Load Complete')
			);
		});


	}

	ngOnDestroy() {
		// Clean sub to avoid memory leak
		this.sub.unsubscribe();
	}

}
