import { create_server } from '../output/server/index.js';
const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	app_dir: "_app",
	app_path: "_app",
	assets: new Set(["robots.txt"]),
	mime_types: {".txt":"text/plain"},
	client: {start:"_app/immutable/entry/start.DMsSMyq_.js",app:"_app/immutable/entry/app.C-42YRLH.js",imports:["_app/immutable/entry/start.DMsSMyq_.js","_app/immutable/entry/payload.DSmR2FwN.js","_app/immutable/chunks/CRzLMJPS.js","_app/immutable/chunks/BF-NHLhs.js","_app/immutable/chunks/DjWsquke.js","_app/immutable/chunks/D384JdmF.js","_app/immutable/entry/app.C-42YRLH.js","_app/immutable/chunks/BMtMtNPk.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
	
	nodes: [
		__memo(() => import('../output/server/nodes/0.js')),
		__memo(() => import('../output/server/nodes/1.js')),
		__memo(() => import('../output/server/nodes/2.js')),
		__memo(() => import('../output/server/nodes/3.js')),
		__memo(() => import('../output/server/nodes/4.js')),
		__memo(() => import('../output/server/nodes/5.js')),
		__memo(() => import('../output/server/nodes/6.js')),
		__memo(() => import('../output/server/nodes/7.js')),
		__memo(() => import('../output/server/nodes/8.js')),
		__memo(() => import('../output/server/nodes/9.js'))
	],
	remotes: {
		
	},
	routes: [
		{
			id: "/",
			pattern: /^\/$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 2 },
			endpoint: null
		},
		{
			id: "/cookies",
			pattern: /^\/cookies\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 3 },
			endpoint: null
		},
		{
			id: "/dpa",
			pattern: /^\/dpa\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 4 },
			endpoint: null
		},
		{
			id: "/licenses",
			pattern: /^\/licenses\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 5 },
			endpoint: null
		},
		{
			id: "/privacy",
			pattern: /^\/privacy\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 6 },
			endpoint: null
		},
		{
			id: "/sla",
			pattern: /^\/sla\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 7 },
			endpoint: null
		},
		{
			id: "/subprocessors",
			pattern: /^\/subprocessors\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 8 },
			endpoint: null
		},
		{
			id: "/terms",
			pattern: /^\/terms\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 9 },
			endpoint: null
		}
	],
	prerendered_routes: new Set([]),
	matchers: async () => {
		return {};
	},
	server_assets: {}
}
})();
export const server = create_server(manifest);