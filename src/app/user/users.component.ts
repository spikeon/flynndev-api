import { Component, OnInit } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';


declare var jQuery: any;

@Component({
	selector: 'users',
	templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
	users = [];

	constructor( public api: PortfolioApiService ) { }

	list() {

		this.api.list('users')
		.subscribe(
			users	=> {
				this.users = users;
			},
			err		=> console.log('Failed to get users'),
			()		=> console.log('Users Complete')
		);

	}

	ngOnInit(): void {
		this.list();
	}
}
