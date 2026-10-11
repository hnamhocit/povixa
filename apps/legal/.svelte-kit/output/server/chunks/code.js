import { l as spread_props } from "./server.js";
import { t as Icon } from "./Icon.js";
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/code.svelte
function Code($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "code"
		},
		props,
		{
			iconNode: [
				["path", { "d": "M7 8l-4 4l4 4" }],
				["path", { "d": "M17 8l4 4l-4 4" }],
				["path", { "d": "M14 4l-4 16" }]
			],
			children
		}
	]));
}
//#endregion
export { Code as t };

//# sourceMappingURL=code.js.map