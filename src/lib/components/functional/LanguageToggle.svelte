<script lang="ts">
	import { currentLanguage, setLanguage, getAvailableLanguages, getLanguageDisplayName } from '$lib/i18n';
	import { effects } from '$lib/store/index.svelte';
	import { GlobeIcon, ChevronDownIcon } from 'lucide-svelte';
	import type { Language } from '$lib/types/i18n';
	import Tooltip from '$lib/components/visual/Tooltip.svelte';
	import { fade } from '$lib/animation';

	let selectedLanguage = $state($currentLanguage);
	let showDropdown = $state(false);
	let dropdownElement: HTMLElement;

	const languages = getAvailableLanguages();

	const handleLanguageChange = (language: Language) => {
		selectedLanguage = language;
		setLanguage(language);
		showDropdown = false;
	};

	const toggleDropdown = () => {
		showDropdown = !showDropdown;
	};

	$effect(() => {
		selectedLanguage = $currentLanguage;
	});

	// 使用 $effect 监听并处理点击外部关闭下拉菜单
	$effect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (dropdownElement && !dropdownElement.contains(target)) {
				showDropdown = false;
			}
		};

		if (typeof window !== 'undefined') {
			document.addEventListener('click', handleClickOutside);
		}

		return () => {
			if (typeof window !== 'undefined') {
				document.removeEventListener('click', handleClickOutside);
			}
		};
	});
</script>

<div class="language-toggle relative  h-full  md:flex" bind:this={dropdownElement}>
	<Tooltip text={selectedLanguage === 'zh-CN' ? '切换语言' : 'Switch Language'} position="bottom">
		<button
			onclick={toggleDropdown}
			class="w-14 h-full items-center justify-center hidden md:flex relative hover:bg-panel-highlight rounded-lg transition-colors duration-200"
			aria-label={selectedLanguage === 'zh-CN' ? '切换语言' : 'Switch Language'}
		>
			<GlobeIcon class="w-5 h-5" />
		</button>
	</Tooltip>

	{#if showDropdown}
		<div
			class="absolute top-full right-0 mt-2 bg-panel border border-separator rounded-lg shadow-lg z-50 min-w-32 overflow-hidden"
			transition:fade={{ duration: 200 }}
		>
			{#each languages as language}
				<button
					onclick={() => handleLanguageChange(language)}
					class="w-full px-4 py-3 text-left hover:bg-panel-highlight transition-colors duration-200 flex items-center justify-between text-sm {selectedLanguage === language ? 'bg-panel-highlight' : ''}"
				>
					<span>{getLanguageDisplayName(language)}</span>
					{#if selectedLanguage === language}
						<div class="w-2 h-2 bg-accent rounded-full"></div>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

<!-- 移动端语言切换 -->
<div class="language-toggle-mobile md:hidden">
	<button
		onclick={toggleDropdown}
		class="flex items-center justify-center p-2 hover:bg-panel-highlight rounded-lg transition-colors duration-200"
		aria-label={selectedLanguage === 'zh-CN' ? '切换语言' : 'Switch Language'}
	>
		<GlobeIcon class="w-5 h-5 mr-2" />
		<span class="text-sm">{getLanguageDisplayName(selectedLanguage)}</span>
		<ChevronDownIcon class="w-4 h-4 ml-1 transition-transform duration-200 {showDropdown ? 'rotate-180' : ''}" />
	</button>

	{#if showDropdown}
		<div
			class="mt-2 bg-panel border border-separator rounded-lg shadow-lg overflow-hidden"
			transition:fade={{ duration: 200 }}
		>
			{#each languages as language}
				<button
					onclick={() => handleLanguageChange(language)}
					class="w-full px-4 py-3 text-left hover:bg-panel-highlight transition-colors duration-200 flex items-center justify-between text-sm {selectedLanguage === language ? 'bg-panel-highlight' : ''}"
				>
					<span>{getLanguageDisplayName(language)}</span>
					{#if selectedLanguage === language}
						<div class="w-2 h-2 bg-accent rounded-full"></div>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
