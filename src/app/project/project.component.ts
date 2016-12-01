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
	files = [];
	gallery = [];
	id;
	name;
	about;
	thumb;
	url;

	currentFile = { name : "Loading...", content : " Choose a file from the left to view it's content " };
	currentImage = "";
	//currentThumb;

	constructor(
		public api: PortfolioApiService,
		public log: LoggerService,
	    public route: ActivatedRoute
	) { }

	loadFromObj(project){
		this.id = project.id;
		this.name = project.name;
		this.about = project.about;
		this.thumb = project.thumb;
		this.url = project.url;
		this.files = project.files;
		this.gallery = project.gallery;
	}

	ngOnInit() {
		// Subscribe to route params
		this.sub = this.route.params.subscribe(params => {

			let id = params['id'];

			this.api.get('projects', id).subscribe(
				project => {
					this.log.info(project);
					this.loadFromObj(project);
					this.changeFile(this.files.length > 0 ? this.files[0] : { name: '404', content : " /* Sorry, this project doesn't have any files currently */ " });
					this.changeImage(this.gallery[0]);
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
		//this.currentThumb = image .'/150';
	}

}
