import { l as spread_props } from "./server.js";
import { t as Icon } from "./Icon.js";
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/lock.svelte
function Lock($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "lock"
		},
		props,
		{
			iconNode: [
				["path", { "d": "M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" }],
				["path", { "d": "M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" }],
				["path", { "d": "M8 11v-4a4 4 0 1 1 8 0v4" }]
			],
			children
		}
	]));
}
//#endregion
export { Lock as t };

//# sourceMappingURL=lock.js.map