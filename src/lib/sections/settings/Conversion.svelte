<script lang="ts">
	import FancyTextInput from "$lib/components/functional/FancyInput.svelte";
	import Panel from "$lib/components/visual/Panel.svelte";
	import { RefreshCwIcon } from "lucide-svelte";
	import type { ISettings } from "./index.svelte";

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
			转换
		</h2>
		<div class="flex flex-col gap-8">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					<p class="text-base font-bold">文件名格式</p>
					<p class="text-sm text-muted font-normal">
						这将决定下载时文件的名称，<span
							class="font-bold italic"
							>不包括文件扩展名。</span
						>
						您可以在格式中放置以下模板，它们将被相关信息替换：
						<span class="font-bold">%name%</span>
						表示原始文件名，
						<span class="font-bold">%extension%</span>
						表示原始文件扩展名，以及
						<span class="font-bold">%date%</span>
						表示文件转换时的日期字符串。
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
