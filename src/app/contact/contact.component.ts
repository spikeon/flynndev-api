import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

import { Mail }                 from './mail';

declare var jQuery: any;

@Component({
	selector:       'contact',
	templateUrl:    './contact.component.html'
})
export class ContactComponent implements OnInit {

	/* TODO: Place contact form in box that appears on every page, and stays open once opened, even if page is refreshed.
	 * The box will have a tab that says "Contact Me" and when clicked it slides up
	 * When the tab is clicked again it will slide down and stay down until clicked again, even if page is refreshed.
	 */

	public submitted:boolean = false;

	model:Mail;

	constructor( public api: PortfolioApiService, public log: LoggerService ) { }

	ngOnInit ( ) : void {

		if (  this.hasMessage() ) this.loadMessage();
		else this.newMessage();

	}

	hasMessage ( ) {

		return ( localStorage.getItem( "message_content" ) !== null );

	}

	loadMessage (  ) : void {

		this.model = new Mail( localStorage.getItem( "message_name" ) , localStorage.getItem( "message_email" ) , localStorage.getItem( "message_content" ) );

	}

	newMessage ( ) : void {

		this.model = new Mail("","","");

	}

	sendTestMessage ( ) : void {

		this.api.sendEmail("Test Dude", "test@test.com", "This is but a test of the test system.  \n Is this on a new line?");

	}

	onModelChange ( $event ) : void {

		// Save message to local storage

		localStorage.setItem ( "message_name",      this.model.name     );
		localStorage.setItem ( "message_email",     this.model.email    );
		localStorage.setItem ( "message_content",   this.model.content  );

	}

	sendMessage ( ) : void {

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

			this.submitted = true;

			localStorage.removeItem( "message_name"     );
			localStorage.removeItem( "message_email"    );
			localStorage.removeItem( "message_content"  );

		}

	}

}
