import { l as spread_props } from "./server.js";
import { t as Icon } from "./Icon.js";
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/clock.svelte
function Clock($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "clock"
		},
		props,
		{
			iconNode: [["path", { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" }], ["path", { "d": "M12 7v5l3 3" }]],
			children
		}
	]));
}
//#endregion
export { Clock as t };

//# sourceMappingURL=clock.js.map