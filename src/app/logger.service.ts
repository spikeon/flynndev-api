import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
	show:boolean;

	constructor(){
		this._load();
	}

	_load(){
		this._set(localStorage.getItem('showLog') == "y");
	}

	_set(b){
		this.show = b;
		if(this.show) {
			console.log("Console Logging Enabled")
			localStorage.setItem('showLog', 'y');
		}
		else {
			console.log("Console Logging Disabled");
			localStorage.removeItem('showLog');
		}
	}

	on()        { this._set(true); }
	off()       { this._set(false); }
	toggle()    { this._set(!this.show); }

	log(o)      { this.info(o); } // Alias for info, just in case
	info(o)     { if( this.show ) console.log(o); }
	err(o)      { console.error(o); }
	warn(o)     { console.warn(o); }
}

