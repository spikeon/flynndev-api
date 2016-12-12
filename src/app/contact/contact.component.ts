import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

import { Mail }                 from './mail';

declare var jQuery: any;

@Component({
	selector: 'contact',
	templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

	public submitted:boolean = false;

	model = new Mail("","","");

	constructor( public api: PortfolioApiService, public log: LoggerService ) { }

	ngOnInit(): void {

	}

	newMessage(): void {
		this.model = new Mail("","","");
	}

	sendTestMessage(): void {
		this.api.sendEmail("Test Dude", "test@test.com", "This is but a test of the test system.  \n Is this on a new line?")
	}

	sendMessage(): void {

		let email_re = /\S+@\S+\.\S+/;

		if( ! this.model.name ) {
			// Name is blank

		}
		else if( ! email_re.test(this.model.email) ) {
			// Email is invalid

		}
		else if( ! this.model.content ){
			// Content is blank

		}
		else {
			this.api.sendEmail( this.model.name , this.model.email , this.model.content );
		}

	}

}
