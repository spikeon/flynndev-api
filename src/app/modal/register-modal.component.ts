import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

declare var jQuery: any;

@Component({
	selector: 'register-modal',
	templateUrl: './register-modal.component.html',
	styleUrls: [ './register-modal.component.scss' ]
})
export class RegisterModalComponent implements OnInit {

	constructor( public api: PortfolioApiService, public log: LoggerService ) { }

	ngOnInit(): void {

	}
}
