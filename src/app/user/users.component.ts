import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

import { LoggerService }               from '../logger.service';

declare var jQuery: any;

@Component({
	selector: 'users',
	templateUrl: './users.component.html',
	styleUrls: [ './users.component.scss' ]
})
export class UsersComponent implements OnInit {
	users = [];

	constructor( public api: PortfolioApiService, public log: LoggerService ) { }

	list() {

		this.api.list('users')
		.subscribe(
			users	=> {
				this.users = users;
			},
			err		=> this.log.err('Failed to get users'),
			()		=> this.log.info('Users Complete')
		);

	}

	ngOnInit(): void {
		this.list();
	}
}
