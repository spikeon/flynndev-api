import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

declare var jQuery: any;

@Component({
	selector: 'contact-slideup',
	templateUrl: './contact-slideup.component.html'
})
export class ContactSlideupComponent implements OnInit {

	constructor( public api : PortfolioApiService , public log : LoggerService ) { }

	open : boolean;

	ngOnInit(): void {
		this.open = false;
	}

	toggle ( ) : void {
		this.open = ! this.open;
	}
}
