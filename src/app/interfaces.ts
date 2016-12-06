export interface Project {
	id:string;
	thumb?:string;
	url?:string;
	apidoc?:string;
	github?:string;
	name:string;
	files?: Array<string>;
	gallery?:Array<string>;
	about?:string;
	tags?:Array<string>;
	featured:boolean;
}
export interface Projects {
	[index:string] : Project
}