<script lang="ts">
	import Panel from "$lib/components/visual/Panel.svelte";
	import { GITHUB_URL_VERTD } from "$lib/consts";
	import { ServerIcon } from "lucide-svelte";
	import type { ISettings } from "./index.svelte";
	import clsx from "clsx";
	import Dropdown from "$lib/components/functional/Dropdown.svelte";
	import { vertdLoaded } from "$lib/store/index.svelte";
	import { tr } from "$lib/i18n";

	let vertdCommit = $state<string | null>(null);
	let abortController: AbortController | null = null;

	const { settings }: { settings: ISettings } = $props();

	$effect(() => {
		if (settings.vertdURL) {
			if (abortController) abortController.abort();
			abortController = new AbortController();
			const { signal } = abortController;

			vertdCommit = "loading";
			fetch(`${settings.vertdURL}/api/version`, { signal })
				.then((res) => {
					if (!res.ok) throw new Error("bad response");
					vertdLoaded.set(false);
					return res.json();
				})
				.then((data) => {
					vertdCommit = data.data;
					vertdLoaded.set(true);
				})
				.catch((err) => {
					if (err.name !== "AbortError") {
						vertdCommit = null;
						vertdLoaded.set(false);
					}
				});
		} else {
			if (abortController) abortController.abort();
			vertdCommit = null;
			vertdLoaded.set(false);
		}

		return () => {
			if (abortController) abortController.abort();
		};
	});
</script>

<Panel class="flex flex-col gap-8 p-6">
	<div class="flex flex-col gap-3">
		<h2 class="text-2xl font-bold">
			<ServerIcon
				size="40"
				class="inline-block -mt-1 mr-2 bg-accent-red p-2 rounded-full overflow-visible"
				color="black"
			/>
{$tr("settings.vertd.title")}
		</h2>
		<p
			class={clsx("text-sm font-normal", {
				"text-failure": vertdCommit === null,
				"text-green-700 dynadark:text-green-300": vertdCommit !== null,
				"!text-muted": vertdCommit === "loading",
			})}
		>
{$tr("settings.vertd.status")}: {vertdCommit
				? vertdCommit === "loading"
					? $tr("common.loading")
					: `${$tr("settings.vertd.available")}, ${$tr("settings.vertd.commitId")} ${vertdCommit}`
				: $tr("settings.vertd.unavailable")}
		</p>
		<div class="flex flex-col gap-8">
			<div class="flex flex-col gap-4">
				<p class="text-sm text-muted font-normal">
					{@html $tr("settings.vertd.description1")}
				</p>
				<p class="text-sm text-muted font-normal">
					{@html $tr("settings.vertd.description2").replace("%link%", `<a href="${GITHUB_URL_VERTD}" target="_blank">${$tr("settings.vertd.here")}</a>`)}
				</p>
				<div class="flex flex-col gap-2">
					<p class="text-base font-bold">{$tr("settings.vertd.instanceUrl")}</p>
					<input
						type="text"
						placeholder={$tr("settings.vertd.urlPlaceholder")}
						bind:value={settings.vertdURL}
					/>
				</div>
				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-2">
						<p class="text-base font-bold">{$tr("settings.vertd.conversionSpeed.title")}</p>
						<p class="text-sm text-muted font-normal">
							{$tr("settings.vertd.conversionSpeed.description")}
						</p>
					</div>
					<Dropdown
						options={[
							$tr("settings.vertd.speeds.verySlow"),
							$tr("settings.vertd.speeds.slower"),
							$tr("settings.vertd.speeds.slow"),
							$tr("settings.vertd.speeds.medium"),
							$tr("settings.vertd.speeds.fast"),
							$tr("settings.vertd.speeds.ultraFast"),
						]}
						settingsStyle
						selected={(() => {
							switch (settings.vertdSpeed) {
								case "verySlow":
									return $tr("settings.vertd.speeds.verySlow");
								case "slower":
									return $tr("settings.vertd.speeds.slower");
								case "slow":
									return $tr("settings.vertd.speeds.slow");
								case "medium":
									return $tr("settings.vertd.speeds.medium");
								case "fast":
									return $tr("settings.vertd.speeds.fast");
								case "ultraFast":
									return $tr("settings.vertd.speeds.ultraFast");
							}
						})()}
						onselect={(selected) => {
							if (selected === $tr("settings.vertd.speeds.verySlow")) {
								settings.vertdSpeed = "verySlow";
							} else if (selected === $tr("settings.vertd.speeds.slower")) {
								settings.vertdSpeed = "slower";
							} else if (selected === $tr("settings.vertd.speeds.slow")) {
								settings.vertdSpeed = "slow";
							} else if (selected === $tr("settings.vertd.speeds.medium")) {
								settings.vertdSpeed = "medium";
							} else if (selected === $tr("settings.vertd.speeds.fast")) {
								settings.vertdSpeed = "fast";
							} else if (selected === $tr("settings.vertd.speeds.ultraFast")) {
								settings.vertdSpeed = "ultraFast";
							}
						}}
					/>
				</div>
			</div>
		</div>
	</div>
</Panel>
