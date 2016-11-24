import './rxjs-extensions';
import { NgModule }			from '@angular/core';
import { BrowserModule }	from '@angular/platform-browser';

import { HttpModule }   	from '@angular/http';

import {
	AppComponent ,
	SkillsComponent,
	UsersComponent,
	UserComponent }		from './index';

import { LoggerService } from './logger.service';
import { PortfolioApiService } from './portfolio-api.service';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule
	],
	declarations: [
		AppComponent,
		SkillsComponent,
		UsersComponent,
		UserComponent
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
