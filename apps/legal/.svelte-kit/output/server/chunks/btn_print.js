import { l as spread_props } from "./server.js";
import { t as Icon } from "./Icon.js";
import { n as getLocale } from "./runtime.js";
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/arrow-left.svelte
function Arrow_left($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "arrow-left"
		},
		props,
		{
			iconNode: [
				["path", { "d": "M5 12l14 0" }],
				["path", { "d": "M5 12l6 6" }],
				["path", { "d": "M5 12l6 -6" }]
			],
			children
		}
	]));
}
//#endregion
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/printer.svelte
function Printer($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "printer"
		},
		props,
		{
			iconNode: [
				["path", { "d": "M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" }],
				["path", { "d": "M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" }],
				["path", { "d": "M7 15a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2l0 -4" }]
			],
			children
		}
	]));
}
//#endregion
//#region src/lib/paraglide/messages/btn_print.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Btn_PrintInputs */
var en_btn_print = () => {
	return `Print Document`;
};
var vi_btn_print = () => {
	return `In Văn bản`;
};
/**
* | output |
* | --- |
* | "Print Document" |
*
* @param {Btn_PrintInputs} inputs
* @param {{ locale?: "en" | "vi" }} options
* @returns {LocalizedString}
*/
var btn_print = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "vi") return vi_btn_print(inputs);
	return en_btn_print(inputs);
});
//#endregion
export { Printer as n, Arrow_left as r, btn_print as t };

//# sourceMappingURL=btn_print.js.map