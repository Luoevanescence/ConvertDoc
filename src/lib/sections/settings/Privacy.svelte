<script lang="ts">
	import Panel from "$lib/components/visual/Panel.svelte";
	import { ChartColumnIcon, PauseIcon, PlayIcon } from "lucide-svelte";
	import type { ISettings } from "./index.svelte";
	import { effects } from "$lib/store/index.svelte";

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
			隐私
		</h2>
		<div class="flex flex-col gap-8">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					<p class="text-base font-bold">Plausible分析</p>
					<p class="text-sm text-muted font-normal">
						我们使用<a
							href="https://plausible.io/privacy-focused-web-analytics"
							target="_blank"
							rel="noopener noreferrer">Plausible</a
						>，一个注重隐私的分析工具，来收集完全匿名的统计数据。所有数据都是匿名和聚合的，永远不会发送或存储可识别的信息。您可以查看分析
						<a
							href="https://ats.vert.sh/vert.sh"
							target="_blank"
							rel="noopener noreferrer">这里</a
						>并在下面选择退出。
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
							选择加入
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
							选择退出
						</button>
					</div>
				</div>
			</div>
		</div>
	</div></Panel
>
