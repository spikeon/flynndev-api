import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

import { ActivatedRoute }       from '@angular/router';

declare let jQuery: any;
declare let hljs: any;

@Component({
	selector: 'project',
	templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
	sub;
	project = {};
	currentFile = { content : " Choose a file from the left to view it's content " };

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
					this.log.info(project);
					this.project = project;
					if(project.files.length > 0) this.openFile(project.files[0]);
					else{
						this.openFile({ name: '404', content : " /* Sorry, this project doesn't have any files currently */ " })
					}

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

	openFile(file){
		this.currentFile = file;
		let $code = jQuery('.codearea');
		let highlighted = hljs.highlightAuto(file.content);
		$code.html(highlighted.value);
	}

}
