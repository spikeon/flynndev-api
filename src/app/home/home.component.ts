import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

declare var jQuery: any;

@Component({
	selector: 'home',
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

	constructor( public api: PortfolioApiService, public log: LoggerService ) { }

	ngOnInit(): void {

	}
}
