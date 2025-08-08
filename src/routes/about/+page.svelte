<script lang="ts">
	import { error, log } from "$lib/logger";
	import * as About from "$lib/sections/about";
	import { InfoIcon } from "lucide-svelte";
	import { onMount } from "svelte";
	import avatarNullptr from "$lib/assets/avatars/nullptr.jpg";
	import avatarLiam from "$lib/assets/avatars/liam.jpg";
	import avatarJovannMC from "$lib/assets/avatars/jovannmc.jpg";
	import avatarRealmy from "$lib/assets/avatars/realmy.jpg";
	import avatarAzurejelly from "$lib/assets/avatars/azurejelly.jpg";
	import { GITHUB_API_URL } from "$lib/consts";
	import { addToast } from "$lib/store/ToastProvider";
	import { dev } from "$app/environment";
	import { page } from "$app/state";
	// import { dev } from "$app/environment";
	// import { page } from "$app/state";

	/* interface Donator {
		name: string;
		amount?: string | number;
		avatar: string;
	} */

	interface Contributor {
		name: string;
		github: string;
		avatar: string;
		role?: string;
	}

	// const donors: Donator[] = [];

	const mainContribs: Contributor[] = [
		{
			name: "nullptr",
			github: "https://github.com/not-nullptr",
			role: "Lead developer; conversion backend, UI implementation",
			avatar: avatarNullptr,
		},
		{
			name: "JovannMC",
			github: "https://github.com/JovannMC",
			role: "Developer; UI implementation",
			avatar: avatarJovannMC,
		},
		{
			name: "Liam",
			github: "https://x.com/z2rMC",
			role: "Designer; UX, branding, marketing",
			avatar: avatarLiam,
		},
	];

	const notableContribs: Contributor[] = [
		{
			name: "azurejelly",
			github: "https://github.com/azurejelly",
			role: "Maintaining Docker & CI support",
			avatar: avatarAzurejelly,
		},
		{
			name: "Realmy",
			github: "https://github.com/RealmyTheMan",
			role: "Former co-founder & designer",
			avatar: avatarRealmy,
		},
	];

	let ghContribs: Contributor[] = [];

	onMount(async () => {
		// Check if the data is already in sessionStorage
		const cachedContribs = sessionStorage.getItem("ghContribs");
		if (cachedContribs) {
			ghContribs = JSON.parse(cachedContribs);
			return;
		}

		// Fetch GitHub contributors
		try {
			const response = await fetch(`${GITHUB_API_URL}/contributors`);
			if (!response.ok) {
				addToast("error", "获取GitHub贡献者时出错");
				throw new Error(`HTTP error, status: ${response.status}`);
			}
			const allContribs = await response.json();

			// Filter out main and notable contributors
			const excludedNames = new Set([
				...mainContribs.map((c) => c.github.split("/").pop()),
				...notableContribs.map((c) => c.github.split("/").pop()),
			]);

			const filteredContribs = allContribs.filter(
				(contrib: { login: string }) =>
					!excludedNames.has(contrib.login),
			);

			// Fetch and cache avatar images as Base64
			const fetchAvatar = async (url: string) => {
				const res = await fetch(url);
				const blob = await res.blob();
				return new Promise<string>((resolve, reject) => {
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result as string);
					reader.onerror = reject;
					reader.readAsDataURL(blob);
				});
			};

			ghContribs = await Promise.all(
				filteredContribs.map(
					async (contrib: {
						login: string;
						avatar_url: string;
						html_url: string;
					}) => ({
						name: contrib.login,
						avatar: await fetchAvatar(contrib.avatar_url),
						github: contrib.html_url,
					}),
				),
			);

			// Cache the data in sessionStorage
			sessionStorage.setItem("ghContribs", JSON.stringify(ghContribs));
		} catch (e) {
			error(["general"], `Error fetching GitHub contributors: ${e}`);
		}
	});

	const donationsEnabled = dev || page.url.origin.endsWith("//vert.sh");
</script>

<div class="flex flex-col h-full items-center">
	<h1 class="hidden md:block text-[40px] tracking-tight leading-[72px] mb-6">
		<InfoIcon size="40" class="inline-block -mt-2 mr-2" />
		关于
	</h1>

	<div
		class="w-full max-w-[1280px] flex flex-col md:flex-row gap-4 p-4 md:px-4 md:py-0"
	>
		<!-- Why VERT? & Credits -->
		<div class="flex flex-col gap-4 flex-1">
			{#if donationsEnabled}
				<About.Donate />
			{/if}
			<About.Why />
			<About.Sponsors />
		</div>

		<!-- Resources & Donate to VERT -->
		<div class="flex flex-col gap-4 flex-1">
			<About.Resources />
			<About.Credits {mainContribs} {notableContribs} {ghContribs} />
		</div>
	</div>
</div>
