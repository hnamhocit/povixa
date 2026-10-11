import { l as spread_props } from "./server.js";
import { t as Icon } from "./Icon.js";
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/server.svelte
function Server($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "server"
		},
		props,
		{
			iconNode: [
				["path", { "d": "M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-2" }],
				["path", { "d": "M3 15a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -2" }],
				["path", { "d": "M7 8l0 .01" }],
				["path", { "d": "M7 16l0 .01" }]
			],
			children
		}
	]));
}
//#endregion
export { Server as t };

//# sourceMappingURL=server2.js.map