import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

declare var jQuery: any;

@Component({
	selector: 'contact',
	templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

	constructor( public api: PortfolioApiService, public log: LoggerService ) { }

	ngOnInit(): void {

	}

	sendTestMessage(): void {
		this.api.sendEmail("Test Dude", "test@test.com", "This is but a test of the test system.  \n Is this on a new line?")
	}

}
