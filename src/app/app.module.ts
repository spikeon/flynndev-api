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
	FeaturedProjectsComponent,
	ContactComponent,
	ContactSlideupComponent,
	NavComponent,
	LoginModalComponent,
	RegisterModalComponent,
	ModalsComponent
	}		from './index';

import { LoggerService } from './logger.service';
import { PortfolioApiService } from './portfolio-api.service';
import { ProjectsService } from "./project/projects.service";
import { FormsModule }   from '@angular/forms';


const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'project', component: ProjectsComponent },
	{ path: 'project/:id', component: ProjectComponent },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(appRoutes),
		FormsModule
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
		FeaturedProjectsComponent,
		ContactComponent,
		ContactSlideupComponent,
		NavComponent,
		LoginModalComponent,
		RegisterModalComponent,
		ModalsComponent
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
