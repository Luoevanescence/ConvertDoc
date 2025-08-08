<script lang="ts">
	import ConversionPanel from "$lib/components/functional/ConversionPanel.svelte";
	import FormatDropdown from "$lib/components/functional/FormatDropdown.svelte";
	import Uploader from "$lib/components/functional/Uploader.svelte";
	import Panel from "$lib/components/visual/Panel.svelte";
	import ProgressBar from "$lib/components/visual/ProgressBar.svelte";
	import Tooltip from "$lib/components/visual/Tooltip.svelte";
	import { categories, converters } from "$lib/converters";
	import {
		effects,
		files,
		gradientColor,
		showGradient,
		vertdLoaded,
	} from "$lib/store/index.svelte";
	import { VertFile } from "$lib/types";
	import {
		AudioLines,
		BookText,
		DownloadIcon,
		FileMusicIcon,
		FileQuestionIcon,
		FileVideo2,
		FilmIcon,
		ImageIcon,
		ImageOffIcon,
		RotateCwIcon,
		XIcon,
	} from "lucide-svelte";
	import { onMount } from "svelte";

	onMount(() => {
		// depending on format, select right category and format
		files.files.forEach((file) => {
			const converter = file.findConverter();
			if (converter) {
				const category = Object.keys(categories).find((cat) =>
					categories[cat].formats.includes(file.to),
				);
				if (category) {
					file.to = file.to || categories[category].formats[0];
				}
			}
		});
	});

	const handleSelect = (option: string, file: VertFile) => {
		file.result = null;
	};

	$effect(() => {
		// Set gradient color depending on the file types
		// TODO: if more file types added, add a "fileType" property to the file object
		const allAudio = files.files.every(
			(file) => file.findConverter()?.name === "ffmpeg",
		);
		const allImages = files.files.every(
			(file) =>
				file.findConverter()?.name !== "ffmpeg" &&
				file.findConverter()?.name !== "vertd",
		);
		const allVideos = files.files.every(
			(file) => file.findConverter()?.name === "vertd",
		);

		const allDocuments = files.files.every(
			(file) => file.findConverter()?.name === "pandoc",
		);

		if (files.files.length === 1 && files.files[0].blobUrl && !allVideos) {
			showGradient.set(false);
		} else {
			showGradient.set(true);
		}

		if (
			files.files.length === 0 ||
			(!allAudio && !allImages && !allVideos)
		) {
			gradientColor.set("");
		} else {
			gradientColor.set(
				allAudio
					? "purple"
					: allVideos
						? "red"
						: allDocuments
							? "green"
							: "blue",
			);
		}

		// TODO: filter out categories that cant be converted between
	});
</script>

