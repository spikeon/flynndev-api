import { Component, Input } 	from '@angular/core';

import { PortfolioApiService }	from '../portfolio-api.service';

declare let jQuery: any;

@Component({
	selector: '[user]',
	templateUrl: './user.component.html'
})
export class UserComponent {
	@Input( ) user: any;
	@Input( ) users: any[];

	constructor( public api: PortfolioApiService ) { }
	canDelete() {
		// if I am admin
		if ( ! this.api.isAdmin() ) return false;

		// if the user isn't me
		if ( this.api.user.id === this.user.id ) return false;

		return true;
	}
	canPromote() {
		// if I am admin
		if ( ! this.api.isAdmin() ) return false;

		// if the user isn't me
		if ( this.api.user.id === this.user.id ) return false;

		// if the user isn't admin
		if ( this.user.admin ) return false;

		return true;

	}
	canDemote() {
		// if I am admin
		if ( ! this.api.isAdmin() ) return false;

		// if the user isn't me
		if ( this.api.user.id === this.user.id ) return false;

		// if the user is admin
		if ( ! this.user.admin ) return false;

		return true;

	}

	del(e) {
		e.preventDefault();
		this.api.del('users', this.user.id).subscribe(
			() => {
				let index = this.users.indexOf(this.user);
				this.users.splice(index, 1);
				console.log("User Deleted");
			},
			err => console.log(err),
			() => console.log("User Delete Complete")
		);
	}
	promote(e) {
		e.preventDefault();
		this.api._get('users', 'promote', this.user.id).subscribe(
			() => {
				this.user.admin = 1;
				console.log("User Promoted");
			},
			err => console.log(err),
			() => console.log("User Promote Complete")
		);
	}
	demote(e) {
		e.preventDefault();
		this.api._get('users', 'demote', this.user.id).subscribe(
			() => {
				this.user.admin = 0;
				console.log("User Promoted");
			},
			err => console.log(err),
			() => console.log("User Promote Complete")
		);
	}
}