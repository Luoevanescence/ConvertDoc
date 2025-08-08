<script lang="ts">
	import { effects, files, isMobile } from "$lib/store/index.svelte";
	import { FolderArchiveIcon, RefreshCw, Trash2Icon } from "lucide-svelte";
	import Panel from "../visual/Panel.svelte";
	import Dropdown from "./Dropdown.svelte";
	import Tooltip from "../visual/Tooltip.svelte";
	import ProgressBar from "../visual/ProgressBar.svelte";
	import FormatDropdown from "./FormatDropdown.svelte";
	import { categories } from "$lib/converters";

	const length = $derived(files.files.length);
	const progress = $derived(files.files.filter((f) => f.result).length);
</script>

<Panel class="flex flex-col gap-4">
	<div
		class="w-full h-auto flex items-center justify-between flex-col md:flex-row gap-4"
	>
		<div
			class="flex items-center flex-col md:flex-row gap-2.5 max-md:w-full"
		>
			<button
				onclick={() => files.convertAll()}
				class="btn {$effects
					? ''
					: '!scale-100'} highlight flex gap-3 max-md:w-full"
				disabled={!files.ready}
			>
				<RefreshCw size="24" />
				<p>转换全部</p>
			</button>
			<button
				class="btn {$effects
					? ''
					: '!scale-100'} flex gap-3 max-md:w-full"
				disabled={!files.ready || !files.results}
				onclick={() => files.downloadAll()}
			>
				<FolderArchiveIcon size="24" />
				<p>全部下载为.zip</p>
			</button>
			{#if $isMobile}
				<button
					class="btn p-4 {$effects
						? ''
						: '!scale-100'} flex gap-3 max-md:w-full"
					disabled={files.files.length === 0}
					onclick={() => (files.files = [])}
				>
					<Trash2Icon size="24" />
					<p>删除所有文件</p>
				</button>
			{:else}
				<Tooltip text="删除所有文件" position="right">
					<button
						class="btn p-4 {$effects
							? ''
							: '!scale-100'} flex gap-3 max-md:w-full"
						disabled={files.files.length === 0}
						onclick={() => (files.files = [])}
					>
						<Trash2Icon size="24" />
					</button>
				</Tooltip>
			{/if}
		</div>
		<div class="w-full bg-separator h-0.5 flex md:hidden"></div>
		<div class="flex items-center gap-2">
			<p class="whitespace-nowrap text-xl">全部设置为</p>
			{#if files.requiredConverters.length === 1}
				<FormatDropdown
					onselect={(r) =>
						files.files.forEach((f) => {
							if (f.from !== r) {
								f.to = r;
								f.result = null;
							}
						})}
					{categories}
				/>
			{:else}
				<Dropdown options={["不适用"]} disabled />
			{/if}
		</div>
	</div>
	{#if files.files.length > 50}
		<div class="w-full px-2 flex gap-4 items-center">
			<div class="flex-shrink-0 -mt-0.5 font-normal text-sm text-muted">
				{progress}/{length}
			</div>
			<div class="flex-grow">
				<ProgressBar min={0} max={length} {progress} />
			</div>
		</div>
	{/if}
</Panel>
