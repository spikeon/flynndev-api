import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

declare var jQuery: any;

@Component({
	selector: 'modals',
	templateUrl: './modals.component.html'
})
export class ModalsComponent {
	constructor( public api: PortfolioApiService, public log: LoggerService ) { }
}
