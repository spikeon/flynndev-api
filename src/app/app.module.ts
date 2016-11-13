import './rxjs-extensions';
import { NgModule }			from '@angular/core';
import { BrowserModule }	from '@angular/platform-browser';
import { FormsModule }  	from '@angular/forms';
import { HttpModule }   	from '@angular/http';

import {
	AppComponent ,
	SkillsComponent,
	PortfolioApiService }		from './index';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule
	],
	declarations: [
		AppComponent,
		SkillsComponent
	],
	bootstrap: [
		AppComponent
	],
	providers: [
		PortfolioApiService
	]
})
export class AppModule { }
