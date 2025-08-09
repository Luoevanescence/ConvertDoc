<!-- 隐私设置 -->
<script lang="ts">
	import Panel from "$lib/components/visual/Panel.svelte";
	import { ChartColumnIcon, PauseIcon, PlayIcon } from "lucide-svelte";
	import type { ISettings } from "./index.svelte";
	import { effects } from "$lib/store/index.svelte";
	import { tr } from "$lib/i18n";

	const { settings }: { settings: ISettings } = $props();
</script>

<Panel class="flex flex-col gap-8 p-6">
	<div class="flex flex-col gap-3">
		<h2 class="text-2xl font-bold">
			<ChartColumnIcon
				size="40"
				class="inline-block -mt-1 mr-2 bg-accent-blue p-2 rounded-full"
				color="black"
			/>
{$tr("settings.privacy")}
		</h2>
		<div class="flex flex-col gap-8">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					<p class="text-base font-bold">{$tr("settings.plausible.title")}</p>
					<p class="text-sm text-muted font-normal">
						{@html $tr("settings.plausible.description")
							.replace("%plausible_link%", `<a href="https://plausible.io/privacy-focused-web-analytics" target="_blank" rel="noopener noreferrer">Plausible</a>`)
							.replace("%analytics_link%", `<a href="https://ats.vert.sh/vert.sh" target="_blank" rel="noopener noreferrer">${$tr("settings.plausible.here")}</a>`)}
					</p>
				</div>
				<div class="flex flex-col gap-3 w-full">
					<div class="flex gap-3 w-full">
						<button
							onclick={() => (settings.plausible = true)}
							class="btn {$effects
								? ''
								: '!scale-100'} {settings.plausible
								? 'selected'
								: ''} flex-1 p-4 rounded-lg text-black dynadark:text-white flex items-center justify-center"
						>
							<PlayIcon size="24" class="inline-block mr-2" />
{$tr("settings.plausible.optIn")}
						</button>

						<button
							onclick={() => (settings.plausible = false)}
							class="btn {$effects
								? ''
								: '!scale-100'} {settings.plausible
								? ''
								: 'selected'} flex-1 p-4 rounded-lg text-black dynadark:text-white flex items-center justify-center"
						>
							<PauseIcon size="24" class="inline-block mr-2" />
{$tr("settings.plausible.optOut")}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div></Panel
>
