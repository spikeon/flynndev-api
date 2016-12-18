import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

declare var jQuery: any;

@Component({
	selector: 'navigation',
	templateUrl: './nav.component.html',
	styleUrls: [ './nav.component.scss' ]
})
export class NavComponent implements OnInit {

	constructor( public api: PortfolioApiService, public log: LoggerService ) { }

	ngOnInit(): void {

	}
}
