<script lang="ts">
	import Panel from "$lib/components/visual/Panel.svelte";
	import { GITHUB_URL_VERTD } from "$lib/consts";
	import { ServerIcon } from "lucide-svelte";
	import type { ISettings } from "./index.svelte";
	import clsx from "clsx";
	import Dropdown from "$lib/components/functional/Dropdown.svelte";
	import { vertdLoaded } from "$lib/store/index.svelte";

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
			视频转换
		</h2>
		<p
			class={clsx("text-sm font-normal", {
				"text-failure": vertdCommit === null,
				"text-green-700 dynadark:text-green-300": vertdCommit !== null,
				"!text-muted": vertdCommit === "loading",
			})}
		>
			状态: {vertdCommit
				? vertdCommit === "loading"
					? "加载中..."
					: `可用，提交ID ${vertdCommit}`
				: "不可用（URL是否正确？）"}
		</p>
		<div class="flex flex-col gap-8">
			<div class="flex flex-col gap-4">
				<p class="text-sm text-muted font-normal">
					<code>vertd</code>项目是FFmpeg的服务器包装器。
					这允许您通过VERT的Web界面的便利性转换视频，同时仍然能够利用GPU的力量尽可能快地完成转换。
				</p>
				<p class="text-sm text-muted font-normal">
					我们为您的便利托管了一个公共实例，但如果您知道自己在做什么，在您的PC或服务器上托管自己的实例也很容易。您可以下载服务器二进制文件<a
						href={GITHUB_URL_VERTD}
						target="_blank">这里</a
					> - 设置过程在未来会变得更容易，敬请期待！
				</p>
				<div class="flex flex-col gap-2">
					<p class="text-base font-bold">实例URL</p>
					<input
						type="text"
						placeholder="示例: http://localhost:24153"
						bind:value={settings.vertdURL}
					/>
				</div>
				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-2">
						<p class="text-base font-bold">转换速度</p>
						<p class="text-sm text-muted font-normal">
							这描述了速度和质量之间的权衡。更快的速度会导致质量降低，但会更快地完成任务。
						</p>
					</div>
					<Dropdown
						options={[
							"极慢",
							"较慢",
							"慢",
							"中等",
							"快",
							"极快",
						]}
						settingsStyle
						selected={(() => {
							switch (settings.vertdSpeed) {
								case "verySlow":
									return "极慢";
								case "slower":
									return "较慢";
								case "slow":
									return "慢";
								case "medium":
									return "中等";
								case "fast":
									return "快";
								case "ultraFast":
									return "极快";
							}
						})()}
						onselect={(selected) => {
							switch (selected) {
								case "极慢":
									settings.vertdSpeed = "verySlow";
									break;
								case "较慢":
									settings.vertdSpeed = "slower";
									break;
								case "慢":
									settings.vertdSpeed = "slow";
									break;
								case "中等":
									settings.vertdSpeed = "medium";
									break;
								case "快":
									settings.vertdSpeed = "fast";
									break;
								case "极快":
									settings.vertdSpeed = "ultraFast";
									break;
							}
						}}
					/>
				</div>
			</div>
		</div>
	</div>
</Panel>
