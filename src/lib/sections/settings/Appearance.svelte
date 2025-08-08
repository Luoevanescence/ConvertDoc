<script lang="ts">
	import Panel from "$lib/components/visual/Panel.svelte";
	import {
		theme,
		effects,
		setEffects,
		setTheme,
	} from "$lib/store/index.svelte";
	import {
		MoonIcon,
		PaletteIcon,
		PauseIcon,
		PlayIcon,
		SunIcon,
	} from "lucide-svelte";

	let lightElement: HTMLButtonElement;
	let darkElement: HTMLButtonElement;
	let enableEffectsElement: HTMLButtonElement;
	let disableEffectsElement: HTMLButtonElement;

	const updateEffectsClasses = (value: boolean) => {
		if (!enableEffectsElement || !disableEffectsElement) return;
		
		if (value) {
			enableEffectsElement.classList.add("selected");
			disableEffectsElement.classList.remove("selected");
		} else {
			disableEffectsElement.classList.add("selected");
			enableEffectsElement.classList.remove("selected");
		}
	};

	const updateThemeClasses = (value: string) => {
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(value);

		if (!lightElement || !darkElement) return;

		if (value === "dark") {
			darkElement.classList.add("selected");
			lightElement.classList.remove("selected");
		} else {
			lightElement.classList.add("selected");
			darkElement.classList.remove("selected");
		}
	};

	// 使用$effect来处理状态变化，这是Svelte 5推荐的方式
	$effect(() => {
		updateEffectsClasses($effects);
		updateThemeClasses($theme);
	});
</script>

<Panel class="flex flex-col gap-8 p-6">
	<div class="flex flex-col gap-3">
		<h2 class="text-2xl font-bold">
			<PaletteIcon
				size="40"
				class="inline-block -mt-1 mr-2 bg-accent-purple p-2 rounded-full"
				color="black"
			/>
			外观
		</h2>
		<div class="flex flex-col gap-8">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					<p class="text-base font-bold">亮度主题</p>
					<p class="text-sm text-muted font-normal italic">
						想要阳光明媚的闪光，还是安静孤独的夜晚？
					</p>
				</div>
				<div class="flex flex-col gap-3 w-full">
					<div class="flex gap-3 w-full">
						<button
							bind:this={lightElement}
							onclick={() => setTheme("light")}
							class="btn {$effects
								? ''
								: '!scale-100'} flex-1 p-4 rounded-lg text-black dynadark:text-white flex items-center justify-center"
						>
							<SunIcon size="24" class="inline-block mr-2" />
							浅色
						</button>

						<button
							bind:this={darkElement}
							onclick={() => setTheme("dark")}
							class="btn {$effects
								? ''
								: '!scale-100'} flex-1 p-4 rounded-lg text-black flex items-center justify-center"
						>
							<MoonIcon size="24" class="inline-block mr-2" />
							深色
						</button>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					<p class="text-base font-bold">效果设置</p>
					<p class="text-sm text-muted font-normal italic">
						您喜欢花哨的效果，还是更静态的体验？
					</p>
				</div>
				<div class="flex flex-col gap-3 w-full">
					<div class="flex gap-3 w-full">
						<button
							bind:this={enableEffectsElement}
							onclick={() => setEffects(true)}
							class="btn {$effects
								? ''
								: '!scale-100'} flex-1 p-4 rounded-lg text-black dynadark:text-white flex items-center justify-center"
						>
							<PlayIcon size="24" class="inline-block mr-2" />
							启用
						</button>

						<button
							bind:this={disableEffectsElement}
							onclick={() => setEffects(false)}
							class="btn {$effects
								? ''
								: '!scale-100'} flex-1 p-4 rounded-lg text-black dynadark:text-white flex items-center justify-center"
						>
							<PauseIcon size="24" class="inline-block mr-2" />
							禁用
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</Panel>
