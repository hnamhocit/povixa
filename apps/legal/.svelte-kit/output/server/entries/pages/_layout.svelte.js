import { C as run, _ as without_reactive_context, d as html, g as set_active_reaction, h as set_active_effect, i as derived, l as spread_props, m as active_reaction, o as ensure_array_like, p as active_effect, r as bind_props, s as head, t as attr_class, u as stringify, v as queue_micro_task, w as escape_html, x as define_property, y as attr } from "../../chunks/server.js";
import { t as page } from "../../chunks/state.js";
import { t as Icon } from "../../chunks/Icon.js";
import { t as Clock } from "../../chunks/clock.js";
import { t as Code } from "../../chunks/code.js";
import { t as Cookie } from "../../chunks/cookie.js";
import { t as File_text } from "../../chunks/file-text.js";
import { t as Lock } from "../../chunks/lock.js";
import { t as Server } from "../../chunks/server2.js";
import { t as Shield_check } from "../../chunks/shield-check.js";
import { n as getLocale, s as overwriteGetLocale } from "../../chunks/runtime.js";
//#region src/lib/assets/favicon.svg
var favicon_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='107'%20height='128'%20viewBox='0%200%20107%20128'%3e%3ctitle%3esvelte-logo%3c/title%3e%3cpath%20d='M94.157%2022.819c-10.4-14.885-30.94-19.297-45.792-9.835L22.282%2029.608A29.92%2029.92%200%200%200%208.764%2049.65a31.5%2031.5%200%200%200%203.108%2020.231%2030%2030%200%200%200-4.477%2011.183%2031.9%2031.9%200%200%200%205.448%2024.116c10.402%2014.887%2030.942%2019.297%2045.791%209.835l26.083-16.624A29.92%2029.92%200%200%200%2098.235%2078.35a31.53%2031.53%200%200%200-3.105-20.232%2030%2030%200%200%200%204.474-11.182%2031.88%2031.88%200%200%200-5.447-24.116'%20style='fill:%23ff3e00'/%3e%3cpath%20d='M45.817%20106.582a20.72%2020.72%200%200%201-22.237-8.243%2019.17%2019.17%200%200%201-3.277-14.503%2018%2018%200%200%201%20.624-2.435l.49-1.498%201.337.981a33.6%2033.6%200%200%200%2010.203%205.098l.97.294-.09.968a5.85%205.85%200%200%200%201.052%203.878%206.24%206.24%200%200%200%206.695%202.485%205.8%205.8%200%200%200%201.603-.704L69.27%2076.28a5.43%205.43%200%200%200%202.45-3.631%205.8%205.8%200%200%200-.987-4.371%206.24%206.24%200%200%200-6.698-2.487%205.7%205.7%200%200%200-1.6.704l-9.953%206.345a19%2019%200%200%201-5.296%202.326%2020.72%2020.72%200%200%201-22.237-8.243%2019.17%2019.17%200%200%201-3.277-14.502%2017.99%2017.99%200%200%201%208.13-12.052l26.081-16.623a19%2019%200%200%201%205.3-2.329%2020.72%2020.72%200%200%201%2022.237%208.243%2019.17%2019.17%200%200%201%203.277%2014.503%2018%2018%200%200%201-.624%202.435l-.49%201.498-1.337-.98a33.6%2033.6%200%200%200-10.203-5.1l-.97-.294.09-.968a5.86%205.86%200%200%200-1.052-3.878%206.24%206.24%200%200%200-6.696-2.485%205.8%205.8%200%200%200-1.602.704L37.73%2051.72a5.42%205.42%200%200%200-2.449%203.63%205.79%205.79%200%200%200%20.986%204.372%206.24%206.24%200%200%200%206.698%202.486%205.8%205.8%200%200%200%201.602-.704l9.952-6.342a19%2019%200%200%201%205.295-2.328%2020.72%2020.72%200%200%201%2022.237%208.242%2019.17%2019.17%200%200%201%203.277%2014.503%2018%2018%200%200%201-8.13%2012.053l-26.081%2016.622a19%2019%200%200%201-5.3%202.328'%20style='fill:%23fff'/%3e%3c/svg%3e";
//#endregion
//#region ../../node_modules/.bun/runed@0.25.0+4d34efae0051345e/node_modules/runed/dist/internal/configurable-globals.js
var defaultWindow$1 = void 0;
//#endregion
//#region ../../node_modules/.bun/runed@0.25.0+4d34efae0051345e/node_modules/runed/dist/internal/utils/dom.js
/**
* Handles getting the active element in a document or shadow root.
* If the active element is within a shadow root, it will traverse the shadow root
* to find the active element.
* If not, it will return the active element in the document.
*
* @param document A document or shadow root to get the active element from.
* @returns The active element in the document or shadow root.
*/
function getActiveElement$1(document) {
	let activeElement = document.activeElement;
	while (activeElement?.shadowRoot) {
		const node = activeElement.shadowRoot.activeElement;
		if (node === activeElement) break;
		else activeElement = node;
	}
	return activeElement;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.57.2+efcf0cee245e957f/node_modules/svelte/src/internal/client/dom/elements/events.js
/**
* Used on elements, as a map of event type -> event handler,
* and on events themselves to track which element handled an event
*/
var event_symbol = Symbol("events");
/**
* @param {string} event_name
* @param {EventTarget} dom
* @param {EventListener} [handler]
* @param {AddEventListenerOptions} [options]
*/
function create_event(event_name, dom, handler, options = {}) {
	/**
	* @this {EventTarget}
	*/
	function target_handler(event) {
		if (!options.capture) handle_event_propagation.call(dom, event);
		if (!event.cancelBubble) return without_reactive_context(() => {
			return handler?.call(this, event);
		});
	}
	if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
		target_handler.__removed = false;
		queue_micro_task(() => {
			if (!target_handler.__removed) dom.addEventListener(event_name, target_handler, options);
		});
	} else dom.addEventListener(event_name, target_handler, options);
	return target_handler;
}
/**
* Attaches an event handler to an element and returns a function that removes the handler. Using this
* rather than `addEventListener` will preserve the correct order relative to handlers added declaratively
* (with attributes like `onclick`), which use event delegation for performance reasons
*
* @param {EventTarget} element
* @param {string} type
* @param {EventListener} handler
* @param {AddEventListenerOptions} [options]
*/
function on(element, type, handler, options = {}) {
	var target_handler = create_event(type, element, handler, options);
	return () => {
		target_handler.__removed = true;
		element.removeEventListener(type, target_handler, options);
	};
}
var last_propagated_event = null;
var last_propagated_event_clear_scheduled = false;
/**
* @this {EventTarget}
* @param {Event} event
* @returns {void}
*/
function handle_event_propagation(event) {
	var handler_element = this;
	var owner_document = handler_element.ownerDocument;
	var event_name = event.type;
	var path = event.composedPath?.() || [];
	var current_target = path[0] || event.target;
	last_propagated_event = event;
	if (!last_propagated_event_clear_scheduled) {
		last_propagated_event_clear_scheduled = true;
		setTimeout(() => {
			last_propagated_event_clear_scheduled = false;
			last_propagated_event = null;
		});
	}
	var path_idx = 0;
	var handled_at = last_propagated_event === event && event[event_symbol];
	if (handled_at) {
		var at_idx = path.indexOf(handled_at);
		if (at_idx !== -1 && (handler_element === document || handler_element === window)) {
			event[event_symbol] = handler_element;
			return;
		}
		var handler_idx = path.indexOf(handler_element);
		if (handler_idx === -1) return;
		if (at_idx <= handler_idx) path_idx = at_idx;
	}
	current_target = path[path_idx] || event.target;
	if (current_target === handler_element) return;
	define_property(event, "currentTarget", {
		configurable: true,
		get() {
			return current_target || owner_document;
		}
	});
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		/**
		* @type {unknown}
		*/
		var throw_error;
		/**
		* @type {unknown[]}
		*/
		var other_errors = [];
		while (current_target !== null) {
			if (current_target === handler_element) break;
			try {
				var delegated = current_target[event_symbol]?.[event_name];
				if (delegated != null && (!current_target.disabled || event.target === current_target)) delegated.call(current_target, event);
			} catch (error) {
				if (throw_error) other_errors.push(error);
				else throw_error = error;
			}
			if (event.cancelBubble) break;
			path_idx++;
			current_target = path_idx < path.length ? path[path_idx] : null;
		}
		if (throw_error) {
			for (let error of other_errors) queueMicrotask(() => {
				throw error;
			});
			throw throw_error;
		}
	} finally {
		event[event_symbol] = handler_element;
		delete event.currentTarget;
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
globalThis.Date;
globalThis.Set;
globalThis.Map;
globalThis.URL;
globalThis.URLSearchParams;
var MediaQuery = class {
	current;
	/**
	* @param {string} query
	* @param {boolean} [matches]
	*/
	constructor(query, matches = false) {
		this.current = matches;
	}
};
/**
* @param {any} _
*/
function createSubscriber(_) {
	return () => {};
}
//#endregion
//#region ../../node_modules/.bun/runed@0.25.0+4d34efae0051345e/node_modules/runed/dist/utilities/active-element/active-element.svelte.js
var ActiveElement$1 = class {
	#document;
	#subscribe;
	constructor(options = {}) {
		const { window = defaultWindow$1, document = window?.document } = options;
		if (window === void 0) return;
		this.#document = document;
		this.#subscribe = createSubscriber((update) => {
			const cleanupFocusIn = on(window, "focusin", update);
			const cleanupFocusOut = on(window, "focusout", update);
			return () => {
				cleanupFocusIn();
				cleanupFocusOut();
			};
		});
	}
	get current() {
		this.#subscribe?.();
		if (!this.#document) return null;
		return getActiveElement$1(this.#document);
	}
};
new ActiveElement$1();
//#endregion
//#region ../../node_modules/.bun/runed@0.25.0+4d34efae0051345e/node_modules/runed/dist/utilities/watch/watch.svelte.js
function runWatcher$1(sources, flush, effect, options = {}) {
	const { lazy = false } = options;
}
function watch$1(sources, effect, options) {
	runWatcher$1(sources, "post", effect, options);
}
function watchPre$1(sources, effect, options) {
	runWatcher$1(sources, "pre", effect, options);
}
watch$1.pre = watchPre$1;
function watchOnce$1(source, effect) {}
function watchOncePre$1(source, effect) {}
watchOnce$1.pre = watchOncePre$1;
//#endregion
//#region ../../node_modules/.bun/runed@0.25.0+4d34efae0051345e/node_modules/runed/dist/utilities/persisted-state/persisted-state.svelte.js
function getStorage(storageType, window) {
	switch (storageType) {
		case "local": return window.localStorage;
		case "session": return window.sessionStorage;
	}
}
/**
* Creates reactive state that is persisted and synchronized across browser sessions and tabs using Web Storage.
* @param key The unique key used to store the state in the storage.
* @param initialValue The initial value of the state if not already present in the storage.
* @param options Configuration options including storage type, serializer for complex data types, and whether to sync state changes across tabs.
*
* @see {@link https://runed.dev/docs/utilities/persisted-state}
*/
var PersistedState = class {
	#current;
	#key;
	#serializer;
	#storage;
	#subscribe;
	#version = 0;
	constructor(key, initialValue, options = {}) {
		const { storage: storageType = "local", serializer = {
			serialize: JSON.stringify,
			deserialize: JSON.parse
		}, syncTabs = true, window = defaultWindow$1 } = options;
		this.#current = initialValue;
		this.#key = key;
		this.#serializer = serializer;
		if (window === void 0) return;
		const storage = getStorage(storageType, window);
		this.#storage = storage;
		const existingValue = storage.getItem(key);
		if (existingValue !== null) this.#current = this.#deserialize(existingValue);
		else this.#serialize(initialValue);
		if (syncTabs && storageType === "local") this.#subscribe = createSubscriber(() => {
			return on(window, "storage", this.#handleStorageEvent);
		});
	}
	get current() {
		this.#subscribe?.();
		this.#version;
		const root = this.#deserialize(this.#storage?.getItem(this.#key)) ?? this.#current;
		const proxies = /* @__PURE__ */ new WeakMap();
		const proxy = (value) => {
			if (value === null || value?.constructor.name === "Date" || typeof value !== "object") return value;
			let p = proxies.get(value);
			if (!p) {
				p = new Proxy(value, {
					get: (target, property) => {
						this.#version;
						return proxy(Reflect.get(target, property));
					},
					set: (target, property, value) => {
						this.#version += 1;
						Reflect.set(target, property, value);
						this.#serialize(root);
						return true;
					}
				});
				proxies.set(value, p);
			}
			return p;
		};
		return proxy(root);
	}
	set current(newValue) {
		this.#serialize(newValue);
		this.#version += 1;
	}
	#handleStorageEvent = (event) => {
		if (event.key !== this.#key || event.newValue === null) return;
		this.#current = this.#deserialize(event.newValue);
		this.#version += 1;
	};
	#deserialize(value) {
		try {
			return this.#serializer.deserialize(value);
		} catch (error) {
			console.error(`Error when parsing "${value}" from persisted store "${this.#key}"`, error);
			return;
		}
	}
	#serialize(value) {
		try {
			if (value != void 0) this.#storage?.setItem(this.#key, this.#serializer.serialize(value));
		} catch (error) {
			console.error(`Error when writing value from persisted store "${this.#key}" to ${this.#storage}`, error);
		}
	}
};
//#endregion
//#region ../../node_modules/.bun/runed@0.25.0+4d34efae0051345e/node_modules/runed/dist/utilities/resource/resource.svelte.js
function debounce(fn, delay) {
	let timeoutId;
	let lastResolve = null;
	return (...args) => {
		return new Promise((resolve) => {
			if (lastResolve) lastResolve(void 0);
			lastResolve = resolve;
			clearTimeout(timeoutId);
			timeoutId = setTimeout(async () => {
				const result = await fn(...args);
				if (lastResolve) {
					lastResolve(result);
					lastResolve = null;
				}
			}, delay);
		});
	};
}
function throttle(fn, delay) {
	let lastRun = 0;
	let lastPromise = null;
	return (...args) => {
		const now = Date.now();
		if (lastRun && now - lastRun < delay) return lastPromise ?? Promise.resolve(void 0);
		lastRun = now;
		lastPromise = fn(...args);
		return lastPromise;
	};
}
function runResource(source, fetcher, options = {}, effectFn) {
	const { lazy = false, once = false, initialValue, debounce: debounceTime, throttle: throttleTime } = options;
	let current = initialValue;
	let loading = false;
	let error = void 0;
	let cleanupFns = [];
	const runCleanup = () => {
		cleanupFns.forEach((fn) => fn());
		cleanupFns = [];
	};
	const onCleanup = (fn) => {
		cleanupFns = [...cleanupFns, fn];
	};
	const baseFetcher = async (value, previousValue, refetching = false) => {
		try {
			loading = true;
			error = void 0;
			runCleanup();
			const controller = new AbortController();
			onCleanup(() => controller.abort());
			const result = await fetcher(value, previousValue, {
				data: current,
				refetching,
				onCleanup,
				signal: controller.signal
			});
			current = result;
			return result;
		} catch (e) {
			if (!(e instanceof DOMException && e.name === "AbortError")) error = e;
			return;
		} finally {
			loading = false;
		}
	};
	const runFetcher = debounceTime ? debounce(baseFetcher, debounceTime) : throttleTime ? throttle(baseFetcher, throttleTime) : baseFetcher;
	const sources = Array.isArray(source) ? source : [source];
	let prevValues;
	effectFn((values, previousValues) => {
		if (once && prevValues) return;
		if (prevValues && JSON.stringify(values) === JSON.stringify(prevValues)) return;
		prevValues = values;
		runFetcher(Array.isArray(source) ? values : values[0], Array.isArray(source) ? previousValues : previousValues?.[0]);
	}, { lazy });
	return {
		get current() {
			return current;
		},
		get loading() {
			return loading;
		},
		get error() {
			return error;
		},
		mutate: (value) => {
			current = value;
		},
		refetch: (info) => {
			const values = sources.map((s) => s());
			return runFetcher(Array.isArray(source) ? values : values[0], Array.isArray(source) ? values : values[0], info ?? true);
		}
	};
}
function resource(source, fetcher, options) {
	return runResource(source, fetcher, options, (fn, options) => {
		const sources = Array.isArray(source) ? source : [source];
		const getters = () => sources.map((s) => s());
		watch$1(getters, (values, previousValues) => {
			fn(values, previousValues ?? []);
		}, options);
	});
}
function resourcePre(source, fetcher, options) {
	return runResource(source, fetcher, options, (fn, options) => {
		const sources = Array.isArray(source) ? source : [source];
		const getter = () => sources.map((s) => s());
		watch$1.pre(getter, (values, previousValues) => {
			fn(values, previousValues ?? []);
		}, options);
	});
}
resource.pre = resourcePre;
//#endregion
//#region ../../node_modules/.bun/mode-watcher@1.1.0+4d34efae0051345e/node_modules/mode-watcher/dist/utils.js
/**
* Sanitizes an array of classnames by removing any empty strings.
*/
function sanitizeClassNames(classNames) {
	return classNames.filter((className) => className.length > 0);
}
var noopStorage = {
	getItem: (_key) => null,
	setItem: (_key, _value) => {}
};
var isBrowser = typeof document !== "undefined";
//#endregion
//#region ../../node_modules/.bun/svelte-toolbelt@0.7.1+4d34efae0051345e/node_modules/svelte-toolbelt/dist/utils/is.js
function isFunction(value) {
	return typeof value === "function";
}
function isObject(value) {
	return value !== null && typeof value === "object";
}
//#endregion
//#region ../../node_modules/.bun/svelte-toolbelt@0.7.1+4d34efae0051345e/node_modules/svelte-toolbelt/dist/box/box.svelte.js
var BoxSymbol = Symbol("box");
var isWritableSymbol = Symbol("is-writable");
function isBox(value) {
	return isObject(value) && BoxSymbol in value;
}
/**
* @returns Whether the value is a WritableBox
*
* @see {@link https://runed.dev/docs/functions/box}
*/
function isWritableBox(value) {
	return box.isBox(value) && isWritableSymbol in value;
}
function box(initialValue) {
	let current = initialValue;
	return {
		[BoxSymbol]: true,
		[isWritableSymbol]: true,
		get current() {
			return current;
		},
		set current(v) {
			current = v;
		}
	};
}
function boxWith(getter, setter) {
	const derived$1 = derived(getter);
	if (setter) return {
		[BoxSymbol]: true,
		[isWritableSymbol]: true,
		get current() {
			return derived$1();
		},
		set current(v) {
			setter(v);
		}
	};
	return {
		[BoxSymbol]: true,
		get current() {
			return getter();
		}
	};
}
function boxFrom(value) {
	if (box.isBox(value)) return value;
	if (isFunction(value)) return box.with(value);
	return box(value);
}
/**
* Function that gets an object of boxes, and returns an object of reactive values
*
* @example
* const count = box(0)
* const flat = box.flatten({ count, double: box.with(() => count.current) })
* // type of flat is { count: number, readonly double: number }
*
* @see {@link https://runed.dev/docs/functions/box}
*/
function boxFlatten(boxes) {
	return Object.entries(boxes).reduce((acc, [key, b]) => {
		if (!box.isBox(b)) return Object.assign(acc, { [key]: b });
		if (box.isWritableBox(b)) Object.defineProperty(acc, key, {
			get() {
				return b.current;
			},
			set(v) {
				b.current = v;
			}
		});
		else Object.defineProperty(acc, key, { get() {
			return b.current;
		} });
		return acc;
	}, {});
}
/**
* Function that converts a box to a readonly box.
*
* @example
* const count = box(0) // WritableBox<number>
* const countReadonly = box.readonly(count) // ReadableBox<number>
*
* @see {@link https://runed.dev/docs/functions/box}
*/
function toReadonlyBox(b) {
	if (!box.isWritableBox(b)) return b;
	return {
		[BoxSymbol]: true,
		get current() {
			return b.current;
		}
	};
}
box.from = boxFrom;
box.with = boxWith;
box.flatten = boxFlatten;
box.readonly = toReadonlyBox;
box.isBox = isBox;
box.isWritableBox = isWritableBox;
//#endregion
//#region ../../node_modules/.bun/svelte-toolbelt@0.7.1+4d34efae0051345e/node_modules/svelte-toolbelt/dist/utils/style-to-css.js
function createParser(matcher, replacer) {
	const regex = RegExp(matcher, "g");
	return (str) => {
		if (typeof str !== "string") throw new TypeError(`expected an argument of type string, but got ${typeof str}`);
		if (!str.match(regex)) return str;
		return str.replace(regex, replacer);
	};
}
var camelToKebab = createParser(/[A-Z]/, (match) => `-${match.toLowerCase()}`);
function styleToCSS(styleObj) {
	if (!styleObj || typeof styleObj !== "object" || Array.isArray(styleObj)) throw new TypeError(`expected an argument of type object, but got ${typeof styleObj}`);
	return Object.keys(styleObj).map((property) => `${camelToKebab(property)}: ${styleObj[property]};`).join("\n");
}
//#endregion
//#region ../../node_modules/.bun/svelte-toolbelt@0.7.1+4d34efae0051345e/node_modules/svelte-toolbelt/dist/utils/style.js
function styleToString(style = {}) {
	return styleToCSS(style).replace("\n", " ");
}
styleToString({
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0",
	transform: "translateX(-100%)"
});
//#endregion
//#region ../../node_modules/.bun/runed@0.23.4+4d34efae0051345e/node_modules/runed/dist/internal/configurable-globals.js
var defaultWindow = void 0;
//#endregion
//#region ../../node_modules/.bun/runed@0.23.4+4d34efae0051345e/node_modules/runed/dist/internal/utils/dom.js
/**
* Handles getting the active element in a document or shadow root.
* If the active element is within a shadow root, it will traverse the shadow root
* to find the active element.
* If not, it will return the active element in the document.
*
* @param document A document or shadow root to get the active element from.
* @returns The active element in the document or shadow root.
*/
function getActiveElement(document) {
	let activeElement = document.activeElement;
	while (activeElement?.shadowRoot) {
		const node = activeElement.shadowRoot.activeElement;
		if (node === activeElement) break;
		else activeElement = node;
	}
	return activeElement;
}
//#endregion
//#region ../../node_modules/.bun/runed@0.23.4+4d34efae0051345e/node_modules/runed/dist/utilities/active-element/active-element.svelte.js
var ActiveElement = class {
	#document;
	#subscribe;
	constructor(options = {}) {
		const { window = defaultWindow, document = window?.document } = options;
		if (window === void 0) return;
		this.#document = document;
		this.#subscribe = createSubscriber((update) => {
			const cleanupFocusIn = on(window, "focusin", update);
			const cleanupFocusOut = on(window, "focusout", update);
			return () => {
				cleanupFocusIn();
				cleanupFocusOut();
			};
		});
	}
	get current() {
		this.#subscribe?.();
		if (!this.#document) return null;
		return getActiveElement(this.#document);
	}
};
new ActiveElement();
//#endregion
//#region ../../node_modules/.bun/runed@0.23.4+4d34efae0051345e/node_modules/runed/dist/utilities/watch/watch.svelte.js
function runWatcher(sources, flush, effect, options = {}) {
	const { lazy = false } = options;
}
function watch(sources, effect, options) {
	runWatcher(sources, "post", effect, options);
}
function watchPre(sources, effect, options) {
	runWatcher(sources, "pre", effect, options);
}
watch.pre = watchPre;
function watchOnce(source, effect) {}
function watchOncePre(source, effect) {}
watchOnce.pre = watchOncePre;
//#endregion
//#region ../../node_modules/.bun/mode-watcher@1.1.0+4d34efae0051345e/node_modules/mode-watcher/dist/storage-keys.svelte.js
var modeStorageKey = box("mode-watcher-mode");
var themeStorageKey = box("mode-watcher-theme");
//#endregion
//#region ../../node_modules/.bun/mode-watcher@1.1.0+4d34efae0051345e/node_modules/mode-watcher/dist/modes.js
/**
* the modes that are supported, used for validation & type
* derivation
*/
var modes = [
	"dark",
	"light",
	"system"
];
function isValidMode(value) {
	if (typeof value !== "string") return false;
	return modes.includes(value);
}
//#endregion
//#region ../../node_modules/.bun/mode-watcher@1.1.0+4d34efae0051345e/node_modules/mode-watcher/dist/mode-states.svelte.js
var UserPrefersMode = class {
	#defaultValue = "system";
	#storage = isBrowser ? localStorage : noopStorage;
	#initialValue = this.#storage.getItem(modeStorageKey.current);
	#value = isValidMode(this.#initialValue) ? this.#initialValue : this.#defaultValue;
	#persisted = this.#makePersisted();
	#makePersisted(value = this.#value) {
		return new PersistedState(modeStorageKey.current, value, { serializer: {
			serialize: (v) => v,
			deserialize: (v) => {
				if (isValidMode(v)) return v;
				return this.#defaultValue;
			}
		} });
	}
	constructor() {}
	get current() {
		return this.#persisted.current;
	}
	set current(newValue) {
		this.#persisted.current = newValue;
	}
};
var SystemPrefersMode = class {
	#defaultValue = void 0;
	#track = true;
	#current = this.#defaultValue;
	#mediaQueryState = typeof window !== "undefined" && typeof window.matchMedia === "function" ? new MediaQuery("prefers-color-scheme: light") : { current: false };
	query() {
		if (!isBrowser) return;
		this.#current = this.#mediaQueryState.current ? "light" : "dark";
	}
	tracking(active) {
		this.#track = active;
	}
	constructor() {
		this.query = this.query.bind(this);
		this.tracking = this.tracking.bind(this);
	}
	get current() {
		return this.#current;
	}
};
/**
* Writable state that represents the user's preferred mode
* (`"dark"`, `"light"` or `"system"`)
*/
var userPrefersMode = new UserPrefersMode();
/**
* Readable store that represents the system's preferred mode (`"dark"`, `"light"` or `undefined`)
*/
var systemPrefersMode = new SystemPrefersMode();
//#endregion
//#region ../../node_modules/.bun/mode-watcher@1.1.0+4d34efae0051345e/node_modules/mode-watcher/dist/theme-state.svelte.js
var CustomTheme = class {
	#storage = isBrowser ? localStorage : noopStorage;
	#initialValue = this.#storage.getItem(themeStorageKey.current);
	#value = this.#initialValue === null || this.#initialValue === void 0 ? "" : this.#initialValue;
	#persisted = this.#makePersisted();
	#makePersisted(value = this.#value) {
		return new PersistedState(themeStorageKey.current, value, { serializer: {
			serialize: (v) => {
				if (typeof v !== "string") return "";
				return v;
			},
			deserialize: (v) => v
		} });
	}
	constructor() {}
	/**
	* The current theme.
	* @returns The current theme.
	*/
	get current() {
		return this.#persisted.current;
	}
	/**
	* Set the current theme.
	* @param newValue The new theme to set.
	*/
	set current(newValue) {
		this.#persisted.current = newValue;
	}
};
/**
* A custom theme to apply and persist to the root `html` element.
*/
var customTheme = new CustomTheme();
//#endregion
//#region ../../node_modules/.bun/mode-watcher@1.1.0+4d34efae0051345e/node_modules/mode-watcher/dist/without-transition.js
var timeoutAction;
var timeoutEnable;
/**
* Whether this is the first time the function has been
* called, which will be true for the initial load, where
* we shouldn't need to disable any transitions, as there
* is nothing to transition from.
*/
var hasLoaded = false;
var styleElement = null;
function getStyleElement() {
	if (styleElement) return styleElement;
	styleElement = document.createElement("style");
	styleElement.appendChild(document.createTextNode(`* {
		-webkit-transition: none !important;
		-moz-transition: none !important;
		-o-transition: none !important;
		-ms-transition: none !important;
		transition: none !important;
	}`));
	return styleElement;
}
function withoutTransition(action, synchronous = false) {
	if (typeof document === "undefined") return;
	if (!hasLoaded) {
		hasLoaded = true;
		action();
		return;
	}
	if (typeof process !== "undefined" && process.env.NODE_ENV === "test" || typeof window !== "undefined" && window.__vitest_worker__) {
		action();
		return;
	}
	clearTimeout(timeoutAction);
	clearTimeout(timeoutEnable);
	const style = getStyleElement();
	const disable = () => document.head.appendChild(style);
	const enable = () => {
		if (style.parentNode) document.head.removeChild(style);
	};
	function executeAction() {
		action();
		window.requestAnimationFrame(enable);
	}
	if (typeof window.requestAnimationFrame !== "undefined") {
		disable();
		if (synchronous) executeAction();
		else window.requestAnimationFrame(() => {
			executeAction();
		});
		return;
	}
	disable();
	timeoutAction = window.setTimeout(() => {
		action();
		timeoutEnable = window.setTimeout(enable, 16);
	}, 16);
}
//#endregion
//#region ../../node_modules/.bun/mode-watcher@1.1.0+4d34efae0051345e/node_modules/mode-watcher/dist/states.svelte.js
var themeColors = box(void 0);
var disableTransitions = box(true);
var synchronousModeChanges = box(false);
var darkClassNames = box([]);
var lightClassNames = box([]);
function createDerivedMode() {
	const current = derived(() => {
		if (!isBrowser) return void 0;
		const derivedMode = userPrefersMode.current === "system" ? systemPrefersMode.current : userPrefersMode.current;
		const sanitizedDarkClassNames = sanitizeClassNames(darkClassNames.current);
		const sanitizedLightClassNames = sanitizeClassNames(lightClassNames.current);
		function update() {
			const htmlEl = document.documentElement;
			const themeColorEl = document.querySelector("meta[name=\"theme-color\"]");
			if (derivedMode === "light") {
				if (sanitizedDarkClassNames.length) htmlEl.classList.remove(...sanitizedDarkClassNames);
				if (sanitizedLightClassNames.length) htmlEl.classList.add(...sanitizedLightClassNames);
				htmlEl.style.colorScheme = "light";
				if (themeColorEl && themeColors.current) themeColorEl.setAttribute("content", themeColors.current.light);
			} else {
				if (sanitizedLightClassNames.length) htmlEl.classList.remove(...sanitizedLightClassNames);
				if (sanitizedDarkClassNames.length) htmlEl.classList.add(...sanitizedDarkClassNames);
				htmlEl.style.colorScheme = "dark";
				if (themeColorEl && themeColors.current) themeColorEl.setAttribute("content", themeColors.current.dark);
			}
		}
		if (disableTransitions.current) withoutTransition(update, synchronousModeChanges.current);
		else update();
		return derivedMode;
	});
	return { get current() {
		return current();
	} };
}
function createDerivedTheme() {
	const current = derived(() => {
		customTheme.current;
		if (!isBrowser) return void 0;
		function update() {
			document.documentElement.setAttribute("data-theme", customTheme.current);
		}
		if (disableTransitions.current) withoutTransition(update, run(() => synchronousModeChanges.current));
		else update();
		return customTheme.current;
	});
	return { get current() {
		return current();
	} };
}
/**
* Derived store that represents the current mode (`"dark"`, `"light"` or `undefined`)
*/
var derivedMode = createDerivedMode();
createDerivedTheme();
function defineConfig(config) {
	return config;
}
/** Used to set the mode on initial page load to prevent FOUC */
function setInitialMode({ defaultMode = "system", themeColors, darkClassNames = ["dark"], lightClassNames = [], defaultTheme = "", modeStorageKey = "mode-watcher-mode", themeStorageKey = "mode-watcher-theme" }) {
	const rootEl = document.documentElement;
	const mode = localStorage.getItem(modeStorageKey) ?? defaultMode;
	const theme = localStorage.getItem(themeStorageKey) ?? defaultTheme;
	const light = mode === "light" || mode === "system" && window.matchMedia("(prefers-color-scheme: light)").matches;
	if (light) {
		if (darkClassNames.length) rootEl.classList.remove(...darkClassNames.filter(Boolean));
		if (lightClassNames.length) rootEl.classList.add(...lightClassNames.filter(Boolean));
	} else {
		if (lightClassNames.length) rootEl.classList.remove(...lightClassNames.filter(Boolean));
		if (darkClassNames.length) rootEl.classList.add(...darkClassNames.filter(Boolean));
	}
	rootEl.style.colorScheme = light ? "light" : "dark";
	if (themeColors) {
		const themeMetaEl = document.querySelector("meta[name=\"theme-color\"]");
		if (themeMetaEl) themeMetaEl.setAttribute("content", mode === "light" ? themeColors.light : themeColors.dark);
	}
	if (theme) {
		rootEl.setAttribute("data-theme", theme);
		localStorage.setItem(themeStorageKey, theme);
	}
	localStorage.setItem(modeStorageKey, mode);
}
//#endregion
//#region ../../node_modules/.bun/mode-watcher@1.1.0+4d34efae0051345e/node_modules/mode-watcher/dist/components/mode-watcher-lite.svelte
function Mode_watcher_lite($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { themeColors } = $$props;
		if (themeColors) $$renderer.push(`<!--[0--><meta name="theme-color"${attr("content", themeColors.dark)}/>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region ../../node_modules/.bun/mode-watcher@1.1.0+4d34efae0051345e/node_modules/mode-watcher/dist/components/mode-watcher-full.svelte
function Mode_watcher_full($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { trueNonce = "", initConfig, themeColors } = $$props;
		head("ttb5a7", $$renderer, ($$renderer) => {
			if (themeColors) $$renderer.push(`<!--[0--><meta name="theme-color"${attr("content", themeColors.dark)}/>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> ${html(`<script${trueNonce ? ` nonce=${trueNonce}` : ""}>(` + setInitialMode.toString() + `)(` + JSON.stringify(initConfig) + `);<\/script>`)}`);
		});
	});
}
//#endregion
//#region ../../node_modules/.bun/mode-watcher@1.1.0+4d34efae0051345e/node_modules/mode-watcher/dist/components/mode-watcher.svelte
function Mode_watcher($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { track = true, defaultMode = "system", themeColors: themeColorsProp, disableTransitions: disableTransitionsProp = true, darkClassNames: darkClassNamesProp = ["dark"], lightClassNames: lightClassNamesProp = [], defaultTheme = "", nonce = "", themeStorageKey: themeStorageKeyProp = "mode-watcher-theme", modeStorageKey: modeStorageKeyProp = "mode-watcher-mode", disableHeadScriptInjection = false, synchronousModeChanges: synchronousModeChangesProp = false } = $$props;
		modeStorageKey.current = modeStorageKeyProp;
		themeStorageKey.current = themeStorageKeyProp;
		darkClassNames.current = darkClassNamesProp;
		lightClassNames.current = lightClassNamesProp;
		disableTransitions.current = disableTransitionsProp;
		themeColors.current = themeColorsProp;
		synchronousModeChanges.current = synchronousModeChangesProp;
		const initConfig = defineConfig({
			defaultMode,
			themeColors: themeColorsProp,
			darkClassNames: darkClassNamesProp,
			lightClassNames: lightClassNamesProp,
			defaultTheme,
			modeStorageKey: modeStorageKeyProp,
			themeStorageKey: themeStorageKeyProp
		});
		const trueNonce = derived(() => typeof window === "undefined" ? nonce : "");
		if (disableHeadScriptInjection) {
			$$renderer.push("<!--[0-->");
			Mode_watcher_lite($$renderer, { themeColors: themeColors.current });
		} else {
			$$renderer.push("<!--[-1-->");
			Mode_watcher_full($$renderer, {
				trueNonce: trueNonce(),
				initConfig,
				themeColors: themeColors.current
			});
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/device-desktop.svelte
function Device_desktop($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "device-desktop"
		},
		props,
		{
			iconNode: [
				["path", { "d": "M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10" }],
				["path", { "d": "M7 20h10" }],
				["path", { "d": "M9 16v4" }],
				["path", { "d": "M15 16v4" }]
			],
			children
		}
	]));
}
//#endregion
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/external-link.svelte
function External_link($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "external-link"
		},
		props,
		{
			iconNode: [
				["path", { "d": "M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" }],
				["path", { "d": "M11 13l9 -9" }],
				["path", { "d": "M15 4h5v5" }]
			],
			children
		}
	]));
}
//#endregion
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/language.svelte
function Language($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "language"
		},
		props,
		{
			iconNode: [
				["path", { "d": "M9 6.371c0 4.418 -2.239 6.629 -5 6.629" }],
				["path", { "d": "M4 6.371h7" }],
				["path", { "d": "M5 9c0 2.144 2.252 3.908 6 4" }],
				["path", { "d": "M12 20l4 -9l4 9" }],
				["path", { "d": "M19.1 18h-6.2" }],
				["path", { "d": "M6.694 3l.793 .582" }]
			],
			children
		}
	]));
}
//#endregion
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/menu-2.svelte
function Menu_2($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "menu-2"
		},
		props,
		{
			iconNode: [
				["path", { "d": "M4 6l16 0" }],
				["path", { "d": "M4 12l16 0" }],
				["path", { "d": "M4 18l16 0" }]
			],
			children
		}
	]));
}
//#endregion
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/moon.svelte
function Moon($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "moon"
		},
		props,
		{
			iconNode: [["path", { "d": "M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008" }]],
			children
		}
	]));
}
//#endregion
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/search.svelte
function Search($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "search"
		},
		props,
		{
			iconNode: [["path", { "d": "M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" }], ["path", { "d": "M21 21l-6 -6" }]],
			children
		}
	]));
}
//#endregion
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/sun.svelte
function Sun($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "sun"
		},
		props,
		{
			iconNode: [["path", { "d": "M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" }], ["path", { "d": "M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" }]],
			children
		}
	]));
}
//#endregion
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/x.svelte
function X($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "x"
		},
		props,
		{
			iconNode: [["path", { "d": "M18 6l-12 12" }], ["path", { "d": "M6 6l12 12" }]],
			children
		}
	]));
}
//#endregion
//#region src/lib/components/ThemeToggle.svelte
function ThemeToggle($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const CurrentIcon = derived(() => derivedMode.current === "dark" ? Moon : derivedMode.current === "light" ? Sun : Device_desktop);
		$$renderer.push(`<button type="button" class="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground shadow-2xs" aria-label="Toggle theme">`);
		if (CurrentIcon()) {
			$$renderer.push("<!--[-->");
			CurrentIcon()($$renderer, {
				size: 16,
				stroke: 2
			});
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(`</button>`);
	});
}
//#endregion
//#region src/lib/paraglide/messages/lang_switch.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Lang_SwitchInputs */
var en_lang_switch = () => {
	return `Switch language`;
};
var vi_lang_switch = () => {
	return `Đổi ngôn ngữ`;
};
/**
* | output |
* | --- |
* | "Switch language" |
*
* @param {Lang_SwitchInputs} inputs
* @param {{ locale?: "en" | "vi" }} options
* @returns {LocalizedString}
*/
var lang_switch = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "vi") return vi_lang_switch(inputs);
	return en_lang_switch(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/legal_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Legal_DescInputs */
var en_legal_desc = () => {
	return `Transparent terms of service, privacy disclosures, data processing agreements, and security compliance standards.`;
};
var vi_legal_desc = () => {
	return `Điều khoản dịch vụ minh bạch, cam kết bảo vệ quyền riêng tư, thoả thuận xử lý dữ liệu và tiêu chuẩn tuân thủ an toàn thông tin.`;
};
/**
* | output |
* | --- |
* | "Transparent terms of service, privacy disclosures, data processing agreements, and security compliance standards." |
*
* @param {Legal_DescInputs} inputs
* @param {{ locale?: "en" | "vi" }} options
* @returns {LocalizedString}
*/
var legal_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "vi") return vi_legal_desc(inputs);
	return en_legal_desc(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/legal_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Legal_TitleInputs */
var en_legal_title = () => {
	return `Legal Center & Trust Architecture`;
};
var vi_legal_title = () => {
	return `Trung tâm Pháp lý & Cam kết Minh bạch`;
};
/**
* | output |
* | --- |
* | "Legal Center & Trust Architecture" |
*
* @param {Legal_TitleInputs} inputs
* @param {{ locale?: "en" | "vi" }} options
* @returns {LocalizedString}
*/
var legal_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "vi") return vi_legal_title(inputs);
	return en_legal_title(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/search_legal.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Search_LegalInputs */
var en_search_legal = () => {
	return `Search legal terms & clauses (⌘K)...`;
};
var vi_search_legal = () => {
	return `Tìm kiếm điều khoản pháp lý (⌘K)...`;
};
/**
* | output |
* | --- |
* | "Search legal terms & clauses (⌘K)..." |
*
* @param {Search_LegalInputs} inputs
* @param {{ locale?: "en" | "vi" }} options
* @returns {LocalizedString}
*/
var search_legal = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "vi") return vi_search_legal(inputs);
	return en_search_legal(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/tab_cookies.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Tab_CookiesInputs */
var en_tab_cookies = () => {
	return `Cookie Policy`;
};
var vi_tab_cookies = () => {
	return `Chính sách Cookie`;
};
/**
* | output |
* | --- |
* | "Cookie Policy" |
*
* @param {Tab_CookiesInputs} inputs
* @param {{ locale?: "en" | "vi" }} options
* @returns {LocalizedString}
*/
var tab_cookies = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "vi") return vi_tab_cookies(inputs);
	return en_tab_cookies(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/tab_dpa.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Tab_DpaInputs */
var en_tab_dpa = () => {
	return `Data Processing (DPA)`;
};
var vi_tab_dpa = () => {
	return `Thoả thuận Xử lý Dữ liệu (DPA)`;
};
/**
* | output |
* | --- |
* | "Data Processing (DPA)" |
*
* @param {Tab_DpaInputs} inputs
* @param {{ locale?: "en" | "vi" }} options
* @returns {LocalizedString}
*/
var tab_dpa = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "vi") return vi_tab_dpa(inputs);
	return en_tab_dpa(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/tab_licenses.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Tab_LicensesInputs */
var en_tab_licenses = () => {
	return `Open Source Licenses`;
};
var vi_tab_licenses = () => {
	return `Giấy phép Mã nguồn Mở`;
};
/**
* | output |
* | --- |
* | "Open Source Licenses" |
*
* @param {Tab_LicensesInputs} inputs
* @param {{ locale?: "en" | "vi" }} options
* @returns {LocalizedString}
*/
var tab_licenses = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "vi") return vi_tab_licenses(inputs);
	return en_tab_licenses(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/tab_overview.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Tab_OverviewInputs */
var en_tab_overview = () => {
	return `Legal Hub Overview`;
};
var vi_tab_overview = () => {
	return `Tổng quan Pháp lý`;
};
/**
* | output |
* | --- |
* | "Legal Hub Overview" |
*
* @param {Tab_OverviewInputs} inputs
* @param {{ locale?: "en" | "vi" }} options
* @returns {LocalizedString}
*/
var tab_overview = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "vi") return vi_tab_overview(inputs);
	return en_tab_overview(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/tab_privacy.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Tab_PrivacyInputs */
var en_tab_privacy = () => {
	return `Privacy Policy`;
};
var vi_tab_privacy = () => {
	return `Chính sách Quyền riêng tư`;
};
/**
* | output |
* | --- |
* | "Privacy Policy" |
*
* @param {Tab_PrivacyInputs} inputs
* @param {{ locale?: "en" | "vi" }} options
* @returns {LocalizedString}
*/
var tab_privacy = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "vi") return vi_tab_privacy(inputs);
	return en_tab_privacy(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/tab_sla.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Tab_SlaInputs */
var en_tab_sla = () => {
	return `SLA Guarantee`;
};
var vi_tab_sla = () => {
	return `Cam kết Mức Dịch vụ (SLA)`;
};
/**
* | output |
* | --- |
* | "SLA Guarantee" |
*
* @param {Tab_SlaInputs} inputs
* @param {{ locale?: "en" | "vi" }} options
* @returns {LocalizedString}
*/
var tab_sla = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "vi") return vi_tab_sla(inputs);
	return en_tab_sla(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/tab_subprocessors.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Tab_SubprocessorsInputs */
var en_tab_subprocessors = () => {
	return `Subprocessors`;
};
var vi_tab_subprocessors = () => {
	return `Danh sách Bên Xử lý Phụ`;
};
/**
* | output |
* | --- |
* | "Subprocessors" |
*
* @param {Tab_SubprocessorsInputs} inputs
* @param {{ locale?: "en" | "vi" }} options
* @returns {LocalizedString}
*/
var tab_subprocessors = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "vi") return vi_tab_subprocessors(inputs);
	return en_tab_subprocessors(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/tab_terms.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Tab_TermsInputs */
var en_tab_terms = () => {
	return `Terms of Service`;
};
var vi_tab_terms = () => {
	return `Điều khoản Dịch vụ`;
};
/**
* | output |
* | --- |
* | "Terms of Service" |
*
* @param {Tab_TermsInputs} inputs
* @param {{ locale?: "en" | "vi" }} options
* @returns {LocalizedString}
*/
var tab_terms = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "vi") return vi_tab_terms(inputs);
	return en_tab_terms(inputs);
});
//#endregion
//#region src/lib/components/LanguageSwitcher.svelte
function LanguageSwitcher($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<div class="relative"><button type="button" class="flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground shadow-2xs"${attr("aria-label", lang_switch())}>`);
		Language($$renderer, {
			size: 15,
			stroke: 2
		});
		$$renderer.push(`<!----> <span class="font-mono">${escape_html(getLocale().toUpperCase())}</span></button> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/lib/components/LegalHeader.svelte
function LegalHeader($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { onToggleSidebar } = $$props;
		$$renderer.push(`<header class="sticky top-0 z-40 border-b border-border bg-white dark:bg-card shadow-xs"><div class="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8"><div class="flex items-center gap-3 sm:gap-4">`);
		if (onToggleSidebar) {
			$$renderer.push(`<!--[0--><button type="button" class="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground lg:hidden hover:bg-muted" aria-label="Toggle navigation menu">`);
			Menu_2($$renderer, { size: 18 });
			$$renderer.push(`<!----></button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <a href="/" class="flex items-center gap-2.5"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">`);
		Shield_check($$renderer, {
			size: 18,
			stroke: 2.5
		});
		$$renderer.push(`<!----></div> <div class="flex items-center gap-1.5"><span class="font-bold text-foreground text-base tracking-tight">Povixa</span> <span class="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-primary">Legal</span></div></a> <div class="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground shadow-2xs"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> <span>GDPR &amp; CCPA Ready</span></div></div> <div class="hidden md:flex flex-1 max-w-md mx-6"><div class="relative w-full"><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">`);
		Search($$renderer, { size: 15 });
		$$renderer.push(`<!----></div> <input type="text"${attr("placeholder", search_legal())} class="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-14 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"/> <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5"><kbd class="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">⌘K</kbd></div></div></div> <div class="flex items-center gap-2 sm:gap-2.5"><a href="https://docs.povixa.cloud" target="_blank" rel="noreferrer" class="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"><span>Docs</span></a> <a href="https://console.povixa.cloud" target="_blank" rel="noreferrer" class="hidden sm:inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors shadow-2xs"><span>Console</span> `);
		External_link($$renderer, {
			size: 12,
			class: "opacity-70"
		});
		$$renderer.push(`<!----></a> <a href="https://povixa.cloud" target="_blank" rel="noreferrer" class="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"><span>Povixa.cloud</span></a> `);
		LanguageSwitcher($$renderer, {});
		$$renderer.push(`<!----> `);
		ThemeToggle($$renderer, {});
		$$renderer.push(`<!----></div></div></header>`);
	});
}
//#endregion
//#region src/lib/components/LegalSidebar.svelte
function LegalSidebar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { mobileOpen = false } = $$props;
		const currentPath = derived(() => page.url.pathname);
		const legalDocs = derived(() => [
			{
				href: "/",
				title: tab_overview(),
				icon: Shield_check,
				badge: "Hub"
			},
			{
				href: "/terms",
				title: tab_terms(),
				icon: File_text,
				badge: "v2.4"
			},
			{
				href: "/privacy",
				title: tab_privacy(),
				icon: Lock,
				badge: "GDPR"
			},
			{
				href: "/dpa",
				title: tab_dpa(),
				icon: Shield_check,
				badge: "DPA"
			},
			{
				href: "/cookies",
				title: tab_cookies(),
				icon: Cookie,
				badge: "Audit"
			},
			{
				href: "/subprocessors",
				title: tab_subprocessors(),
				icon: Server,
				badge: "Hạ tầng"
			},
			{
				href: "/sla",
				title: tab_sla(),
				icon: Clock,
				badge: "99.99%"
			},
			{
				href: "/licenses",
				title: tab_licenses(),
				icon: Code,
				badge: "AGPL/MIT"
			}
		]);
		$$renderer.push(`<aside class="hidden lg:block w-72 shrink-0 border-r border-border bg-white dark:bg-card p-6 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&amp;::-webkit-scrollbar]:hidden max-h-[calc(100vh-4rem)] sticky top-16 shadow-xs"><div class="mb-4 flex items-center justify-between pb-2 border-b border-border/80"><span class="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Văn bản Pháp lý</span> <span class="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">7 danh mục</span></div> <nav class="space-y-1.5"><!--[-->`);
		const each_array = ensure_array_like(legalDocs());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let doc = each_array[$$index];
			const Icon = doc.icon;
			const isActive = currentPath() === doc.href || doc.href !== "/" && currentPath().startsWith(doc.href);
			$$renderer.push(`<a${attr("href", doc.href)}${attr_class(`flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors ${isActive ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"}`)}><div class="flex items-center gap-2.5 truncate">`);
			if (Icon) {
				$$renderer.push("<!--[-->");
				Icon($$renderer, {
					size: 16,
					stroke: isActive ? 2.5 : 2,
					class: isActive ? "text-primary" : "text-muted-foreground"
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` <span class="truncate">${escape_html(doc.title)}</span></div> `);
			if (doc.badge) $$renderer.push(`<!--[0--><span class="ml-2 shrink-0 rounded border border-border/70 bg-background px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">${escape_html(doc.badge)}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></a>`);
		}
		$$renderer.push(`<!--]--></nav> <div class="mt-8 rounded-xl border border-border bg-background p-3.5 text-xs shadow-2xs"><p class="font-semibold text-foreground">Bộ phận Pháp chế (Legal Team)</p> <p class="mt-1 text-[11px] text-muted-foreground leading-relaxed">Cần bản ký kết DPA tùy chỉnh hoặc yêu cầu xác minh bảo mật doanh nghiệp?</p> <a href="mailto:legal@povixa.cloud" class="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-card py-1.5 text-xs font-medium text-foreground hover:bg-muted shadow-2xs transition-colors"><span>legal@povixa.cloud</span></a></div></aside> `);
		if (mobileOpen) {
			$$renderer.push(`<!--[0--><div class="fixed inset-0 z-50 lg:hidden"><div class="fixed inset-0 bg-background/80 backdrop-blur-sm" role="presentation"></div> <div class="fixed inset-y-0 left-0 w-80 bg-white dark:bg-card border-r border-border p-6 shadow-xl overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&amp;::-webkit-scrollbar]:hidden"><div class="flex items-center justify-between pb-4 border-b border-border/80"><span class="font-bold text-foreground text-sm">Văn bản Pháp lý</span> <button type="button" class="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">`);
			X($$renderer, { size: 18 });
			$$renderer.push(`<!----></button></div> <nav class="mt-4 space-y-1.5"><!--[-->`);
			const each_array_1 = ensure_array_like(legalDocs());
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let doc = each_array_1[$$index_1];
				const Icon = doc.icon;
				const isActive = currentPath() === doc.href || doc.href !== "/" && currentPath().startsWith(doc.href);
				$$renderer.push(`<a${attr("href", doc.href)}${attr_class(`flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors ${isActive ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"}`)}><div class="flex items-center gap-2.5 truncate">`);
				if (Icon) {
					$$renderer.push("<!--[-->");
					Icon($$renderer, {
						size: 16,
						stroke: isActive ? 2.5 : 2,
						class: isActive ? "text-primary" : "text-muted-foreground"
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` <span class="truncate">${escape_html(doc.title)}</span></div> `);
				if (doc.badge) $$renderer.push(`<!--[0--><span class="ml-2 shrink-0 rounded border border-border/70 bg-background px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">${escape_html(doc.badge)}</span>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></a>`);
			}
			$$renderer.push(`<!--]--></nav></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { mobileOpen });
	});
}
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		let mobileSidebarOpen = false;
		overwriteGetLocale(() => {
			if (typeof document !== "undefined") return document.documentElement.lang || "en";
			return "en";
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("12qhfyh", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>${escape_html(legal_title())} — Povixa Trust &amp; Compliance</title>`);
				});
				$$renderer.push(`<link rel="icon" type="image/svg+xml"${attr("href", favicon_default)}/> <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff"/> <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#090d16"/> <meta name="description"${attr("content", legal_desc())}/> <meta name="robots" content="index, follow"/> <meta property="og:title"${attr("content", `${stringify(legal_title())} — Povixa`)}/> <meta property="og:description"${attr("content", legal_desc())}/> <meta property="og:type" content="website"/> <meta name="twitter:card" content="summary"/> <meta name="twitter:title"${attr("content", `${stringify(legal_title())} — Povixa`)}/> <meta name="twitter:description"${attr("content", legal_desc())}/>`);
			});
			Mode_watcher($$renderer, {});
			$$renderer.push(`<!----> <div class="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">`);
			LegalHeader($$renderer, { onToggleSidebar: () => mobileSidebarOpen = !mobileSidebarOpen });
			$$renderer.push(`<!----> <div class="flex-1 flex max-w-[1600px] w-full mx-auto">`);
			LegalSidebar($$renderer, {
				get mobileOpen() {
					return mobileSidebarOpen;
				},
				set mobileOpen($$value) {
					mobileSidebarOpen = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> <main class="flex-1 min-w-0 px-4 py-8 sm:px-8 lg:px-12 max-w-5xl">`);
			children($$renderer);
			$$renderer.push(`<!----></main></div></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
export { _layout as default };

//# sourceMappingURL=_layout.svelte.js.map