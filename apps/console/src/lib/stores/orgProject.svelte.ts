export interface Organization {
	id: string;
	name: string;
	slug: string;
	plan: string;
	maxProjects: number;
	role: 'Owner' | 'Admin' | 'Member';
	memberCount: number;
	maxMembers: number;
	requestSpike?: string;
	statusNote?: string;
	createdAt: string;
}

export interface Project {
	id: string;
	orgId: string;
	name: string;
	slug: string;
	environment: 'Production' | 'Staging' | 'Development';
	framework: 'SvelteKit' | 'NestJS' | 'Next.js' | 'Go Fiber' | 'FastAPI';
	region: string;
	status: 'Healthy' | 'Deploying' | 'Degraded';
	memberCount: number;
	maxMembers: number;
	requestSpike?: string;
	limitAlert?: string;
	apiCallsToday: number;
	activeEndUsers: number;
	p95LatencyMs: number;
	createdAt: string;
}

class OrgProjectStore {
	organizations = $state<Organization[]>([
		{
			id: 'org_povixa_core',
			name: 'Povixa Cloud Core',
			slug: 'povixa-core',
			plan: 'Community Pact ($0)',
			maxProjects: 5,
			role: 'Owner',
			memberCount: 3,
			maxMembers: 5,
			requestSpike: '+45% Spike',
			statusNote: 'Sắp chạm hạn mức dự án',
			createdAt: '2026-01-01'
		},
		{
			id: 'org_acme',
			name: 'Acme Software Corp',
			slug: 'acme-corp',
			plan: 'Team Enterprise ($0)',
			maxProjects: 10,
			role: 'Admin',
			memberCount: 7,
			maxMembers: 10,
			requestSpike: '+140% Spike',
			statusNote: 'Độ trễ toàn cụm p95 đạt 9.8ms',
			createdAt: '2026-02-15'
		},
		{
			id: 'org_personal',
			name: 'Personal Sandbox',
			slug: 'personal-sandbox',
			plan: 'Hobby ($0)',
			maxProjects: 3,
			role: 'Owner',
			memberCount: 1,
			maxMembers: 3,
			requestSpike: 'Ổn định',
			statusNote: 'Đang dùng 1/3 dự án',
			createdAt: '2026-03-20'
		}
	]);

	projects = $state<Project[]>([
		{
			id: 'proj_ecommerce',
			orgId: 'org_povixa_core',
			name: 'Ecommerce Storefront',
			slug: 'ecommerce-storefront',
			environment: 'Production',
			framework: 'SvelteKit',
			region: 'sin1 (Singapore)',
			status: 'Healthy',
			memberCount: 3,
			maxMembers: 5,
			requestSpike: '+58% Spike',
			limitAlert: 'Đạt 85% quota API',
			apiCallsToday: 1420500,
			activeEndUsers: 18420,
			p95LatencyMs: 18.4,
			createdAt: '2026-02-10'
		},
		{
			id: 'proj_api_gateway',
			orgId: 'org_povixa_core',
			name: 'Nest Distributed API',
			slug: 'nest-distributed-api',
			environment: 'Production',
			framework: 'NestJS',
			region: 'iad1 (US-East)',
			status: 'Healthy',
			memberCount: 4,
			maxMembers: 5,
			requestSpike: '+124% Spike',
			limitAlert: 'Sắp chạm limit (92%)',
			apiCallsToday: 8240000,
			activeEndUsers: 45200,
			p95LatencyMs: 14.2,
			createdAt: '2026-03-01'
		},
		{
			id: 'proj_mobile_client',
			orgId: 'org_povixa_core',
			name: 'Mobile Push BFF Service',
			slug: 'mobile-push-bff',
			environment: 'Staging',
			framework: 'NestJS',
			region: 'fra1 (Frankfurt)',
			status: 'Healthy',
			memberCount: 2,
			maxMembers: 5,
			requestSpike: 'Bình thường',
			limitAlert: 'Ổn định (35%)',
			apiCallsToday: 420000,
			activeEndUsers: 3200,
			p95LatencyMs: 22.8,
			createdAt: '2026-04-12'
		},
		{
			id: 'proj_acme_crm',
			orgId: 'org_acme',
			name: 'Acme Enterprise CRM',
			slug: 'acme-crm',
			environment: 'Production',
			framework: 'Next.js',
			region: 'iad1 (US-East)',
			status: 'Healthy',
			memberCount: 6,
			maxMembers: 10,
			requestSpike: '+28% Spike',
			limitAlert: 'Ổn định (55%)',
			apiCallsToday: 3100200,
			activeEndUsers: 12800,
			p95LatencyMs: 19.1,
			createdAt: '2026-03-05'
		},
		{
			id: 'proj_acme_analytics',
			orgId: 'org_acme',
			name: 'Acme Telemetry Pipeline',
			slug: 'acme-telemetry',
			environment: 'Production',
			framework: 'Go Fiber',
			region: 'sin1 (Singapore)',
			status: 'Healthy',
			memberCount: 8,
			maxMembers: 10,
			requestSpike: '+215% Spike',
			limitAlert: 'Cảnh báo 95% quota',
			apiCallsToday: 18900400,
			activeEndUsers: 94000,
			p95LatencyMs: 9.8,
			createdAt: '2026-03-22'
		},
		{
			id: 'proj_personal_blog',
			orgId: 'org_personal',
			name: 'Developer Tech Notes',
			slug: 'developer-notes',
			environment: 'Production',
			framework: 'SvelteKit',
			region: 'sin1 (Singapore)',
			status: 'Healthy',
			memberCount: 1,
			maxMembers: 3,
			requestSpike: 'Bình thường',
			limitAlert: 'Ổn định (12%)',
			apiCallsToday: 45000,
			activeEndUsers: 850,
			p95LatencyMs: 16.5,
			createdAt: '2026-04-01'
		}
	]);

