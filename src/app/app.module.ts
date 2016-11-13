import './rxjs-extensions';
import { NgModule }			from '@angular/core';
import { BrowserModule }	from '@angular/platform-browser';
import { FormsModule }  	from '@angular/forms';
import { HttpModule }   	from '@angular/http';

import { AppComponent } 	from './app.component';
import { SkillsComponent }	from './skills.component'
import { SkillService }		from './skill.service';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule
	],
	declarations: [
		AppComponent,
		SkillsComponent
	],
	bootstrap: [ AppComponent ],
	providers: [ SkillService ]
})
export class AppModule { }
