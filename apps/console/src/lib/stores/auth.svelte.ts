export interface UserSession {
	user: string;
	provider: string;
	token?: string;
	time?: number;
}

class AuthStore {
	user = $state<UserSession | null>(null);
	loading = $state(false);
	initialized = $state(false);

	init(appName: 'console' | 'apps' | 'admin', ssoGatewayUrl = 'http://localhost:5174') {
		if (typeof window === 'undefined') return;

		try {
			// 1. Check if SSO token/session returned via URL param
			const url = new URL(window.location.href);
			const ssoParam = url.searchParams.get('sso_session');

			if (ssoParam) {
				const parsed = JSON.parse(decodeURIComponent(ssoParam)) as UserSession;
				if (parsed && parsed.user) {
					this.user = parsed;
					localStorage.setItem('pvx_sso_session', JSON.stringify(parsed));

					// Clean URL query params without reloading
					url.searchParams.delete('sso_session');
					const cleanUrl = url.pathname + (url.search ? url.search : '') + url.hash;
					window.history.replaceState({}, '', cleanUrl || '/');

					this.loading = false;
					this.initialized = true;
					return;
				}
			}

			// 2. Check localStorage
			const raw = localStorage.getItem('pvx_sso_session');
			if (raw) {
				const parsed = JSON.parse(raw) as UserSession;
				if (parsed && parsed.user) {
					this.user = parsed;
					this.loading = false;
					this.initialized = true;
					return;
				}
			}
		} catch (err) {
			console.error('Error verifying auth session:', err);
		}

		// 3. User is not logged in: Keep UI accessible for inspection, do NOT block with redirect
		this.user = null;
		this.loading = false;
		this.initialized = true;
	}

	redirectToLogin(appName: 'console' | 'apps' | 'admin', ssoGatewayUrl = 'http://localhost:5174') {
		if (typeof window === 'undefined') return;
		const currentUrl = window.location.href;
		const gatewayUrl = `${ssoGatewayUrl}?app=${appName}&redirect_uri=${encodeURIComponent(currentUrl)}`;
		window.location.assign(gatewayUrl);
	}

	signOut(appName: 'console' | 'apps' | 'admin', ssoGatewayUrl = 'http://localhost:5174') {
		if (typeof window === 'undefined') return;
		try {
			localStorage.removeItem('pvx_sso_session');
		} catch (e) {
			// ignore
		}
		this.user = null;
		const gatewayLogout = `${ssoGatewayUrl}?app=${appName}&action=logout&redirect_uri=${encodeURIComponent(window.location.origin)}`;
		window.location.assign(gatewayLogout);
	}
}

export const auth = new AuthStore();
