<script lang="ts">
	import Panel from "$lib/components/visual/Panel.svelte";
	import { currentLanguage, setLanguage, getAvailableLanguages, getLanguageDisplayName, tr } from "$lib/i18n";
	import { effects } from "$lib/store/index.svelte";
	import { GlobeIcon, CheckIcon } from "lucide-svelte";
	import type { Language } from "$lib/types/i18n";

	let selectedLanguage = $state($currentLanguage);

	const languages = getAvailableLanguages();

	const handleLanguageChange = (language: Language) => {
		selectedLanguage = language;
		setLanguage(language);
	};

	$effect(() => {
		selectedLanguage = $currentLanguage;
	});
</script>

<Panel class="flex flex-col gap-8 p-6">
	<div class="flex flex-col gap-3">
		<h2 class="text-2xl font-bold">
			<GlobeIcon
				size="40"
				class="inline-block -mt-1 mr-2 bg-accent-blue p-2 rounded-full"
				color="black"
			/>
			{$tr('settings.languageSettings')}
		</h2>
		<p class="text-text-secondary">
			{$currentLanguage === 'zh-CN' ? '选择您的首选语言' : 'Choose your preferred language'}
		</p>
	</div>

	<div class="flex flex-col gap-4">
		<h3 class="text-lg font-semibold">{$tr('common.language')}</h3>
		
		<div class="grid gap-3">
			{#each languages as language}
				<button
					onclick={() => handleLanguageChange(language)}
					class="flex items-center justify-between p-4 border border-separator rounded-lg hover:bg-panel-highlight transition-colors duration-200 {selectedLanguage === language ? 'ring-2 ring-accent bg-panel-highlight' : ''}"
				>
					<div class="flex items-center gap-3">
						<div class="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center">
							<GlobeIcon class="w-4 h-4 text-accent-blue" />
						</div>
						<div class="text-left">
							<div class="font-medium">{getLanguageDisplayName(language)}</div>
							<div class="text-sm text-text-secondary">
								{language === 'zh-CN' ? '简体中文' : 'English (United States)'}
							</div>
						</div>
					</div>
					
					{#if selectedLanguage === language}
						<CheckIcon class="w-5 h-5 text-accent" />
					{/if}
				</button>
			{/each}
		</div>

		<div class="mt-4 p-4 bg-panel-highlight rounded-lg">
			<h4 class="font-medium mb-2">
				{$currentLanguage === 'zh-CN' ? '注意' : 'Note'}
			</h4>
			<p class="text-sm text-text-secondary">
				{$currentLanguage === 'zh-CN' 
					? '语言设置会立即生效并保存到本地存储中。'
					: 'Language settings take effect immediately and are saved to local storage.'
				}
			</p>
		</div>
	</div>
</Panel>