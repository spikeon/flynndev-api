import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

declare var jQuery: any;

@Component({
	selector: 'contact-slideup',
	templateUrl: './contact-slideup.component.html',
	styleUrls: [ './contact-slideup.component.scss' ]
})
export class ContactSlideupComponent implements OnInit {

	constructor( public api : PortfolioApiService , public log : LoggerService ) { }

	open : boolean;

	ngOnInit(): void {
		this.loadState();
	}

	loadState() : void {
		let current = localStorage.getItem("contact_state");
		this.open = current == "Y";
	}

	toggle ( ) : void {
		this.open = ! this.open;
		localStorage.setItem("contact_state", this.open ? "Y" : "");
	}
}
