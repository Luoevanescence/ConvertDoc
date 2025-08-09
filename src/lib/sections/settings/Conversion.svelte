<script lang="ts">
	import FancyTextInput from "$lib/components/functional/FancyInput.svelte";
	import Panel from "$lib/components/visual/Panel.svelte";
	import { RefreshCwIcon } from "lucide-svelte";
	import type { ISettings } from "./index.svelte";
	import { tr } from "$lib/i18n";

	const { settings }: { settings: ISettings } = $props();
</script>

<Panel class="flex flex-col gap-8 p-6">
	<div class="flex flex-col gap-3">
		<h2 class="text-2xl font-bold">
			<RefreshCwIcon
				size="40"
				class="inline-block -mt-1 mr-2 bg-accent p-2 rounded-full"
				color="black"
			/>
{$tr("settings.conversion")}
		</h2>
		<div class="flex flex-col gap-8">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					<p class="text-base font-bold">{$tr("settings.filenameFormat.title")}</p>
					<p class="text-sm text-muted font-normal">
						{$tr("settings.filenameFormat.description")}
					</p>
				</div>
				<FancyTextInput
					placeholder="VERT_%name%"
					bind:value={settings.filenameFormat}
					extension=".ext"
					type="text"
				/>
			</div>
		</div>
	</div>
</Panel>
