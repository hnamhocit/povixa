import { a as element, b as clsx, i as derived, n as attributes, o as ensure_array_like } from "./server.js";
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/defaultAttributes.js
var defaultAttributes = {
	outline: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 24,
		height: 24,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		"stroke-width": 2,
		"stroke-linecap": "round",
		"stroke-linejoin": "round"
	},
	filled: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 24,
		height: 24,
		viewBox: "0 0 24 24",
		fill: "currentColor",
		stroke: "none"
	}
};
//#endregion
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/Icon.svelte
function Icon($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { type, name, color = "currentColor", size = 24, stroke = 2, iconNode, class: className = "", children, $$slots, $$events, ...restProps } = $$props;
		const typeAttributes = derived(() => type === "filled" ? { fill: color } : {
			"stroke-width": stroke,
			stroke: color
		});
		const fullClassName = derived(() => `tabler-icon tabler-icon-${name}${className ? ` ${className}` : ""}`);
		$$renderer.push(`<svg${attributes({
			...defaultAttributes[type],
			...restProps,
			width: size,
			height: size,
			class: clsx(fullClassName()),
			...typeAttributes()
		}, void 0, void 0, void 0, 3)}><!--[-->`);
		const each_array = ensure_array_like(iconNode);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let [tag, attrs] = each_array[$$index];
			element($$renderer, tag, () => {
				$$renderer.push(`${attributes({ ...attrs }, void 0, void 0, void 0, 3)}`);
			});
		}
		$$renderer.push(`<!--]-->`);
		if (children) {
			$$renderer.push("<!--[0-->");
			children($$renderer);
			$$renderer.push(`<!---->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></svg>`);
	});
}
//#endregion
export { Icon as t };

//# sourceMappingURL=Icon.js.map