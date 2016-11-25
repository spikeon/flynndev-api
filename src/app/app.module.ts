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
	PageNotFoundComponent
	}		from './index';

import { LoggerService } from './logger.service';
import { PortfolioApiService } from './portfolio-api.service';

const appRoutes: Routes = [
	{ path: 'project/:id', component: ProjectComponent },
	{ path: '', component: HomeComponent },
	//{ path: '**', component: PageNotFoundComponent }
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
		PageNotFoundComponent
	],
	bootstrap: [
		AppComponent
	],
	providers: [
		PortfolioApiService,
		LoggerService
	]
})
export class AppModule { }
