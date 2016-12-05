import { Component } 	        from '@angular/core';
import { PortfolioApiService }	from '../portfolio-api.service';
import { LoggerService }        from '../logger.service';

@Component({
	selector: 'protected',
	templateUrl: './protected.component.html'
})
export class ProtectedComponent {

	constructor(public api: PortfolioApiService,
	            public log: LoggerService) {}
}