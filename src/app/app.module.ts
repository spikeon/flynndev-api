import './rxjs-extensions';
import { NgModule }			from '@angular/core';
import { BrowserModule }	from '@angular/platform-browser';
import { FormsModule }  	from '@angular/forms';
import { HttpModule }   	from '@angular/http';

import {
	AppComponent ,
	SkillsComponent,
	UsersComponent,
	UserComponent,
	PortfolioApiService }		from './index';

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
		PortfolioApiService
	]
})
export class AppModule { }