{#snippet fileItem(file: VertFile, index: number)}
	{@const availableConverters = file.findConverters()}
	{@const currentConverter = converters.find(
		(c) =>
			c.formatStrings((f) => f.fromSupported).includes(file.from) &&
			c.formatStrings((f) => f.toSupported).includes(file.to),
	)}
	{@const isAudio = converters
		.find((c) => c.name === "ffmpeg")
		?.formatStrings((f) => f.fromSupported)
		.includes(file.from)}
	{@const isVideo = converters
		.find((c) => c.name === "vertd")
		?.formatStrings((f) => f.fromSupported)
		.includes(file.from)}
	{@const isImage = converters
		.find((c) => c.name === "imagemagick")
		?.formatStrings((f) => f.fromSupported)
		.includes(file.from)}
	{@const isDocument = converters
		.find((c) => c.name === "pandoc")
		?.formatStrings((f) => f.fromSupported)
		.includes(file.from)}
	<Panel class="p-5 flex flex-col min-w-0 gap-4 relative">
		<div class="flex-shrink-0 h-8 w-full flex items-center gap-2">
			{#if !converters.length}
				<Tooltip text="未知文件类型" position="bottom">
					<FileQuestionIcon size="24" class="flex-shrink-0" />
				</Tooltip>
			{:else if isAudio}
				<Tooltip text="音频文件" position="bottom">
					<AudioLines size="24" class="flex-shrink-0" />
				</Tooltip>
			{:else if isVideo}
				<Tooltip text="视频文件" position="bottom">
					<FilmIcon size="24" class="flex-shrink-0" />
				</Tooltip>
			{:else if isDocument}
				<Tooltip text="文档文件" position="bottom">
					<BookText size="24" class="flex-shrink-0" />
				</Tooltip>
			{:else}
				<Tooltip text="图像文件" position="bottom">
					<ImageIcon size="24" class="flex-shrink-0" />
				</Tooltip>
			{/if}
			<div class="flex-grow overflow-hidden">
				{#if file.processing}
					<ProgressBar
						min={0}
						max={100}
						progress={currentConverter?.reportsProgress
							? file.progress
							: null}
					/>
				{:else}
					<h2
						class="text-xl font-body overflow-hidden text-ellipsis whitespace-nowrap"
						title={file.name}
					>
						{file.name}
					</h2>
				{/if}
			</div>
			<button
				class="flex-shrink-0 w-8 rounded-full hover:bg-panel-alt h-full flex items-center justify-center"
				onclick={() =>
					(files.files = files.files.filter((_, i) => i !== index))}
			>
				<XIcon size="24" class="text-muted" />
			</button>
		</div>
		{#if !currentConverter}
			{#if file.name.startsWith("vertd")}
				<div
					class="h-full flex flex-col text-center justify-center text-failure"
				>
					<p class="font-body font-bold">
						我们无法转换此文件。
					</p>
					<p class="font-normal">
						您在做什么..？您应该运行vertd服务器！
					</p>
				</div>
			{:else}
				<div
					class="h-full flex flex-col text-center justify-center text-failure"
				>
					<p class="font-body font-bold">
						我们无法转换此文件。
					</p>
					<p class="font-normal">
						仅支持图像、视频、音频和文档文件
					</p>
				</div>
			{/if}
		{:else if isVideo && !isAudio && !isImage && !isDocument && !$vertdLoaded}
			<div
				class="h-full flex flex-col text-center justify-center text-failure"
			>
				<p class="font-body font-bold">我们无法转换此文件。</p>
				<p class="font-normal">
					找不到vertd实例来启动视频转换。
					您确定实例URL设置正确吗？
				</p>
			</div>
		{:else}
			<div class="flex flex-row justify-between">
				<div
					class="flex gap-4 w-full h-[152px] overflow-hidden relative"
				>
					<div class="w-1/2 h-full overflow-hidden rounded-xl">
						{#if file.blobUrl}
							<img
								class="object-cover w-full h-full"
								src={file.blobUrl}
								alt={file.name}
							/>
						{:else}
							<div
								class="w-full h-full flex items-center justify-center text-black"
								style="background: var({isAudio
									? '--bg-gradient-purple-alt'
									: isVideo
										? '--bg-gradient-red-alt'
										: isDocument
											? '--bg-gradient-green-alt'
											: '--bg-gradient-blue-alt'})"
							>
								{#if isAudio}
									<FileMusicIcon size="56" />
								{:else if isVideo}
									<FileVideo2 size="56" />
								{:else if isDocument}
									<BookText size="56" />
								{:else}
									<ImageOffIcon size="56" />
								{/if}
							</div>
						{/if}
					</div>
				</div>
				<div
					class="absolute top-16 right-0 mr-4 pl-2 h-[calc(100%-83px)] w-[calc(50%-38px)] pr-4 pb-1 flex items-center justify-center aspect-square"
				>
					<div
						class="w-[122px] h-fit flex flex-col gap-2 items-center justify-center"
					>
						<FormatDropdown
							{categories}
							from={file.from}
							bind:selected={file.to}
							onselect={(option) => handleSelect(option, file)}
						/>
						<div class="w-full flex items-center justify-between">
													<Tooltip text="转换此文件" position="bottom">
							<button
								class="btn {$effects
									? ''
									: '!scale-100'} p-0 w-14 h-14 text-black {isAudio
									? 'bg-accent-purple'
									: isVideo
										? 'bg-accent-red'
										: isDocument
											? 'bg-accent-green'
											: 'bg-accent-blue'}"
								disabled={!files.ready}
								onclick={() => file.convert()}
							>
								<RotateCwIcon size="24" />
							</button>
						</Tooltip>
						<Tooltip
							text="下载此文件"
							position="bottom"
						>
								<button
									class="btn {$effects
										? ''
										: '!scale-100'} p-0 w-14 h-14"
									onclick={file.download}
									disabled={!file.result}
								>
									<DownloadIcon size="24" />
								</button>
							</Tooltip>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</Panel>
{/snippet}

<div class="flex flex-col justify-center items-center gap-8 -mt-4 px-4 md:p-0">
	<div class="max-w-[778px] w-full">
		<ConversionPanel />
	</div>

	<div
		class="w-full max-w-[778px] grid grid-cols-1 md:grid-cols-2 auto-rows-[240px] gap-4 md:p-0"
	>
		{#each files.files as file, i (file.id)}
			{#if files.files.length >= 2 && i === 1}
				<Uploader
					class="w-full h-full col-start-1 row-start-1 md:col-start-2"
				/>
			{/if}
			{@render fileItem(file, i)}
			{#if files.files.length < 2}
				<Uploader class="w-full h-full" />
			{/if}
		{/each}
		{#if files.files.length === 0}
			<Uploader class="w-full h-full col-span-2" />
		{/if}
	</div>
</div>
