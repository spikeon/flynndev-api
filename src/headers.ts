import { Headers } from '@angular/http';

export var PortfolioApiHeaders = new Headers({
	'Content-Type': 'application/json',
	'x-access-token' : localStorage.getItem('token')
});
