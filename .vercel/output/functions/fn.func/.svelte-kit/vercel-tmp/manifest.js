export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.c97e7402.js","imports":["_app/immutable/entry/start.c97e7402.js","_app/immutable/chunks/index.2ee51f7d.js","_app/immutable/chunks/singletons.df0f1e6a.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.be763234.js","imports":["_app/immutable/entry/app.be763234.js","_app/immutable/chunks/index.2ee51f7d.js"],"stylesheets":[],"fonts":[]}},
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
