class ConfigClass {
	apiUrl = "http://flynndev.us:44562";

	url(...segments) {
		let url = this.apiUrl;
		for(let segment of segments) url += `/${segment}`;
		return url;
	};
}

export var Config = new ConfigClass();
