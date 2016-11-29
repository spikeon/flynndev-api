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
	currentFile = { name : "Loading...", content : " Choose a file from the left to view it's content " };
	currentImage = "";

	constructor(
		public api: PortfolioApiService,
		public log: LoggerService,
	    public route: ActivatedRoute
	) { }

	ngOnInit() {
		// Subscribe to route params
		this.sub = this.route.params.subscribe(params => {

			let id = params['id'];

			this.api.get('projects', id).subscribe(
				project => {
					this.log.info(project);
					this.project = project;
					this.changeFile(project.files.length > 0 ? project.files[0] : { name: '404', content : " /* Sorry, this project doesn't have any files currently */ " });
					this.changeImage(project.gallery[0]);
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

	openFile(e, file){
		e.preventDefault();
		this.changeFile(file);
	}

	changeFile(file){
		this.currentFile = file;
		let $code = jQuery('.codearea');
		let highlighted = hljs.highlightAuto(file.content);
		$code.html(highlighted.value);
	}

	changeImage(image){
		this.currentImage = image;
	}

}
