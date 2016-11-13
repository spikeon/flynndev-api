import './rxjs-extensions';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { ExperiencesComponent } from './experiences.component'
import { ExperienceService } from './experience.service';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule
	],
	declarations: [
		AppComponent,
		ExperiencesComponent
	],
	bootstrap: [ AppComponent ],
	providers: [ ExperienceService]
})
export class AppModule { }
