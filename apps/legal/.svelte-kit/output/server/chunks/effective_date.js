import { n as getLocale } from "./runtime.js";
//#region src/lib/paraglide/messages/effective_date.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Effective_DateInputs */
var en_effective_date = () => {
	return `Effective Date: October 11, 2026 • Version 2.4`;
};
var vi_effective_date = () => {
	return `Ngày có hiệu lực: 11 Tháng 10, 2026 • Phiên bản 2.4`;
};
/**
* | output |
* | --- |
* | "Effective Date: October 11, 2026 • Version 2.4" |
*
* @param {Effective_DateInputs} inputs
* @param {{ locale?: "en" | "vi" }} options
* @returns {LocalizedString}
*/
var effective_date = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "vi") return vi_effective_date(inputs);
	return en_effective_date(inputs);
});
//#endregion
export { effective_date as t };

//# sourceMappingURL=effective_date.js.map