import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

import { ActivatedRoute }       from '@angular/router';
import {ProjectsService} from "./projects.service";

declare let jQuery: any;
declare let hljs: any;

@Component({
	selector: 'project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterViewInit {
	@ViewChild('codeoutput') code:ElementRef;

	currentFile = { name : "Loading...", content : " Choose a file from the left to view it's content " };
	currentImage = "";

	constructor(
		public api: PortfolioApiService,
		public log: LoggerService,
	    public route: ActivatedRoute,
	    public projects: ProjectsService
	) { }

	ngOnInit() { }

	ngAfterViewInit(){
		/* TODO: Figure out how to make this work if it ISN'T loaded"; */
		if( this.projects.loaded ) {

			const showFiles = this.projects.currentProject.files.length > 0 || this.api.hasUser();

			if (showFiles) this.changeFile(this.projects.currentProject.files.length > 0 ?
				this.projects.currentProject.files[0] :
				{
					name: '404',
					content: " /* Sorry, this project doesn't have any files currently */ "
				}
			);
			this.changeImage(this.projects.currentProject.gallery[0]);
		}
	}

	openFile(e, file){
		e.preventDefault();
		this.changeFile(file);
	}

	changeFile(file){
		this.currentFile = file;
		let $code = jQuery(this.code.nativeElement);
		let highlighted = hljs.highlightAuto(file.content);
		$code.html(highlighted.value);
	}

	changeImage(image){
		this.currentImage = image;
	}

}
