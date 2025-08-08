<script lang="ts">
	import { flip } from "$lib/animation";
	import Uploader from "$lib/components/functional/Uploader.svelte";
	import Panel from "$lib/components/visual/Panel.svelte";
	import { files } from "$lib/store/index.svelte";
	import { quintOut } from "svelte/easing";
	import { blur } from "svelte/transition";

	const images = $derived(
		files.files.filter((f) =>
			f.converters.map((c) => c.name).includes("imagemagick"),
		),
	);

	let forcedBlobURLs = $state<Map<string, string>>(new Map());

	const jpegify = () => {
		const imgs = [...images];
		imgs.map(async (f, i) => {
			f.to = ".jpeg";
			const result = await f.convert(compression);
			if (!result) return;
			forcedBlobURLs.set(f.id, URL.createObjectURL(result.file));
			forcedBlobURLs = new Map([...forcedBlobURLs]);
		});
	};

	let compressionInverted = $state(10);
	const compression = $derived(100 - compressionInverted);
	const processing = $derived(images.map((f) => f.processing).includes(true));
</script>

<div class="mx-auto w-full max-w-[778px] flex flex-col gap-8">
	<h1 class="text-5xl text-center">秘密JPEGIFY！！！</h1>
	<p class="text-muted text-center -mt-4 font-normal italic">
		（嘘...不要告诉任何人！）
	</p>
	<Uploader class="w-full h-64" jpegify={true} />
	<input
		type="range"
		min="1"
		max="100"
		step="1"
		class="w-full h-2 bg-panel rounded-lg appearance-none cursor-pointer"
		bind:value={compressionInverted}
		disabled={processing}
	/>
	<button
		onclick={jpegify}
		disabled={processing}
		class="btn bg-accent text-black rounded-2xl text-2xl w-full mx-auto"
		>JPEGIFY {compressionInverted}%！！！</button
	>
	<div class="flex flex-wrap flex-row justify-center gap-4">
		{#each images as file, i (file.id)}
			<div
				class="max-w-full w-full h-96"
				animate:flip={{ duration: 400, easing: quintOut }}
				transition:blur={{
					duration: 400,
					amount: 8,
					easing: quintOut,
				}}
			>
				<Panel class="w-full h-full flex flex-col gap-4 relative z-0">
					<div
						class="relative rounded-xl flex-grow overflow-hidden flex items-center justify-center"
					>
						<img
							src={forcedBlobURLs.get(file.id) ||
								file.result?.blobUrl ||
								file.blobUrl}
							alt={file.name}
							class="h-full relative"
						/>
						<img
							src={forcedBlobURLs.get(file.id) ||
								file.result?.blobUrl ||
								file.blobUrl}
							alt={file.name}
							class="h-full absolute top-0 left-0 w-full object-cover blur-2xl -z-10"
						/>
					</div>
					<div class="flex-shrink-0 flex items-center gap-4 w-full">
						<button
							onclick={() => {
								file?.download();
							}}
							disabled={!!!file.result}
							class="btn bg-accent text-black rounded-2xl text-2xl w-full mx-auto"
						>
							下载
						</button>
						<button
							onclick={() => {
								URL.revokeObjectURL(
									forcedBlobURLs.get(file.id) || "",
								);
								forcedBlobURLs.delete(file.id);
								files.files = files.files.filter(
									(f) => f.id !== file.id,
								);
							}}
							class="btn border-accent-red border-2 bg-transparent text-black dynadark:text-white rounded-2xl text-2xl w-full mx-auto"
						>
							删除
						</button>
					</div>
				</Panel>
			</div>
		{/each}
	</div>
</div>
