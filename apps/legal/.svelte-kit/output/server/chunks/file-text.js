import { l as spread_props } from "./server.js";
import { t as Icon } from "./Icon.js";
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/file-text.svelte
function File_text($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "file-text"
		},
		props,
		{
			iconNode: [
				["path", { "d": "M14 3v4a1 1 0 0 0 1 1h4" }],
				["path", { "d": "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" }],
				["path", { "d": "M9 9l1 0" }],
				["path", { "d": "M9 13l6 0" }],
				["path", { "d": "M9 17l6 0" }]
			],
			children
		}
	]));
}
//#endregion
export { File_text as t };

//# sourceMappingURL=file-text.js.map