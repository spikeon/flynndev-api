import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }        from '../logger.service';

declare var jQuery: any;

@Component({
	selector: 'login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: [ './login-modal.component.scss' ]
})
export class LoginModalComponent implements OnInit {

	constructor( public api: PortfolioApiService, public log: LoggerService ) { }

	ngOnInit(): void {

	}
}
