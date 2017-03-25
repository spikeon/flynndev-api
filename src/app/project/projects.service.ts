import {Injectable, OnInit, OnDestroy}                from '@angular/core';
import { LoggerService }            from '../logger.service';
import { PortfolioApiService }      from '../portfolio-api.service';
import { Project, Projects }        from '../interfaces';
import { Router, ActivatedRoute, Params }                   from "@angular/router";

declare let jQuery: any;

@Injectable()
export class ProjectsService {

	loaded:boolean;
	on_load = () => {};
	projects: Array<Project> = [];
	featuredProjects: Array<Project> = [];
	fullProjectsById: Projects = {};
	currentProject:Project;
	tags: Array<string> = [];
	tag_counts = {};
	currentTags: Array<string> = [];

	id: string;

	constructor (
		public api: PortfolioApiService,
		public log: LoggerService,
		private router: Router,
		private route: ActivatedRoute
		) {

		this.loaded = false;

		/*
			NOTE:
				This is VITAL when using a service instead of the component to load data.  When the router sends the
				viewer to this page that's when it sets the current project.  When the page is loaded directly you
				need to account for that.

				Using a service for this form of data-retreival was my own idea, I'm not going to be able to find
				references to it on google in the future, hence this note.
		 */

		if(this.route.snapshot.firstChild.url.length > 0 &&  this.route.snapshot.firstChild.url[0].path == "project"){
			this.id = this.route.snapshot.firstChild.params['id'];
		}

		this.init();

	}

	init():void{
		this.api.list('projects').subscribe(
			projects	=> {
				this.log.info("Got Projects");
				this.projects = projects as Array<Project>;
				// this.log.info(this.projects);
				for(let i in this.projects){
					if(this.projects[i].featured) this.featuredProjects.push(this.projects[i]);
					if(this.projects[i].tags){
						for(let tag of this.projects[i].tags){
							this.addTag(tag);
						}
					}
				}
				this.log.info(this.featuredProjects);
			},
			err		=> this.log.err('Failed to get Projects'),
			()		=> this.log.info('Projects Complete')
		);
		this.api._get('projects','all').subscribe(
			( projects:Project ) => {
				this.log.info("Got Projects Full");
				for(let i in projects) this.fullProjectsById[projects[i].id] = projects[i];
				this.loaded = true;
				this.on_load();

				if ( this.id ) {
					console.log(`Loading project for ${this.id}`);
					this.currentProject = this.fullProjectsById[this.id];

					this.log.info(`Project ${this.currentProject.name} Opened Directly`);

				}

			},
			err		=> this.log.err('Failed to get Projects Full'),
			()		=> this.log.info('Projects Full Complete')
		);
	}
	openAll(e) : void {
		e.preventDefault();
		this.router.navigate(['/project']);
	}
	open(e, project:Project) : void{
		e.preventDefault();
		this.log.info(`Project ${project.name} Clicked`);
		this.currentProject = this.fullProjectsById[project.id];
		// this.log.info(this.currentProject);
		this.router.navigate(['/project', project.id]);
	}

	get taglist():Array<string> {
		let ret = [];
		for(let tag of this.tags) if(this.tag_counts[tag] > 1) ret.push(tag);
		console.log(ret);
		console.log(this.tags);
		console.log(this.tag_counts);
		return ret;
	}

	addTag(tag) : void {
		if(this.tags.indexOf(tag) == -1) {
			this.tags.push(tag);
			if(!this.tag_counts.hasOwnProperty(tag)) this.tag_counts[tag] = 0;
			this.tag_counts[tag]++;
			this.tags.sort();
		}

	}

	toggleTag(e, tag:string) : void {
		e.preventDefault();
		let i = this.currentTags.indexOf(tag);
		if (i === -1) this.currentTags.push(tag);
		else this.currentTags.splice( i, 1);
	}

	tagStatus ( tag:string ) : boolean {
		return this.currentTags.indexOf(tag) !== -1;
	}

	isTagged(project) : boolean {

		if(this.currentTags.length == 0) return true;
		else{
			if(!project.tags) return false;
			for(let tag of project.tags) if(this.tagStatus(tag)) return true;
			return false;
		}
	}


}