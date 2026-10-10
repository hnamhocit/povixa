<script lang="ts">
	import { orgStore } from '#lib/stores/orgProject.svelte.js';
	import AllOrganizationsView from '#lib/components/AllOrganizationsView.svelte';
	import OrgProjectsView from '#lib/components/OrgProjectsView.svelte';
	import ProjectDashboard from '#lib/components/ProjectDashboard.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		orgStore.initFromStorage();
	});
</script>

{#if orgStore.currentOrg && orgStore.currentProject}
	<!-- Level 3: Project Cockpit & Dashboard -->
	<ProjectDashboard />
{:else if orgStore.currentOrg}
	<!-- Level 2: Organization Projects & Quota -->
	<OrgProjectsView />
{:else}
	<!-- Level 1: All Organizations Overview -->
	<AllOrganizationsView />
{/if}