	currentOrgId = $state<string | null>(null);
	currentProjectId = $state<string | null>(null);

	currentOrg = $derived(
		this.currentOrgId ? this.organizations.find((o) => o.id === this.currentOrgId) || null : null
	);

	projectsInCurrentOrg = $derived(
		this.currentOrgId ? this.projects.filter((p) => p.orgId === this.currentOrgId) : []
	);

	currentProject = $derived(
		this.currentProjectId && this.currentOrgId
			? this.projects.find((p) => p.id === this.currentProjectId && p.orgId === this.currentOrgId) || null
			: null
	);

	quotaUsed = $derived(this.projectsInCurrentOrg.length);
	quotaMax = $derived(this.currentOrg ? this.currentOrg.maxProjects : 0);
	quotaPercentage = $derived(
		this.quotaMax > 0 ? Math.min(100, Math.round((this.quotaUsed / this.quotaMax) * 100)) : 0
	);
	isQuotaFull = $derived(this.quotaMax > 0 && this.quotaUsed >= this.quotaMax);

	selectOrg(orgId: string | null) {
		this.currentOrgId = orgId;
		this.currentProjectId = null;
		this.persist();
	}

	selectProject(projectId: string | null) {
		this.currentProjectId = projectId;
		this.persist();
	}

	createProject(data: {
		name: string;
		environment: 'Production' | 'Staging' | 'Development';
		framework: 'SvelteKit' | 'NestJS' | 'Next.js' | 'Go Fiber' | 'FastAPI';
		region?: string;
	}): { success: boolean; message?: string; project?: Project } {
		if (!this.currentOrgId) {
			return {
				success: false,
				message: 'Vui lòng chọn một tổ chức trước khi tạo dự án.'
			};
		}

		if (this.isQuotaFull) {
			return {
				success: false,
				message: `Tổ chức đã đạt giới hạn tối đa ${this.quotaMax} dự án. Vui lòng nâng cấp hạn mức.`
			};
		}

		const slug = data.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 24);
		const newProject: Project = {
			id: `proj_${Date.now().toString(36)}`,
			orgId: this.currentOrgId,
			name: data.name,
			slug,
			environment: data.environment,
			framework: data.framework,
			region: data.region || 'sin1 (Singapore)',
			status: 'Healthy',
			memberCount: 1,
			maxMembers: 5,
			requestSpike: 'Bình thường',
			limitAlert: 'Ổn định (10%)',
			apiCallsToday: 0,
			activeEndUsers: 0,
			p95LatencyMs: 15.0,
			createdAt: new Date().toISOString().split('T')[0]
		};

		this.projects.unshift(newProject);
		this.currentProjectId = newProject.id;
		this.persist();

		return { success: true, project: newProject };
	}

	createOrganization(name: string, maxProjects = 5): Organization {
		const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 24);
		const newOrg: Organization = {
			id: `org_${Date.now().toString(36)}`,
			name,
			slug,
			plan: 'Community Pact ($0)',
			maxProjects,
			role: 'Owner',
			memberCount: 1,
			maxMembers: 5,
			requestSpike: 'Ổn định',
			statusNote: 'Mới khởi tạo',
			createdAt: new Date().toISOString().split('T')[0]
		};
		this.organizations.push(newOrg);
		this.selectOrg(newOrg.id);
		this.persist();
		return newOrg;
	}

	private persist() {
		if (typeof window === 'undefined') return;
		try {
			if (this.currentOrgId) {
				localStorage.setItem('pvx_console_org_id', this.currentOrgId);
			} else {
				localStorage.removeItem('pvx_console_org_id');
			}

			if (this.currentProjectId) {
				localStorage.setItem('pvx_console_project_id', this.currentProjectId);
			} else {
				localStorage.removeItem('pvx_console_project_id');
			}
		} catch (e) {
			// ignore
		}
	}

	initFromStorage() {
		if (typeof window === 'undefined') return;
		try {
			const savedOrg = localStorage.getItem('pvx_console_org_id');
			if (savedOrg && this.organizations.some((o) => o.id === savedOrg)) {
				this.currentOrgId = savedOrg;
				const savedProject = localStorage.getItem('pvx_console_project_id');
				if (savedProject && this.projects.some((p) => p.id === savedProject && p.orgId === this.currentOrgId)) {
					this.currentProjectId = savedProject;
				}
			}
		} catch (e) {
			// ignore
		}
	}
}

export const orgStore = new OrgProjectStore();
