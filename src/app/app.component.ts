import { Component, OnInit }	from '@angular/core';

import { PortfolioApiService } 	from './portfolio-api.service';
import { LoggerService }        from './logger.service';

@Component({
	selector: 'my-app',
	templateUrl: './app.component.html'
})
export class AppComponent {

		constructor(
			public api: PortfolioApiService,
		    public log: LoggerService
		) {
		}

}
