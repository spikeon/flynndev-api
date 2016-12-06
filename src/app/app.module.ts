import './rxjs-extensions';
import { NgModule }			from '@angular/core';
import { BrowserModule }	from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';


import { HttpModule }   	from '@angular/http';

import {
	AppComponent ,
	SkillsComponent,
	UsersComponent,
	UserComponent,
	ProjectComponent,
	ProjectsComponent,
	HomeComponent,
	PageNotFoundComponent,
	ProtectedComponent,
	FeaturedProjectsComponent
	}		from './index';

import { LoggerService } from './logger.service';
import { PortfolioApiService } from './portfolio-api.service';
import { ProjectsService } from "./project/projects.service";

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'project', component: ProjectsComponent },
	{ path: 'project/:id', component: ProjectComponent },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(appRoutes)
	],
	declarations: [
		AppComponent,
		SkillsComponent,
		UsersComponent,
		UserComponent,
		ProjectComponent,
		ProjectsComponent,
		HomeComponent,
		PageNotFoundComponent,
		ProtectedComponent,
		FeaturedProjectsComponent
	],
	bootstrap: [
		AppComponent
	],
	providers: [
		PortfolioApiService,
		LoggerService,
		ProjectsService
	]
})
export class AppModule { }
