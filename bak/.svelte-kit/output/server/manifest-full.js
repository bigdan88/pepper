export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.4572d790.js","imports":["_app/immutable/entry/start.4572d790.js","_app/immutable/chunks/index.2ee51f7d.js","_app/immutable/chunks/singletons.fee74bf3.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.9c0dcccf.js","imports":["_app/immutable/entry/app.9c0dcccf.js","_app/immutable/chunks/index.2ee51f7d.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/chat",
				pattern: /^\/api\/chat\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/chat/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
