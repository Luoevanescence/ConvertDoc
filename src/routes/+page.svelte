<script lang="ts">
	import Uploader from "$lib/components/functional/Uploader.svelte";
	import Tooltip from "$lib/components/visual/Tooltip.svelte";
	import { converters } from "$lib/converters";
	import { vertdLoaded } from "$lib/store/index.svelte";
	import { tr } from "$lib/i18n";
	import clsx from "clsx";
	import { AudioLines, BookText, Check, Film, Image } from "lucide-svelte";

	const getSupportedFormats = (name: string) =>
		converters
			.find((c) => c.name === name)
			?.supportedFormats.map(
				(f) =>
					`${f.name}${f.fromSupported && f.toSupported ? "" : "*"}`,
			)
			.join(", ") || "none";

	const status: {
		[key: string]: {
			ready: boolean;
			formats: string;
			icon: typeof Image;
		};
	} = $derived({
		[$tr("home.images")]: {
			ready:
				converters.find((c) => c.name === "imagemagick")?.ready ||
				false,
			formats: getSupportedFormats("imagemagick"),
			icon: Image,
		},
		[$tr("home.audio")]: {
			ready: converters.find((c) => c.name === "ffmpeg")?.ready || false,
			formats: getSupportedFormats("ffmpeg"),
			icon: AudioLines,
		},
		[$tr("home.documents")]: {
			ready: converters.find((c) => c.name === "pandoc")?.ready || false,
			formats: getSupportedFormats("pandoc"),
			icon: BookText,
		},
		[$tr("home.video")]: {
			ready:
				converters.find((c) => c.name === "vertd")?.ready ||
				(false && $vertdLoaded),
			formats: getSupportedFormats("vertd"),
			icon: Film,
		},
	});

	const getTooltip = (format: string) => {
		const converter = converters.find((c) =>
			c.supportedFormats.some((sf) => sf.name === format),
		);

		const formatInfo = converter?.supportedFormats.find(
			(sf) => sf.name === format,
		);

		if (formatInfo) {
			return `此格式只能作为${
				formatInfo.fromSupported ? "输入（从）" : "输出（到）"
			}进行转换。`;
		}
		return "";
	};
</script>

<div class="max-w-6xl w-full mx-auto px-6 md:px-8">
	<div class="flex items-center justify-center pb-10 md:py-16">
		<div
			class="flex items-center h-auto gap-12 md:gap-24 md:flex-row flex-col"
		>
			<div class="flex-grow w-full text-center md:text-left">
				<h1
					class="text-4xl px-12 md:p-0 md:text-6xl flex-wrap tracking-tight leading-tight md:leading-[72px] mb-4 md:mb-6"
				>
					{$tr("home.title")}
				</h1>
				<p
					class="font-normal px-5 md:p-0 text-lg md:text-xl text-black text-muted dynadark:text-muted"
				>
					{$tr("home.description")}
				</p>
			</div>
			<div class="flex-grow w-full h-72">
				<Uploader class="w-full h-full" />
			</div>
		</div>
	</div>

	<hr />

	<div class="mt-10 md:mt-16">
		<h2 class="text-center text-4xl">{$tr("home.supportedFormats")}</h2>

		<div class="flex gap-4 mt-8 md:flex-row flex-col">
			{#each Object.entries(status) as [key, s]}
				{@const Icon = s.icon}
				<div class="file-category-card w-full flex flex-col gap-4">
					<div class="file-category-card-inner">
						<div
							class={clsx("icon-container", {
								"bg-accent-blue": key === $tr("home.images"),
								"bg-accent-purple": key === $tr("home.audio"),
								"bg-accent-green":
									key === $tr("home.documents"),
								"bg-accent-red": key === $tr("home.video"),
							})}
						>
							<Icon size="20" />
						</div>

						<span>{key}</span>
					</div>

					<div class="file-category-card-content flex-grow gap-4">
						{#if key === $tr("home.video")}
							<p>
								{$tr("home.videoProcessingNote") ||
									"视频默认上传到服务器进行处理，了解如何本地设置"}
								<a
									target="_blank"
									href="https://github.com/VERT-sh/VERT/wiki/How-to-convert-video-with-VERT"
									>{$tr("home.here") || "这里"}</a
								>。
							</p>
						{:else}
							<p class="flex tems-center justify-center gap-2">
								<Check size="20" />
								{$tr("home.localSupport") || "本地完全支持"}
							</p>
						{/if}
						<p>
							<b>{$tr("home.status") || "状态"}: </b>
							{s.ready ? $tr("home.ready") : $tr("home.loading")}
						</p>
						<div>
							<span class="flex flex-wrap justify-center">
								<b>{$tr("home.supportedFormats")}:&nbsp;</b>
								{#each s.formats.split(", ") as format, index}
									{@const isPartial = format.endsWith("*")}
									{@const formatName = isPartial
										? format.slice(0, -1)
										: format}
									<span
										class="text-sm font-normal flex items-center"
									>
										{#if isPartial}
											<Tooltip
												text={getTooltip(formatName)}
											>
												{formatName}<span
													class="text-red-500">*</span
												>
											</Tooltip>
										{:else}
											{formatName}
										{/if}
										{#if index < s.formats.split(", ").length - 1}
											<span>,&nbsp;</span>
										{/if}
									</span>
								{/each}
							</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.file-category-card {
		@apply bg-panel rounded-2xl p-5 shadow-panel;
	}

	.file-category-card p {
		@apply font-normal text-center text-sm;
	}

	.file-category-card-inner {
		@apply flex items-center justify-center gap-3 text-xl;
	}

	.file-category-card-content {
		@apply flex flex-col text-center justify-between;
	}

	.icon-container {
		@apply p-2 rounded-full text-on-accent;
	}
</style>
