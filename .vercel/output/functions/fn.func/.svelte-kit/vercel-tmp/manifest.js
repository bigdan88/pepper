export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.ec7c6077.js","imports":["_app/immutable/entry/start.ec7c6077.js","_app/immutable/chunks/index.2ee51f7d.js","_app/immutable/chunks/singletons.b427bf78.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.0d6aedda.js","imports":["_app/immutable/entry/app.0d6aedda.js","_app/immutable/chunks/index.2ee51f7d.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js')
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
				endpoint: () => import('../output/server/entries/endpoints/api/chat/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
