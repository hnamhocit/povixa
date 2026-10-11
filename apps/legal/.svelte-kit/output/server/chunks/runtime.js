//#region src/lib/paraglide/runtime.js
/** @type {any} */
var URLPattern = {};
/**
* The project's locales that have been specified in the settings.
*
* @example
*   if (locales.includes(userSelectedLocale) === false) {
*     throw new Error('Locale is not available');
*   }
*/
var locales = ["en", "vi"];
/** @type {string} */
var cookieName = "PARAGLIDE_LOCALE";
/** @type {number} */
var cookieMaxAge = 3456e4;
/**
* @type {Array<"cookie" | "baseLocale" | "globalVariable" | "url" | "preferredLanguage" | "localStorage" | `custom-${string}`>}
*/
var strategy = [
	"cookie",
	"globalVariable",
	"baseLocale"
];
/**
* Route-level strategy overrides.
*
* `match` uses URLPattern syntax.
*
* @type {Array<{
*   match: string;
*   strategy?: Array<"cookie" | "baseLocale" | "globalVariable" | "url" | "preferredLanguage" | "localStorage" | `custom-${string}`>;
*   exclude?: boolean;
* }>}
*/
var routeStrategies = [];
/**
* @typedef {{
* 		getStore(): {
*   		locale?: Locale,
* 			origin?: string,
* 			messageCalls?: Set<string>
*   	} | undefined,
* 		run: (store: { locale?: Locale, origin?: string, messageCalls?: Set<string>},
*    cb: any) => any
* }} ParaglideAsyncLocalStorage
*/
/**
* Server side async local storage that is set by `serverMiddleware()`.
*
* The variable is used to retrieve the locale and origin in a server-side
* rendering context without effecting other requests.
*
* @type {ParaglideAsyncLocalStorage | undefined}
*/
var serverAsyncLocalStorage = void 0;
/**
* Returns the current server-side async local storage instance.
*
* Accessing the mutable value through a function keeps it observable when
* module interceptors wrap exported bindings and snapshot their initial value.
*
* @returns {ParaglideAsyncLocalStorage | undefined}
*/
function getServerAsyncLocalStorage() {
	return serverAsyncLocalStorage;
}
var isServer = typeof window === "undefined";
/**
* Sets the server side async local storage.
*
* The function is needed because the `runtime.js` file
* must define the `serverAsyncLocalStorage` variable to
* avoid a circular import between `runtime.js` and
* `server.js` files.
*
* @param {ParaglideAsyncLocalStorage | undefined} value
*/
function overwriteServerAsyncLocalStorage(value) {
	serverAsyncLocalStorage = value;
}
/** @type {any} */ globalThis.__paraglide = globalThis.__paraglide ?? {};
/** @type {any} */ globalThis.__paraglide.ssr = globalThis.__paraglide.ssr ?? {};
/**
* This is a fallback to get started with a custom
* strategy and avoid type errors.
*
* The implementation is overwritten
* by `overwriteGetLocale()` and `defineSetLocale()`.
*
* @type {Locale | undefined}
*/
var _locale;
var localeInitiallySet = false;
/**
* Get the current locale.
*
* The locale is resolved using your configured strategies (URL, cookie, localStorage, etc.)
* in the order they are defined. In SSR contexts, the locale is retrieved from AsyncLocalStorage
* which is set by the `paraglideMiddleware()`.
*
* @see https://paraglidejs.com/strategy - Configure locale detection strategies
*
* @example
*   if (getLocale() === 'de') {
*     console.log('Germany 🇩🇪');
*   } else if (getLocale() === 'nl') {
*     console.log('Netherlands 🇳🇱');
*   }
*
* @returns {Locale} The current locale.
*/
var getLocale = () => {
	if (serverAsyncLocalStorage) {
		const locale = serverAsyncLocalStorage?.getStore()?.locale;
		if (locale) return locale;
	}
	let strategyToUse = strategy;
	if (!isServer && typeof window !== "undefined" && window.location?.href) strategyToUse = getStrategyForUrl(window.location.href);
	const resolved = resolveLocaleWithStrategies(strategyToUse, typeof window !== "undefined" ? window.location?.href : void 0);
	if (resolved) {
		if (!localeInitiallySet) {
			_locale = resolved;
			localeInitiallySet = true;
			setLocale(resolved, { reload: false });
		}
		return resolved;
	}
	throw new Error("No locale found. Read the docs https://paraglidejs.com/errors#no-locale-found");
};
/**
* Resolve locale for a given URL using route-aware strategies.
*
* @param {string | URL} url
* @returns {Locale}
*/
function getLocaleForUrl(url) {
	const resolved = resolveLocaleWithStrategies(getStrategyForUrl(url), typeof url === "string" ? url : url.href);
	if (resolved) return resolved;
	throw new Error("No locale found. Read the docs https://paraglidejs.com/errors#no-locale-found");
}
/**
* @param {typeof strategy} strategyToUse
* @param {string | undefined} urlForUrlStrategy
* @returns {Locale | undefined}
*/
function resolveLocaleWithStrategies(strategyToUse, urlForUrlStrategy) {
	/** @type {string | undefined} */
	let locale;
	for (const strat of strategyToUse) {
		if (strat === "cookie") locale = extractLocaleFromCookie();
		else if (strat === "baseLocale") locale = "en";
		else if (strat === "globalVariable" && _locale !== void 0) locale = _locale;
		else if (isCustomStrategy(strat) && customClientStrategies.has(strat)) {
			const handler = customClientStrategies.get(strat);
			if (handler) {
				const result = handler.getLocale();
				if (result instanceof Promise) continue;
				if (result !== void 0) return assertIsLocale(result);
			}
		}
		const matchedLocale = toLocale(locale);
		if (matchedLocale) return matchedLocale;
	}
}
/**
* Overwrite the `getLocale()` function.
*
* Use this function to overwrite how the locale is resolved. This is useful
* for custom locale resolution or advanced use cases like SSG with concurrent rendering.
*
* @see https://paraglidejs.com/strategy
*
* @example
*   overwriteGetLocale(() => {
*     return Cookies.get('locale') ?? baseLocale
*   });
*
* @param {() => Locale} fn - The new implementation for `getLocale()`.
*/
var overwriteGetLocale = (fn) => {
	getLocale = fn;
};
var rtlLanguages = /* @__PURE__ */ new Set([
	"ar",
	"dv",
	"fa",
	"he",
	"ks",
	"ku",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi"
]);
/**
* Get writing direction for a locale.
*
* Uses `Intl.Locale` text info when available and falls back to a
* language-based RTL check for runtimes without `getTextInfo()`.
*
* @example
*   getTextDirection(); // "ltr" or "rtl" for current locale
*   getTextDirection("ar"); // "rtl"
*   getTextDirection("en"); // "ltr"
*
* @param {string} [locale] - Target locale. If not provided, uses `getLocale()`
* @returns {"ltr" | "rtl"}
*/
function getTextDirection(locale = getLocale()) {
	try {
		const intlLocale = new Intl.Locale(locale);
		const direction = intlLocale.getTextInfo?.().direction ?? intlLocale.textInfo?.direction;
		if (direction === "ltr" || direction === "rtl") return direction;
	} catch {}
	const language = locale.split("-")[0]?.toLowerCase();
	return rtlLanguages.has(language ?? "") ? "rtl" : "ltr";
}
/**
* Navigates to the localized URL, or reloads the current page
*
* @param {string} [newLocation] The new location
*/
var navigateOrReload = (newLocation) => {
	if (newLocation) window.location.href = newLocation;
	else window.location.reload();
};
/**
* @typedef {(newLocale: Locale, options?: { reload?: boolean }) => void | Promise<void>} SetLocaleFn
*/
/**
* Set the locale.
*
* Updates the locale using your configured strategies (cookie, localStorage, URL, etc.).
* By default, this navigates the client to the localized URL or reloads the current
* document to reflect the new locale. `reload: false` is a narrow browser-only escape
* hatch for a fully client-rendered, non-URL-routed surface that owns its reactive
* updates and document state. It does not re-render the UI or update the document.
* Do not use it for normal locale pickers, URL-routed pages, or switching an SSR,
* SSG, or hydrated document. It is incompatible with per-locale builds.
*
* If any custom strategy's `setLocale` function is async, then this function
* will become async as well.
*
* @see https://paraglidejs.com/strategy
*
* @example
*   setLocale('en');
*
* @example
*   setLocale('en', { reload: false });
*
* @type {SetLocaleFn}
*/
var setLocale = (newLocale, options) => {
	const optionsWithDefaults = {
		reload: true,
		...options
	};
	/** @type {Locale | undefined} */
	let currentLocale;
	try {
		currentLocale = getLocale();
	} catch {}
	/** @type {Array<Promise<void>>} */
	const customSetLocalePromises = [];
	/** @type {string | undefined} */
	let newLocation = void 0;
	let strategyToUse = strategy;
	if (!isServer && typeof window !== "undefined" && window.location?.href) strategyToUse = getStrategyForUrl(window.location.href);
	for (const strat of strategyToUse) if (strat === "globalVariable") _locale = newLocale;
	else if (strat === "cookie") {
		if (isServer || typeof document === "undefined" || typeof window === "undefined") continue;
		const cookieString = `${cookieName}=${newLocale}; path=/; max-age=${cookieMaxAge}`;
		document.cookie = cookieString;
		clearLocaleCookieCache();
	} else if (strat === "baseLocale") continue;
	else if (isCustomStrategy(strat) && customClientStrategies.has(strat)) {
		const handler = customClientStrategies.get(strat);
		if (handler) {
			let result = handler.setLocale(newLocale);
			if (result instanceof Promise) {
				result = result.catch((error) => {
					throw new Error(`Custom strategy "${strat}" setLocale failed.`, { cause: error });
				});
				customSetLocalePromises.push(result);
			}
		}
	}
	const runReload = () => {
		if (!isServer && optionsWithDefaults.reload && window.location && newLocale !== currentLocale) navigateOrReload(newLocation);
	};
	if (customSetLocalePromises.length) return Promise.all(customSetLocalePromises).then(() => {
		runReload();
	});
	runReload();
};
/**
* The origin of the current URL.
*
* Defaults to "http://example.com" in non-browser environments. If this
* behavior is not desired, the implementation can be overwritten
* by `overwriteGetUrlOrigin()`.
*
* @type {() => string}
*/
var getUrlOrigin = () => {
	if (serverAsyncLocalStorage) return serverAsyncLocalStorage.getStore()?.origin ?? "http://fallback.com";
	else if (typeof window !== "undefined") return window.location.origin;
	return "http://fallback.com";
};
/**
* Coerces a locale-like string to the canonical locale value used by the runtime.
*
* @param {unknown} value
* @returns {Locale | undefined}
*/
function toLocale(value) {
	if (typeof value !== "string") return;
	const lowerValue = value.toLowerCase();
	for (const locale of locales) if (locale.toLowerCase() === lowerValue) return locale;
}
/**
* Asserts that the input can be normalized to a locale.
*
* @param {unknown} input - The input to check.
* @returns {Locale} The input normalized to a Locale.
* @throws {Error} If the input is not a locale.
*/
function assertIsLocale(input) {
	const locale = toLocale(input);
	if (locale) return locale;
	throw new Error(`Invalid locale: ${input}. Expected one of: ${locales.join(", ")}`);
}
/**
* Applies the configured trailing slash policy to a URL.
*
* The root pathname always remains `/`. Query parameters and hashes are not
* modified.
*
* @param {URL} url
* @returns {URL}
*/
function normalizeTrailingSlash(url) {
	return url;
}
/** @param {string} pattern @param {URL} url @returns {URLPattern} */
function getUrlPattern(pattern, url) {
	return new URLPattern(pattern, url.href);
}
function getRoutingConfigVersion() {
	return 0;
}
/** @param {URL} _url @returns {typeof routeStrategies} */
function getRouteStrategyCandidates(_url) {
	return routeStrategies;
}
/**
* Matches a canonical URL while allowing configured patterns to retain their
* existing trailing slash style.
*
* @param {URLPattern} pattern
* @param {URL} url
* @returns {any}
*/
function execUrlPattern(pattern, url) {
	return pattern.exec(url.href);
}
/**
* Extracts a locale from a request using the provided strategy order.
*
* @param {Request} request
* @param {typeof strategy} strategies
* @param {string | URL} [url]
* @returns {Locale}
*/
var extractLocaleFromRequestWithStrategies = (request, strategies, url = request.url) => {
	resolveEffectiveRequestUrl(request, url);
	/** @type {string|undefined} */
	let locale;
	for (const strat of strategies) {
		if (strat === "cookie") {
			const cookiePrefix = cookieName + "=";
			locale = request.headers.get("cookie")?.split(";").map((c) => c.trim()).find((c) => c.startsWith(cookiePrefix))?.slice(17);
		} else if (strat === "globalVariable") locale = _locale;
		else if (strat === "baseLocale") return "en";
		else if (strat === "localStorage") continue;
		else if (isCustomStrategy(strat)) continue;
		const matchedLocale = toLocale(locale);
		if (matchedLocale) return matchedLocale;
	}
	throw new Error("No locale found. There is an error in your strategy. Try adding 'baseLocale' as the very last strategy. Read more here https://paraglidejs.com/errors#no-locale-found");
};
/**
* @param {Request} request
* @param {string | URL | undefined} effectiveRequestUrl
* @returns {URL}
*/
function resolveEffectiveRequestUrl(request, effectiveRequestUrl = request.url) {
	if (effectiveRequestUrl instanceof URL) return new URL(effectiveRequestUrl.href);
	return new URL(effectiveRequestUrl, request.url);
}
/**
* Asynchronously extracts a locale from a request.
*
* This function supports async custom server strategies, unlike the synchronous
* `extractLocaleFromRequest`. Use this function when you have custom server strategies
* that need to perform asynchronous operations (like database calls) in their getLocale method.
*
* The function first processes any custom server strategies asynchronously, then falls back
* to the synchronous `extractLocaleFromRequest` for all other strategies.
*
* @see {@link https://github.com/opral/inlang-paraglide-js/issues/527#issuecomment-2978151022}
*
* @example
*   // Basic usage
*   const locale = await extractLocaleFromRequestAsync(request);
*
* @example
*   // With custom async server strategy
*   defineCustomServerStrategy("custom-database", {
*     getLocale: async (request) => {
*       const userId = extractUserIdFromRequest(request);
*       return await getUserLocaleFromDatabase(userId);
*     }
*   });
*
*   const locale = await extractLocaleFromRequestAsync(request);
*
* @param {Request} request - The request object to extract the locale from.
* @param {{ effectiveRequestUrl?: string | URL }} [options] - Effective request URL to use for route matching and locale detection with the URL strategy.
* @returns {Promise<Locale>} The extracted locale.
*/
var extractLocaleFromRequestAsync = async (request, options = {}) => {
	/** @type {string|undefined} */
	let locale;
	const effectiveRequestUrl = resolveEffectiveRequestUrlFromRequestAsync(request, options.effectiveRequestUrl);
	const strategy = getStrategyForUrl(effectiveRequestUrl);
	for (const strat of strategy) if (isCustomStrategy(strat) && customServerStrategies.has(strat)) {
		const handler = customServerStrategies.get(strat);
		if (handler)
 /** @type {string|undefined} */
		locale = await handler.getLocale(request);
		const matchedLocale = toLocale(locale);
		if (matchedLocale) return matchedLocale;
	}
	return extractLocaleFromRequestWithStrategies(request, strategy, effectiveRequestUrl);
};
/**
* @param {Request} request
* @param {string | URL | undefined} effectiveRequestUrl
* @returns {URL}
*/
function resolveEffectiveRequestUrlFromRequestAsync(request, effectiveRequestUrl = request.url) {
	if (effectiveRequestUrl instanceof URL) return new URL(effectiveRequestUrl.href);
	return new URL(effectiveRequestUrl, request.url);
}
var cookieNamePattern = cookieName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var localeCookiePattern = new RegExp(`(?:^|;\\s*)${cookieNamePattern}=([^;]*)`);
var noCachedLocale = Symbol();
/** @type {Locale | undefined | typeof noCachedLocale} */
var cachedLocaleFromCookie = noCachedLocale;
/**
* Clears the cached locale from `document.cookie`.
*/
function clearLocaleCookieCache() {
	cachedLocaleFromCookie = noCachedLocale;
}
function scheduleLocaleCookieCacheClear() {
	if (typeof queueMicrotask === "function") queueMicrotask(clearLocaleCookieCache);
	else Promise.resolve().then(clearLocaleCookieCache);
}
/**
* Extracts a cookie from the document.
*
* Will return undefined if the document is not available or if the cookie is not set.
* The `document` object is not available in server-side rendering, so this function should not be called in that context.
*
* @returns {Locale | undefined}
*/
function extractLocaleFromCookie() {
	if (typeof document === "undefined") return;
	if (cachedLocaleFromCookie !== noCachedLocale) return cachedLocaleFromCookie;
	const locale = document.cookie.match(localeCookiePattern)?.[1];
	cachedLocaleFromCookie = toLocale(locale);
	scheduleLocaleCookieCacheClear();
	return cachedLocaleFromCookie;
}
var cachedLocaleConfigVersion = -1;
/**
* If extractLocaleFromUrl is called many times on the same page and the URL
* hasn't changed, we don't need to recompute it every time which can get expensive.
* We might use a LRU cache if needed, but for now storing only the last result is enough.
* https://github.com/opral/monorepo/pull/3575#discussion_r2066731243
*/
/** @type {string|undefined} */
var cachedUrl;
/** @type {Locale|undefined} */
var cachedLocale;
/**
* Extracts the locale from a given URL using native URLPattern.
*
* The built-in default `/:locale/...` routing is case-insensitive because it
* canonicalizes the first path segment with `toLocale()`. Custom `urlPatterns`
* keep URLPattern's normal exact matching semantics for path segments.
*
* @param {URL|string} url - The full URL from which to extract the locale.
* @returns {Locale|undefined} The extracted locale, or undefined if no locale is found.
*/
function extractLocaleFromUrl(url) {
	const urlString = typeof url === "string" ? url : url.href;
	const configVersion = 0;
	if (cachedUrl === urlString && cachedLocaleConfigVersion === configVersion) return cachedLocale;
	/** @type {Locale | undefined} */
	let result;
	result = defaultUrlPatternExtractLocale(normalizeTrailingSlash(typeof url === "string" ? new URL(url, "http://example.com") : new URL(url)));
	cachedLocaleConfigVersion = configVersion;
	cachedUrl = urlString;
	cachedLocale = result;
	return result;
}
/**
* https://github.com/opral/inlang-paraglide-js/issues/381
*
* @param {URL | string} url - The full URL from which to extract the locale.
* @returns {Locale | undefined} The extracted locale, or undefined if no locale is found.
*/
function defaultUrlPatternExtractLocale(url) {
	return toLocale(new URL(url, "http://example.com").pathname.split("/").filter(Boolean)[0]) || "en";
}
/**
* Lower-level URL localization function, primarily used in server contexts.
*
* This function is designed for server-side usage where you need precise control
* over URL localization, such as in middleware or request handlers. It works with
* URL objects and always returns absolute URLs.
*
* For client-side UI components, use `localizeHref()` instead, which provides
* a more convenient API with relative paths and automatic locale detection.
*
* @see https://paraglidejs.com/i18n-routing
*
* @example
* ```typescript
* // Server middleware example
* app.use((req, res, next) => {
*   const url = new URL(req.url, `${req.protocol}://${req.headers.host}`);
*   const localized = localizeUrl(url, { locale: "de" });
*
*   if (localized.href !== url.href) {
*     return res.redirect(localized.href);
*   }
*   next();
* });
* ```
*
* @example
* ```typescript
* // Using with URL patterns
* const url = new URL("https://example.com/about");
* localizeUrl(url, { locale: "de" });
* // => URL("https://example.com/de/about")
*
* // Using with domain-based localization
* const url = new URL("https://example.com/store");
* localizeUrl(url, { locale: "de" });
* // => URL("https://de.example.com/store")
* ```
*
* @param {string | URL} url - The URL to localize. If string, must be absolute.
* @param {object} [options] - Options for localization
* @param {Locale} [options.locale] - Target locale. If not provided, uses getLocale()
* @returns {URL} The localized URL, always absolute
*/
function localizeUrl(url, options) {
	return localizeUrlDefaultPattern(url, options?.locale ? assertIsLocale(options?.locale) : getLocale());
}
/**
* https://github.com/opral/inlang-paraglide-js/issues/381
*
* @param {string | URL} url
* @param {Locale} locale
* @returns {URL}
*/
function localizeUrlDefaultPattern(url, locale) {
	const urlObj = normalizeTrailingSlash(typeof url === "string" ? new URL(url, getUrlOrigin()) : new URL(url));
	if (extractLocaleFromUrl(urlObj) === locale) return normalizeTrailingSlash(urlObj);
	const pathSegments = urlObj.pathname.replace(/^\/+/, "").split("/");
	if (pathSegments.length > 0 && toLocale(pathSegments[0])) pathSegments.shift();
	if (locale === "en") urlObj.pathname = "/" + pathSegments.join("/");
	else urlObj.pathname = "/" + locale + "/" + pathSegments.join("/");
	return normalizeTrailingSlash(urlObj);
}
/**
* Low-level URL de-localization function, primarily used in server contexts.
*
* This function is designed for server-side usage where you need precise control
* over URL de-localization, such as in middleware or request handlers. It works with
* URL objects and always returns absolute URLs.
*
* For client-side UI components, use `deLocalizeHref()` instead, which provides
* a more convenient API with relative paths.
*
* @see https://paraglidejs.com/i18n-routing
*
* @example
* ```typescript
* // Server middleware example
* app.use((req, res, next) => {
*   const url = new URL(req.url, `${req.protocol}://${req.headers.host}`);
*   const baseUrl = deLocalizeUrl(url);
*
*   // Store the base URL for later use
*   req.baseUrl = baseUrl;
*   next();
* });
* ```
*
* @example
* ```typescript
* // Using with URL patterns
* const url = new URL("https://example.com/de/about");
* deLocalizeUrl(url); // => URL("https://example.com/about")
*
* // Using with domain-based localization
* const url = new URL("https://de.example.com/store");
* deLocalizeUrl(url); // => URL("https://example.com/store")
* ```
*
* @param {string | URL} url - The URL to de-localize. If string, must be absolute.
* @returns {URL} The de-localized URL, always absolute
*/
function deLocalizeUrl(url) {
	return deLocalizeUrlDefaultPattern(url);
}
/**
* De-localizes a URL using the default pattern (/:locale/*)
* @param {string|URL} url
* @returns {URL}
*/
function deLocalizeUrlDefaultPattern(url) {
	const urlObj = normalizeTrailingSlash(typeof url === "string" ? new URL(url, getUrlOrigin()) : new URL(url));
	const pathSegments = urlObj.pathname.replace(/^\/+/, "").split("/");
	if (pathSegments.length > 0 && toLocale(pathSegments[0])) urlObj.pathname = "/" + pathSegments.slice(1).join("/");
	return normalizeTrailingSlash(urlObj);
}
var cachedRouteConfigVersion = -1;
/** @type {string | undefined} */
var cachedRouteStrategyUrl;
/** @type {{ match: string; strategy?: typeof strategy; exclude?: boolean } | undefined} */
var cachedRouteStrategy;
/**
* Match route policy against both the public URL and its canonical URL.
*
* The function is deliberately separate from variables.js: configuration is
* inert data, while canonicalization and route selection form a routing layer.
*
* @param {string | URL} url
* @returns {{ match: string; strategy?: typeof strategy; exclude?: boolean } | undefined}
*/
function findMatchingRouteStrategy(url) {
	if (routeStrategies.length === 0) return;
	const urlString = typeof url === "string" ? url : url.href;
	const configVersion = getRoutingConfigVersion();
	if (cachedRouteStrategyUrl === urlString && cachedRouteConfigVersion === configVersion) return cachedRouteStrategy;
	const publicUrl = normalizeTrailingSlash(new URL(urlString, "http://example.com"));
	const canonicalUrl = deLocalizeUrl(publicUrl);
	const candidateUrls = canonicalUrl.href === publicUrl.href ? [publicUrl] : [publicUrl, canonicalUrl];
	let match;
	for (const candidateUrl of candidateUrls) {
		for (const routeStrategy of getRouteStrategyCandidates(candidateUrl)) if (execUrlPattern(getUrlPattern(routeStrategy.match, candidateUrl), candidateUrl)) {
			match = routeStrategy;
			break;
		}
		if (match) break;
	}
	cachedRouteConfigVersion = configVersion;
	cachedRouteStrategyUrl = urlString;
	cachedRouteStrategy = match;
	return match;
}
/**
* Returns the strategy to use for a specific URL.
*
* If no route strategy matches (or the matching rule is `exclude: true`),
* the global strategy is returned.
*
* @param {string | URL} url
* @returns {typeof strategy}
*/
function getStrategyForUrl(url) {
	const routeStrategy = findMatchingRouteStrategy(url);
	if (routeStrategy && routeStrategy.exclude !== true && Array.isArray(routeStrategy.strategy)) return routeStrategy.strategy;
	return strategy;
}
/**
* Returns whether the given URL is excluded from middleware i18n processing.
*
* @param {string | URL} url
* @returns {boolean}
*/
function isExcludedByRouteStrategy(url) {
	return findMatchingRouteStrategy(url)?.exclude === true;
}
/**
* @typedef {object} ShouldRedirectServerInput
* @property {Request} request
* @property {string | URL} [effectiveRequestUrl] - Effective request URL to use for route matching, locale detection with the URL strategy, and redirect targets.
* @property {Locale} [locale]
*
* @typedef {object} ShouldRedirectClientInput
* @property {undefined} [request]
* @property {string | URL} [url]
* @property {Locale} [locale]
*
* @typedef {ShouldRedirectServerInput | ShouldRedirectClientInput} ShouldRedirectInput
*
* @typedef {object} ShouldRedirectResult
* @property {boolean} shouldRedirect - Indicates whether the consumer should perform a redirect.
* @property {Locale} locale - Locale resolved using the configured strategies.
* @property {URL | undefined} redirectUrl - Destination URL when a redirect is required.
*/
/**
* Determines whether a redirect is required to align the current URL with the active locale.
*
* This helper mirrors the logic that powers `paraglideMiddleware`, but works in both server
* and client environments. It evaluates the configured strategies in order, computes the
* canonical localized URL, and reports when the current URL does not match.
*
* When called in the browser without arguments, the current `window.location.href` is used.
*
* @see https://paraglidejs.com/i18n-routing#redirects
*
* @example
* // Client side usage (e.g. TanStack Router beforeLoad hook)
* async function beforeLoad({ location }) {
*   const decision = await shouldRedirect({ url: location.href });
*
*   if (decision.shouldRedirect) {
*     throw redirect({ to: decision.redirectUrl.href });
*   }
* }
*
* @example
* // Server side usage with a Request
* export async function handle(request) {
*   const decision = await shouldRedirect({ request });
*
*   if (decision.shouldRedirect) {
*     return Response.redirect(decision.redirectUrl, 307);
*   }
*
*   return render(request, decision.locale);
* }
*
* @example
* // Server side usage behind a proxy where request.url is not public-facing
* export async function handle(request) {
*   const effectiveRequestUrl = new URL(request.url);
*   effectiveRequestUrl.protocol = "https:";
*   effectiveRequestUrl.host = "example.com";
*
*   const decision = await shouldRedirect({
*     request,
*     effectiveRequestUrl,
*   });
*
*   if (decision.shouldRedirect) {
*     return Response.redirect(decision.redirectUrl, 307);
*   }
* }
*
* @param {ShouldRedirectInput} [input]
* @returns {Promise<ShouldRedirectResult>}
*/
async function shouldRedirect(input = {}) {
	const currentUrl = resolveUrl(input);
	const locale = await resolveLocale(input, currentUrl);
	const strategy = getStrategyForUrl(currentUrl.href);
	if (isExcludedByRouteStrategy(currentUrl.href) || !strategy.includes("url")) return {
		shouldRedirect: false,
		locale,
		redirectUrl: void 0
	};
	const localizedUrl = localizeUrl(currentUrl.href, { locale });
	const shouldRedirectToLocalizedUrl = normalizeUrl(localizedUrl.href) !== normalizeUrl(currentUrl.href);
	return {
		shouldRedirect: shouldRedirectToLocalizedUrl,
		locale,
		redirectUrl: shouldRedirectToLocalizedUrl ? localizedUrl : void 0
	};
}
/**
* Resolves the locale either from the provided input or by using the configured strategies.
*
* @param {ShouldRedirectInput} input
* @param {URL} currentUrl
* @returns {Promise<Locale>}
*/
async function resolveLocale(input, currentUrl) {
	const locale = toLocale(input.locale);
	if (locale) return locale;
	if (input.request) return extractLocaleFromRequestAsync(input.request, { effectiveRequestUrl: currentUrl });
	if ("url" in input && typeof input.url !== "undefined") return getLocaleForUrl(currentUrl.href);
	return getLocale();
}
/**
* Resolves the current URL from the provided input or runtime context.
*
* @param {ShouldRedirectInput} input
* @returns {URL}
*/
function resolveUrl(input) {
	if ("effectiveRequestUrl" in input && input.effectiveRequestUrl instanceof URL) return new URL(input.effectiveRequestUrl.href);
	if ("effectiveRequestUrl" in input && typeof input.effectiveRequestUrl === "string") return new URL(input.effectiveRequestUrl, input.request ? input.request.url : getUrlOrigin());
	if (input.request) return new URL(input.request.url);
	if ("url" in input && input.url instanceof URL) return new URL(input.url.href);
	if ("url" in input && typeof input.url === "string") return new URL(input.url, getUrlOrigin());
	if (typeof window !== "undefined" && window?.location?.href) return new URL(window.location.href);
	throw new Error("shouldRedirect() requires either a request, an absolute URL, or must run in a browser environment.");
}
/**
* Normalize url for comparison by stripping the trailing slash.
*
* @param {string} url
* @returns {string}
*/
function normalizeUrl(url) {
	const urlObj = new URL(url);
	urlObj.pathname = urlObj.pathname.replace(/\/$/, "");
	return urlObj.href;
}
/**
* @typedef {"cookie" | "baseLocale" | "globalVariable" | "url" | "preferredLanguage" | "localStorage"} BuiltInStrategy
*/
/**
* @typedef {`custom_${string}`} CustomStrategy
*/
/**
* @typedef {BuiltInStrategy | CustomStrategy} Strategy
*/
/**
* @typedef {Array<Strategy>} Strategies
*/
/**
* @typedef {{ getLocale: (request?: Request) => Promise<string | undefined> | (string | undefined) }} CustomServerStrategyHandler
*/
/**
* @typedef {{ getLocale: () => Promise<string|undefined> | (string | undefined), setLocale: (locale: string) => Promise<void> | void }} CustomClientStrategyHandler
*/
/** @type {Map<string, CustomServerStrategyHandler>} */
var customServerStrategies = /* @__PURE__ */ new Map();
/** @type {Map<string, CustomClientStrategyHandler>} */
var customClientStrategies = /* @__PURE__ */ new Map();
/**
* Checks if the given strategy is a custom strategy.
*
* @param {unknown} strategy The name of the custom strategy to validate.
* Must be a string that starts with "custom-" followed by alphanumeric characters, hyphens, or underscores.
* @returns {boolean} Returns true if it is a custom strategy, false otherwise.
*/
function isCustomStrategy(strategy) {
	return typeof strategy === "string" && /^custom-[A-Za-z0-9_-]+$/.test(strategy);
}
/**
* A locale that is available in the project.
*
* @example
*   setLocale(request.locale as Locale)
*
* @typedef {typeof locales[number]} Locale
*/
/**
* A branded type representing a localized string.
*
* Message functions return this type instead of \`string\`, enabling TypeScript
* to distinguish translated strings from regular strings at compile time.
* This allows you to enforce that only properly localized content is used
* in your UI components.
*
* Since \`LocalizedString\` is a branded subtype of \`string\`, it remains fully
* backward compatible—you can pass it anywhere a \`string\` is expected.
*
* @example
*   // Enforce localized strings in your components
*   function PageTitle(props: { title: LocalizedString }) {
*     return <h1>{props.title}</h1>
*   }
*
*   // ✅ Correct: using a message function
*   <PageTitle title={m.welcome_title()} />
*
*   // ❌ Type error: raw strings are not LocalizedString
*   <PageTitle title="Welcome" />
*
* @example
*   // LocalizedString is assignable to string (backward compatible)
*   const localized: LocalizedString = m.greeting()
*   const str: string = localized  // ✅ works fine
*
*   // But string is not assignable to LocalizedString
*   const raw: LocalizedString = "Hello"  // ❌ Type error
*
* @example
*   // Catches accidental string concatenation
*   function showMessage(msg: LocalizedString) { ... }
*
*   showMessage(m.hello())                    // ✅
*   showMessage("Hello " + userName)          // ❌ Type error
*   showMessage(m.hello_user({ name: userName }))  // ✅ use params instead
*
* @typedef {string & { readonly __brand: 'LocalizedString' }} LocalizedString
*/
/**
* A single markup option passed to a tag instance.
*
* @typedef {{
*   name: string;
*   value: unknown;
* }} MessageMarkupOption
*/
/**
* A single static markup attribute attached to a tag instance.
*
* @typedef {{
*   name: string;
*   value: string | true;
* }} MessageMarkupAttribute
*/
/**
* Record of markup options for a tag instance.
*
* @typedef {Record<string, unknown>} MessageMarkupOptions
*/
/**
* Record of markup attributes for a tag instance.
*
* @typedef {Record<string, string | true>} MessageMarkupAttributes
*/
/**
* Type-level schema for a single markup tag.
*
* @typedef {{
*   options: MessageMarkupOptions;
*   attributes: MessageMarkupAttributes;
*   children: boolean;
* }} MessageMarkupTag
*/
/**
* Type-level schema for all markup tags in a message.
*
* @typedef {Record<string, MessageMarkupTag>} MessageMarkupSchema
*/
/**
* Type-only metadata attached to compiled message functions.
*
* @template Inputs
* @template Options
* @template {MessageMarkupSchema} [Markup = MessageMarkupSchema]
* @typedef {{
*   readonly __paraglide?: {
*     inputs: Inputs;
*     options: Options;
*     markup: Markup;
*   };
* }} MessageMetadata
*/
/**
* A compiled, framework-neutral message part.
*
* @typedef {{
*   type: "text";
*   value: string;
* } | {
*   type: "markup-start";
*   name: string;
*   options: MessageMarkupOptions;
*   attributes: MessageMarkupAttributes;
* } | {
*   type: "markup-end";
*   name: string;
*   options: MessageMarkupOptions;
*   attributes: MessageMarkupAttributes;
* } | {
*   type: "markup-standalone";
*   name: string;
*   options: MessageMarkupOptions;
*   attributes: MessageMarkupAttributes;
* }} MessagePart
*/
/**
* A message function is a message for a specific locale.
*
* @example
*   m.hello({ name: 'world' })
*
* @typedef {(inputs?: Record<string, never>) => LocalizedString} MessageFunction
*/
/**
* A message bundle function that selects the message to be returned.
*
* Uses `getLocale()` under the hood to determine the locale with an option.
*
* @template {string} T
*
* @example
*   import { m } from './messages.js'
*   m.hello({ name: 'world' }, { locale: "en" })
*
* @typedef {(params: Record<string, never>, options: { locale: T }) => LocalizedString} MessageBundleFunction
*/
//#endregion
export { getTextDirection as a, overwriteServerAsyncLocalStorage as c, getStrategyForUrl as i, serverAsyncLocalStorage as l, getLocale as n, isExcludedByRouteStrategy as o, getServerAsyncLocalStorage as r, overwriteGetLocale as s, deLocalizeUrl as t, shouldRedirect as u };

//# sourceMappingURL=runtime.js.map