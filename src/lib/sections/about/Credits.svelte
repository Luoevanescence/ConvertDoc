<script lang="ts">
	import Panel from "$lib/components/visual/Panel.svelte";
	import { HeartHandshakeIcon } from "lucide-svelte";
	import { GITHUB_URL_VERT } from "$lib/consts";

	let { mainContribs, notableContribs, ghContribs } = $props();
</script>

{#snippet contributor(
	name: string,
	github: string,
	avatar: string,
	role?: string,
	smaller?: boolean,
)}
	<div class="flex items-center gap-4" class:gap-1={smaller}>
		<a
			href={github}
			target="_blank"
			rel="noopener noreferrer"
			class="flex-shrink-0"
		>
			<img
				src={avatar}
				alt={name}
				title={name}
				class="{smaller
					? 'w-12 h-12 hoverable'
					: role
						? 'w-14 h-14 hoverable-md'
						: 'w-10 h-10 hoverable-lg'} rounded-full"
			/>
		</a>
		{#if role}
			<div class="flex flex-col gap-1">
				<p
					class="font-semibold"
					class:text-xl={!smaller}
					class:text-base={smaller}
				>
					{name}
				</p>
				<p class="text-sm font-normal text-muted">{role}</p>
			</div>
		{/if}
	</div>
{/snippet}

<Panel class="flex flex-col gap-8 p-6">
	<h2 class="text-2xl font-bold flex items-center">
		<div class="rounded-full bg-blue-300 p-2 inline-block mr-3 w-10 h-10">
			<HeartHandshakeIcon color="black" />
		</div>
		致谢
	</h2>

	<p class="-mt-4 -mb-3 font-black text-lg">
		如果您想联系开发团队，请使用"资源"卡片上找到的邮箱。
	</p>

	<!-- Main contributors -->
	<div class="flex flex-col gap-4">
		<div class="flex flex-col flex-wrap gap-2">
			{#each mainContribs as contrib}
				{@const { name, github, avatar, role } = contrib}
				{@render contributor(name, github, avatar, role)}
			{/each}
		</div>
	</div>

	<!-- Notable contributors -->
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-1">
			<h2 class="text-base font-bold">主要贡献者</h2>
			<div class="flex flex-col gap-2">
				<p class="text-base text-muted font-normal">
					我们要感谢这些人为VERT做出的重大贡献。
				</p>
				<div class="flex flex-col gap-2">
					{#each notableContribs as contrib}
						{@const { name, github, avatar, role } = contrib}
						{@render contributor(name, github, avatar, role, true)}
					{/each}
				</div>
			</div>
		</div>

		<!-- GitHub contributors -->
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-1">
				<h2 class="text-base font-bold">GitHub贡献者</h2>
				{#if ghContribs && ghContribs.length > 0}
					<p class="text-base text-muted font-normal">
						非常感谢所有帮助过的人！
						<a
							class="text-blue-500 font-normal hover:underline"
							href={GITHUB_URL_VERT}
							target="_blank"
							rel="noopener noreferrer"
						>
							也想帮忙吗？
						</a>
					</p>
				{:else}
					<p class="text-base text-muted font-normal italic">
						看起来还没有人贡献过...
						<a
							class="text-blue-500 font-normal hover:underline"
							href={GITHUB_URL_VERT}
							target="_blank"
							rel="noopener noreferrer"
						>
							成为第一个贡献者吧！
						</a>
					</p>
				{/if}
			</div>

			{#if ghContribs && ghContribs.length > 0}
				<div class="flex flex-row flex-wrap gap-2">
					{#each ghContribs as contrib}
						{@const { name, github, avatar } = contrib}
						{@render contributor(name, github, avatar)}
					{/each}
				</div>
			{/if}

			<h2 class="mt-2 -mb-2">库</h2>
			<p class="font-normal">
				非常感谢FFmpeg（音频、视频）、Imagemagick（图像）和Pandoc（文档）多年来维护如此优秀的库。
				VERT依赖它们为您提供转换服务。
			</p>
		</div>
	</div></Panel
>
