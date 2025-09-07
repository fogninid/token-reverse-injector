import fs from 'fs';

function load_token(s) {
	console.log("loading");
	fs.promises.readFile("/var/run/secrets/kubernetes.io/serviceaccount/token").then((data) => {
		ngx.shared.token.set("token", data.toString("utf8"));
		console.info("loaded token");
	});
}

function auth_header(r) {
	return "Bearer " + ngx.shared.token.get("token");
}

function ready(r) {
	if (ngx.shared.token.has("token")) {
		r.return(200, "OK");
	} else {
	        console.warn("token not loaded yet");
		r.return(503, "token not loaded");
	}
}

export default {auth_header, load_token, ready};
